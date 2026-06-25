import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Banknote, Star, Stamp, Calculator, Layers } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import appImg from '../assets/salary-app.png';
import confettiAnim from '../assets/confetti.json';
import PhoneMockup from './PhoneMockup';
import Logos from './Logos';
import Copyright from './Copyright';

const SFX = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

// المحرّك الرياضي الحقيقي
const REVENUE = 2_000_000_000;          // صافي الإيراد
const TOTAL_POINTS = 9000 * 50;         // 9000 موظف × 50 نقطة = 450,000
const POINT_PRICE = REVENUE / TOTAL_POINTS; // = 4,444.44 د.ع
const EMP_FIXED_PTS = 32;                // النقاط الثابتة
const EMP_EVAL_PTS = 8;                   // ورقة التقييم (8 من 10)
const EMP_COMM_PTS = 10;                  // ورقة اللجان (2 لجنة)
const EMP_POINTS = EMP_FIXED_PTS + EMP_EVAL_PTS + EMP_COMM_PTS; // 50 نقطة
const NET = EMP_POINTS * POINT_PRICE;    // = 222,222 د.ع

const fmt = (n) => Math.round(n).toLocaleString('en-US');

function animateNumber(setter, from, to, dur, ease = 'power1.inOut') {
  const o = { v: from };
  return gsap.to(o, { v: to, duration: dur, ease, onUpdate: () => setter(o.v) });
}

export default function MathFinale() {
  const [revenue, setRevenue] = useState(0);
  const [totalPts, setTotalPts] = useState(0);
  const [price, setPrice] = useState(0);
  const [empPts, setEmpPts] = useState(0);
  const [net, setNet] = useState(0);
  const [appOpened, setAppOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [finale, setFinale] = useState(false);

  const rootRef = useRef(null);
  const phoneRef = useRef(null);
  const notifRef = useRef(null);
  const appScreenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.mf-cryptor', { opacity: 0 });
      gsap.set('.mf-card', { opacity: 0, scale: 0.9, y: 20 });
      gsap.set('.mf-paper', { opacity: 0 });
      gsap.set('.mf-eq', { opacity: 0, y: 24 });
      gsap.set('.mf-promo', { opacity: 0, x: 50 });
      gsap.set('.dist-incentive', { opacity: 0 });
      gsap.set(phoneRef.current, { opacity: 0, x: 90, scale: 1.08, rotateY: 14, rotateX: 6 });
      gsap.set(notifRef.current, { opacity: 0, y: -40, scale: 0.6 });

      const openApp = () => {
        setAppOpened(true);
        gsap.to(notifRef.current, { y: -80, opacity: 0, scale: 0.8, duration: 0.5 });
        gsap.to(appScreenRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out' });
      };

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // ===== المرحلة (أ): معادلة المؤسسة الكلية =====
      tl.to('.mf-eq', { opacity: 1, y: 0, duration: 0.7, stagger: 0.18 })
        .add(() => { animateNumber(setRevenue, 0, REVENUE, 2.4); animateNumber(setTotalPts, 0, TOTAL_POINTS, 2.4); })
        .to({}, { duration: 2.6 })
        .add(() => animateNumber(setPrice, 0, POINT_PRICE, 1.4, 'power2.out'))
        .to('.mf-eq-result', { scale: 1.12, duration: 0.4, yoyo: true, repeat: 1 }, '+=0.3')
        .to({}, { duration: 1.2 })
        .to('.mf-equation-wrap', { opacity: 0, y: -40, duration: 0.7, ease: 'power2.in' })

      // ===== المرحلة (ب): كارت الموظف + تدفّق الأوراق =====
        .set('.mf-equation-wrap', { display: 'none' })
        .to('.mf-cryptor', { opacity: 1, duration: 0.01 })
        .to('.mf-card', { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' })

        // ورقة النقاط الثابتة (32) — تطير من الأسفل
        .fromTo('.mf-paper-0', { opacity: 0, x: -120, y: 320, rotate: -12, scale: 1.15 },
          { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.0, ease: 'power3.inOut' }, '+=0.2')
        .to('.mf-paper-0', { y: 30, scale: 0.25, opacity: 0, duration: 0.55, ease: 'power2.in', onStart: () => animateNumber(setEmpPts, 0, EMP_FIXED_PTS, 1.4) })
        .to('.mf-gauge-fill', { scaleX: EMP_FIXED_PTS / EMP_POINTS, duration: 1.4, ease: 'power1.inOut' }, '<')
        .to({}, { duration: 0.4 })

        // ورقة التقييم (8 نقاط) — تطير من اليسار
        .fromTo('.mf-paper-1', { opacity: 0, x: -420, y: -150, rotate: -20, scale: 1.15 },
          { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.0, ease: 'power3.inOut' })
        .to('.mf-paper-1', { y: 30, scale: 0.25, opacity: 0, duration: 0.55, ease: 'power2.in', onStart: () => animateNumber(setEmpPts, EMP_FIXED_PTS, EMP_FIXED_PTS + EMP_EVAL_PTS, 0.9) })
        .to('.mf-gauge-fill', { scaleX: (EMP_FIXED_PTS + EMP_EVAL_PTS) / EMP_POINTS, duration: 0.9, ease: 'power1.inOut' }, '<')
        .to({}, { duration: 0.4 })

        // ورقة اللجان (2 لجنة - 10 نقاط) — تطير من اليمين
        .fromTo('.mf-paper-2', { opacity: 0, x: 420, y: -130, rotate: 20, scale: 1.15 },
          { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.0, ease: 'power3.inOut' })
        .to('.mf-paper-2', { y: 30, scale: 0.25, opacity: 0, duration: 0.55, ease: 'power2.in', onStart: () => animateNumber(setEmpPts, EMP_FIXED_PTS + EMP_EVAL_PTS, EMP_POINTS, 0.9) })
        .to('.mf-gauge-fill', { scaleX: 1, duration: 0.9, ease: 'power1.inOut' }, '<')
        .to({}, { duration: 0.4 })

        // ورقة سعر النقطة — تطير من الأعلى وتُكمل الحساب
        .fromTo('.mf-paper-3', { opacity: 0, y: -300, rotate: 0, scale: 1.15 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.inOut' })
        .to('.mf-paper-3', {
          y: 30, scale: 0.25, opacity: 0, duration: 0.55, ease: 'power2.in',
          onStart: () => { animateNumber(setNet, 0, NET, 1.3, 'power2.out'); setConfetti(true); try { new Audio(SFX).play(); } catch (e) {} },
        })
        .to('.mf-card', { boxShadow: '0 0 70px rgba(16,185,129,0.4)', duration: 0.4 })
        .to('.mf-net', { scale: 1.1, duration: 0.4, yoyo: true, repeat: 1 }, '<')
        .to({}, { duration: 1.6 })

      // ===== المرحلة (ج): الموبايل + الإشعار + الخاتمة (كما هو) =====
        .to('.mf-cryptor', { opacity: 0, scale: 0.92, duration: 0.7, ease: 'power2.in' })
        .to(phoneRef.current, { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' }, '-=0.3')
        .to('.mf-promo', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .to(notifRef.current, { opacity: 1, y: 0, scale: 1.12, duration: 0.7, ease: 'back.out(1.7)' })
        .to('.notif-btn', { scale: 0.97, backgroundColor: '#bfdbfe', duration: 0.16, delay: 1.2, yoyo: true, repeat: 1, ease: 'power2.out', onComplete: openApp })
        .to({}, { duration: 1.5 })
        .addLabel('fin')
        .to('.mf-promo', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' }, 'fin')
        .add(() => setFinale(true), 'fin')
        .fromTo('.dist-incentive', { opacity: 0, scale: 0.85, x: 0, y: 0 }, { opacity: 1, scale: 1.45, x: -95, y: 8, duration: 0.95, ease: 'back.out(1.4)' }, 'fin')
        .to(phoneRef.current, { x: 70, duration: 1, ease: 'power3.inOut' }, 'fin+=0.15')
        .to(phoneRef.current, { y: -12, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0">
      {confetti && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <Player src={confettiAnim} autoplay keepLastFrame style={{ height: '100%', width: '100%' }} />
        </div>
      )}

      {/* ===== المرحلة (أ): المعادلة الكلية ===== */}
      <div className="mf-equation-wrap absolute inset-0 flex flex-col items-center justify-center gap-9 px-10 z-20" style={{ direction: 'rtl' }}>
        <h2 className="mf-eq text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-blue-600" /> معادلة احتساب قيمة النقطة
        </h2>
        <div className="mf-eq flex items-center gap-5 md:gap-7">
          <EqBlock label="صافي الإيراد" value={fmt(revenue)} unit="د.ع" color="text-blue-600" />
          <span className="text-4xl font-black text-slate-400">÷</span>
          <EqBlock label="إجمالي النقاط" value={fmt(totalPts)} unit="نقطة" color="text-purple-600" />
          <span className="text-4xl font-black text-slate-400">=</span>
          <div className="mf-eq-result">
            <EqBlock label="سعر النقطة" value={fmt(price)} unit="د.ع" color="text-emerald-600" highlight />
          </div>
        </div>
        <p className="mf-eq text-sm md:text-base text-slate-500 font-mono">
          9,000 موظف × 50 نقطة = 450,000 نقطة
        </p>
      </div>

      {/* ===== المرحلة (ب): كارت الموظف + الأوراق ===== */}
      <div className="mf-cryptor absolute inset-0 flex items-center justify-center z-20">
        {/* الكارت المركزي */}
        <div className="mf-card relative w-[360px] glass rounded-3xl p-6 shadow-[0_40px_90px_rgba(15,23,42,0.18)]" style={{ direction: 'rtl' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-black">م</div>
            <div>
              <div className="text-slate-800 font-bold text-sm">كارت احتساب حوافز الموظف</div>
              <div className="text-slate-500 text-xs">الرقم الوظيفي 0451</div>
            </div>
          </div>

          {/* تفصيل النقاط + المؤشّر */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-3">
            <div className="flex flex-col gap-2 mb-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">النقاط الثابتة</span>
                <span className="font-black text-slate-700 font-mono">{Math.round(Math.min(empPts, EMP_FIXED_PTS))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">التقييم (٨ / ١٠)</span>
                <span className="font-black text-blue-600 font-mono">{Math.round(Math.max(0, Math.min(empPts - EMP_FIXED_PTS, EMP_EVAL_PTS)))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">إنجازات اللجان (٢ لجنة)</span>
                <span className="font-black text-amber-600 font-mono">{Math.round(Math.max(0, Math.min(empPts - EMP_FIXED_PTS - EMP_EVAL_PTS, EMP_COMM_PTS)))}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 pt-2 border-t border-slate-200">
              <span className="text-slate-800 text-sm font-bold">الإجمالي</span>
              <span className="text-2xl font-black text-slate-800 font-mono">{Math.round(empPts)}<span className="text-sm text-slate-400"> / {EMP_POINTS}</span></span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="mf-gauge-fill h-full bg-gradient-to-l from-blue-500 to-emerald-500 rounded-full" style={{ transformOrigin: 'right', transform: 'scaleX(0)' }} />
            </div>
          </div>

          {/* سعر النقطة */}
          <div className="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 mb-3">
            <span className="text-slate-600 text-sm">سعر النقطة</span>
            <span className="text-lg font-black text-emerald-600 font-mono">{fmt(POINT_PRICE)} د.ع</span>
          </div>

          {/* الحافز الصافي */}
          <div className="mf-net bg-gradient-to-l from-emerald-100 to-blue-50 rounded-2xl px-4 py-4 border border-emerald-300 text-center">
            <div className="text-emerald-700 text-xs mb-1">الحافز الصافي للموظف</div>
            <div className="text-3xl font-black text-slate-800 font-mono">{fmt(net)} <span className="text-base text-emerald-600">د.ع</span></div>
          </div>
        </div>

        {/* الأوراق الزجاجية */}
        <Paper cls="mf-paper-0" icon={Layers} title="النقاط الثابتة" main="٣٢" sub="نقطة ثابتة" accent="text-slate-600" />
        <Paper cls="mf-paper-1" icon={Star} title="ورقة التقييم" main="٨ / ١٠" sub="+8 نقاط" accent="text-blue-600" />
        <Paper cls="mf-paper-2" icon={Stamp} title="إنجازات اللجان" main="٢ لجنة" sub="+10 نقاط" accent="text-amber-600" />
        <Paper cls="mf-paper-3" icon={Banknote} title="سعر النقطة" main={`${fmt(POINT_PRICE)}`} sub="د.ع لكل نقطة" accent="text-emerald-600" />
      </div>

      {/* ===== المرحلة (ج): النص + الموبايل + الخاتمة ===== */}
      <div className="mf-promo absolute left-[5%] w-[36%] flex flex-col gap-4 text-right z-30" style={{ direction: 'rtl', top: '50%', transform: 'translateY(-50%)' }}>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-slate-800 to-blue-700 leading-tight">إشعار فوري بحوافزك</h2>
        <p className="text-lg text-slate-500 leading-relaxed">يصل الإشعار مباشرة إلى تطبيق الرواتب الخاص بك، لتعرف قيمة حوافزك المستحقة بكل شفافية وسرعة فور إيداعها.</p>
      </div>

      {/* الخاتمة: عبارة الوزير + الشعارات */}
      <div className="absolute inset-y-0 left-0 w-[48%] flex flex-col justify-center items-center text-center gap-7 px-10 z-30 transition-opacity duration-700" style={{ opacity: finale ? 1 : 0, pointerEvents: finale ? 'auto' : 'none' }}>
        <Logos size="md" />
        <p className="text-xl md:text-2xl font-bold text-slate-700 leading-loose" style={{ direction: 'rtl' }}>
          بتوجيهات السيد الوزير والسيد المدير العام المحترمون..
          <br />
          جُهدكم مُقدّر وعطاؤكم مُثمر..
        </p>
      </div>

      <div className="absolute bottom-5 left-0 right-0 z-30 transition-opacity duration-700" style={{ opacity: finale ? 1 : 0 }}>
        <Copyright />
      </div>

      {/* الموبايل + كارت الحوافز */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[280px] h-[540px] z-30">
        <PhoneMockup ref={phoneRef} notifRef={notifRef} appScreenRef={appScreenRef} appOpened={appOpened} appImg={appImg} />
        <div className="dist-incentive absolute left-[26px] bottom-[15%] w-[228px] rounded-2xl bg-gradient-to-l from-emerald-100 to-emerald-50 border border-emerald-200 shadow-[0_30px_70px_rgba(16,185,129,0.45)] px-4 py-3 flex items-center gap-3 z-50" style={{ direction: 'rtl' }}>
          <div className="flex-1 text-right">
            <div className="text-sm font-black text-emerald-900">الحوافز لهذا الشهر</div>
            <div className="text-xl font-black text-emerald-700 font-mono leading-tight">{fmt(NET)} <span className="text-xs">د.ع</span></div>
            <div className="text-[10px] text-emerald-600/80 mt-0.5">2026/03/01</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 shrink-0">
            <Banknote className="w-6 h-6" strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EqBlock({ label, value, unit, color, highlight }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-2xl px-5 py-4 border ${highlight ? 'glass border-emerald-300' : 'bg-white/70 border-slate-200'}`}>
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-2xl md:text-3xl font-black font-mono ${color}`}>{value}</span>
      <span className="text-[11px] text-slate-400">{unit}</span>
    </div>
  );
}

function Paper({ cls, icon: Icon, title, main, sub, accent }) {
  return (
    <div className={`mf-paper ${cls} absolute w-40 h-52 glass rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_25px_50px_rgba(15,23,42,0.18)] z-30`} style={{ direction: 'rtl' }}>
      <Icon className={`w-9 h-9 ${accent}`} />
      <span className="text-xs text-slate-600 font-bold">{title}</span>
      <span className={`text-2xl font-black ${accent} font-mono`}>{main}</span>
      <span className="text-[11px] text-slate-500">{sub}</span>
    </div>
  );
}
