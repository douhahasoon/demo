import React, { useState } from 'react';
import { Zap, MousePointer2 } from 'lucide-react';
import Logos from './Logos';
import Copyright from './Copyright';

export default function Hero({ onStart }) {
  const [launching, setLaunching] = useState(false);

  const handleLaunch = () => {
    if (launching) return;
    setLaunching(true);
    try { new Audio('https://assets.mixkit.co/active_storage/sfx/2997/2997-preview.mp3').play(); } catch (e) {}
    setTimeout(onStart, 700); // وميض ثم الانتقال للنظام
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(226,232,242,0.5)_60%,_#e2e8f2_100%)]" />

      {/* وميض الإطلاق */}
      {launching && <div className="launch-flash absolute inset-0 bg-white z-50 pointer-events-none" />}

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* الشعارات بدل أيقونة الشريحة */}
        <Logos size="lg" className="a-pop justify-center mb-10" style={{ animationDelay: '0.05s' }} />

        <h1 className="text-3xl md:text-6xl font-black leading-[1.4] mb-4" style={{ direction: 'rtl' }}>
          <span className="block overflow-hidden py-3">
            <span className="a-reveal inline-block leading-[1.4] bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-blue-700" style={{ animationDelay: '0.15s' }}>
              نظام الحوافز الرقمي الجديد
            </span>
          </span>
        </h1>

        <p className="a-fadeup text-slate-500 max-w-xl text-base md:text-lg mb-12" style={{ animationDelay: '0.5s', direction: 'rtl' }}>
          منصة رقمية متكاملة لإدارة الحوافز بكفاءة وشفافية
        </p>

        {/* زر الإطلاق + المؤشّر الرقمي */}
        <div className="a-pop relative" style={{ animationDelay: '0.75s' }}>
          <button
            onClick={handleLaunch}
            className="btn-press relative px-12 py-5 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_10px_40px_rgba(37,99,235,0.5)] hover:shadow-[0_14px_50px_rgba(37,99,235,0.7)]"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg font-black text-white tracking-wide">
              <Zap className="w-5 h-5" /> إطلاق النظام
            </span>
            {launching && <span className="launch-ripple absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-blue-400" />}
          </button>

          {!launching && (
            <MousePointer2 className="launch-cursor absolute -bottom-2 left-8 w-7 h-7 text-slate-700 drop-shadow-lg" fill="white" />
          )}
        </div>
      </div>

      {/* الحقوق */}
      <Copyright className="a-fadeup absolute bottom-6 left-1/2 -translate-x-1/2" />
    </div>
  );
}
