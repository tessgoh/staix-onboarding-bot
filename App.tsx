import { useState, useRef, useEffect } from 'react';
import ChatuiMainMinimize from './imports/ChatuiMainMinimize';
import ChatuiMainMaximize from './imports/ChatuiMainMaximize';

interface Message {
  question: string;
  answer: string;
  isLoading?: boolean;
}

export default function App() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [savedScrollTop, setSavedScrollTop] = useState<number | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (question: string) => {
    // Add message with loading state
    const newMessage: Message = {
      question,
      answer: '',
      isLoading: true
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    try {
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
          timestamp: new Date().toISOString(),
          user: 'user' // You can modify this as needed
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
                  answer: accumulatedText,
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
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = '네트워크 연결을 확인해주세요.';
      } else if (error instanceof Error && error.message.includes('HTTP error')) {
        errorMessage = '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
      
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
  };

  const handleToggle = () => {
    // Save current scroll position before toggling
    if (scrollContainerRef.current) {
      setSavedScrollTop(scrollContainerRef.current.scrollTop);
    }
    setIsToggling(true);
    setIsMaximized(!isMaximized);
  };

  const handleBackToMain = () => {
    setMessages([]);
  };

  useEffect(() => {
    // Restore scroll position after component switches
    if (isToggling && scrollContainerRef.current && savedScrollTop !== null) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = savedScrollTop;
        }
        setIsToggling(false);
      });
    }
  }, [isMaximized, isToggling, savedScrollTop]);

  return (
    <div className="size-full flex items-center justify-center p-8">
      <div 
        className="relative transition-all duration-300"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          // Toggle when clicking on maximize/minimize icons
          if (target.closest('[data-name="ic-maximize"]') || target.closest('[data-name="ic-minimize"]')) {
            handleToggle();
          }
        }}
      >
        {isMaximized ? (
          <ChatuiMainMaximize messages={messages} onSubmit={handleSubmit} scrollContainerRef={scrollContainerRef} isToggling={isToggling} onBackToMain={handleBackToMain} />
        ) : (
          <ChatuiMainMinimize messages={messages} onSubmit={handleSubmit} scrollContainerRef={scrollContainerRef} isToggling={isToggling} onBackToMain={handleBackToMain} />
        )}
      </div>
    </div>
  );
}
