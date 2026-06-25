import React from 'react';

// الشعارات تُقرأ تلقائياً من src/assets — أي ملف صورة اسمه يحتوي ministry أو itpc:
//   src/assets/ministry.png   (شعار وزارة الاتصالات)
//   src/assets/itpc.png       (شعار ITPC)
// (أي امتداد صورة مدعوم. لا يكسر البناء لو لم تُحفظ بعد.)
const files = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });
const pick = (name) => {
  const key = Object.keys(files).find((p) => p.toLowerCase().includes(name));
  return key ? files[key] : null;
};
const ministry = pick('ministry');
const itpc = pick('itpc');

export default function Logos({ size = 'md', className = '', style }) {
  const ring = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14';
  const h = size === 'sm' ? 'h-10' : size === 'lg' ? 'h-20' : 'h-14';

  if (!ministry && !itpc) return null; // لا شيء حتى تُحفظ الشعارات

  return (
    <div className={`flex items-center gap-4 ${className}`} style={style}>
      {ministry && <img src={ministry} alt="وزارة الاتصالات العراقية" className={`${ring} rounded-full object-cover bg-white shadow-lg`} />}
      {ministry && itpc && <div className="w-px h-8 bg-white/20" />}
      {itpc && <img src={itpc} alt="ITPC" className={`${h} object-contain bg-white rounded-xl px-2 py-1 shadow-lg`} />}
    </div>
  );
}
