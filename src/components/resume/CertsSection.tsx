import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface CertsSectionProps {
  data: ResumeData;
  lang: 'th' | 'en' | 'zh';
}

export const CertsSection: React.FC<CertsSectionProps> = ({ data, lang }) => {
  const labels = data.labels[lang] || data.labels.th;

  return (
    <section className="space-y-12 print:space-y-4">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4 border-b-4 border-slate-900 pb-3">
        <Award className="w-8 h-8 text-slate-900 print:w-6 print:h-6" />
        <h2 className="text-[22px] print:text-[14px] font-black text-slate-900 uppercase tracking-[0.2em]">
          {labels.certsTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-2">
        {data.certs.map((c) => {
          const cTr = c.translations[lang] || c.translations.th;
          return (
            <div 
              key={c.id} 
              className={`group flex items-start gap-4 p-5 print:p-3 rounded-2xl print:rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 ${c.file ? 'cursor-pointer' : ''} print:break-inside-avoid`}
              onClick={() => {
                if (c.file) {
                  const targetUrl = c.file.startsWith('http') ? c.file : `/${c.file}`;
                  window.open(targetUrl, '_blank');
                }
              }}
            >
              <div className="w-12 h-12 print:w-8 print:h-8 rounded-xl print:rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <ShieldCheck className="w-6 h-6 print:w-4 print:h-4" />
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="font-black text-slate-900 text-[16px] print:text-[12px] leading-snug mb-1 group-hover:text-blue-700 transition-colors">{cTr.name}</h4>
                <div className="text-blue-600 font-bold text-[13px] print:text-[10px] uppercase tracking-wider">{cTr.org}</div>
              </div>
              
              {c.file && (
                <div className="text-slate-200 group-hover:text-blue-400 transition-colors self-center print:hidden">
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
