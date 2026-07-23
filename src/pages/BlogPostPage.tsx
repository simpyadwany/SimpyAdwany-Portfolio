import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-16 md:pt-20 container-page py-20">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-4" />
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-6" />
          <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl mb-8" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-16 md:pt-20">
      <article>
        <div className="container-page py-12 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post!.published_at ?? post!.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">{post!.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post!.tags.map((tag) => (
              <span key={tag} className="badge">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {post!.cover_image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-10">
              <img src={post!.cover_image} alt={post!.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div
            className="prose-content max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post!.content) }}
          />

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link to="/blog" className="btn-ghost">
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post!.title, url: window.location.href });
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
              className="btn-ghost"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function renderMarkdown(md: string): string {
  let html = md;
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  const lines = html.split('\n');
  let inList = false;
  const result: string[] = [];
  for (const line of lines) {
    if (line.match(/^- /)) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push('<li>' + line.replace(/^- /, '') + '</li>');
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      if (line.trim() && !line.startsWith('<h') && !line.startsWith('<ul') && !line.startsWith('</ul')) {
        result.push('<p>' + line + '</p>');
      } else if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('</ul')) {
        result.push(line);
      }
    }
  }
  if (inList) result.push('</ul>');
  return result.join('\n');
}
