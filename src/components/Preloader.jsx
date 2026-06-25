import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('جاري تهيئة البيانات...');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100, duration: 3, ease: 'power2.inOut',
        onUpdate: () => {
          setProgress(Math.floor(obj.val));
          if (obj.val > 40) setLoadingText('مزامنة بيانات الشركة العامة للاتصالات...');
          if (obj.val > 80) setLoadingText('جاهز للإطلاق...');
        },
        onComplete: () => {
          gsap.timeline({ onComplete: onDone })
            .to('.preloader-inner', { opacity: 0, y: -24, filter: 'blur(6px)', duration: 0.8, ease: 'power2.in' })
            .to('.preloader-wrap', { opacity: 0, duration: 0.5 }, '-=0.3');
        },
      });
    });
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="preloader-wrap absolute inset-0 z-30 flex flex-col items-center justify-center text-slate-800 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.4)_0%,_rgba(226,232,242,0.7)_70%,_#e2e8f2_100%)]">
      <div className="preloader-inner flex flex-col items-center">
        {/* علامة المنظومة */}
        <div className="text-xs md:text-sm tracking-[0.35em] text-blue-600/70 mb-6 uppercase" style={{ direction: 'rtl' }}>
          منظومة الحوافز · ITPC
        </div>

        {/* النسبة الكبيرة */}
        <div className="flex items-start leading-none">
          <span className="text-[120px] md:text-[150px] font-black bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-600">
            {progress}
          </span>
          <span className="text-3xl md:text-4xl font-bold text-purple-500 mt-4">%</span>
        </div>

        {/* شريط التقدّم */}
        <div className="w-60 md:w-72 h-[3px] bg-slate-900/10 rounded-full overflow-hidden mt-3 mb-6">
          <div
            className="h-full w-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left', transition: 'transform 100ms linear' }}
          />
        </div>

        {/* نص الحالة */}
        <div className="text-xs tracking-widest text-slate-500 animate-pulse" style={{ direction: 'rtl' }}>
          {loadingText}
        </div>
      </div>
    </div>
  );
}
