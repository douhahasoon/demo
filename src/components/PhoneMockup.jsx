import React, { forwardRef } from 'react';
import { Smartphone, Bell } from 'lucide-react';

const PhoneMockup = forwardRef(function PhoneMockup({ notifRef, appScreenRef, appOpened, appImg }, ref) {
  return (
    <div
      ref={ref}
      className="absolute w-[280px] h-[540px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-[44px] p-2 border-[6px] border-gray-800 shadow-[30px_40px_90px_rgba(0,0,0,0.95)] preserve-3d z-30"
    >
      {/* توهّج خلف الموبايل لإحساس عمق 3D */}
      <div className="absolute -inset-10 bg-blue-500/25 blur-[60px] rounded-full -z-10 pointer-events-none" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-40" />

      <div className="relative w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col">
        {/* انعكاس ضوئي قُطري على الشاشة */}
        <div className="absolute inset-0 z-40 pointer-events-none rounded-[36px] bg-[linear-gradient(125deg,_rgba(255,255,255,0.35)_0%,_rgba(255,255,255,0.05)_22%,_transparent_45%)]" />
        {/* شاشة التطبيق الفعلية */}
        <div ref={appScreenRef} className="absolute inset-0 z-30 bg-white opacity-0 translate-y-10 overflow-hidden">
          <img src={appImg} alt="تطبيق الرواتب" className="w-full h-auto object-top" />
        </div>
        {/* شاشة القفل قبل فتح التطبيق */}
        <div className={`w-full h-full pt-20 px-4 bg-slate-50 flex flex-col items-center transition-opacity ${appOpened ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-4 shadow-inner">
            <Smartphone className="w-8 h-8 text-blue-500" />
          </div>
          <div className="w-24 h-2 bg-slate-200 rounded-full mt-4" />
        </div>
      </div>

      {/* الإشعار */}
      <div ref={notifRef} className="absolute top-10 -left-6 -right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 z-50 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded bg-emerald-500 flex items-center justify-center text-white"><Bell className="w-4 h-4" /></div>
          <span className="text-xs text-gray-800 font-bold" style={{ direction: 'rtl' }}>نظام الرواتب والحوافز</span>
        </div>
        <p className="text-xs text-gray-600 font-medium leading-relaxed mb-3" style={{ direction: 'rtl' }}>
          تم إيداع حوافزك لهذا الشهر بنجاح، بناءً على التقييم والإنجاز.
        </p>
        <button className="notif-btn w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold shadow-sm">
          عرض الإشعار
        </button>
      </div>
    </div>
  );
});

export default PhoneMockup;
