import React from 'react';

interface RichTextProps {
  text: string | string[];
}

export const RichText: React.FC<RichTextProps> = ({ text }) => {
  const lines = Array.isArray(text) ? text : text.split('\n');
  
  return (
    <div className="space-y-2 print:space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Custom Dividers
        if (/^[━─=]{3,}$/.test(trimmed)) {
          return <hr key={i} className="my-6 print:my-3 border-slate-100" />;
        }
        
        // Category Headers (e.g., 1. Management)
        const categoryMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
        if (categoryMatch) {
          const content = categoryMatch[2];
          return (
            <div key={i} className="mt-10 mb-5 print:mt-4 print:mb-2 border-l-4 border-blue-600 pl-5 print:pl-3 py-1.5 print:py-1 bg-blue-50/40 rounded-r print:break-after-avoid">
              <h4 className="text-[20px] print:text-[14px] font-black text-slate-900 uppercase tracking-wide">
                {content}
              </h4>
            </div>
          );
        }

        // Special Highlights (🔹)
        if (/^[🔹🔸◆◇►▪★]/u.test(trimmed)) {
          return (
            <div key={i} className="mt-8 mb-4 print:mt-3 print:mb-2 p-5 print:p-3 bg-slate-50 border border-slate-200 rounded-2xl print:rounded-xl shadow-sm">
              <span className="text-[18px] print:text-[13px] font-black text-slate-900 leading-relaxed block">
                {trimmed.replace(/^[🔹🔸◆◇►▪★]\s*/u, '')}
              </span>
            </div>
          );
        }

        // Standard Bullets (-)
        const isPoint = /^[-•○*–]/.test(trimmed);
        if (isPoint) {
          return (
            <div key={i} className="flex items-start gap-4 print:gap-2 text-[19px] print:text-[13px] text-slate-700 leading-[1.7] print:leading-[1.4] pl-3 py-0.5 print:py-0.25 group print:break-inside-avoid">
              <div className="mt-3 print:mt-1.5 w-2 h-2 print:w-1.5 print:h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-sm" />
              <span className="flex-1 font-medium">{trimmed.replace(/^[-•○*–]\s*/, '')}</span>
            </div>
          );
        }

        // Standard Text
        return (
          <p key={i} className="text-[19px] print:text-[13px] text-slate-700 leading-[1.8] print:leading-[1.4] font-medium pl-2">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};
