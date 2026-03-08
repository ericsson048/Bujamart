import { Link, Navigate, useNavigate } from 'react-router-dom';

import { api } from '../services/api';
import { clearCurrentUser, getCurrentRole, getCurrentUser } from '../services/auth';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return 'U';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const role = getCurrentRole();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function handleLogout() {
    const refreshToken = localStorage.getItem('bujamart_refresh_token');
    if (refreshToken) {
      try {
        await api.logout({ refresh_token: refreshToken });
      } catch {
        // ignore remote logout errors
      }
    }
    clearCurrentUser();
    navigate('/login');
  }

  const roleLabel = role === 'admin' ? 'Administrateur' : role === 'client' ? 'Client' : 'Invite';
  const roleClasses =
    role === 'admin'
      ? 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
      : 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#1e293b_0%,#0f172a_40%,#020617_100%)] p-4 text-slate-100 font-display sm:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-xl">
              <span className="material-symbols-outlined">shopping_bag</span>
              Bujamart
            </Link>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
            >
              Se deconnecter
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-lg font-black text-white shadow-lg shadow-primary/30">
                {initials(user.full_name)}
              </div>
              <div>
                <h1 className="text-2xl font-black text-white sm:text-3xl">{user.full_name}</h1>
                <p className="text-sm text-slate-300">{user.email}</p>
              </div>
            </div>
            <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${roleClasses}`}>
              {roleLabel}
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">Compte</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">Actif</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">Type</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">{roleLabel}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">Email verifie</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">Oui</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <h2 className="text-xl font-bold text-white">Actions rapides</h2>
          <p className="mt-1 text-sm text-slate-300">Accede rapidement aux pages les plus utilisees.</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
              <span className="material-symbols-outlined text-lg">store</span>
              Voir produits
            </Link>
            <Link to="/cart" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
              Mon panier
            </Link>
            {role === 'admin' && (
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">
                <span className="material-symbols-outlined text-lg">dashboard</span>
                Espace admin
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
