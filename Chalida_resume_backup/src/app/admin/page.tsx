'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Terminal, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'รหัสผ่านไม่ถูกต้อง');
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
      {/* bg glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: 'absolute', width: 400, height: 400, background: 'rgba(99,102,241,0.08)', borderRadius: '50%', filter: 'blur(80px)', top: '20%', left: '30%', transform: 'translate(-50%,-50%)' }} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* card */}
        <div className="glass-card p-8" style={{ background: 'var(--bg-card)' }}>
          {/* icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Terminal size={32} style={{ color: 'var(--accent-primary)' }} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">Admin Panel</h1>
          <p className="text-sm text-center mb-8" style={{ color: 'var(--text-muted)' }}>
            กรอกรหัสผ่านเพื่อเข้าจัดการ Resume
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                <Lock size={12} className="inline mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${error ? '#ef4444' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = error ? '#ef4444' : 'var(--border-color)')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-xs mt-2 text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              style={{
                background: loading || !password ? 'rgba(99,102,241,0.4)' : 'var(--gradient-primary)',
                cursor: loading || !password ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> กำลังเข้าสู่ระบบ...</> : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <p className="text-xs text-center mt-6" style={{ color: 'var(--text-muted)' }}>
            <a href="/" className="hover:underline" style={{ color: 'var(--accent-primary)' }}>← กลับไปหน้า Resume</a>
          </p>
        </div>
      </div>
    </div>
  );
}
