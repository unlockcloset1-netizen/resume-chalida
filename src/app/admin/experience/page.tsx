'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { 
  Save, 
  Loader2, 
  Briefcase, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  GripVertical,
  X,
  Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Language = 'th' | 'en' | 'zh';

export default function ExperienceAdmin() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [activeLang, setActiveLang] = useState<Language>('th');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSaveAll = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setMessage({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: 'เกิดข้อผิดพลาดในการบันทึก', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'Error saving data', type: 'error' });
    }
    setSaving(false);
  };

  const addItem = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      translations: {
        th: { title: '', org: '', meta: '', bullets: [] },
        en: { title: '', org: '', meta: '', bullets: [] },
        zh: { title: '', org: '', meta: '', bullets: [] }
      }
    };
    setEditingItem(newItem);
    setEditingIndex(-1);
    setIsModalOpen(true);
  };

  const openEdit = (idx: number) => {
    // Deep copy the item to avoid modifying original until Save is clicked
    setEditingItem(JSON.parse(JSON.stringify(data!.experience[idx])));
    setEditingIndex(idx);
    setIsModalOpen(true);
  };

  const saveEntry = () => {
    if (!data || !editingItem) return;
    const newData = { ...data };
    if (editingIndex === -1) {
      newData.experience.unshift(editingItem);
    } else if (editingIndex !== null) {
      newData.experience[editingIndex] = editingItem;
    }
    setData(newData);
    setIsModalOpen(false);
    setEditingItem(null);
    setEditingIndex(null);
  };

  const removeItem = (id: string) => {
    if (!data || !confirm('ยืนยันการลบรายการนี้?')) return;
    const newData = { ...data };
    newData.experience = newData.experience.filter(item => item.id !== id);
    setData(newData);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (!data) return;
    const newData = { ...data };
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newData.experience.length) return;
    const temp = newData.experience[index];
    newData.experience[index] = newData.experience[targetIndex];
    newData.experience[targetIndex] = temp;
    setData(newData);
  };

  const updateEditingItem = (field: string, value: any) => {
    if (!editingItem) return;
    const newItem = { ...editingItem };
    if (field === 'bullets') {
      newItem.translations[activeLang].bullets = value.split('\n');
    } else if (field === 'highlight') {
      newItem.translations[activeLang].highlight = value;
    } else {
      newItem.translations[activeLang][field] = value;
    }
    setEditingItem(newItem);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
    </div>
  );

  if (!data) return <div>Error loading data</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">จัดการประสบการณ์ทำงาน</h1>
          <p className="text-slate-900 font-semibold mt-1">เพิ่มหรือแก้ไขประวัติการทำงานในแต่ละช่วงเวลา</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={addItem}
            className="bg-white text-slate-700 px-5 py-2.5 rounded-xl card-shadow border border-slate-100 font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            เพิ่มรายการใหม่
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-primary-blue text-white px-6 py-2.5 rounded-xl shadow-lg shadow-blue-200 font-bold hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            บันทึกข้อมูลทั้งหมด
          </button>
        </div>
      </div>

      {message && (
        <div className={cn(
          "p-4 rounded-2xl flex items-center gap-3 animate-in zoom-in duration-300",
          message.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
        )}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      {/* Language Switcher */}
      <div className="flex gap-2 bg-white p-1 rounded-2xl w-fit card-shadow border border-slate-50">
        {(['th', 'en', 'zh'] as const).map(lang => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-black transition-all uppercase",
              activeLang === lang ? "bg-slate-900 text-white" : "text-slate-800 hover:text-black hover:bg-slate-50"
            )}
          >
            {lang === 'th' ? 'ภาษาไทย' : lang === 'en' ? 'English' : 'Chinese'}
          </button>
        ))}
      </div>

      {/* List of Experiences */}
      <div className="space-y-4">
        {data.experience.map((item, idx) => (
          <div key={item.id} className="bg-white rounded-2xl card-shadow border border-slate-50 overflow-hidden group hover:border-blue-100 transition-colors">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg shadow-sm text-slate-400">
                  <GripVertical size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.translations[activeLang].title || 'ไม่มีชื่อตำแหน่ง'}</h3>
                  <p className="text-sm text-slate-900 font-semibold">{item.translations[activeLang].org} • {item.translations[activeLang].meta}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => moveItem(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-20"
                >
                  <ChevronUp size={20} />
                </button>
                <button 
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === data.experience.length - 1}
                  className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-20"
                >
                  <ChevronDown size={20} />
                </button>
                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                <button 
                  onClick={() => openEdit(idx)}
                  className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                  title="แก้ไข"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                  title="ลบ"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.experience.length === 0 && (
          <div className="bg-white rounded-3xl card-shadow border border-slate-50 p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Briefcase size={32} />
            </div>
            <p className="text-slate-900 font-bold">ยังไม่มีข้อมูลประสบการณ์ทำงาน</p>
            <button onClick={addItem} className="mt-4 text-primary-blue font-extrabold hover:underline">
              + เพิ่มรายการแรก
            </button>
          </div>
        )}
      </div>

      {/* Edit Experience Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col min-h-[600px] max-h-[90vh] relative animate-in zoom-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight uppercase">Edit Experience</h2>
                <p className="text-slate-900 text-sm font-bold mt-1">แก้ไขรายละเอียดประสบการณ์ทำงาน ({activeLang.toUpperCase()})</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-950 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable Content) */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-950 uppercase tracking-wider">ตำแหน่ง (Job Title)</label>
                  <input 
                    type="text" 
                    value={editingItem.translations[activeLang].title}
                    onChange={(e) => updateEditingItem('title', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-950"
                    placeholder="เช่น Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-955 uppercase tracking-wider">องค์กร (Organization)</label>
                  <input 
                    type="text" 
                    value={editingItem.translations[activeLang].org}
                    onChange={(e) => updateEditingItem('org', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-950"
                    placeholder="เช่น Google Inc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-955 uppercase tracking-wider">ช่วงเวลา (Period)</label>
                <input 
                  type="text" 
                  value={editingItem.translations[activeLang].meta}
                  onChange={(e) => updateEditingItem('meta', e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all font-semibold text-slate-950"
                  placeholder="เช่น Jan 2020 - Present"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-955 uppercase tracking-wider flex items-center justify-between">
                  <span>รายละเอียดงาน (Responsibilities)</span>
                  <span className="text-[12px] font-bold text-slate-800 italic normal-case">* หนึ่งรายการต่อหนึ่งบรรทัด</span>
                </label>
                <textarea 
                  rows={10}
                  value={editingItem.translations[activeLang].bullets.join('\n')}
                  onChange={(e) => updateEditingItem('bullets', e.target.value)}
                  className="w-full px-6 py-5 rounded-[24px] border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium leading-relaxed text-[17px] text-slate-950 min-h-[250px]"
                  placeholder="• Developed scalable microservices&#10;• Led a team of 5 engineers"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-955 uppercase tracking-wider">ผลงานเด่น (Key Highlights)</label>
                <textarea 
                  rows={4}
                  value={editingItem.translations[activeLang].highlight || ''}
                  onChange={(e) => updateEditingItem('highlight', e.target.value)}
                  className="w-full px-6 py-5 rounded-[24px] border border-blue-50 bg-blue-50/5 focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-950 leading-relaxed text-[17px]"
                  placeholder="เช่น ลดเวลาการทำงานของระบบลง 50% หรือได้รับรางวัลพนักงานดีเด่น"
                />
              </div>
            </div>

            {/* Modal Footer (Fixed at Bottom) */}
            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex items-center justify-end gap-4 sticky bottom-0 z-10">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3.5 rounded-2xl text-slate-900 font-extrabold hover:bg-slate-100 hover:text-black transition-all uppercase tracking-wider text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={saveEntry}
                className="px-10 py-3.5 rounded-2xl bg-primary-blue text-white font-bold shadow-xl shadow-blue-200 hover:bg-blue-600 active:scale-95 transition-all uppercase tracking-wider text-sm"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
