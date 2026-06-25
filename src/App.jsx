import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import GlassBackground from './components/GlassBackground';

export default function App() {
  const [stage, setStage] = useState('preloader'); // preloader | hero | presentation

  return (
    <div className="w-full h-screen relative flex items-center justify-center font-sans bg-[#05070e] overflow-hidden text-gray-800">
      {/* خلفية matte glass خلال شاشتي التحميل والترحيب */}
      {(stage === 'preloader' || stage === 'hero') && <GlassBackground />}

      {stage === 'preloader' && <Preloader onDone={() => setStage('hero')} />}
      {stage === 'hero' && <Hero onStart={() => setStage('presentation')} />}
      {stage === 'presentation' && <Presentation key="presentation" />}
    </div>
  );
}
