import svgPaths from "./svg-hanw92ky9i";

function IcChevronLeft() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g id="ic-chevron-left">
        <path clipRule="evenodd" d={svgPaths.p306c4d80} fill="var(--fill-0, #111111)" fillRule="evenodd" id="icon" />
      </g>
    </svg>
  );
}

function IcChevronLeft1() {
  return (
    <div className="absolute inset-0" data-name="ic-chevron-left">
      <IcChevronLeft />
    </div>
  );
}

function IcChevronLeft2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ic-chevron-left">
      <IcChevronLeft1 />
    </div>
  );
}

function IcSize() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="ic_size">
      <IcChevronLeft2 />
    </div>
  );
}

function Logo() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_22_478)" id="logo">
          <g id="vector">
            <path d="M10.2 0H13.8V4.8H10.2V0Z" fill="var(--fill-0, #111111)" />
            <path d="M24 10.2H19.2V13.8H24V10.2Z" fill="var(--fill-0, #111111)" />
            <path d={svgPaths.p26f49000} fill="var(--fill-0, #111111)" />
            <path d="M4.8 10.2H0V13.8H4.8V10.2Z" fill="var(--fill-0, #111111)" />
            <path d={svgPaths.p31397c40} fill="var(--fill-0, #111111)" />
            <path d={svgPaths.p2e0bf80} fill="var(--fill-0, #111111)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_22_478">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoDiv() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="logo-div">
      <Logo />
      <div className="flex flex-col font-['Pretendard_Variable:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#111111] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Staix 사용 가이드</p>
      </div>
    </div>
  );
}

function Frame377103() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <IcSize />
      <LogoDiv />
    </div>
  );
}

function IcMaximize() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic-maximize">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic-maximize">
          <path d={svgPaths.p3d849100} id="Icon" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function IcSize1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="ic_size">
      <IcMaximize />
    </div>
  );
}

function IcClose() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g id="ic-close">
        <g id="icon">
          <path clipRule="evenodd" d={svgPaths.pc3e4b00} fill="var(--fill-0, #111111)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pc3e4b00} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pc3e4b00} fill="var(--fill-2, black)" fillOpacity="0.2" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pc3e4b00} fill="var(--fill-3, black)" fillOpacity="0.2" fillRule="evenodd" />
        </g>
      </g>
    </svg>
  );
}

function IcClose1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic-close">
      <IcClose />
    </div>
  );
}

function IcSize2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="ic_size">
      <IcClose1 />
    </div>
  );
}

function Frame377022() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <IcSize1 />
      <IcSize2 />
    </div>
  );
}

export default function Header() {
  return (
    <div className="relative rounded-[6px] size-full" data-name="header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[40px] py-[18px] relative size-full">
          <Frame377103 />
          <Frame377022 />
        </div>
      </div>
    </div>
  );
}