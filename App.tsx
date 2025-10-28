import { useState, useRef, useEffect } from 'react';
import ChatuiMainMinimize from './imports/ChatuiMainMinimize';
import ChatuiMainMaximize from './imports/ChatuiMainMaximize';

interface Message {
  question: string;
  answer: string;
  isLoading?: boolean;
}

// Function to process answer and convert text + URL patterns to clickable links
function processAnswerWithLinks(text: string): string {
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

      // Handle streaming response
      const responseText = await response.text();
      console.log('Webhook response text:', responseText);
      
      let answer = '';
      
      try {
        // Try to parse as regular JSON first
        const data = JSON.parse(responseText);
        console.log('Parsed as JSON:', data);
        
        if (typeof data === 'string') {
          answer = data;
        } else if (data && typeof data === 'object') {
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
        }
      } catch (jsonError) {
        console.log('Not a single JSON, trying streaming format...');
        
        // Handle streaming format - split by lines and extract content
        const lines = responseText.trim().split('\n');
        const contentItems: string[] = [];
        
        for (const line of lines) {
          try {
            const item = JSON.parse(line);
            if (item.type === 'item' && item.content) {
              contentItems.push(item.content);
            }
          } catch (lineError) {
            // Skip invalid JSON lines
            console.log('Skipping invalid line:', line);
          }
        }
        
        if (contentItems.length > 0) {
          answer = contentItems.join('');
        }
      }
      
      // Fallback if no answer found
      if (!answer || answer === '') {
        answer = '응답을 받았지만 내용을 파싱할 수 없습니다.';
      }
      
      // Process answer to convert text + URL patterns to clickable links
      answer = processAnswerWithLinks(answer);
      
      console.log('Final answer:', answer);
      
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
