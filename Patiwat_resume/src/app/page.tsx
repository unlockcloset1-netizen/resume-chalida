'use client';

import { useEffect, useRef, useState } from 'react';
import resumeData from '@/data/resume.json';
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Briefcase, GraduationCap, Code2, Cpu,
  User, Award, ChevronUp, Terminal,
  Shield, Network, Layers, Star
} from 'lucide-react';

/* ─────────────── SCROLL REVEAL HOOK ─────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            // activate progress bars inside revealed element
            e.target.querySelectorAll('.progress-fill').forEach((bar) => bar.classList.add('active'));
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────── FLOATING NAV HOOK ─────────────── */
const SECTIONS = ['hero', 'summary', 'skills', 'experience', 'projects', 'education', 'personal'];

function useActiveSection() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return active;
}

/* ─────────────── TYPEWRITER ─────────────── */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="border-r-2 border-indigo-400 ml-0.5 animate-pulse" />
    </span>
  );
}

/* ─────────────── PARTICLES COMPONENT ─────────────── */
function Particles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            opacity: 0.4 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────── SECTION WRAPPER ─────────────── */
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-20 px-4 max-w-5xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

/* ─────────────── SKILL CATEGORY ICONS ─────────────── */
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Infrastructure & Network': <Network size={18} />,
  'Systems & Tools': <Cpu size={18} />,
  'Programming & Web': <Code2 size={18} />,
  'Security': <Shield size={18} />,
};

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function ResumePage() {
  const [showTop, setShowTop] = useState(false);
  const active = useActiveSection();
  useScrollReveal();

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const { profile, skills, experience, projects, education, certifications, personal, additionalSkills } = resumeData;

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* ── FLOATING NAV DOTS ── */}
      <nav className="floating-nav" aria-label="Section navigation">
        {SECTIONS.map((s) => (
          <button
            key={s}
            className={`nav-dot ${active === s ? 'active' : ''}`}
            title={s.charAt(0).toUpperCase() + s.slice(1)}
            onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </nav>

      {/* ── BACK TO TOP ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full"
          style={{ background: 'var(--accent-primary)', boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
        style={{ background: 'linear-gradient(180deg, #0d0d1a 0%, var(--bg-primary) 100%)' }}
      >
        {/* background glows */}
        <div className="hero-glow" style={{ width: 500, height: 500, background: 'rgba(99,102,241,0.12)', top: '10%', left: '-10%', animationDelay: '0s' }} />
        <div className="hero-glow" style={{ width: 400, height: 400, background: 'rgba(139,92,246,0.08)', top: '40%', right: '-8%', animationDelay: '2s' }} />
        <div className="hero-glow" style={{ width: 300, height: 300, background: 'rgba(6,182,212,0.07)', bottom: '10%', left: '30%', animationDelay: '4s' }} />
        <Particles />

        {/* grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div className="relative z-10 text-center max-w-3xl">
          {/* avatar / icon */}
          <div
            className="mx-auto mb-8 flex items-center justify-center rounded-full reveal-scale"
            style={{
              width: 120, height: 120,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
              border: '2px solid rgba(99,102,241,0.4)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          >
            <Terminal size={48} style={{ color: 'var(--accent-primary)' }} />
          </div>

          <div className="reveal">
            <p className="text-sm font-mono mb-3" style={{ color: 'var(--accent-cyan)', letterSpacing: '0.2em' }}>
              &gt;&gt; RESUME_v2.0.26
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-3">
              {profile.name}
            </h1>
            <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>{profile.nameTH}</p>
            <div className="text-2xl md:text-3xl font-semibold mt-4 mb-6 h-10">
              <Typewriter texts={[
                profile.title,
                'Network Infrastructure',
                'Cloud & DevOps',
                'Team Leadership',
              ]} />
            </div>
          </div>

          <p className="reveal delay-200 text-base max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {profile.summary}
          </p>

          <div className="reveal delay-300 flex flex-wrap justify-center gap-3 mb-10">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--text-primary)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.15)')}>
                <Mail size={14} /> {profile.email}
              </a>
            )}
            {profile.location && (
              <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7' }}>
                <MapPin size={14} /> {profile.location}
              </span>
            )}
          </div>

          <button
            className="reveal delay-400 px-8 py-3 rounded-full font-semibold text-sm transition-all"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
            onClick={() => document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Resume ↓
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROFESSIONAL SUMMARY
      ════════════════════════════════════════ */}
      <Section id="summary">
        <div className="reveal mb-12">
          <h2 className="section-title">
            <Star size={24} style={{ color: 'var(--accent-primary)' }} />
            <span className="gradient-text">Professional Summary</span>
          </h2>
        </div>
        <div className="glass-card reveal delay-200 p-8" style={{ background: 'var(--gradient-card)', borderLeft: '3px solid var(--accent-primary)' }}>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {profile.summary}
          </p>
          {additionalSkills && additionalSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {additionalSkills.map((s: string, i: number) => (
                <span key={i} className="skill-badge" style={{ color: '#c4b5fd', borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.1)' }}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      {(profile.email || profile.phone || profile.line) && (
        <Section id="contact">
          <div className="reveal mb-12">
            <h2 className="section-title">
              <Mail size={24} style={{ color: 'var(--accent-cyan)' }} />
              <span className="gradient-text">Contact</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="glass-card reveal delay-100 p-5 flex items-center gap-4 no-underline">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <Mail size={20} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Email</p>
                  <p className="text-sm font-medium">{profile.email}</p>
                </div>
              </a>
            )}
            {profile.phone && (
              <div className="glass-card reveal delay-200 p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <Phone size={20} style={{ color: 'var(--accent-green)' }} />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Phone</p>
                  <p className="text-sm font-medium">{profile.phone}</p>
                </div>
              </div>
            )}
            {profile.location && (
              <div className="glass-card reveal delay-300 p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(6,182,212,0.15)' }}>
                  <MapPin size={20} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Location</p>
                  <p className="text-sm font-medium">{profile.location}</p>
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════ */}
      <Section id="skills">
        <div className="reveal mb-12">
          <h2 className="section-title">
            <Layers size={24} style={{ color: 'var(--accent-secondary)' }} />
            <span className="gradient-text">Skills</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((cat: { category: string; items: string[] }, ci: number) => (
            <div key={ci} className={`glass-card reveal p-6 delay-${(ci + 1) * 100}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                  {CATEGORY_ICONS[cat.category] ?? <Cpu size={18} />}
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item: string, ii: number) => (
                  <span key={ii} className="skill-badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          WORK EXPERIENCE
      ════════════════════════════════════════ */}
      {experience && experience.length > 0 && (
        <Section id="experience">
          <div className="reveal mb-12">
            <h2 className="section-title">
              <Briefcase size={24} style={{ color: 'var(--accent-green)' }} />
              <span className="gradient-text">ประวัติการทำงาน</span>
            </h2>
          </div>
          <div className="relative pl-8">
            <div className="timeline-line" />
            {experience.map((exp: {
              company: string; position: string; period: string; location?: string;
              description?: string; achievements?: string[]; tech?: string[];
            }, ei: number) => (
              <div key={ei} className={`relative mb-10 reveal delay-${(ei + 1) * 100}`}>
                <div className="absolute -left-8 top-1 flex items-center justify-center">
                  <div className="timeline-dot" />
                </div>
                <div className="glass-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{exp.position}</h3>
                      <p className="font-medium" style={{ color: 'var(--accent-primary)' }}>{exp.company}</p>
                      {exp.location && <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}><MapPin size={12} className="inline mr-1" />{exp.location}</p>}
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full font-mono" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7' }}>
                      {exp.period}
                    </span>
                  </div>
                  {exp.description && <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((a: string, ai: number) => (
                        <li key={ai} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent-primary)', marginTop: 4, flexShrink: 0 }}>▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t: string, ti: number) => <span key={ti} className="tech-tag">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════ */}
      {projects && projects.length > 0 && (
        <Section id="projects">
          <div className="reveal mb-12">
            <h2 className="section-title">
              <Code2 size={24} style={{ color: 'var(--accent-cyan)' }} />
              <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj: {
              name: string; description?: string; achievements?: string[]; tech?: string[];
            }, pi: number) => (
              <div key={pi} className={`glass-card reveal p-6 delay-${(pi + 1) * 100}`}
                style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.05), rgba(99,102,241,0.05))' }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg mt-0.5" style={{ background: 'rgba(6,182,212,0.15)' }}>
                    <Terminal size={16} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <h3 className="text-base font-bold leading-snug">{proj.name}</h3>
                </div>
                {proj.description && <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>}
                {proj.achievements && proj.achievements.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {proj.achievements.map((a: string, ai: number) => (
                      <li key={ai} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-cyan)', marginTop: 4, flexShrink: 0 }}>▸</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
                {proj.tech && proj.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t: string, ti: number) => <span key={ti} className="tech-tag">{t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ════════════════════════════════════════
          EDUCATION
      ════════════════════════════════════════ */}
      {education && education.length > 0 && (
        <Section id="education">
          <div className="reveal mb-12">
            <h2 className="section-title">
              <GraduationCap size={24} style={{ color: 'var(--accent-secondary)' }} />
              <span className="gradient-text">การศึกษา</span>
            </h2>
          </div>
          <div className="space-y-4">
            {education.map((edu: { degree: string; institution: string; period: string; status?: string }, ei: number) => (
              <div key={ei} className={`glass-card reveal delay-${(ei + 1) * 100} p-6 flex flex-wrap items-center gap-4`}>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.15)' }}>
                  <GraduationCap size={22} style={{ color: 'var(--accent-secondary)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--accent-primary)' }}>{edu.institution}</p>
                  {edu.status && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{edu.status}</p>}
                </div>
                <span className="text-sm px-3 py-1 rounded-full font-mono shrink-0" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}>
                  {edu.period}
                </span>
              </div>
            ))}
          </div>

          {/* certifications */}
          {certifications && certifications.length > 0 && (
            <div className="mt-10">
              <h3 className="reveal font-semibold mb-5 text-base flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Award size={16} style={{ color: 'var(--accent-primary)' }} />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert: { name: string; issuer: string; year: string }, ci: number) => (
                  <div key={ci} className={`glass-card reveal delay-${(ci + 1) * 100} px-5 py-3 flex items-center gap-3`}>
                    <Award size={16} style={{ color: '#fbbf24' }} />
                    <div>
                      <p className="text-sm font-semibold">{cert.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {/* ════════════════════════════════════════
          PERSONAL INFO
      ════════════════════════════════════════ */}
      <Section id="personal">
        <div className="reveal mb-12">
          <h2 className="section-title">
            <User size={24} style={{ color: 'var(--accent-green)' }} />
            <span className="gradient-text">ข้อมูลส่วนตัว</span>
          </h2>
        </div>
        <div className="glass-card reveal p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {personal.birthdate && (
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>วันเกิด</p>
                <p className="font-medium text-sm">{personal.birthdate}</p>
              </div>
            )}
            {personal.nationality && (
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>สัญชาติ</p>
                <p className="font-medium text-sm">{personal.nationality}</p>
              </div>
            )}
            {personal.religion && (
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>ศาสนา</p>
                <p className="font-medium text-sm">{personal.religion}</p>
              </div>
            )}
            {personal.status && (
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>สถานะ</p>
                <p className="font-medium text-sm">{personal.status}</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="text-center py-12 px-4" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <p className="text-sm font-mono">
          &lt;/{profile.name}&gt; · {new Date().getFullYear()}
        </p>
        <p className="text-xs mt-2">Built with Next.js · Tailwind CSS</p>
      </footer>

    </div>
  );
}
