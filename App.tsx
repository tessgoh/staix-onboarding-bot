import { useState, useRef, useEffect } from 'react';
import ChatuiMainMinimize from './imports/ChatuiMainMinimize';
import ChatuiMainMaximize from './imports/ChatuiMainMaximize';

interface Message {
  question: string;
  answer: string;
  isLoading?: boolean;
}

// Function to process answer and convert text + URL patterns to clickable links
function processAnswer(text: string): string {
  // First, clean up any existing malformed HTML that might be showing as text
  let processedText = text.replace(
    /" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">/g,
    ''
  );
  
  // 이미지 URL 패턴 감지 (jpg, jpeg, png, gif, webp, svg 등)
  const imageUrlPattern = /(https?:\/\/[^\s<>"\)]+\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico)(?:\?[^\s<>"\)]*)?)/gi;
  
  // 이미지 URL을 마크다운 이미지 문법으로 변환
  processedText = processedText.replace(imageUrlPattern, (match) => {
    return `![이미지](${match})`;
  });
  
  // Pattern 0: [키워드] followed by URL - 마크다운 링크 문법으로 변환
  // Matches: 자세한 절차는 여기에서 확인하세요: [키워드] https://example.com
  processedText = processedText.replace(
    /\[([^\]]+)\]\s+(https?:\/\/[^\s]+)/g,
    '[$1]($2)'
  );
  
  // Pattern 1: "텍스트" followed by URL on the same line - 마크다운 링크 문법으로 변환
  // Matches: "텍스트" https://example.com
  processedText = processedText.replace(
    /"([^"]+)"\s+(https?:\/\/[^\s]+)/g,
    '[$1]($2)'
  );
  
  // Pattern 2: "텍스트" followed by URL on the next line - 마크다운 링크 문법으로 변환
  // Matches: "텍스트"\nhttps://example.com
  processedText = processedText.replace(
    /"([^"]+)"\s*\n\s*(https?:\/\/[^\s]+)/g,
    '[$1]($2)'
  );
  
  // Pattern 3: 텍스트 followed by URL (without quotes) - 마크다운 링크 문법으로 변환
  // Matches: 자세한 내용은 https://example.com 참고하세요
  processedText = processedText.replace(
    /([가-힣\s]+)\s+(https?:\/\/[^\s]+)/g,
    (match, text, url) => {
      // Only convert if the text is meaningful (not just spaces)
      if (text.trim().length > 2) {
        return `[${text.trim()}](${url})`;
      }
      return match;
    }
  );
  
  // Convert remaining standalone URLs to markdown links (but not already linked ones or images)
  processedText = processedText.replace(
    /(?<!\]\()(https?:\/\/[^\s<>"\)]+)(?!\))/g,
    (match) => {
      // 이미지 URL이 아닌 경우에만 링크로 변환
      if (!imageUrlPattern.test(match)) {
        return `[${match}](${match})`;
      }
      return match;
    }
  );

  // Remove backtick to prevent code block
  processedText = processedText.replace(
    /`/g,
    () => {
      return '';
    }
  );
  
  return processedText;
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
                  answer: processAnswer(accumulatedText),
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
  };

  const handleToggle = () => {
    // Save current scroll position before toggling
    if (scrollContainerRef.current) {
      setSavedScrollTop(scrollContainerRef.current.scrollTop);
    }
    setIsToggling(true);
    const newMaximizedState = !isMaximized;
    setIsMaximized(newMaximizedState);
    
    // 디버깅을 위한 로그
    console.log('handleToggle called, isMaximized:', isMaximized, 'newMaximizedState:', newMaximizedState);
    console.log('window.parent !== window:', window.parent !== window);
    
    // iframe에서 부모 창으로 상태 전달
    if (window.parent !== window) {
      const message = {
        type: 'chat-toggle',
        isMaximized: newMaximizedState
      };
      console.log('Sending message to parent:', message);
      window.parent.postMessage(message, '*');
    }
  };

  const handleBackToMain = () => {
    setMessages([]);
    
    // iframe에서 부모 창으로 메시지 초기화 알림
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'chat-reset'
      }, '*');
    }
  };

  const handleClose = () => {
    // iframe에서 부모 창으로 닫기 요청
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'chat-close'
      }, '*');
    } else {
      // iframe이 아닌 경우 기존 동작
      if (window.confirm('정말로 창을 닫으시겠습니까?')) {
        window.close();
      }
    }
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

  // 실제 화면 크기 전달을 위한 useEffect
  useEffect(() => {
    const sendActualHeightToParent = () => {
      if (window.parent !== window) {
        // 실제 DOM 요소의 크기 측정
        const chatContainer = document.querySelector('[data-name="chatui-main-minimize"], [data-name="chatui-main-maximize"]');
        if (chatContainer) {
          const actualHeight = chatContainer.getBoundingClientRect().height;
          console.log('실제 높이 전달:', actualHeight);
          
          window.parent.postMessage({
            type: 'chat-height-change',
            height: actualHeight
          }, '*');
        }
      }
    };

    // 초기 전달
    setTimeout(sendActualHeightToParent, 100);

    // ResizeObserver로 크기 변화 감지
    const resizeObserver = new ResizeObserver(sendActualHeightToParent);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isMaximized, messages]);

  return (
    <div className="size-full flex items-center justify-center">
      {isMaximized ? (
        <ChatuiMainMaximize
          messages={messages}
          onSubmit={handleSubmit}
          scrollContainerRef={scrollContainerRef}
          isToggling={isToggling}
          onBackToMain={handleBackToMain}
          onClose={handleClose}
          onToggle={handleToggle}
        />
      ) : (
        <ChatuiMainMinimize
          messages={messages}
          onSubmit={handleSubmit}
          scrollContainerRef={scrollContainerRef}
          isToggling={isToggling}
          onBackToMain={handleBackToMain}
          onClose={handleClose}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}
