import { Link } from 'react-router-dom';

import { getCurrentRole } from '../../services/auth';

export default function OrderSuccess() {
  const role = getCurrentRole();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 font-display text-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-200 dark:border-slate-700">
        <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Commande confirmee !</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Votre commande a ete enregistree avec succes.</p>

        <div className="space-y-3">
          {role === 'admin' ? (
            <Link to="/admin/orders" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Voir les commandes
            </Link>
          ) : (
            <Link to="/profile" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Mon profil
            </Link>
          )}
          <Link to="/" className="block w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Retour a l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
