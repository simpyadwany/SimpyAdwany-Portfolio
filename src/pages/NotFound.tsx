import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center">
      <div className="container-page text-center">
        <p className="font-display text-8xl md:text-9xl font-bold text-gradient">404</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold mt-4">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
