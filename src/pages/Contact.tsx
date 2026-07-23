import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PROFILE } from '../lib/data';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!supabase) {
      setStatus('error');
      setErrorMsg('Messaging is temporarily unavailable. Please email directly.');
      return;
    }

    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject || 'No subject',
      message: form.message,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email directly.');
      return;
    }

    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="container-page py-12 md:py-20">
        <div className="max-w-2xl mb-10">
          <span className="badge mb-4">Get in Touch</span>
          <h1 className="section-title">Let's work together</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Have a project, role, or idea you'd like to discuss? Send a message and I'll get back to you within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="you@example.com"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-field"
                  placeholder="What's this about?"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field min-h-[160px] resize-y"
                  placeholder="Tell me about your project or inquiry..."
                  disabled={status === 'submitting'}
                />
              </div>

              {status === 'error' && errorMsg && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <p className="text-sm">{errorMsg}</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Message sent successfully!</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">I'll get back to you within 48 hours.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-semibold mb-4">Contact Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                    <a href={`mailto:${PROFILE.email}`} className="text-sm font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{PROFILE.email}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="text-sm font-medium">{PROFILE.location}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-semibold mb-4">Find me online</h3>
              <div className="flex items-center gap-3">
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={PROFILE.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
              <h3 className="font-display font-semibold mb-2">Resume</h3>
              <p className="text-sm text-white/80 mb-4">Download my full resume for a detailed breakdown of my experience.</p>
              <a href={PROFILE.resume} download className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-brand-700 hover:bg-slate-100 transition-all text-sm font-medium">
                Download Resume
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
