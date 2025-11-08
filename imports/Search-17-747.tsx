import svgPaths from "./svg-wmj9e7nhnd";

function IcSendFilled() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ic-send-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ic-send-filled">
          <path d={svgPaths.pd40dc00} fill="var(--fill-0, #00AB7F)" id="icon" />
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
          <div className="basis-0 flex flex-col font-['Pretendard_Variable:Regular',_sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#111111] text-[14px]">
            <p className="leading-[20px]">멤버 초대는 어떻게 해?</p>
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