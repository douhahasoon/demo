import { BarChart3, FileCheck, Calculator, UserCheck } from 'lucide-react';
import imgEvaluation from '../assets/takeem.jpg';
import imgCommittees from '../assets/lajnah.jpg';
import imgFinance from '../assets/ihtisap.jpg';
import imgPoints from '../assets/4.jpg';

// مشاهد السيناريو (٢–٥). المشهد ١ = الإطلاق، ٦ = التحويل والإيداع (سردي)، ثم شاشة النهاية.
// استبدل image لاحقاً بسكرين‌شوت حقيقي لكل شاشة.
export const scenes = [
  {
    id: 'evaluation',
    num: '٠١',
    kicker: 'تقييم الأداء',
    title: 'تقييم الأداء بدقة مؤتمتة',
    desc: 'يقوم النظام باحتساب الأداء الوظيفي آلياً وفق المعايير المعتمدة.',
    bullets: ['مطابقة سجلات الدوام مع معايير الاستحقاق', 'تدقيق بيانات الموظفين لضمان دقة الاحتساب', 'نتائج تقييم لحظية'],
    icon: BarChart3,
    accent: 'blue',
    variant: 'chart',
    image: null,
    systemImg: imgEvaluation,
  },
  {
    id: 'committees',
    num: '٠٢',
    kicker: 'توثيق إنجازات اللجان',
    title: 'توثيق إنجازات اللجان إلكترونياً',
    desc: 'تُعتمد إنجازات اللجان إلكترونياً وتُوثّق مباشرة داخل النظام.',
    bullets: ['ربط جميع اللجان بمنصة موحّدة', 'مستندات رقمية موثّقة', 'ضمان احتساب جميع اللجان المنجزة '],
    icon: FileCheck,
    accent: 'emerald',
    variant: 'docs',
    image: null,
    systemImg: imgCommittees,
  },
  {
    id: 'finance',
    num: '٠٣',
    kicker: 'المدخلات المالية',
    title: 'تحديد قيمة النقطة من صافي الإيراد',
    desc: 'يُدخل القسم المالي صافي الإيراد الشهري لتُحتسب قيمة النقطة بصورة آلية.',
    bullets: ['إدخال صافي الإيراد الشهري', 'احتساب قيمة النقطة آلياً', 'توزيع النقاط داخل النظام'],
    icon: Calculator,
    accent: 'amber',
    variant: 'finance',
    image: null,
    systemImg: imgFinance,
  },
  {
    id: 'points',
    num: '٠٤',
    kicker: 'احتساب النقاط',
    title: 'احتساب النقاط المخصّصة لكل موظف',
    desc: 'تُحتسب نقاط كل موظف وفق أدائه وإنجازاته المعتمدة داخل النظام.',
    bullets: ['ملف رقمي لكل موظف', 'احتساب النقاط مع سعر النقاط حسب الايراد', 'نتيجة احتساب نهائية'],
    icon: UserCheck,
    accent: 'purple',
    variant: 'counter',
    image: null,
    systemImg: imgPoints,
  },
];

// خريطة الألوان (صريحة حتى لا يحذفها Tailwind عند الـ purge)
export const ACCENTS = {
  blue:    { text: 'text-blue-400',    ring: 'bg-blue-500/15 border-blue-500/30',    grad: 'from-blue-400 to-purple-500',    chip: 'bg-blue-500',    soft: 'bg-blue-50 border-blue-100',    bar: 'bg-blue-400/60',    barSolid: 'bg-blue-500' },
  emerald: { text: 'text-emerald-400', ring: 'bg-emerald-500/15 border-emerald-500/30', grad: 'from-emerald-400 to-teal-500', chip: 'bg-emerald-500', soft: 'bg-emerald-50 border-emerald-100', bar: 'bg-emerald-400/60', barSolid: 'bg-emerald-500' },
  purple:  { text: 'text-purple-400',  ring: 'bg-purple-500/15 border-purple-500/30',  grad: 'from-purple-400 to-fuchsia-500', chip: 'bg-purple-500', soft: 'bg-purple-50 border-purple-100', bar: 'bg-purple-400/60', barSolid: 'bg-purple-500' },
  amber:   { text: 'text-amber-400',   ring: 'bg-amber-500/15 border-amber-500/30',   grad: 'from-amber-400 to-orange-500',  chip: 'bg-amber-500',  soft: 'bg-amber-50 border-amber-100',  bar: 'bg-amber-400/60',  barSolid: 'bg-amber-500' },
};
