import { useState, useRef, useEffect } from "react";
import svgPaths from "./svg-npkfhtmpf5";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import BubbleLoader from "../components/BubbleLoader";
import Header from "./Header";

interface Message {
  question: string;
  answer: string;
  isLoading?: boolean;
}

function IcMaximize() {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="ic-maximize"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="ic-maximize">
          <path
            d={svgPaths.p3d80db00}
            id="Icon"
            stroke="var(--stroke-0, black)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  );
}

function IcSize() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0"
      data-name="ic_size"
    >
      <IcMaximize />
    </div>
  );
}

function IcClose() {
  return (
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
    >
      <g id="ic-close">
        <g id="icon">
          <path
            clipRule="evenodd"
            d={svgPaths.pc3e4b00}
            fill="var(--fill-0, #111111)"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.pc3e4b00}
            fill="var(--fill-1, black)"
            fillOpacity="0.2"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.pc3e4b00}
            fill="var(--fill-2, black)"
            fillOpacity="0.2"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.pc3e4b00}
            fill="var(--fill-3, black)"
            fillOpacity="0.2"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
}

function IcClose1() {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="ic-close"
    >
      <IcClose />
    </div>
  );
}

function IcSize1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0"
      data-name="ic_size"
    >
      <IcClose1 />
    </div>
  );
}

function Frame377022() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <IcSize />
      <IcSize1 />
    </div>
  );
}

function IcShare() {
  return (
    <div
      className="relative shrink-0 size-[16px]"
      data-name="ic-share"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="ic-share">
          <path
            d={svgPaths.p2532a180}
            fill="var(--fill-0, #0070FF)"
            id="Icon (Stroke)"
          />
        </g>
      </svg>
    </div>
  );
}

function IcSize2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0"
      data-name="ic_size"
    >
      <IcShare />
    </div>
  );
}

function Content() {
  const handleClick = () => {
    window.open(
      "https://letsur.notion.site/Staix-10ba0be0969d80369671eb23f3489109",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      onClick={handleClick}
      className="box-border content-stretch flex gap-[4px] items-center justify-center px-0 py-[4px] relative rounded-[6px] shrink-0 cursor-pointer group"
      data-name="guide link"
    >
      <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#0070ff] text-center text-nowrap">
        <p
          className="whitespace-pre group-hover:underline transition-all"
          style={{
            fontSize: "var(--caption-100-size)",
            fontWeight: "var(--caption-100-regular)",
            lineHeight: "var(--caption-100-line-height)",
            letterSpacing: "var(--caption-100-letter-spacing)",
          }}
        >
          Staix 사용 가이드 바로가기
        </p>
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
    <div
      onClick={onClick}
      className="relative rounded-[30px] shrink-0 hover:bg-[#e7faec] transition-colors cursor-pointer"
      data-name="FAQ03"
    >
      <div className="box-border content-stretch flex gap-[116px] items-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit]">
        <div
          className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#00ab7f] text-nowrap"
          style={{
            fontSize: "var(--paragraph-100-size)",
            fontWeight: "var(--paragraph-100-regular)",
            letterSpacing:
              "var(--paragraph-100-letter-spacing)",
          }}
        >
          <p
            className="whitespace-pre"
            style={{
              fontSize: "var(--paragraph-100-size)",
              fontWeight: "var(--paragraph-100-regular)",
              lineHeight: "var(--paragraph-100-line-height)",
              letterSpacing:
                "var(--paragraph-100-letter-spacing)",
            }}
          >
            멤버 초대는 어떻게 해?
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#00ab7f] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[30px]"
      />
    </div>
  );
}

function Faq01({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-[30px] shrink-0 hover:bg-[#e7faec] transition-colors cursor-pointer"
      data-name="FAQ01"
    >
      <div className="box-border content-stretch flex gap-[116px] items-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit]">
        <div
          className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#00ab7f] text-nowrap"
          style={{
            fontSize: "var(--paragraph-100-size)",
            fontWeight: "var(--paragraph-100-regular)",
            letterSpacing:
              "var(--paragraph-100-letter-spacing)",
          }}
        >
          <p
            className="whitespace-pre"
            style={{
              fontSize: "var(--paragraph-100-size)",
              fontWeight: "var(--paragraph-100-regular)",
              lineHeight: "var(--paragraph-100-line-height)",
              letterSpacing:
                "var(--paragraph-100-letter-spacing)",
            }}
          >
            AI 게이트웨이 역할에 대해 알려줘
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#00ab7f] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[30px]"
      />
    </div>
  );
}

function Faq04Hover({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-[30px] shrink-0 hover:bg-[#e7faec] transition-colors cursor-pointer"
      data-name="FAQ04 (hover)"
    >
      <div className="box-border content-stretch flex gap-[116px] items-center overflow-clip px-[20px] py-[12px] relative rounded-[inherit]">
        <div
          className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#00ab7f] text-nowrap"
          style={{
            fontSize: "var(--paragraph-100-size)",
            fontWeight: "var(--paragraph-100-regular)",
            letterSpacing:
              "var(--paragraph-100-letter-spacing)",
          }}
        >
          <p
            className="whitespace-pre"
            style={{
              fontSize: "var(--paragraph-100-size)",
              fontWeight: "var(--paragraph-100-regular)",
              lineHeight: "var(--paragraph-100-line-height)",
              letterSpacing:
                "var(--paragraph-100-letter-spacing)",
            }}
          >
            결제 수단 등록에 대해 알려줘
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#00ab7f] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[30px]"
      />
    </div>
  );
}

function Faq({
  onFaqClick,
}: {
  onFaqClick: (question: string) => void;
}) {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0"
      data-name="FAQ"
    >
      <Faq03
        onClick={() => onFaqClick("멤버 초대는 어떻게 해?")}
      />
      <Faq01
        onClick={() =>
          onFaqClick("AI 게이트웨이 역할에 대해 알려줘")
        }
      />
      <Faq04Hover
        onClick={() =>
          onFaqClick("결제 수단 등록에 대해 알려줘")
        }
      />
    </div>
  );
}

function QuestionBubble({ question }: { question: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end justify-center relative shrink-0 w-full">
      <div className="bg-[#00c781] box-border content-stretch flex gap-[4px] items-center px-[20px] py-[12px] relative rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px] max-w-full">
        <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative text-white max-w-full">
          <p
            className="leading-[24px] whitespace-pre-wrap break-words max-w-full"
            style={{
              fontSize: "var(--paragraph-100-size)",
              fontWeight: "var(--paragraph-100-semibold)",
              lineHeight: "var(--paragraph-100-line-height)",
              letterSpacing:
                "var(--paragraph-100-letter-spacing)",
            }}
          >
            {question}
          </p>
        </div>
      </div>
    </div>
  );
}

function AnswerBubble({
  answer,
  isLoading,
}: {
  answer: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <div className="bg-neutral-100 box-border content-stretch flex gap-[4px] items-center px-[20px] py-[12px] relative rounded-[10px]">
          <BubbleLoader />
        </div>
      </div>
    );
  }

  // Check if answer contains image URL
  const hasImage = answer.includes('http') && (answer.includes('.jpg') || answer.includes('.jpeg') || answer.includes('.png') || answer.includes('.gif') || answer.includes('.webp'));
  
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-neutral-100 relative rounded-[10px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[12px] relative w-full">
            <div
              className="font-['Pretendard_Variable',_sans-serif] relative shrink-0 text-[#111111] w-full break-words whitespace-pre-wrap"
              style={{
                fontSize: "var(--paragraph-100-size)",
                fontWeight: "var(--paragraph-100-regular)",
                lineHeight: "var(--paragraph-100-line-height)",
                letterSpacing:
                  "var(--paragraph-100-letter-spacing)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
              dangerouslySetInnerHTML={{
                __html: answer
                  .replace(/\\n/g, '\n')
                  .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #0070FF; text-decoration: underline;">$1</a>')
              }}
            />
            {hasImage && (
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1658552963426-1083cf9c495e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkaWdpdGFsfGVufDF8fHx8MTc2MTA0Nzk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Answer illustration"
                className="h-[137px] shrink-0 w-full object-cover rounded-[6px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatView({
  messages,
  scrollContainerRef,
  isToggling,
}: {
  messages: Message[];
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  isToggling?: boolean;
}) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

  useEffect(() => {
    // Only auto-scroll to bottom when new messages are added, not when toggling
    const hasNewMessage =
      messages.length > prevMessagesLengthRef.current;

    if (hasNewMessage && !isToggling) {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, isToggling]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative flex-1 w-full overflow-auto"
      data-name="text"
    >
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center p-[20px] relative w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex flex-col gap-[32px] w-full"
            >
              <QuestionBubble question={message.question} />
              <AnswerBubble
                answer={message.answer}
                isLoading={message.isLoading}
              />
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}

function InitialView({
  onFaqClick,
}: {
  onFaqClick: (question: string) => void;
}) {
  return (
    <div
      className="relative flex-1 w-full overflow-auto"
      data-name="text"
    >
      <div className="flex flex-col items-center justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center justify-end px-[20px] py-[120px] relative w-full">
          <Head />
          <Faq onFaqClick={onFaqClick} />
        </div>
      </div>
    </div>
  );
}

function IcSendFilled({ hasText }: { hasText: boolean }) {
  const iconColor = hasText ? "#00AB7F" : "#9E9E9E";

  return (
    <div
      className="relative shrink-0 size-[20px] transition-transform hover:scale-110 cursor-pointer"
      data-name="ic-send-filled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="ic-send-filled">
          <path
            d="M10.6789 10.1644L4.40287 11.2104C4.25587 11.2349 4.13315 11.3361 4.08103 11.4757L1.91611 17.2735C1.70888 17.8064 2.26674 18.3147 2.77812 18.059L17.7781 10.559C18.2388 10.3287 18.2388 9.67134 17.7781 9.44101L2.77812 1.94101C2.26674 1.68532 1.70888 2.19368 1.91611 2.72656L4.08103 8.52438C4.13315 8.66399 4.25587 8.76512 4.40287 8.78962L10.6789 9.83563C10.7697 9.85076 10.831 9.93663 10.8159 10.0274C10.8042 10.0977 10.7491 10.1527 10.6789 10.1644Z"
            fill={iconColor}
            id="icon"
            className="transition-colors"
          />
        </g>
      </svg>
    </div>
  );
}

function IcArrowNarrowUpButton() {
  return (
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
    >
      <g id="ic-arrow-narrow-up">
        <path
          clipRule="evenodd"
          d={svgPaths.p2ffcfc80}
          fill="var(--fill-0, white)"
          fillRule="evenodd"
          id="icon"
        />
      </g>
    </svg>
  );
}

function IcArrowNarrowUp1Button() {
  return (
    <div
      className="absolute inset-0"
      data-name="ic-arrow-narrow-up"
    >
      <IcArrowNarrowUpButton />
    </div>
  );
}

function IcArrowNarrowUp2Button() {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="ic-arrow-narrow-up"
    >
      <IcArrowNarrowUp1Button />
    </div>
  );
}

function IcSizeButton() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[8px] items-start justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="ic_size"
    >
      <IcArrowNarrowUp2Button />
    </div>
  );
}

function ButtonSend({
  hasText,
  onClick,
}: {
  hasText: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="relative shrink-0 size-[30px] cursor-pointer hover:opacity-80 transition-opacity"
      data-name="button-send"
      onClick={onClick}
    >
      <div
        className="absolute left-1/2 size-[30px] top-1/2 translate-x-[-50%] translate-y-[-50%]"
        data-name="Background"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 30 30"
        >
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

function Input({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const hasText = value.trim().length > 0;

  return (
    <div
      className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[6px] shrink-0"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className={`absolute border ${hasText ? "border-[#afafaf]" : "border-[lightgrey]"} border-solid inset-0 pointer-events-none rounded-[6px] transition-colors`}
      />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center px-[14px] py-0 relative size-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="무엇이 궁금하신가요?"
            className="basis-0 flex flex-col font-['Pretendard_Variable',_sans-serif] grow justify-center min-h-px min-w-px relative shrink-0 bg-transparent border-none outline-none w-full h-full"
            style={{
              fontSize: "var(--paragraph-100-size)",
              fontWeight: "var(--paragraph-100-regular)",
              lineHeight: "var(--paragraph-100-line-height)",
              letterSpacing:
                "var(--paragraph-100-letter-spacing)",
              color: "#111111",
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

function IcArrowNarrowUp() {
  return (
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
    >
      <g id="ic-arrow-narrow-up">
        <path
          clipRule="evenodd"
          d={svgPaths.p2ffcfc80}
          fill="var(--fill-0, white)"
          fillRule="evenodd"
          id="icon"
        />
      </g>
    </svg>
  );
}

function IcArrowNarrowUp1() {
  return (
    <div
      className="absolute inset-0"
      data-name="ic-arrow-narrow-up"
    >
      <IcArrowNarrowUp />
    </div>
  );
}

function IcArrowNarrowUp2() {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="ic-arrow-narrow-up"
    >
      <IcArrowNarrowUp1 />
    </div>
  );
}

function IcSize3() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[8px] items-start justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none"
      data-name="ic_size"
    >
      <IcArrowNarrowUp2 />
    </div>
  );
}

function Component() {
  return (
    <div
      className="relative shrink-0 size-[40px]"
      data-name="도움말"
    >
      <div className="absolute left-0 size-[40px] top-0">
        <div className="absolute bottom-[-25%] left-[-12.5%] right-[-12.5%] top-0 hover:[&_circle:first-child]:fill-[#6E6E6E] transition-colors cursor-pointer">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 50 50"
          >
            <g id="Ellipse 233">
              <circle
                cx="25"
                cy="20"
                fill="var(--fill-0, #111111)"
                r="20"
                className="transition-colors"
              />
              <circle
                cx="25"
                cy="20"
                fill="var(--fill-1, black)"
                fillOpacity="0.2"
                r="20"
              />
              <circle
                cx="25"
                cy="20"
                fill="var(--fill-2, black)"
                fillOpacity="0.2"
                r="20"
              />
              <circle
                cx="25"
                cy="20"
                fill="var(--fill-3, black)"
                fillOpacity="0.2"
                r="20"
              />
            </g>
          </svg>
        </div>
      </div>
      <IcSize3 />
    </div>
  );
}

function Search({
  onSubmit,
}: {
  onSubmit: (question: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
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
          <Input
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

interface ChatuiMainMinimizeProps {
  messages: Message[];
  onSubmit: (question: string) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  isToggling?: boolean;
  onBackToMain?: () => void;
}

export default function ChatuiMainMinimize({
  messages,
  onSubmit,
  scrollContainerRef,
  isToggling,
  onBackToMain,
}: ChatuiMainMinimizeProps) {
  return (
    <div
      className="bg-white box-border content-stretch flex flex-col items-center overflow-clip relative rounded-[6px] w-[400px] min-h-[668px] max-h-[760px]"
      data-name="chatui-main-minimize"
    >
      <Header
        onBackClick={onBackToMain}
        showBackButton={messages.length > 0}
        isMaximized={false}
      />
      {messages.length === 0 ? (
        <InitialView onFaqClick={onSubmit} />
      ) : (
        <ChatView
          messages={messages}
          scrollContainerRef={scrollContainerRef}
          isToggling={isToggling}
        />
      )}
      <Search onSubmit={onSubmit} />
    </div>
  );
}