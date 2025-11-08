import svgPaths from "./svg-hanw92ky9i";
// removed unused icons

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

function IcSize({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 cursor-pointer"
      data-name="ic_size"
      onClick={onClick}
    >
      <div className="rounded-[6px] p-[4px] hover:bg-[#f1f1f1] transition-colors">
        <IcChevronLeft2 />
      </div>
    </div>
  );
}

// removed unused Logo component

function LogoDiv() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="logo-div">
      <div className="flex flex-col font-['Pretendard_Variable',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#111111] text-nowrap" style={{
        fontSize: 'var(--paragraph-200-size)',
        fontWeight: 'var(--paragraph-200-semibold)',
        lineHeight: 'var(--paragraph-200-line-height)',
        letterSpacing: 'var(--paragraph-200-letter-spacing)'
      }}>
        <p className="whitespace-pre" style={{ fontWeight: 'var(--paragraph-200-semibold)' }}>Staix 사용 가이드</p>
      </div>
    </div>
  );
}

function Frame377103({ onBackClick, showBackButton }: { onBackClick?: () => void; showBackButton?: boolean }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      {showBackButton && <IcSize onClick={onBackClick} />}
      <LogoDiv />
    </div>
  );
}

// removed unused maximize/minimize/close components and container

interface HeaderProps {
  onBackClick?: () => void;
  showBackButton?: boolean;
}

export default function Header({ onBackClick, showBackButton }: HeaderProps) {
  return (
    <div className="relative rounded-[6px] w-full h-[60px]" data-name="header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[20px] py-[18px] relative size-full">
          <Frame377103 onBackClick={onBackClick} showBackButton={showBackButton} />
        </div>
      </div>
    </div>
  );
}
