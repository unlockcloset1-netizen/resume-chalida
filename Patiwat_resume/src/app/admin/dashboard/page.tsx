'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save, LogOut, Plus, Trash2, User, Briefcase, Code2,
  GraduationCap, Award, Cpu, Terminal, Loader2,
  ChevronDown, ChevronUp, ExternalLink, AlertCircle, CheckCircle2
} from 'lucide-react';

/* ─── TYPES ─── */
interface Profile { name: string; nameTH: string; title: string; photo: string; email: string; phone: string; line: string; location: string; summary: string; }
interface SkillCategory { category: string; items: string[]; }
interface Experience { company: string; position: string; period: string; location: string; description: string; achievements: string[]; tech: string[]; }
interface Project { name: string; description: string; achievements: string[]; tech: string[]; }
interface Education { degree: string; institution: string; period: string; status: string; }
interface Certification { name: string; issuer: string; year: string; }
interface Personal { birthdate: string; nationality: string; religion: string; status: string; }
interface ResumeData {
  profile: Profile; skills: SkillCategory[]; experience: Experience[]; projects: Project[];
  education: Education[]; certifications: Certification[]; personal: Personal; additionalSkills: string[];
}

/* ─── HELPERS ─── */
function arrToStr(arr: string[]) { return arr.join('\n'); }
function strToArr(s: string) { return s.split('\n').map((x) => x.trim()).filter(Boolean); }

/* ─── SECTION WRAPPER ─── */
function SectionCard({ title, icon, children, defaultOpen = true }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-card overflow-hidden mb-6" style={{ background: 'var(--bg-card)' }}>
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        style={{ borderBottom: open ? '1px solid var(--border-color)' : 'none' }}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>{icon}</div>
          <span className="font-semibold">{title}</span>
        </div>
        {open ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
      </button>
      {open && <div className="px-6 py-5">{children}</div>}
    </div>
  );
}

/* ─── FIELD COMPONENTS ─── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all";
const inputStyle = { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' };
function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) { e.target.style.borderColor = 'var(--accent-primary)'; }
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) { e.target.style.borderColor = 'var(--border-color)'; }

function Input({ value, onChange, placeholder = '' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
    className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />;
}
function Textarea({ value, onChange, rows = 3, placeholder = '' }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
    className={inputClass} style={{ ...inputStyle, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} />;
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const router = useRouter();

  /* load data */
  useEffect(() => {
    fetch('/api/resume')
      .then((r) => {
        if (r.status === 401) { router.push('/admin'); return null; }
        return r.json();
      })
      .then((d) => { if (d) setData(d); })
      .catch(() => setStatus({ type: 'error', msg: 'โหลดข้อมูลไม่ได้' }));
  }, [router]);

  /* logout */
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  }

  /* save */
  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'บันทึกสำเร็จ!' });
        setTimeout(() => setStatus(null), 4000);
      } else {
        const d = await res.json();
        setStatus({ type: 'error', msg: d.error || 'บันทึกไม่ได้' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'เกิดข้อผิดพลาดในการบันทึก' });
    } finally {
      setSaving(false);
    }
  }

  /* helpers for nested updates */
  function upProfile(k: keyof Profile, v: string) {
    setData((d) => d ? { ...d, profile: { ...d.profile, [k]: v } } : d);
  }
  function upPersonal(k: keyof Personal, v: string) {
    setData((d) => d ? { ...d, personal: { ...d.personal, [k]: v } } : d);
  }

  function upSkillCategory(i: number, v: string) {
    setData((d) => {
      if (!d) return d;
      const s = [...d.skills]; s[i] = { ...s[i], category: v }; return { ...d, skills: s };
    });
  }
  function upSkillItems(i: number, v: string) {
    setData((d) => {
      if (!d) return d;
      const s = [...d.skills]; s[i] = { ...s[i], items: strToArr(v) }; return { ...d, skills: s };
    });
  }
  function addSkillCat() {
    setData((d) => d ? { ...d, skills: [...d.skills, { category: 'New Category', items: [] }] } : d);
  }
  function removeSkillCat(i: number) {
    setData((d) => d ? { ...d, skills: d.skills.filter((_, idx) => idx !== i) } : d);
  }

  function upExp(i: number, k: keyof Experience, v: string | string[]) {
    setData((d) => {
      if (!d) return d;
      const ex = [...d.experience]; ex[i] = { ...ex[i], [k]: v }; return { ...d, experience: ex };
    });
  }
  function addExp() {
    setData((d) => d ? { ...d, experience: [...d.experience, { company: '', position: '', period: '', location: '', description: '', achievements: [], tech: [] }] } : d);
  }
  function removeExp(i: number) {
    setData((d) => d ? { ...d, experience: d.experience.filter((_, idx) => idx !== i) } : d);
  }

  function upProj(i: number, k: keyof Project, v: string | string[]) {
    setData((d) => {
      if (!d) return d;
      const p = [...d.projects]; p[i] = { ...p[i], [k]: v }; return { ...d, projects: p };
    });
  }
  function addProj() {
    setData((d) => d ? { ...d, projects: [...d.projects, { name: '', description: '', achievements: [], tech: [] }] } : d);
  }
  function removeProj(i: number) {
    setData((d) => d ? { ...d, projects: d.projects.filter((_, idx) => idx !== i) } : d);
  }

  function upEdu(i: number, k: keyof Education, v: string) {
    setData((d) => {
      if (!d) return d;
      const ed = [...d.education]; ed[i] = { ...ed[i], [k]: v }; return { ...d, education: ed };
    });
  }
  function addEdu() {
    setData((d) => d ? { ...d, education: [...d.education, { degree: '', institution: '', period: '', status: '' }] } : d);
  }
  function removeEdu(i: number) {
    setData((d) => d ? { ...d, education: d.education.filter((_, idx) => idx !== i) } : d);
  }

  function upCert(i: number, k: keyof Certification, v: string) {
    setData((d) => {
      if (!d) return d;
      const c = [...d.certifications]; c[i] = { ...c[i], [k]: v }; return { ...d, certifications: c };
    });
  }
  function addCert() {
    setData((d) => d ? { ...d, certifications: [...d.certifications, { name: '', issuer: '', year: '' }] } : d);
  }
  function removeCert(i: number) {
    setData((d) => d ? { ...d, certifications: d.certifications.filter((_, idx) => idx !== i) } : d);
  }

  /* ── LOADING STATE ── */
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
          <p style={{ color: 'var(--text-muted)' }}>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <Terminal size={20} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div>
            <p className="font-bold text-sm">Admin Dashboard</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>จัดการข้อมูล Resume</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-all"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--accent-primary)' }}>
            <ExternalLink size={12} /> ดูหน้า Resume
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-all"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
            <LogOut size={12} /> ออกจากระบบ
          </button>
        </div>
      </header>

      {/* ── SAVE STATUS TOAST ── */}
      {status && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium shadow-xl"
          style={{ background: status.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${status.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`, color: status.type === 'success' ? '#6ee7b7' : '#fca5a5' }}>
          {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {status.msg}
        </div>
      )}

      {/* ── FORM ── */}
      <form onSubmit={handleSave} className="max-w-3xl mx-auto px-4 py-8">

        {/* PROFILE */}
        <SectionCard title="ข้อมูลโปรไฟล์" icon={<User size={16} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="ชื่อ (English)"><Input value={data.profile.name} onChange={(v) => upProfile('name', v)} placeholder="Firstname Lastname" /></Field>
            <Field label="ชื่อ (ภาษาไทย)"><Input value={data.profile.nameTH} onChange={(v) => upProfile('nameTH', v)} placeholder="ชื่อ-นามสกุล" /></Field>
            <Field label="ตำแหน่ง / Title"><Input value={data.profile.title} onChange={(v) => upProfile('title', v)} placeholder="IT Manager" /></Field>
            <Field label="Email"><Input value={data.profile.email} onChange={(v) => upProfile('email', v)} placeholder="email@example.com" /></Field>
            <Field label="เบอร์โทรศัพท์"><Input value={data.profile.phone} onChange={(v) => upProfile('phone', v)} placeholder="08x-xxx-xxxx" /></Field>
            <Field label="Line ID"><Input value={data.profile.line} onChange={(v) => upProfile('line', v)} placeholder="line_id" /></Field>
            <Field label="ที่อยู่"><Input value={data.profile.location} onChange={(v) => upProfile('location', v)} placeholder="Bangkok, Thailand" /></Field>
          </div>
          <Field label="สรุปตัวเอง (Summary)">
            <Textarea value={data.profile.summary} onChange={(v) => upProfile('summary', v)} rows={4} placeholder="สรุปประสบการณ์และความสามารถ..." />
          </Field>
        </SectionCard>

        {/* SKILLS */}
        <SectionCard title="ทักษะ (Skills)" icon={<Cpu size={16} />}>
          {data.skills.map((cat, i) => (
            <div key={i} className="mb-5 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2 mb-3">
                <input type="text" value={cat.category} onChange={(e) => upSkillCategory(i, e.target.value)}
                  placeholder="Category Name" className={inputClass} style={{ ...inputStyle, flex: 1 }} onFocus={onFocus} onBlur={onBlur} />
                <button type="button" onClick={() => removeSkillCat(i)} className="p-2 rounded-lg transition-all hover:bg-red-500/20"
                  style={{ color: '#f87171' }}><Trash2 size={14} /></button>
              </div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Skills (แต่ละบรรทัด = 1 skill)</label>
              <Textarea value={arrToStr(cat.items)} onChange={(v) => upSkillItems(i, v)} rows={4} placeholder={"Windows Server\nLinux\nTCP/IP"} />
            </div>
          ))}
          <button type="button" onClick={addSkillCat}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px dashed rgba(99,102,241,0.4)', color: 'var(--accent-primary)' }}>
            <Plus size={14} /> เพิ่ม Category
          </button>
        </SectionCard>

        {/* EXPERIENCE */}
        <SectionCard title="ประวัติการทำงาน" icon={<Briefcase size={16} />}>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>#{i + 1}</span>
                <button type="button" onClick={() => removeExp(i)} className="p-2 rounded-lg hover:bg-red-500/20" style={{ color: '#f87171' }}><Trash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <Field label="ตำแหน่ง"><Input value={exp.position} onChange={(v) => upExp(i, 'position', v)} placeholder="IT Manager" /></Field>
                <Field label="บริษัท"><Input value={exp.company} onChange={(v) => upExp(i, 'company', v)} placeholder="บริษัท ... จำกัด" /></Field>
                <Field label="ช่วงเวลา"><Input value={exp.period} onChange={(v) => upExp(i, 'period', v)} placeholder="2563 – ปัจจุบัน" /></Field>
                <Field label="สถานที่"><Input value={exp.location} onChange={(v) => upExp(i, 'location', v)} placeholder="กรุงเทพมหานคร" /></Field>
              </div>
              <Field label="คำอธิบาย">
                <Textarea value={exp.description} onChange={(v) => upExp(i, 'description', v)} rows={2} placeholder="อธิบายงาน..." />
              </Field>
              <Field label="ผลงาน / Achievements (แต่ละบรรทัด = 1 รายการ)">
                <Textarea value={arrToStr(exp.achievements)} onChange={(v) => upExp(i, 'achievements', strToArr(v))} rows={4} placeholder={"บริหารทีม IT 5 คน\nวางระบบ Network ใหม่\nลด downtime 80%"} />
              </Field>
              <Field label="Tech Stack (แต่ละบรรทัด = 1 รายการ)">
                <Textarea value={arrToStr(exp.tech)} onChange={(v) => upExp(i, 'tech', strToArr(v))} rows={2} placeholder={"Windows Server\nVMware\nCisco"} />
              </Field>
            </div>
          ))}
          <button type="button" onClick={addExp}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px dashed rgba(16,185,129,0.4)', color: '#6ee7b7' }}>
            <Plus size={14} /> เพิ่มประสบการณ์
          </button>
        </SectionCard>

        {/* PROJECTS */}
        <SectionCard title="โปรเจกต์ (Projects)" icon={<Code2 size={16} />}>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-6 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'rgba(6,182,212,0.15)', color: 'var(--accent-cyan)' }}>#{i + 1}</span>
                <button type="button" onClick={() => removeProj(i)} className="p-2 rounded-lg hover:bg-red-500/20" style={{ color: '#f87171' }}><Trash2 size={14} /></button>
              </div>
              <Field label="ชื่อโปรเจกต์"><Input value={proj.name} onChange={(v) => upProj(i, 'name', v)} placeholder="ชื่อโปรเจกต์" /></Field>
              <Field label="คำอธิบาย">
                <Textarea value={proj.description} onChange={(v) => upProj(i, 'description', v)} rows={2} placeholder="อธิบายโปรเจกต์..." />
              </Field>
              <Field label="ผลงาน (แต่ละบรรทัด = 1 รายการ)">
                <Textarea value={arrToStr(proj.achievements)} onChange={(v) => upProj(i, 'achievements', strToArr(v))} rows={3} placeholder={"ติดตั้ง Firewall\nวาง VLAN\n99.9% uptime"} />
              </Field>
              <Field label="Tech Stack (แต่ละบรรทัด)">
                <Textarea value={arrToStr(proj.tech)} onChange={(v) => upProj(i, 'tech', strToArr(v))} rows={2} placeholder={"Cisco\nFirewall\nVPN"} />
              </Field>
            </div>
          ))}
          <button type="button" onClick={addProj}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px dashed rgba(6,182,212,0.4)', color: 'var(--accent-cyan)' }}>
            <Plus size={14} /> เพิ่มโปรเจกต์
          </button>
        </SectionCard>

        {/* EDUCATION */}
        <SectionCard title="การศึกษา" icon={<GraduationCap size={16} />}>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex justify-end mb-2">
                <button type="button" onClick={() => removeEdu(i)} className="p-2 rounded-lg hover:bg-red-500/20" style={{ color: '#f87171' }}><Trash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="วุฒิการศึกษา"><Input value={edu.degree} onChange={(v) => upEdu(i, 'degree', v)} placeholder="วิทยาศาสตรบัณฑิต..." /></Field>
                <Field label="สถาบัน"><Input value={edu.institution} onChange={(v) => upEdu(i, 'institution', v)} placeholder="มหาวิทยาลัย..." /></Field>
                <Field label="ช่วงเวลา"><Input value={edu.period} onChange={(v) => upEdu(i, 'period', v)} placeholder="2558 – 2562" /></Field>
                <Field label="สถานะ / เกรด"><Input value={edu.status} onChange={(v) => upEdu(i, 'status', v)} placeholder="เกียรตินิยมอันดับ 1 / GPA 3.8" /></Field>
              </div>
            </div>
          ))}
          <button type="button" onClick={addEdu}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px dashed rgba(139,92,246,0.4)', color: '#c4b5fd' }}>
            <Plus size={14} /> เพิ่มการศึกษา
          </button>
        </SectionCard>

        {/* CERTIFICATIONS */}
        <SectionCard title="Certifications" icon={<Award size={16} />} defaultOpen={false}>
          {data.certifications.map((cert, i) => (
            <div key={i} className="mb-3 p-4 rounded-xl flex flex-wrap gap-3 items-end" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-1 min-w-[150px]">
                <Field label="ชื่อ Cert"><Input value={cert.name} onChange={(v) => upCert(i, 'name', v)} placeholder="CompTIA Network+" /></Field>
              </div>
              <div className="flex-1 min-w-[120px]">
                <Field label="ผู้ออก"><Input value={cert.issuer} onChange={(v) => upCert(i, 'issuer', v)} placeholder="CompTIA" /></Field>
              </div>
              <div className="w-24">
                <Field label="ปี"><Input value={cert.year} onChange={(v) => upCert(i, 'year', v)} placeholder="2563" /></Field>
              </div>
              <button type="button" onClick={() => removeCert(i)} className="p-2 rounded-lg hover:bg-red-500/20 mb-4" style={{ color: '#f87171' }}><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" onClick={addCert}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px dashed rgba(251,191,36,0.4)', color: '#fbbf24' }}>
            <Plus size={14} /> เพิ่ม Certification
          </button>
        </SectionCard>

        {/* PERSONAL */}
        <SectionCard title="ข้อมูลส่วนตัว" icon={<User size={16} />} defaultOpen={false}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Field label="วันเกิด"><Input value={data.personal.birthdate} onChange={(v) => upPersonal('birthdate', v)} placeholder="1 ม.ค. 2540" /></Field>
            <Field label="สัญชาติ"><Input value={data.personal.nationality} onChange={(v) => upPersonal('nationality', v)} placeholder="ไทย" /></Field>
            <Field label="ศาสนา"><Input value={data.personal.religion} onChange={(v) => upPersonal('religion', v)} placeholder="พุทธ" /></Field>
            <Field label="สถานภาพ"><Input value={data.personal.status} onChange={(v) => upPersonal('status', v)} placeholder="โสด" /></Field>
          </div>
        </SectionCard>

        {/* ADDITIONAL SKILLS */}
        <SectionCard title="ทักษะอื่นๆ (Additional Skills)" icon={<Terminal size={16} />} defaultOpen={false}>
          <Field label="(แต่ละบรรทัด = 1 ทักษะ)">
            <Textarea
              value={arrToStr(data.additionalSkills)}
              onChange={(v) => setData((d) => d ? { ...d, additionalSkills: strToArr(v) } : d)}
              rows={5}
              placeholder={"บริหารจัดการทีม\nแก้ปัญหาเฉพาะหน้า\nสื่อสารภาษาอังกฤษ"}
            />
          </Field>
        </SectionCard>

        {/* ── SAVE BUTTON ── */}
        <div className="sticky bottom-6 mt-6">
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all"
            style={{
              background: saving ? 'rgba(99,102,241,0.4)' : 'var(--gradient-primary)',
              boxShadow: saving ? 'none' : '0 0 30px rgba(99,102,241,0.5)',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? <><Loader2 size={18} className="animate-spin" /> กำลังบันทึก...</> : <><Save size={18} /> บันทึกข้อมูล</>}
          </button>
        </div>

      </form>
    </div>
  );
}
