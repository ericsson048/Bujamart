import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 font-display text-center">
      <h1 className="text-9xl font-black text-primary/20">404</h1>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white -mt-12 mb-4">Page introuvable</h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
        <span className="material-symbols-outlined">home</span>
        Retour à l'accueil
      </Link>
    </div>
  );
}
