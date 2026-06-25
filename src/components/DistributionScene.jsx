import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FileText, Banknote } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import appImg from '../assets/salary-app.png';
import confettiAnim from '../assets/confetti.json';
import PhoneMockup from './PhoneMockup';
import Logos from './Logos';
import Copyright from './Copyright';

const SFX = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
const PHRASES = [
  'نقاطك الشهرية يتتحول إلى قيمة مالية',
  'جارٍ تحويل الحوافز إلى الحسابات الشخصية',
  'تم إيداع مبلغ الحوافز في الحساب الشخصي لكل موظف',
];
const COIN_COUNT = 16;

export default function DistributionScene() {
  const [phrase, setPhrase] = useState(0);
  const [appOpened, setAppOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [finale, setFinale] = useState(false);

  const distRef = useRef(null);
  const phoneRef = useRef(null);
  const notifRef = useRef(null);
  const appScreenRef = useRef(null);
  const coinsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sf = distRef.current.getBoundingClientRect().width / 1100;
      const cw = coinsRef.current.getBoundingClientRect();
      const pw = phoneRef.current.getBoundingClientRect();
      const dx = ((pw.left + pw.width / 2) - (cw.left + cw.width / 2)) / sf;
      const dy = ((pw.top + pw.height / 2) - (cw.top + cw.height / 2)) / sf;

      gsap.set(phoneRef.current, { opacity: 0, x: 90, scale: 1.08, rotateY: 14, rotateX: 6 });
      gsap.set(notifRef.current, { opacity: 0, y: -40, scale: 0.6 });
      gsap.set('.dist-file', { opacity: 0, y: 40, scale: 0.85 });
      gsap.set('.dist-coin', { opacity: 0, scale: 0, x: 0, y: 0 });
      gsap.set('.dist-incentive', { opacity: 0 });

      const openApp = () => {
        setAppOpened(true);
        gsap.to(notifRef.current, { y: -80, opacity: 0, scale: 0.8, duration: 0.5 });
        gsap.to(appScreenRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out' });
      };

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to({}, { duration: 0.5 })
        .to(phoneRef.current, { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' }, '-=0.2')
        .to('.dist-file', { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.6')
        .to('.dist-page', { y: '-=12', duration: 0.32, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, '+=0.1')
        .to('.dist-file-core', { scale: 1.08, duration: 0.22, yoyo: true, repeat: 1 })
        .add(() => setPhrase(1))
        .to('.dist-coin', { opacity: 1, scale: 1, x: () => gsap.utils.random(-45, 45), y: () => gsap.utils.random(-45, 45), rotate: () => gsap.utils.random(-180, 180), duration: 0.45, ease: 'back.out(2)', stagger: 0.015 })
        .to('.dist-file-core', { opacity: 0, scale: 0.7, duration: 0.4 }, '-=0.3')
        .to('.dist-coin', { x: dx, y: dy, scale: 0.28, duration: 0.85, ease: 'power2.in', stagger: 0.03 }, '+=0.05')
        .to(phoneRef.current, { boxShadow: '0 0 70px rgba(16,185,129,0.65)', duration: 0.3 }, '-=0.45')
        .to('.dist-coin', { opacity: 0, duration: 0.2, stagger: 0.02 }, '-=0.4')
        .add(() => { setPhrase(2); setConfetti(true); try { new Audio(SFX).play(); } catch (e) {} })
        .to(notifRef.current, { opacity: 1, y: 0, scale: 1.12, duration: 0.7, ease: 'back.out(1.7)' })
        .to('.notif-btn', { scale: 0.97, backgroundColor: '#bfdbfe', duration: 0.16, delay: 1.2, yoyo: true, repeat: 1, ease: 'power2.out', onComplete: openApp })
        // الخاتمة: يختفي الجزء الأيسر، تظهر عبارة الوزير + الشعارات، ويكبر كارت الحوافز ويطلع من إطار الهاتف
        .to({}, { duration: 1.5 })
        .addLabel('finale')
        .to(['.dist-left'], { opacity: 0, y: -20, duration: 0.7, ease: 'power2.out' }, 'finale')
        .add(() => setFinale(true), 'finale')
        .fromTo('.dist-incentive',
          { opacity: 0, scale: 0.85, x: 0, y: 0 },
          { opacity: 1, scale: 1.45, x: -95, y: 8, duration: 0.95, ease: 'back.out(1.4)' }, 'finale')
        .to(phoneRef.current, { x: 70, duration: 1, ease: 'power3.inOut' }, 'finale+=0.15')
        .to(phoneRef.current, { y: -12, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, distRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={distRef} className="absolute inset-0">
      {confetti && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <Player src={confettiAnim} autoplay keepLastFrame style={{ height: '100%', width: '100%' }} />
        </div>
      )}

      {/* الجزء الأيسر: العبارة السردية + الملف + النقود (يختفي في الخاتمة) */}
      <div className="dist-left">
        <div className="absolute top-[12%] left-[3%] w-[44%] text-center px-2 z-30">
          <h2 key={phrase} className="a-fadeup text-2xl md:text-[1.9rem] leading-snug font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-400" style={{ direction: 'rtl' }}>
            {PHRASES[phrase]}
          </h2>
        </div>

        <div className="dist-file absolute" style={{ left: '15%', top: '50%', transform: 'translateY(-50%)' }}>
          <div className="relative w-44 h-56">
            <div className="dist-page absolute inset-x-5 top-2 h-full rounded-2xl bg-white/5 border border-white/10" style={{ transform: 'rotate(-7deg)' }} />
            <div className="dist-page absolute inset-x-3 top-1 h-full rounded-2xl bg-white/[0.08] border border-white/10" style={{ transform: 'rotate(4deg)' }} />

            <div className="dist-file-core relative w-44 h-56 rounded-2xl glass flex flex-col items-center justify-center gap-3 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <FileText className="w-9 h-9 text-blue-300" />
              </div>
              <div className="flex flex-col gap-1.5 w-24">
                <div className="h-1.5 w-full bg-white/20 rounded-full" />
                <div className="h-1.5 w-2/3 bg-white/15 rounded-full" />
              </div>
              <span className="text-xs text-white/70 font-bold" style={{ direction: 'rtl' }}>ملفات الموظفين</span>
            </div>

            <div ref={coinsRef} className="dist-coins absolute inset-0 flex items-center justify-center z-20">
              {Array.from({ length: COIN_COUNT }).map((_, i) => (
                <div key={i} className="dist-coin absolute w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 to-yellow-500 border border-amber-300/80 shadow-[0_0_14px_rgba(245,200,80,0.75)] flex items-center justify-center">
                  <span className="text-[9px] font-black text-amber-800/80">$</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* الخاتمة: عبارة الوزير + الشعارات (يسار) */}
      <div
        className="absolute inset-y-0 left-0 w-[48%] flex flex-col justify-center items-center text-center gap-7 px-10 z-30 transition-opacity duration-700"
        style={{ opacity: finale ? 1 : 0, pointerEvents: finale ? 'auto' : 'none' }}
      >
        <Logos size="md" />
        <p className="text-xl md:text-2xl font-bold text-gray-100 leading-loose" style={{ direction: 'rtl' }}>
          بتوجيهات السيد الوزير والسيد المدير العام المحترمون..
          <br />
          جُهدكم مُقدّر وعطاؤكم مُثمر..
        </p>
      </div>

      {/* الحقوق — تظهر مع الخاتمة */}
      <div className="absolute bottom-5 left-0 right-0 z-30 transition-opacity duration-700" style={{ opacity: finale ? 1 : 0 }}>
        <Copyright />
      </div>

      {/* الموبايل + كارت الحوافز الذي يطلع من الإطار */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[280px] h-[540px]">
        <PhoneMockup ref={phoneRef} notifRef={notifRef} appScreenRef={appScreenRef} appOpened={appOpened} appImg={appImg} />

        <div className="dist-incentive absolute left-[26px] bottom-[15%] w-[228px] rounded-2xl bg-gradient-to-l from-emerald-100 to-emerald-50 border border-emerald-200 shadow-[0_30px_70px_rgba(16,185,129,0.45)] px-4 py-3 flex items-center gap-3 z-50" style={{ direction: 'rtl' }}>
          <div className="flex-1 text-right">
            <div className="text-sm font-black text-emerald-900">الحوافز لهذا الشهر</div>
            <div className="text-xl font-black text-emerald-700 font-mono leading-tight">290,000 <span className="text-xs">د.ع</span></div>
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
