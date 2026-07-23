import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-xl font-bold">
              <span className="text-gradient">Simpy</span>
              <span className="text-slate-900 dark:text-white"> Adwany</span>
            </Link>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {PROFILE.tagline}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Github className="w-5 h-5" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={PROFILE.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Navigate</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Projects</Link></li>
              <li><Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-slate-900 dark:text-white">Get in Touch</h3>
            <a href={`mailto:${PROFILE.email}`} className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              <Mail className="w-4 h-4" />
              {PROFILE.email}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{PROFILE.location}</p>
            <a href={PROFILE.resume} download className="btn-secondary mt-4 !py-2 !px-4 text-sm">
              Download Resume
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Simpy Adwany. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Built with React, Vite, and Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
