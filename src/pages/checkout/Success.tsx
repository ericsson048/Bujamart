import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 font-display text-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-200 dark:border-slate-700">
        <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Commande Confirmée !</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Merci pour votre commande. Vous recevrez un email de confirmation avec les détails de votre achat.
        </p>

        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl mb-8 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-500">N° de commande</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">#ORD-7829</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Montant total</span>
            <span className="text-sm font-bold text-primary">105.000 BIF</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/account/orders" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            Suivre ma commande
          </Link>
          <Link to="/" className="block w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
