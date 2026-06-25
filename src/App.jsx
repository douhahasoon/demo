import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Cpu, Zap, Bell, Sparkles, Info, ShieldCheck, Clock, BarChart3, Smartphone, CheckCircle2 } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function App() {
  const [stage, setStage] = useState('preloader'); 
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [appOpened, setAppOpened] = useState(false);
  const [employees, setEmployees] = useState(0);
  const [points, setPoints] = useState(0);

  const containerRef = useRef(null);
  const laptopRef = useRef(null);
  const phoneRef = useRef(null);
  const notifRef = useRef(null);
  const popupRef = useRef(null);

  // شاشة التحميل
  useEffect(() => {
    if (stage !== 'preloader') return;
    const tl = gsap.timeline();
    tl.to({val: 0}, {
      val: 100, duration: 2.5, onUpdate: function() { setProgress(Math.floor(this.targets()[0].val)) },
      onComplete: () => {
        gsap.to('.preloader-wrap', { opacity: 0, duration: 1, onComplete: () => setStage('hero') });
      }
    });
  }, [stage]);

  const startPresentation = () => {
    setStage('presentation');
    setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // إخفاء العناصر أولاً
      gsap.set([laptopRef.current, phoneRef.current, popupRef.current, notifRef.current], { opacity: 0 });
      gsap.set('.celebration-text', { opacity: 0, scale: 0.8 });

      // 1. ظهور اللابتوب الأول (يمين) والنص (يسار)
      tl.to(laptopRef.current, { opacity: 1, y: 0, x: "15vw", duration: 1 })
        .to('.laptop-text-1', { opacity: 1, x: 0, duration: 1 }, "-=0.5")
        
        // 2. ظهور البوب-أب التوضيحي (بدون أكشن)
        .to(popupRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" })
        .to({}, { duration: 1.5 }) 
        .to(popupRef.current, { opacity: 0, scale: 0.8, duration: 0.5 })

        // 3. الانتقال للابتوب الثاني (يسار)
        .to([laptopRef.current, '.laptop-text-1'], { opacity: 0, duration: 0.5 })
        .set('.content-1', { display: 'none' })
        .set('.content-2', { display: 'flex' })
        .to(laptopRef.current, { x: "-15vw", opacity: 1, duration: 1 })
        .to('.laptop-text-2', { opacity: 1, x: 0, duration: 1 }, "-=0.5")
        
        // أنميشن الأرقام
        .to({}, {
          duration: 1.5,
          onStart: () => {
            gsap.to({val: 0}, { val: 14250, duration: 1.5, onUpdate: function() { setEmployees(Math.floor(this.targets()[0].val)) }});
            gsap.to({val: 0}, { val: 98.5, duration: 1.5, onUpdate: function() { setPoints(this.targets()[0].val.toFixed(1)) }});
          }
        })
        .to('.deposit-btn', { scale: 0.95, backgroundColor: "#16a34a", color:"white", duration: 0.3, yoyo: true, repeat: 1 }, "+=0.5")

        // 4. الانتقال للموبايل (بعد إخفاء اللابتوب)
        .to([laptopRef.current, '.laptop-text-2'], { opacity: 0, duration: 0.5 })
        .to(phoneRef.current, { opacity: 1, x: "-18vw", duration: 1 })
        .to('.promo-text', { opacity: 1, x: 0, duration: 1 }, "-=0.5")
        
        // 5. الإشعار + الشرايط + العبارة الخلفية
        .to(notifRef.current, { 
            opacity: 1, y: 0, scale: 1.15, duration: 0.6, ease: "back.out(1.5)",
            onStart: () => {
                setShowConfetti(true);
                try { new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play(); } catch(e) {}
            }
        })
        .to('.celebration-text', { opacity: 0.4, scale: 1, duration: 1 }, "<")
        .to('.notif-btn', { scale: 0.95, yoyo: true, repeat: 1, duration: 0.2, delay: 1.5, onComplete: () => setAppOpened(true) });

    }, 50);
  };

  return (
    <div className="w-full h-screen bg-[#05070e] text-white flex items-center justify-center overflow-hidden relative">
      
      {/* شرايط الاحتفال خلف العناصر */}
      {showConfetti && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Player src="https://lottie.host/80678eb1-fb45-4ed3-a309-8ff43fc4627d/W0r2eWk98v.json" autoplay keepLastFrame style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      {/* عبارة الإيداع الخلفية */}
      <div className="celebration-text absolute z-0 text-center w-full pointer-events-none opacity-0" style={{ top: '15%' }}>
        <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-400/20 to-blue-500/5">تم إيداع الحوافز</h1>
      </div>

      {stage === 'preloader' && (
        <div className="preloader-wrap fixed inset-0 bg-[#02040a] z-50 flex items-center justify-center text-6xl font-bold font-mono text-blue-500">
          {progress}%
        </div>
      )}
      
      {stage === 'hero' && (
        <div className="z-50 text-center flex flex-col items-center">
          <Cpu className="w-16 h-16 text-blue-500 mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold mb-8">الشركة العامة للاتصالات والمعلوماتية</h1>
          <button onClick={startPresentation} className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-300" /> بدء الإطلاق
          </button>
        </div>
      )}

      {stage === 'presentation' && (
        <div ref={containerRef} className="relative w-full max-w-6xl h-[600px] flex items-center justify-center z-10">
            
            {/* نصوص المشهد الأول */}
            <div className="laptop-text-1 absolute left-[5%] text-right w-80 opacity-0">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 ml-auto"><Clock className="text-blue-400" /></div>
                <h2 className="text-3xl font-bold mb-2">مرحلة جمع البيانات</h2>
                <p className="text-gray-400 text-sm">جاري مطابقة سجلات الدوام مع معايير الاستحقاق لضمان دقة الاحتساب.</p>
            </div>

            {/* نصوص المشهد الثاني */}
            <div className="laptop-text-2 absolute right-[5%] text-right w-80 opacity-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 ml-auto"><ShieldCheck className="text-emerald-400" /></div>
                <h2 className="text-3xl font-bold mb-2">جاهزية الإطلاق</h2>
                <p className="text-gray-400 text-sm">تم احتساب المبالغ النهائية وتدقيقها مالياً بانتظار الإشارة.</p>
            </div>

            {/* نصوص الموبايل */}
            <div className="promo-text absolute right-[5%] text-right w-80 opacity-0">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 ml-auto"><Sparkles className="text-purple-400" /></div>
                <h2 className="text-3xl font-bold mb-2">إشعار فوري بحوافزك</h2>
                <p className="text-gray-400 text-sm">يصل الإشعار مباشرة لتطبيق الرواتب لتعرف قيمة المستحقات بكل شفافية.</p>
            </div>

            {/* شاشة اللابتوب */}
            <div ref={laptopRef} className="absolute w-[550px] h-[340px] bg-white text-gray-900 rounded-2xl shadow-2xl p-5 border flex flex-col overflow-hidden">
                <div className="flex gap-1.5 mb-4 border-b pb-2"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" /></div>
                
                <div className="content-1 flex flex-col gap-3 flex-1 justify-center">
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-center gap-3"><ShieldCheck className="text-blue-600" /><span className="font-bold text-sm">آلية احتساب دقيقة</span></div>
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center gap-3"><Clock className="text-emerald-600" /><span className="font-bold text-sm">تعتمد على الدوام الفعلي</span></div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 flex items-center gap-3"><BarChart3 className="text-purple-600" /><span className="font-bold text-sm">تقييم الإنجازية</span></div>
                </div>

                <div className="content-2 flex-1 grid grid-cols-3 gap-3" style={{ display: 'none' }}>
                    <div className="col-span-2 flex flex-col gap-3">
                        <div className="bg-slate-50 rounded-xl p-4 border flex-1 flex flex-col justify-center"><p className="text-slate-500 text-xs mb-1">إجمالي الموظفين المشمولين</p><h2 className="text-3xl font-bold text-slate-800 font-mono">{employees.toLocaleString()}</h2></div>
                        <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100 flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4" /><span className="text-xs text-emerald-800 font-medium">تمت المطابقة والتدقيق بنجاح</span></div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-3">
                        <div className="bg-slate-50 rounded-xl p-3 border text-center"><p className="text-slate-500 text-[10px] mb-1">معدل التقييم</p><h2 className="text-2xl font-bold text-blue-600 font-mono">{points}%</h2></div>
                        <button className="deposit-btn w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md">إطلاق الحوافز</button>
                    </div>
                </div>
            </div>

            {/* البوب أب التوضيحي (قبل الموبايل) */}
            <div ref={popupRef} className="absolute z-40 bg-white/95 text-gray-800 p-5 rounded-2xl shadow-2xl border border-blue-100 flex items-center gap-4 max-w-sm scale-75 opacity-0">
                <div className="p-2.5 bg-blue-50 rounded-full"><Info className="text-blue-600 w-6 h-6" /></div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">جاري معالجة التحويلات...</h4>
                    <p className="text-xs text-gray-500 mt-0.5">تمت مطابقة السجلات وإرسال البيانات المالية بنجاح.</p>
                </div>
            </div>

            {/* شاشة الموبايل بدون سكرول */}
            <div ref={phoneRef} className="absolute w-[260px] h-[520px] bg-gray-100 rounded-[40px] p-2 border-[5px] border-gray-800 shadow-2xl overflow-hidden opacity-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-xl z-40" />
                
                <div className="relative w-full h-full bg-white rounded-[34px] overflow-hidden flex flex-col">
                    {appOpened ? (
                        <div className="w-full h-full overflow-hidden">
                            <img src="/salary-app.png" alt="Salary App" className="w-full h-full object-cover object-top" />
                        </div>
                    ) : (
                        <div className="w-full h-full pt-20 px-4 bg-slate-50 flex flex-col items-center">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4"><Smartphone className="w-7 h-7 text-blue-500" /></div>
                            <div className="w-20 h-2 bg-slate-200 rounded-full" />
                        </div>
                    )}
                </div>

                {/* الإشعار البوب-أوّت */}
                <div ref={notifRef} className="absolute top-10 -left-4 -right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 z-50 shadow-2xl border border-gray-100 text-right opacity-0">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                        <span className="text-[10px] text-gray-800 font-bold">نظام الرواتب والحوافز</span>
                        <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white"><Bell className="w-3 h-3" /></div>
                    </div>
                    <p className="text-[10px] text-gray-600 font-medium leading-tight mb-2" style={{ direction: 'rtl' }}>تم إيداع حوافزك لهذا الشهر بنجاح، بناءً على التقييم والإنجاز.</p>
                    <button className="notif-btn w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-bold">يتم الفتح تلقائياً...</button>
                </div>
            </div>

        </div>
      )}
    </div>
  );
}