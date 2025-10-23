import { useState, useEffect } from "react";

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

export default function LogoStaixEditAnimated() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 200); // 200ms마다 프레임 전환 (0.8초에 한 사이클)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-full" data-name="logo-staix-edit-animated">
      {/* X는 항상 표시 */}
      <X />
      
      {/* 프레임 0: Up만 표시 */}
      {frame === 0 && <Up />}
      
      {/* 프레임 1: Right만 표시 */}
      {frame === 1 && <Right />}
      
      {/* 프레임 2: Down만 표시 */}
      {frame === 2 && <Down />}
      
      {/* 프레임 3: Left만 표시 */}
      {frame === 3 && <Left />}
    </div>
  );
}