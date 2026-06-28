import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { scenes, ACCENTS } from '../data/scenes';
import FeatureScene from './FeatureScene';
import MathFinale from './MathFinale';

const SCENE_HOLD = 10000; // مدة بقاء كل مشهد ميزة (~8 ثوان مع الدخول/الخروج)
const SCENE_EXIT = 600;

export default function Presentation({ onBackToHero }) {
  const [mode, setMode] = useState('features'); // features | distribution
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // الرجوع خطوة واحدة للوراء في أي مشهد
  const goBack = () => {
    setLeaving(false);
    if (mode === 'distribution') { setMode('features'); setIndex(scenes.length - 1); return; }
    if (index > 0) { setIndex((i) => i - 1); return; }
    onBackToHero?.(); // أول مشهد → رجوع لشاشة الإطلاق
  };

  // مشاهد الميزات بالتتابع ثم مشهد التحويل (وهو الخاتمة)
  useEffect(() => {
    if (mode !== 'features') return;
    const t1 = setTimeout(() => setLeaving(true), SCENE_HOLD);
    const t2 = setTimeout(() => {
      setLeaving(false);
      if (index < scenes.length - 1) setIndex((i) => i + 1);
      else setMode('distribution');
    }, SCENE_HOLD + SCENE_EXIT);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [index, mode]);

  const side = index % 2 === 0 ? 'right' : 'left';

  return (
    <div className="absolute inset-0 perspective-container flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/60 via-[#eef2f8] to-[#e2e8f2] z-20">
      {/* سهم الرجوع — صغير وفوق، يرجع خطوة في أي مشهد */}
      <button
        onClick={goBack}
        className="btn-press absolute top-5 right-6 z-50 w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 hover:text-slate-900"
        title="رجوع خطوة"
        aria-label="رجوع خطوة"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="w-[1100px] h-[600px] flex-shrink-0 preserve-3d relative flex items-center justify-center scale-[0.42] sm:scale-[0.55] md:scale-[0.7] lg:scale-90 xl:scale-100 transition-transform duration-500">
        {mode === 'features' && (
          <FeatureScene
            key={index}
            scene={scenes[index]}
            side={side}
            leaving={leaving}
            current={index + 1}
            total={scenes.length}
          />
        )}

        {mode === 'distribution' && <MathFinale />}
      </div>

      {/* مؤشّر التقدّم — قابل للنقر للانتقال/الرجوع لأي خطوة */}
      {mode === 'features' && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setLeaving(false); setIndex(i); }}
              className="group p-2 -m-1 cursor-pointer"
              title={`${i + 1}. ${s.kicker}`}
              aria-label={s.kicker}
            >
              <span
                className={`block scene-dot h-1.5 rounded-full transition-all ${i === index ? `w-8 ${ACCENTS[scenes[index].accent].chip}` : 'w-2.5 bg-slate-900/15 group-hover:bg-slate-900/35'}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
