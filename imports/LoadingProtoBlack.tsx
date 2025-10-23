function IcLoading() {
  return (
    <div className="relative size-full" data-name="ic-loading">
      <div className="absolute inset-[16.667%]" data-name="icon">
        <div className="block max-w-none size-full bg-gray-300 rounded-full animate-pulse" />
      </div>
      <div className="absolute inset-[73.33%_44.67%_16.67%_45.33%]" data-name="icon">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
          <ellipse cx="1.2" cy="1.2" fill="var(--fill-0, #111111)" id="icon" rx="1.2" ry="1.2" />
        </svg>
      </div>
    </div>
  );
}

export default function LoadingProtoBlack() {
  return (
    <div className="relative size-full" data-name="loading-proto-black">
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none size-[24px] animate-spin">
          <IcLoading />
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}