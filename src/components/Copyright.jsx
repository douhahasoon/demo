import React from 'react';

export default function Copyright({ className = '' }) {
  return (
    <div className={`text-[11px] md:text-xs text-gray-400/80 text-center leading-relaxed ${className}`} style={{ direction: 'rtl' }}>
      جميع الحقوق محفوظة — الشركة العامة للاتصالات والمعلوماتية / مديرية المعلوماتية / قسم البرمجيات
    </div>
  );
}
