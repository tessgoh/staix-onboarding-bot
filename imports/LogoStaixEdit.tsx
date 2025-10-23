import imgColor1 from "figma:asset/b2100066aa8b95f5859d379e69dfbb4f65a72964.png";
import { imgColor, imgColor2, imgColor3 } from "./svg-xwh72";

function Left() {
  return (
    <div className="absolute bottom-[42.5%] contents left-0 right-[80%] top-[42.5%]" data-name="left">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_6.8px] mask-size-[3.2px_2.4px]" data-name="color" style={{ maskImage: `url('${imgColor}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColor1} />
      </div>
    </div>
  );
}

function Down() {
  return (
    <div className="absolute bottom-0 contents left-[42.5%] right-[42.5%] top-[80%]" data-name="down">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[6.8px_12.8px] mask-size-[2.4px_3.2px]" data-name="color" style={{ maskImage: `url('${imgColor2}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColor1} />
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="absolute bottom-[42.5%] contents left-[80%] right-0 top-[42.5%]" data-name="right">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.8px_6.8px] mask-size-[3.2px_2.4px]" data-name="color" style={{ maskImage: `url('${imgColor}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColor1} />
      </div>
    </div>
  );
}

function Up() {
  return (
    <div className="absolute bottom-[80%] contents left-[42.5%] right-[42.5%] top-0" data-name="up">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[6.8px_0px] mask-size-[2.4px_3.2px]" data-name="color" style={{ maskImage: `url('${imgColor2}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColor1} />
      </div>
    </div>
  );
}

function X() {
  return (
    <div className="absolute contents inset-[16.74%]" data-name="X">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2.679px] mask-size-[10.642px_10.642px]" data-name="color" style={{ maskImage: `url('${imgColor3}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColor1} />
      </div>
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