import svgPaths from "./svg-fg9vu2mkul";

function Frame377105() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center leading-[0] relative shrink-0 text-center text-nowrap">
      <div className="flex flex-col font-['Pretendard_Variable:SemiBold',_sans-serif] font-semibold justify-center leading-[32px] relative shrink-0 text-[#090909] text-[24px] whitespace-pre">
        <p className="mb-0">사용법이 궁금할 땐</p>
        <p>언제든 물어보세요</p>
      </div>
      <div className="flex flex-col font-['Pretendard_Variable:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#6e6e6e] text-[13px]">
        <p className="leading-[19px] text-nowrap whitespace-pre">대화로 배우는 Staix 사용 가이드</p>
      </div>
    </div>
  );
}

function IcShare() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="ic-share">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="ic-share">
          <path d={svgPaths.p3bcb5140} fill="var(--fill-0, #0070FF)" id="Icon (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function IcSize() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start justify-center relative shrink-0 w-[12px]" data-name="ic_size">
      <IcShare />
    </div>
  );
}

function GuideLink() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-0 py-[4px] relative rounded-[6px] shrink-0" data-name="guide link">
      <div className="flex flex-col font-['Pretendard_Variable:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0070ff] text-[12px] text-center text-nowrap">
        <p className="leading-[18px] whitespace-pre">Staix 사용 가이드 바로가기</p>
      </div>
      <IcSize />
    </div>
  );
}

export default function Head() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-end relative rounded-[6px] size-full" data-name="head">
      <Frame377105 />
      <GuideLink />
    </div>
  );
}