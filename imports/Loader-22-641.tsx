function Frame377104() {
  return (
    <div className="h-[24px] relative shrink-0 w-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
        <g id="Frame 377104">
          <circle cx="3" cy="12" fill="var(--fill-0, #9E9E9E)" id="Ellipse 235" r="3" />
          <circle cx="13" cy="12" fill="var(--fill-0, #9E9E9E)" id="Ellipse 236" r="3" />
          <circle cx="23" cy="12" fill="var(--fill-0, #9E9E9E)" id="Ellipse 237" r="3" />
        </g>
      </svg>
    </div>
  );
}

export default function Loader() {
  return (
    <div className="bg-neutral-100 relative rounded-[10px] size-full" data-name="loader">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start overflow-clip px-[20px] py-[12px] relative size-full">
          <Frame377104 />
        </div>
      </div>
    </div>
  );
}