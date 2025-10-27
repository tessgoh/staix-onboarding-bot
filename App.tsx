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
  
  // Split text into parts: already linked parts and plain text parts
  const parts: string[] = [];
  let lastIndex = 0;
  
  // Find all existing links and split the text
  const linkRegex = /<a[^>]*>.*?<\/a>/g;
  let match;
  
  while ((match = linkRegex.exec(processedText)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(processedText.slice(lastIndex, match.index));
    }
    // Add the link as-is
    parts.push(match[0]);
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < processedText.length) {
    parts.push(processedText.slice(lastIndex));
  }
  
  // Process only the non-linked parts
  const processedParts = parts.map(part => {
    // Skip if it's already a link
    if (part.startsWith('<a ') && part.endsWith('</a>')) {
      return part;
    }
    
    // Pattern 0: [키워드] followed by URL
    part = part.replace(
      /\[([^\]]+)\]\s+(https?:\/\/[^\s]+)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">[$1]</a>'
    );
    
    // Pattern 1: "텍스트" followed by URL on the same line
    part = part.replace(
      /"([^"]+)"\s+(https?:\/\/[^\s]+)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">$1</a>'
    );
    
    // Pattern 2: "텍스트" followed by URL on the next line
    part = part.replace(
      /"([^"]+)"\s*\n\s*(https?:\/\/[^\s]+)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">$1</a>'
    );
    
    // Pattern 3: 텍스트 followed by URL (without quotes)
    part = part.replace(
      /([가-힣\s]+)\s+(https?:\/\/[^\s]+)/g,
      (match, text, url) => {
        // Only convert if the text is meaningful (not just spaces)
        if (text.trim().length > 2) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">${text.trim()}</a>`;
        }
        return match;
      }
    );
    
    // Convert remaining standalone URLs to links
    part = part.replace(
      /(https?:\/\/[^\s<>"]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">$1</a>'
    );
    
    return part;
  });
  
  return processedParts.join('');
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
    setIsMaximized(!isMaximized);
  };

  const handleBackToMain = () => {
    setMessages([]);
  };

  const handleClose = () => {
    // 창 종료 기능 - 현재는 페이지를 새로고침하거나 숨기는 방식으로 구현
    // 실제 앱에서는 window.close() 또는 다른 방식으로 구현할 수 있습니다
    if (window.confirm('정말로 창을 닫으시겠습니까?')) {
      window.close();
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
          <ChatuiMainMaximize messages={messages} onSubmit={handleSubmit} scrollContainerRef={scrollContainerRef} isToggling={isToggling} onBackToMain={handleBackToMain} onClose={handleClose} />
        ) : (
          <ChatuiMainMinimize messages={messages} onSubmit={handleSubmit} scrollContainerRef={scrollContainerRef} isToggling={isToggling} onBackToMain={handleBackToMain} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}
