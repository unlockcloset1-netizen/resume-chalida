import React from 'react';
import { GraduationCap } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface EducationSectionProps {
  data: ResumeData;
  lang: 'th' | 'en' | 'zh';
}

export const EducationSection: React.FC<EducationSectionProps> = ({ data, lang }) => {
  const labels = data.labels[lang] || data.labels.th;

  return (
    <section className="space-y-12 print:space-y-4">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4 mb-10 print:mb-4 border-b-4 border-slate-900 pb-3">
        <GraduationCap className="w-8 h-8 text-slate-900 print:w-6 print:h-6" />
        <h2 className="text-[22px] print:text-[14px] font-black text-slate-900 uppercase tracking-widest">
          {labels.educationTitle}
        </h2>
      </div>

      <div className="space-y-10 print:space-y-4">
        {data.education.map((item) => {
          const eTr = item.translations[lang] || item.translations.th;
          return (
            <div key={item.id} className="relative pl-8 print:pl-4 border-l-4 border-slate-100 group print:break-inside-avoid">
              <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600 group-hover:scale-125 transition-transform"></div>
              <div className="space-y-2 print:space-y-1">
                <div className="text-blue-600 font-black text-[14px] print:text-[11px] uppercase tracking-widest bg-blue-50 px-3 py-1 print:px-2 print:py-0.5 rounded-md inline-block">
                  {eTr.meta}
                </div>
                <h3 className="text-[22px] print:text-[14px] font-black text-slate-900 leading-tight">
                  {eTr.title}
                </h3>
                <div className="text-slate-600 font-bold text-[18px] print:text-[13px]">
                  {eTr.org}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
