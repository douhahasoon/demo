import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { CheckCircle2 } from 'lucide-react';
import { ACCENTS } from '../data/scenes';

// عدّاد يتصاعد (للمشهد الخامس — حتى ١٥٠ نقطة)
function CountUp({ to, accentText }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const o = { n: 0 };
    const tw = gsap.to(o, { n: to, duration: 1.8, delay: 0.5, ease: 'power2.out', onUpdate: () => setV(Math.floor(o.n)) });
    return () => tw.kill();
  }, [to]);
  return <span className={`font-mono font-black ${accentText}`}>{v}</span>;
}

function PlaceholderUI({ scene }) {
  const a = ACCENTS[scene.accent];
  const Icon = scene.icon;

  const Header = (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-lg ${a.chip} flex items-center justify-center text-white`}><Icon className="w-4 h-4" /></div>
      <div className="h-2.5 w-28 bg-slate-200 rounded-full" />
      <div className="h-2.5 w-10 bg-slate-200 rounded-full mr-auto" />
    </div>
  );

  // المشهد ٢: رسوم بيانية ترتفع
  if (scene.variant === 'chart') {
    return (
      <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-3" style={{ direction: 'rtl' }}>
        {Header}
        <div className="grid grid-cols-3 gap-2">
          {['87%', '92%', '78%'].map((p, i) => (
            <div key={i} className="rounded-lg bg-white border border-slate-200 p-2">
              <div className={`text-lg font-black ${a.text} font-mono`}>{p}</div>
              <div className="h-1.5 w-10 bg-slate-200 rounded-full mt-1" />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-xl bg-white border border-slate-200 p-3 flex items-end gap-1.5">
          {[45, 70, 55, 85, 65, 95, 75].map((h, i) => (
            <div key={i} className={`bar-grow flex-1 ${a.barSolid} rounded-t`} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      </div>
    );
  }

  // المشهد ٣: مستندات اللجان + علامات صح
  if (scene.variant === 'docs') {
    return (
      <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-2.5" style={{ direction: 'rtl' }}>
        {Header}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="row-in flex items-center gap-3 rounded-lg bg-white border border-slate-200 p-2.5" style={{ animationDelay: `${0.15 + i * 0.18}s` }}>
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="h-2 w-2/3 bg-slate-300/70 rounded-full" />
              <div className="h-2 w-1/3 bg-slate-200 rounded-full" />
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">لجنة {i + 1}</span>
          </div>
        ))}
      </div>
    );
  }

  // المشهد ٤: المدخلات المالية → قيمة النقطة
  if (scene.variant === 'finance') {
    return (
      <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-3" style={{ direction: 'rtl' }}>
        {Header}
        <div className={`rounded-xl ${a.soft} border p-3`}>
          <p className="text-[11px] text-slate-500 mb-1">صافي الإيراد الشهري</p>
          <p className="text-2xl font-black text-slate-800 font-mono">١٢٥٠٠٠٠٠٠ <span className="text-sm">د.ع</span></p>
        </div>
        <div className="flex items-center justify-center text-slate-400 text-xs">↓ احتساب آلي ↓</div>
        <div className="flex-1 rounded-xl bg-white border border-slate-200 p-3 flex flex-col items-center justify-center">
          <p className="text-[11px] text-slate-500">قيمة النقطة</p>
          <p className={`text-3xl font-black ${a.text} font-mono`}>٨٣٣٣ <span className="text-sm">د.ع</span></p>
        </div>
      </div>
    );
  }

  // المشهد ٥: ملف الموظف + عدّاد النقاط حتى ١٥٠
  if (scene.variant === 'counter') {
    return (
      <div className="w-full h-full bg-slate-50 p-4 flex flex-col gap-3" style={{ direction: 'rtl' }}>
        {Header}
        <div className="rounded-xl bg-white border border-slate-200 p-3 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${a.chip} flex items-center justify-center text-white font-bold`}>م</div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-24 bg-slate-300/70 rounded-full" />
            <div className="h-2 w-16 bg-slate-200 rounded-full" />
          </div>
        </div>
        <div className="flex-1 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center">
          <p className="text-[11px] text-slate-500 mb-1">إجمالي النقاط المحتسبة</p>
          <p className="text-5xl leading-none"><CountUp to={150} accentText={a.text} /></p>
          <p className="text-xs text-slate-400 mt-1">من ١٥٠ نقطة</p>
        </div>
      </div>
    );
  }

  return <div className="w-full h-full bg-slate-50" />;
}

function DeviceFrame({ scene }) {
  const a = ACCENTS[scene.accent];
  const screen = scene.image
    ? <img src={scene.image} alt={scene.title} className="w-full h-full object-cover object-top" />
    : <PlaceholderUI scene={scene} />;

  return (
    <div className="relative w-[580px] rounded-2xl glass p-2.5 shadow-[0_50px_110px_rgba(0,0,0,0.65)]">
      <div className={`absolute -inset-12 ${a.bar} blur-[80px] rounded-full -z-10 opacity-50`} />
      <div className="flex items-center gap-2 px-2 py-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/90" />
          <div className="w-3 h-3 rounded-full bg-green-400/90" />
        </div>
        <div className="flex-1 mx-3 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          <span className="text-[11px] text-white/55 tracking-wide" dir="ltr">hawafiz.itpc.gov.iq</span>
        </div>
      </div>
      <div className="relative w-full h-[330px] rounded-xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(120deg,_rgba(255,255,255,0.25)_0%,_transparent_32%)]" />
        {screen}
      </div>
    </div>
  );
}

export default function FeatureScene({ scene, side, leaving, current, total }) {
  const a = ACCENTS[scene.accent];
  const Icon = scene.icon;
  const textSide = side === 'right' ? { left: '4%' } : { right: '4%' };
  const devSide = side === 'right' ? { right: '1%' } : { left: '1%' };
  const tilt = side === 'right' ? 'rotateY(-12deg)' : 'rotateY(12deg)';

  return (
    <div className="feat-scene absolute inset-0" data-leaving={leaving ? 'true' : 'false'}>
      <div className="absolute inset-y-0 flex flex-col justify-center w-[38%] gap-4 text-right" style={{ ...textSide, direction: 'rtl' }}>
        <div className="feat-kicker flex items-center gap-2 ml-auto mr-0">
          <span className={`text-2xl font-black ${a.text} font-mono opacity-60`}>{scene.num}</span>
          <span className={`text-sm font-bold ${a.text} tracking-wide`}>{scene.kicker}</span>
          <span className="text-xs text-gray-500 font-mono">{current} / {total}</span>
        </div>

        <div className={`feat-kicker w-12 h-12 rounded-2xl ${a.ring} border flex items-center justify-center ml-auto mr-0`}>
          <Icon className={`w-6 h-6 ${a.text}`} />
        </div>

        <h2 className="text-3xl md:text-[2.6rem] font-black text-white leading-tight overflow-hidden">
          <span className="feat-title-line inline-block">{scene.title}</span>
        </h2>

        <p className="feat-desc text-base md:text-lg text-gray-400 leading-relaxed">{scene.desc}</p>

        <ul className="flex flex-col gap-2.5 mt-1">
          {scene.bullets.map((b, i) => (
            <li key={i} className="feat-bullet flex items-center gap-3 justify-end" style={{ animationDelay: `${0.55 + i * 0.07}s` }}>
              <span className="text-gray-300">{b}</span>
              <span className={`w-5 h-5 rounded-full ${a.chip} flex items-center justify-center shrink-0`}>
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-y-0 flex items-center" style={devSide}>
        <div style={{ transform: tilt, transformStyle: 'preserve-3d' }}>
          <div className="feat-device-in">
            <DeviceFrame scene={scene} />
          </div>
        </div>
      </div>
    </div>
  );
}
