import React from 'react';

// خلفية «matte glass» راقية — كتل لونية ضبابية متحركة + شبكة خفيفة، بدون أي iframe خارجي
export default function GlassBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#05070e]">
      <div className="absolute -top-40 -left-24 w-[42rem] h-[42rem] rounded-full bg-blue-600/25 blur-[130px] blob-a" />
      <div className="absolute top-1/4 -right-32 w-[38rem] h-[38rem] rounded-full bg-purple-600/20 blur-[130px] blob-b" />
      <div className="absolute -bottom-40 left-1/3 w-[36rem] h-[36rem] rounded-full bg-emerald-500/15 blur-[130px] blob-c" />

      {/* شبكة دقيقة */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      {/* فينييت لتعميق الحواف */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,7,14,0.6)_75%,_#05070e_100%)]" />
    </div>
  );
}
