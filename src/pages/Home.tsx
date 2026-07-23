import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Network, Camera, Code, Users, CheckCircle2, GraduationCap } from 'lucide-react';
import { PROFILE, SERVICES, SKILLS, EXPERIENCE, PROJECTS } from '../lib/data';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  Camera,
  Code,
  Users,
};

export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-page py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="badge mb-6">
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse" />
                Technical Director · 21+ years experience
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-slate-900 dark:text-white">Architecting </span>
                <span className="text-gradient">network & surveillance</span>
                <span className="text-slate-900 dark:text-white"> systems.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                {PROFILE.bio}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/projects" className="btn-primary">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={PROFILE.resume} download className="btn-secondary">
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/30 to-accent-500/30 rounded-3xl blur-2xl" />
                <img
                  src={PROFILE.avatar}
                  alt={PROFILE.name}
                  className="relative rounded-3xl object-cover w-full aspect-square shadow-2xl border border-slate-200 dark:border-slate-800"
                />
                <div className="absolute -bottom-6 -left-6 card p-4 shadow-xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90">
                  <p className="font-display font-bold text-2xl text-gradient">21+ Years</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">of engineering leadership</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROFILE.stats.map((stat, i) => (
              <div key={stat.label} className="text-center animate-fade-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <p className="font-display text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge mb-4">What I Do</span>
          <h2 className="section-title">Specialized expertise in systems & leadership</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Network;
            return (
              <div key={service.title} className="card card-hover p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Toolkit</span>
            <h2 className="section-title">Technologies & competencies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((group) => (
              <div key={group.category} className="card p-6">
                <h3 className="font-display font-semibold mb-4 text-brand-600 dark:text-brand-400">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12">
        <div className="container-page">
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Education</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{PROFILE.education}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="container-page py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge mb-4">Career</span>
          <h2 className="section-title">Two decades of building and leading</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:-translate-x-1/2" />
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={`relative mb-10 md:mb-12 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
              <div className={`absolute top-2 w-3 h-3 rounded-full bg-brand-600 ring-4 ring-white dark:ring-slate-950 ${i % 2 === 0 ? 'left-4 md:left-auto md:right-0 md:translate-x-1/2' : 'left-4 md:left-0 md:-translate-x-1/2'}`} />
              <div className="card card-hover p-6 ml-10 md:ml-0">
                <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{exp.period}</span>
                <h3 className="font-display font-bold text-lg mt-1">{exp.role}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{exp.company}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="badge mb-4">Selected Work</span>
              <h2 className="section-title">Featured projects</h2>
            </div>
            <Link to="/projects" className="btn-ghost hidden sm:inline-flex">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="card card-hover overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{project.category}</span>
                  <h3 className="font-display font-semibold text-lg mt-1 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/projects" className="btn-secondary">
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/30 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Let's build something together</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">Whether you need a network management solution, video surveillance firmware, or technical leadership for your engineering team — let's talk.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white text-brand-700 hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5">
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={PROFILE.resume} download className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white border border-white/30 hover:bg-white/10 transition-all duration-200">
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
