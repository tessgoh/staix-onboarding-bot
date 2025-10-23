import svgPaths from "./svg-0avx7n7tvy";

function IcArrowNarrowUp() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g id="ic-arrow-narrow-up">
        <path clipRule="evenodd" d={svgPaths.p2ffcfc80} fill="var(--fill-0, white)" fillRule="evenodd" id="icon" />
      </g>
    </svg>
  );
}

function IcArrowNarrowUp1() {
  return (
    <div className="absolute inset-0" data-name="ic-arrow-narrow-up">
      <IcArrowNarrowUp />
    </div>
  );
}

function IcArrowNarrowUp2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic-arrow-narrow-up">
      <IcArrowNarrowUp1 />
    </div>
  );
}

function IcSize() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="ic_size">
      <IcArrowNarrowUp2 />
    </div>
  );
}

function ButtonSend() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="button-send">
      <div className="absolute left-1/2 size-[30px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Background">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
          <circle cx="15" cy="15" fill="var(--fill-0, #111111)" id="Background" r="15" />
        </svg>
      </div>
      <IcSize />
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#afafaf] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center px-[14px] py-0 relative size-full">
          <div className="basis-0 flex flex-col font-['Pretendard_Variable:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#111111] text-[14px]">
            <p className="leading-[20px]">멤버 초대는 어떻게 해?</p>
          </div>
          <ButtonSend />
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <div className="bg-neutral-100 relative size-full" data-name="search">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start px-[20px] py-[16px] relative size-full">
          <Input />
        </div>
      </div>
    </div>
  );
}