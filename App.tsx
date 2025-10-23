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
    const loadingMessage: Message = {
      question,
      answer: '',
      isLoading: true
    };
    setMessages(prevMessages => [...prevMessages, loadingMessage]);

    try {
      // Send data to webhook
      const response = await fetch('https://n8n-test.poc.letsur.ai/webhook/0b252675-23c2-47c7-a990-a0093a3463fa', {
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

      const data = await response.json();
      console.log('Webhook response:', data); // 디버깅을 위한 로그
      
      // 다양한 응답 형식 처리
      let answer = '';
      if (typeof data === 'string') {
        answer = data;
      } else if (data && typeof data === 'object') {
        // 가능한 모든 응답 필드 확인 (우선순위 순)
        answer = data.output || 
                 data.answer || 
                 data.message || 
                 data.response || 
                 data.text || 
                 data.content || 
                 data.data ||
                 data.result ||
                 data.body ||
                 data.payload;
        
        // 만약 여전히 답변을 찾지 못했다면, 객체의 첫 번째 문자열 값 찾기
        if (!answer || answer === '') {
          for (const [, value] of Object.entries(data)) {
            if (typeof value === 'string' && value.trim().length > 0) {
              answer = value;
              break;
            }
          }
        }
        
        // 마지막 수단으로 JSON 문자열화 (하지만 사용자 친화적이지 않음)
        if (!answer || answer === '') {
          answer = '응답을 받았지만 내용을 파싱할 수 없습니다.';
        }
      } else {
        answer = '응답을 받았지만 내용을 파싱할 수 없습니다.';
      }
      
      // Update message with response
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastIndex = updatedMessages.length - 1;
        updatedMessages[lastIndex] = {
          question,
          answer: answer,
          isLoading: false
        };
        return updatedMessages;
      });
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
