import svgPaths from "./svg-prne5ocek4";

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border border-[lightgrey] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[40px] items-center px-[14px] py-[10px] relative w-full">
          <div className="basis-0 flex flex-col font-['Pretendard_Variable:Regular',_sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#111111] text-[14px]">
            <p className="leading-[20px]">텍스트 입력했을 때</p>
          </div>
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

function Component() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="도움말">
      <div className="absolute left-0 size-[40px] top-0">
        <div className="absolute bottom-[-25%] left-[-12.5%] right-[-12.5%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
            <g filter="url(#filter0_d_3_860)" id="Ellipse 233">
              <circle cx="25" cy="20" fill="var(--fill-0, #111111)" r="20" />
              <circle cx="25" cy="20" fill="var(--fill-1, black)" fillOpacity="0.2" r="20" />
              <circle cx="25" cy="20" fill="var(--fill-2, black)" fillOpacity="0.2" r="20" />
              <circle cx="25" cy="20" fill="var(--fill-3, black)" fillOpacity="0.2" r="20" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="50" id="filter0_d_3_860" width="50" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 0.2 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_3_860" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_3_860" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <IcSize />
    </div>
  );
}

export default function SearchInput() {
  return (
    <div className="bg-neutral-100 relative size-full" data-name="search-input">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start p-[20px] relative size-full">
          <Input1 />
          <Component />
        </div>
      </div>
    </div>
  );
}