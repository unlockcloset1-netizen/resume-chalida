import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface CertsSectionProps {
  data: ResumeData;
  lang: 'th' | 'en' | 'zh';
}

const getCertLogoUrl = (name: string, org: string) => {
  const n = name.toLowerCase();
  const o = org.toLowerCase();

  // 1. Cisco/CCNA
  if (n.includes('ccna') || n.includes('cisco')) {
    return 'https://cdn.simpleicons.org/cisco';
  }

  // 2. Fortinet/NSE/Security
  if (n.includes('nse') || n.includes('security') || n.includes('fortinet')) {
    return 'https://cdn.simpleicons.org/fortinet';
  }

  // 3. Windows Server / Active Directory / Microsoft
  if (n.includes('windows server') || n.includes('ad') || n.includes('active directory') || o.includes('elife systems')) {
    return 'https://cdn.simpleicons.org/microsoft';
  }

  // 4. SQL / Database
  if (n.includes('sql') || n.includes('database')) {
    return 'https://cdn.simpleicons.org/postgresql';
  }

  // 5. Python
  if (n.includes('python')) {
    return 'https://cdn.simpleicons.org/python';
  }

  // 6. Claude / Anthropic
  if (n.includes('claude') || o.includes('anthropic')) {
    return 'https://cdn.simpleicons.org/anthropic';
  }

  // 7. BornToDev
  if (o.includes('borntodev')) {
    return 'https://www.borntodev.com/favicon.ico';
  }

  return null;
};

const CertLogo: React.FC<{ url: string | null; alt: string }> = ({ url, alt }) => {
  const [error, setError] = React.useState(false);

  if (!url || error) {
    return <ShieldCheck className="w-6 h-6 print:w-4 print:h-4 text-slate-400 print:text-slate-900" />;
  }

  return (
    <img 
      src={url} 
      alt={alt} 
      className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
      onError={() => setError(true)}
    />
  );
};

export const CertsSection: React.FC<CertsSectionProps> = ({ data, lang }) => {
  const labels = data.labels[lang] || data.labels.th;

  return (
    <section className="space-y-12 print:space-y-4">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10 print:w-8 print:h-8 print:bg-none print:shadow-none">
          <Award className="w-6 h-6 print:w-5 print:h-5 text-white print:text-slate-900" />
        </div>
        <h2 className="text-[22px] print:text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] leading-none">
          {labels.certsTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-2">
        {data.certs.map((c) => {
          const cTr = c.translations[lang] || c.translations.th;
          const logoUrl = getCertLogoUrl(cTr.name, cTr.org);
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
              <div className="w-12 h-12 print:w-8 print:h-8 rounded-xl print:rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm bg-slate-50/50 border border-slate-100/50 p-2.5 group-hover:bg-white group-hover:border-blue-200/50 print:bg-transparent print:border-none print:p-0">
                <CertLogo url={logoUrl} alt={cTr.org} />
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
