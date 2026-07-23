import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../lib/data';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const related = PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2);

  return (
    <div className="pt-16 md:pt-20">
      <article>
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container-page pb-8">
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to projects
              </Link>
              <span className="badge bg-white/20 text-white backdrop-blur mb-3">{project.category}</span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{project.title}</h1>
              <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-page py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>

            <aside>
              <div className="card p-6 sticky top-24">
                <h3 className="font-display font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="badge">
                      <Tag className="w-3 h-3 mr-1" />
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Category</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Year</span>
                    <span className="font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Featured</span>
                    <span className="font-medium">{project.featured ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
            <div className="container-page">
              <h2 className="font-display text-2xl font-bold mb-8">Related projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((p) => (
                  <Link key={p.id} to={`/projects/${p.id}`} className="card card-hover overflow-hidden group">
                    <div className="aspect-video overflow-hidden">
                      <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
