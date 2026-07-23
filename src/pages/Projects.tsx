import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { PROJECTS } from '../lib/data';

export default function Projects() {
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="pt-16 md:pt-20">
      <section className="container-page py-12 md:py-20">
        <div className="max-w-2xl mb-10">
          <span className="badge mb-4">Portfolio</span>
          <h1 className="section-title">Projects & Case Studies</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            A selection of systems I've architected and led — from cloud platforms to AI infrastructure to financial systems processing billions in volume.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="card card-hover overflow-hidden group">
              <div className="aspect-video overflow-hidden relative">
                <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 badge bg-white/90 dark:bg-slate-900/90 backdrop-blur">
                  <Calendar className="w-3 h-3 mr-1" />
                  {project.year}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{project.category}</span>
                <h3 className="font-display font-semibold text-lg mt-1 mb-2">{project.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="badge text-xs">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="badge text-xs">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
              <div className="px-6 pb-6 flex items-center justify-between">
                <span className="text-sm text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read case study
                  <ArrowRight className="w-4 h-4" />
                </span>
                {project.repoUrl && (
                  <Github className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
