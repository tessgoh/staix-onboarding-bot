import svgPaths from "./svg-ic4zwh3etf";

function IcMinimize() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic-minimize">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic-minimize">
          <path d={svgPaths.p10022480} id="Icon" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

export default function IcSize() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full" data-name="ic_size">
      <IcMinimize />
    </div>
  );
}