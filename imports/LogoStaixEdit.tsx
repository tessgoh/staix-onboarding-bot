function Left() {
  return (
    <div className="absolute bottom-[42.5%] contents left-0 right-[80%] top-[42.5%]" data-name="left">
      <div className="absolute inset-0 bg-blue-500 rounded-sm" />
    </div>
  );
}

function Down() {
  return (
    <div className="absolute bottom-0 contents left-[42.5%] right-[42.5%] top-[80%]" data-name="down">
      <div className="absolute inset-0 bg-blue-500 rounded-sm" />
    </div>
  );
}

function Right() {
  return (
    <div className="absolute bottom-[42.5%] contents left-[80%] right-0 top-[42.5%]" data-name="right">
      <div className="absolute inset-0 bg-blue-500 rounded-sm" />
    </div>
  );
}

function Up() {
  return (
    <div className="absolute bottom-[80%] contents left-[42.5%] right-[42.5%] top-0" data-name="up">
      <div className="absolute inset-0 bg-blue-500 rounded-sm" />
    </div>
  );
}

function X() {
  return (
    <div className="absolute contents inset-[16.74%]" data-name="X">
      <div className="absolute inset-0 bg-blue-500 rounded-full" />
    </div>
  );
}

export default function LogoStaixEdit() {
  return (
    <div className="relative size-full" data-name="logo-staix-edit">
      <div className="animate-fade-up size-full">
        <Up />
      </div>
      <div className="animate-fade-right size-full">
        <Right />
      </div>
      <div className="animate-fade-down size-full">
        <Down />
      </div>
      <div className="animate-fade-left size-full">
        <Left />
      </div>
      <div className="size-full">
        <X />
      </div>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          25% { opacity: 1; }
        }
        .animate-fade-up {
          animation: fadeInOut 1.2s ease-in-out infinite;
          animation-delay: 0s;
        }
        .animate-fade-right {
          animation: fadeInOut 1.2s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        .animate-fade-down {
          animation: fadeInOut 1.2s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .animate-fade-left {
          animation: fadeInOut 1.2s ease-in-out infinite;
          animation-delay: 0.9s;
        }
      `}</style>
    </div>
  );
}