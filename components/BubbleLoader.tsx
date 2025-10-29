export default function BubbleLoader() {
  return (
    <div className="h-[24px] w-[26px] flex items-center justify-center shrink-0">
      <svg width="26" height="24" fill="none" viewBox="0 0 26 24">
        <g>
          <circle 
            cx="3" 
            cy="12" 
            r="3" 
            fill="#9E9E9E"
            style={{
              animation: 'bounceLoader 1.2s ease-in-out infinite',
              animationDelay: '0ms',
            }}
          />
          <circle 
            cx="13" 
            cy="12" 
            r="3" 
            fill="#9E9E9E"
            style={{
              animation: 'bounceLoader 1.2s ease-in-out infinite',
              animationDelay: '200ms',
            }}
          />
          <circle 
            cx="23" 
            cy="12" 
            r="3" 
            fill="#9E9E9E"
            style={{
              animation: 'bounceLoader 1.2s ease-in-out infinite',
              animationDelay: '400ms',
            }}
          />
        </g>
      </svg>
      <style>{`
        @keyframes bounceLoader {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
