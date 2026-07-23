import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setError('Blog is temporarily unavailable.');
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setPosts(data ?? []);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <section className="container-page py-12 md:py-20">
        <div className="max-w-2xl mb-10">
          <span className="badge mb-4">Writing</span>
          <h1 className="section-title">Blog</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Thoughts on architecture, leadership, and the craft of building software at scale.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="card p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">Unable to load posts right now. Please check back later.</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">No posts published yet. Check back soon.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card card-hover overflow-hidden group">
                {post.cover_image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.published_at ?? post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <span className="text-sm text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
