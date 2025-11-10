import { useState, useRef, useEffect } from 'react';
import ChatuiMain from './src/ChatuiMain';

interface Message {
  question: string;
  answer: string;
  isLoading?: boolean;
}

// Generate unique session ID
function generateSessionId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export default function App() { 
  const [messages, setMessages] = useState<Message[]>([]);
  // toggling and saved scroll removed with header controls
  const [sessionId, setSessionId] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize sessionId when component mounts
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    console.log('New session started with ID:', newSessionId);
  }, []);

  const handleSubmit = (question: string): void => {
    // Add message with loading state
    const newMessage: Message = {
      question,
      answer: '',
      isLoading: true
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Execute async logic without awaiting (fire and forget)
    (async () => {
      try {
        console.log('Sending request to webhook...', question);
        
        // Get webhook URL from environment variable
        const webhookUrl = "https://n8n-test.poc.letsur.ai/webhook/0b252675-23c2-47c7-a990-a0093a3463fa";
        // Send data to webhook
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: question,
            sessionId: sessionId,
            timestamp: new Date().toISOString(),
            user: 'user' // You can modify this as needed
          })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('HTTP error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        if (!reader) {
          throw new Error('응답 스트림을 읽을 수 없습니다.');
        }

        let accumulatedText = '';
        let buffer = '';

        // Stream 읽기
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }
          
          // 디코딩된 청크를 버퍼에 추가
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // 줄바꿈으로 분리
          const lines = buffer.split('\n');
          
          // 마지막 줄은 불완전할 수 있으므로 버퍼에 유지
          buffer = lines.pop() || '';
          
          // 각 줄을 JSON으로 파싱
          for (const line of lines) {
            if (!line.trim()) continue;
            
            try {
              const data = JSON.parse(line);
              
              // type이 "item"인 경우에만 content 추출
              if (data.type === 'item' && data.content) {
                accumulatedText += data.content;
                
                // 실시간으로 메시지 업데이트
                setMessages(prevMessages => {
                  const updatedMessages = [...prevMessages];
                  const lastIndex = updatedMessages.length - 1;
                  updatedMessages[lastIndex] = {
                    question,
                    answer: accumulatedText.replace(/`/g, () => { return '' }),
                    isLoading: false
                  };
                  return updatedMessages;
                });
              }
            } catch (e) {
              console.warn('JSON 파싱 에러:', line, e);
            }
          }
        }

        // 스트림이 끝나면 최종 업데이트
        console.log('Stream completed. Final text:', accumulatedText);
      } catch (error) {
        console.error('Webhook error:', error);
        
        // 더 구체적인 에러 메시지
        let errorMessage = '죄송합니다. 서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        
        if (error instanceof TypeError) {
          if (error.message.includes('fetch')) {
            errorMessage = '네트워크 연결을 확인해주세요.';
          } else if (error.message.includes('Failed to fetch')) {
            errorMessage = '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.';
          }
        } else if (error instanceof Error) {
          if (error.message.includes('HTTP error')) {
            const statusMatch = error.message.match(/status: (\d+)/);
            if (statusMatch) {
              const status = parseInt(statusMatch[1]);
              if (status === 404) {
                errorMessage = '웹훅 URL을 찾을 수 없습니다.';
              } else if (status === 500) {
                errorMessage = '서버 내부 오류가 발생했습니다.';
              } else if (status >= 400 && status < 500) {
                errorMessage = '요청이 잘못되었습니다.';
              } else if (status >= 500) {
                errorMessage = '서버 오류가 발생했습니다.';
              }
            }
          }
        }
        
        console.log('Final error message:', errorMessage);
        
        // Update message with error
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = {
            question,
            answer: errorMessage,
            isLoading: false
          };
          return updatedMessages;
        });
      }
    })();
  };

  const handleBackToMain = () => {
    setMessages([]);
    
    // Generate new sessionId when resetting conversation
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    console.log('Conversation reset. New session ID:', newSessionId);
    
    // iframe에서 부모 창으로 메시지 초기화 알림
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'chat-reset'
      }, '*');
    }
  };

  // removed toggling-related scroll restoration

  return (
    <div className="size-full flex items-center justify-center">
      <ChatuiMain
        messages={messages}
        onSubmit={handleSubmit}
        scrollContainerRef={scrollContainerRef}
        onBackToMain={handleBackToMain}
      />
    </div>
  );
}