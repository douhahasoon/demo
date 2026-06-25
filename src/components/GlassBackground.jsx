import React from 'react';

// خلفية «matte glass» فاتحة — كتل لونية ضبابية ناعمة + شبكة خفيفة، بدون أي iframe خارجي
export default function GlassBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#eef2f8]">
      <div className="absolute -top-40 -left-24 w-[42rem] h-[42rem] rounded-full bg-blue-300/40 blur-[130px] blob-a" />
      <div className="absolute top-1/4 -right-32 w-[38rem] h-[38rem] rounded-full bg-purple-300/35 blur-[130px] blob-b" />
      <div className="absolute -bottom-40 left-1/3 w-[36rem] h-[36rem] rounded-full bg-emerald-300/30 blur-[130px] blob-c" />

      {/* شبكة دقيقة */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      {/* فينييت ناعم */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(226,232,242,0.6)_80%,_#e2e8f2_100%)]" />
    </div>
  );
}
