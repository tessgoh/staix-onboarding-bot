import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import svgPaths from "./svg-1rxwmvuc5a";
import BubbleLoader from "../components/BubbleLoader";
import Header from "./Header";

interface Message {
  question: string;
  answer: string;
  isLoading?: boolean;
}

function IcShare() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="ic-share">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ic-share">
          <path d={svgPaths.p2532a180} fill="var(--fill-0, #0070FF)" id="Icon (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function IcSize2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="ic_size">
      <IcShare />
    </div>
  );
}

function Content() {
  const handleClick = () => {
    window.open('https://letsur.notion.site/Staix-10ba0be0969d80369671eb23f3489109', '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-0 py-[4px] relative rounded-[6px] shrink-0 cursor-pointer group" 
      data-name="guide link"
    >
      <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#0070ff] text-center text-nowrap">
        <p className="whitespace-pre group-hover:underline transition-all" style={{
          fontSize: 'var(--caption-100-size)',
          fontWeight: 'var(--caption-100-regular)',
          lineHeight: 'var(--caption-100-line-height)',
          letterSpacing: 'var(--caption-100-letter-spacing)'
        }}>Staix 사용 가이드 바로가기</p>
      </div>
      <IcSize2 />
    </div>
  );
}

function Head() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center justify-end relative rounded-[6px] shrink-0"
      data-name="head"
    >
      <div className="content-stretch flex flex-col gap-[10px] items-center leading-[0] relative shrink-0 text-center text-nowrap">
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center relative shrink-0 text-[#090909] whitespace-pre">
          <p 
            className="mb-0"
            style={{
              fontSize: "var(--title-300-size)",
              fontWeight: "var(--title-300-semibold)",
              lineHeight: "var(--title-300-line-height)",
              letterSpacing: "var(--title-300-letter-spacing)",
            }}
          >
            사용법이 궁금할 땐
          </p>
          <p
            style={{
              fontSize: "var(--title-300-size)",
              fontWeight: "var(--title-300-semibold)",
              lineHeight: "var(--title-300-line-height)",
              letterSpacing: "var(--title-300-letter-spacing)",
            }}
          >
            언제든 물어보세요
          </p>
        </div>
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center relative shrink-0 text-[#6e6e6e]">
          <p 
            className="text-nowrap whitespace-pre"
            style={{
              fontSize: "var(--paragraph-100-size)",
              fontWeight: "var(--paragraph-100-regular)",
              lineHeight: "var(--paragraph-100-line-height)",
              letterSpacing: "var(--paragraph-100-letter-spacing)",
            }}
          >
            대화로 배우는 Staix 사용 가이드
          </p>
        </div>
      </div>
      <Content />
    </div>
  );
}

function Faq03({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className="relative rounded-[30px] shrink-0 hover:bg-[#e7faec] transition-colors cursor-pointer" data-name="FAQ03">
      <div className="box-border content-stretch flex gap-[116px] items-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#00ab7f] text-nowrap" style={{ fontSize: 'var(--paragraph-100-size)', fontWeight: 'var(--paragraph-100-regular)', letterSpacing: 'var(--paragraph-100-letter-spacing)' }}>
          <p className="whitespace-pre" style={{
            fontSize: 'var(--paragraph-100-size)',
            fontWeight: 'var(--paragraph-100-regular)',
            lineHeight: 'var(--paragraph-100-line-height)',
            letterSpacing: 'var(--paragraph-100-letter-spacing)'
          }}>멤버 초대는 어떻게 해?</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#00ab7f] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Faq01({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className="relative rounded-[30px] shrink-0 hover:bg-[#e7faec] transition-colors cursor-pointer" data-name="FAQ01">
      <div className="box-border content-stretch flex gap-[116px] items-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#00ab7f] text-nowrap" style={{ fontSize: 'var(--paragraph-100-size)', fontWeight: 'var(--paragraph-100-regular)', letterSpacing: 'var(--paragraph-100-letter-spacing)' }}>
          <p className="whitespace-pre" style={{
            fontSize: 'var(--paragraph-100-size)',
            fontWeight: 'var(--paragraph-100-regular)',
            lineHeight: 'var(--paragraph-100-line-height)',
            letterSpacing: 'var(--paragraph-100-letter-spacing)'
          }}>AI 게이트웨이 역할에 대해 알려줘</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#00ab7f] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Faq04Hover({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className="relative rounded-[30px] shrink-0 hover:bg-[#e7faec] transition-colors cursor-pointer" data-name="FAQ04 (hover)">
      <div className="box-border content-stretch flex gap-[116px] items-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#00ab7f] text-nowrap" style={{ fontSize: 'var(--paragraph-100-size)', fontWeight: 'var(--paragraph-100-regular)', letterSpacing: 'var(--paragraph-100-letter-spacing)' }}>
          <p className="whitespace-pre" style={{
            fontSize: 'var(--paragraph-100-size)',
            fontWeight: 'var(--paragraph-100-regular)',
            lineHeight: 'var(--paragraph-100-line-height)',
            letterSpacing: 'var(--paragraph-100-letter-spacing)'
          }}>결제 수단 등록에 대해 알려줘</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#00ab7f] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Faq({ onFaqClick }: { onFaqClick: (question: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0" data-name="FAQ">
      <Faq03 onClick={() => onFaqClick("멤버 초대는 어떻게 해?")} />
      <Faq01 onClick={() => onFaqClick("AI 게이트웨이 역할에 대해 알려줘")} />
      <Faq04Hover onClick={() => onFaqClick("결제 수단 등록에 대해 알려줘")} />
    </div>
  );
}

function QuestionBubble({ question }: { question: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end justify-center relative shrink-0 w-full">
      <div className="bg-[#00c781] box-border content-stretch flex gap-[4px] items-center px-[20px] py-[12px] relative rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px] max-w-full">
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative text-white max-w-full">
          <p className="leading-[24px] whitespace-pre-wrap break-words max-w-full" style={{
            fontSize: 'var(--paragraph-100-size)',
            fontWeight: 'var(--paragraph-100-semibold)',
            lineHeight: 'var(--paragraph-100-line-height)',
            letterSpacing: 'var(--paragraph-100-letter-spacing)'
          }}>{question}</p>
        </div>
      </div>
    </div>
  );
}

function AnswerBubble({ answer, isLoading }: { answer: string; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <div className="bg-neutral-100 box-border content-stretch flex gap-[4px] items-center px-[20px] py-[12px] relative rounded-[10px]">
          <BubbleLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="break-words bg-neutral-100 rounded-[10px] px-[20px] py-[12px] w-full">
      <div 
        className="font-['Pretendard_Variable',_sans-serif] text-[#111111] prose prose-sm max-w-none"
        style={{
          fontSize: 'var(--paragraph-100-size)',
          fontWeight: 'var(--paragraph-100-regular)',
          lineHeight: 'var(--paragraph-100-line-height)',
          letterSpacing: 'var(--paragraph-100-letter-spacing)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
        }}
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }: any) => (
              <a 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0070FF] underline"
              />
            ),
            ul: ({ node, ...props }: any) => (
              <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }} {...props} />
            ),
            ol: ({ node, ...props }: any) => (
              <ol style={{ paddingLeft: '1rem', listStyleType: 'decimal' }} {...props} />
            ),
            li: ({ node, ...props }: any) => (
              <li style={{ margin: '0.25rem 0' }} {...props} />
            ),
            img: ({ node, ...props }: any) => (
              <img 
                {...props} 
                className="h-[200px] shrink-0 w-full object-cover rounded-[6px] mt-[12px]"
                alt={props.alt || ''}
              />
            ),
          }}
        >
          {answer.replace(/\\n/g, '\n')}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function ChatView({ messages, scrollContainerRef, isToggling }: { messages: Message[]; scrollContainerRef?: React.RefObject<HTMLDivElement>; isToggling?: boolean }) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

  useEffect(() => {
    // Only auto-scroll to bottom when new messages are added, not when toggling
    const hasNewMessage = messages.length > prevMessagesLengthRef.current;
    
    if (hasNewMessage && !isToggling) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages, isToggling]);

  return (
    <>
      <div ref={scrollContainerRef} className="relative flex-1 w-full overflow-auto floating-scrollbar" data-name="text">
        <div className="flex flex-col items-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[32px] items-center p-[20px] relative w-full">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col gap-[32px] w-full">
                <QuestionBubble question={message.question} />
                <AnswerBubble answer={message.answer} isLoading={message.isLoading} />
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}

function InitialView({ onFaqClick }: { onFaqClick: (question: string) => void }) {
  return (
    <div className="relative flex-1 w-full overflow-auto floating-scrollbar" data-name="text">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center justify-end px-[20px] py-[120px] relative w-full">
          <Head />
          <Faq onFaqClick={onFaqClick} />
        </div>
      </div>
    </div>
  );
}


function IcArrowNarrowUpButton() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g id="ic-arrow-narrow-up">
        <path clipRule="evenodd" d={svgPaths.p2ffcfc80} fill="var(--fill-0, white)" fillRule="evenodd" id="icon" />
      </g>
    </svg>
  );
}

function IcArrowNarrowUp1Button() {
  return (
    <div className="absolute inset-0" data-name="ic-arrow-narrow-up">
      <IcArrowNarrowUpButton />
    </div>
  );
}

function IcArrowNarrowUp2Button() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic-arrow-narrow-up">
      <IcArrowNarrowUp1Button />
    </div>
  );
}

function IcSizeButton() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="ic_size">
      <IcArrowNarrowUp2Button />
    </div>
  );
}

function ButtonSend({ hasText, onClick }: { hasText: boolean; onClick: () => void }) {
  return (
    <div 
      className="relative shrink-0 size-[30px] cursor-pointer hover:opacity-80 transition-opacity" 
      data-name="button-send"
      onClick={onClick}
    >
      <div className="absolute left-1/2 size-[30px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
          <circle 
            cx="15" 
            cy="15" 
            fill={hasText ? "#111111" : "#E1E1E1"} 
            id="Background" 
            r="15" 
            className="transition-colors"
          />
        </svg>
      </div>
      <IcSizeButton />
    </div>
  );
}

function Input({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  const hasText = value.trim().length > 0;
  
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="input">
      <div aria-hidden="true" className={`absolute border ${hasText ? 'border-[#afafaf]' : 'border-[lightgrey]'} border-solid inset-0 pointer-events-none rounded-[6px] transition-colors`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center px-[14px] py-0 relative size-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="무엇이 궁금하신가요?"
            className="basis-0 flex flex-col font-['Pretendard_Variable',_sans-serif] grow justify-center min-h-px min-w-px relative shrink-0 bg-transparent border-none outline-none w-full h-full"
            style={{
              fontSize: 'var(--paragraph-100-size)',
              fontWeight: 'var(--paragraph-100-regular)',
              lineHeight: 'var(--paragraph-100-line-height)',
              letterSpacing: 'var(--paragraph-100-letter-spacing)',
              color: '#111111'
            }}
          />
          <ButtonSend hasText={hasText} onClick={onSubmit} />
        </div>
      </div>
      <style>{`
        input::placeholder {
          color: #9e9e9e;
        }
      `}</style>
    </div>
  );
}






function Search({ onSubmit }: { onSubmit: (question: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div 
      className="bg-neutral-100 relative shrink-0 w-full h-[80px]" 
      data-name="search"
      onKeyPress={handleKeyPress}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[20px] py-[16px] relative size-full">
          <Input value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

interface ChatuiMainMaximizeProps {
  messages: Message[];
  onSubmit: (question: string) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  isToggling?: boolean;
  onBackToMain?: () => void;
  onClose?: () => void;
}

export default function ChatuiMainMaximize({ messages, onSubmit, scrollContainerRef, isToggling, onBackToMain, onClose }: ChatuiMainMaximizeProps) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center overflow-clip relative rounded-[6px] w-[680px] min-h-[668px] max-h-[760px]" data-name="chatui-main-maximize">
      <Header onBackClick={onBackToMain} showBackButton={messages.length > 0} isMaximized={true} onClose={onClose} />
      {messages.length === 0 ? (
        <InitialView onFaqClick={onSubmit} />
      ) : (
        <ChatView messages={messages} scrollContainerRef={scrollContainerRef} isToggling={isToggling} />
      )}
      <Search onSubmit={onSubmit} />
    </div>
  );
}
