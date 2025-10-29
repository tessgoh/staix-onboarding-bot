import svgPaths from "./svg-d8a4bpxrqk";

function IcSendFilled() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ic-send-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ic-send-filled">
          <path d={svgPaths.pd40dc00} fill="var(--fill-0, #9E9E9E)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[lightgrey] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[40px] items-center px-[14px] py-[10px] relative w-full">
          <div className="basis-0 flex flex-col font-['Pretendard_Variable:Regular',_sans-serif] font-normal grow h-[20px] justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#9e9e9e] text-[14px] text-nowrap">
            <p className="[white-space-collapse:collapse] leading-[20px] overflow-ellipsis overflow-hidden">무엇이 궁금하신가요?</p>
          </div>
          <IcSendFilled />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="input">
      <Input />
    </div>
  );
}

export default function Search() {
  return (
    <div className="bg-neutral-100 relative size-full" data-name="search">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start p-[20px] relative size-full">
          <Input1 />
        </div>
      </div>
    </div>
  );
}