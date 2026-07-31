import React from 'react';
import { Mail, Phone, MapPin, Calendar, Globe, Award, Languages } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { cn } from '@/lib/utils';

interface SidebarProps {
  data: ResumeData;
  lang: 'th' | 'en' | 'zh';
}

const getDynamicDob = (dobText: string) => {
  if (!dobText) return '';
  
  let birthYear = 1983;
  let birthMonth = 0; // January
  let birthDay = 11;

  // Extract year (4 digits)
  const yearMatch = dobText.match(/\b(19\d{2}|20\d{2}|25\d{2})\b/);
  if (yearMatch) {
    const y = parseInt(yearMatch[1], 10);
    birthYear = y > 2400 ? y - 543 : y;
  }

  // Calculate age
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Replace age patterns
  let text = dobText;
  text = text.replace(/อายุ\s*\d+\s*ปี/g, `อายุ ${age} ปี`);
  text = text.replace(/Age\s*\d+/gi, `Age ${age}`);
  text = text.replace(/\d+\s*岁/g, `${age}岁`);
  return text;
};

export const Sidebar: React.FC<SidebarProps> = ({ data, lang }) => {
  const pTr = data.personal.translations[lang] || data.personal.translations.th;
  const labels = data.labels[lang] || data.labels.th;

  // Split skills into technical and languages
  const technicalSkills = data.skills.filter(s => s.id !== 'sk-8');
  const languageSkills = data.skills.find(s => s.id === 'sk-8');

  const SidebarSection = ({ title, icon: Icon, children, className }: { title: string, icon: any, children: React.ReactNode, className?: string }) => (
    <section className={cn("space-y-4 print:space-y-2", className)}>
      <div className="flex items-center gap-3 border-b border-slate-700/50 pb-2">
        <Icon className="w-5 h-5 text-blue-400 print:w-4 print:h-4" />
        <h3 className="text-[14px] print:text-[11px] font-black text-white uppercase tracking-[0.2em]">
          {title}
        </h3>
      </div>
      <div className="space-y-4 print:space-y-2">{children}</div>
    </section>
  );

  return (
    <aside className="resume-sidebar w-full md:w-[350px] bg-[#001f3f] text-slate-300 flex flex-col print:w-[32%] print:bg-[#001f3f] print:text-white">
      
      {/* Profile Section */}
      <div className="p-10 pb-12 print:p-6 print:pb-6 flex flex-col items-center text-center bg-slate-900/20">
        <div className="relative mb-8 print:mb-4">
          <div className="w-44 h-44 print:w-28 print:h-28 rounded-full border-4 border-blue-500/30 overflow-hidden shadow-2xl relative z-10">
            <img 
              src={data.personal.photo ? (data.personal.photo.startsWith('http') ? data.personal.photo : `/${data.personal.photo}`) : 'https://ui-avatars.com/api/?name=User&size=200'} 
              alt={pTr.name} 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 print:w-8 print:h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#001f3f] z-20">
            <Globe className="w-5 h-5 print:w-3.5 print:h-3.5 text-white" />
          </div>
        </div>
        
        <h1 className="text-[24px] print:text-[18px] font-black text-white leading-tight mb-1 tracking-tight">
          {pTr.name}
        </h1>
        
        <div className="text-[14px] print:text-[10px] font-bold text-blue-300 mt-2 print:mt-1 border-t border-slate-700/50 pt-3 print:pt-1.5 w-full leading-normal">
          {pTr.title}
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="p-10 print:p-6 space-y-12 print:space-y-6 flex-1 overflow-y-auto">
        
        {/* Contact Info */}
        <SidebarSection title={lang === 'th' ? 'ข้อมูลติดต่อ' : 'CONTACT'} icon={Globe}>
          <div className="space-y-4 print:space-y-2">
            {[
              { icon: Mail, value: data.personal.email, link: `mailto:${data.personal.email}` },
              { icon: Phone, value: data.personal.phone, link: `tel:${data.personal.phone}` },
              { icon: MapPin, value: pTr.location },
              { icon: Calendar, value: getDynamicDob(pTr.dob) }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 print:gap-2 group">
                <div className="w-9 h-9 print:w-6 print:h-6 rounded-full bg-slate-800/40 border border-slate-700/30 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-blue-500/50 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300">
                  <item.icon className="w-4 h-4 print:w-3 print:h-3" />
                </div>
                <div className="flex flex-col min-w-0 pt-1 print:pt-0">
                  {item.link ? (
                    <a href={item.link} className="text-[15px] print:text-[11px] font-bold text-slate-300 hover:text-white transition-colors break-all leading-snug">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[15px] print:text-[11px] font-bold text-slate-300 leading-snug">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SidebarSection>

        {/* Skills */}
        <SidebarSection title={labels.skillsTitle} icon={Award}>
          <div className="space-y-6 print:space-y-3">
            {technicalSkills.map((s) => {
              const sTr = s.translations[lang] || s.translations.th;
              return (
                <div key={s.id} className="space-y-2 print:space-y-1">
                  <h4 className="text-[12px] print:text-[10px] font-black text-blue-400/80 uppercase tracking-widest">
                    {sTr?.name || ''}
                  </h4>
                  <div className="flex flex-wrap gap-2 print:gap-1">
                    {(s.tags || []).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[13px] print:text-[10px] font-bold text-white bg-slate-800/50 px-3 py-1 print:px-2 print:py-0.5 rounded-md border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SidebarSection>

        {/* Languages */}
        {languageSkills && (
          <SidebarSection title={lang === 'th' ? 'ภาษา' : 'LANGUAGES'} icon={Languages}>
            <div className="space-y-4 print:space-y-2">
              {((languageSkills.tags || [])).map((langItem, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 print:gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] print:text-[11px] font-bold text-white">{langItem.split('(')[0].trim()}</span>
                    <span className="text-[12px] print:text-[10px] font-bold text-blue-400">{langItem.includes('(') ? langItem.match(/\(([^)]+)\)/)?.[1] : ''}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: langItem.toLowerCase().includes('native') ? '100%' : '30%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </SidebarSection>
        )}

      </div>

      <div className="p-8 print:p-4 text-[11px] print:text-[9px] font-bold text-slate-500 text-center border-t border-slate-800 bg-slate-900/20 mt-auto">
        PORTFOLIO 2026 • QM & ISO MANAGER
      </div>
    </aside>
  );
};
