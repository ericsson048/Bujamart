import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';
import { setCurrentUser } from '../../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = await api.login({ email, password });
      setCurrentUser(user);
      navigate(user.is_admin ? '/admin' : '/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connexion impossible');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#1e293b_0%,#0f172a_45%,#020617_100%)] p-4 font-display text-slate-100 sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-[1.1fr_1fr]">
        <aside className="hidden lg:flex flex-col justify-between border-r border-white/10 p-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-2xl">
              <span className="material-symbols-outlined">shopping_basket</span>
              Bujamart
            </Link>
            <h1 className="mt-10 text-4xl font-black leading-tight">Connecte-toi a ton espace client</h1>
            <p className="mt-4 max-w-sm text-slate-300">
              Suis tes commandes, gere ton panier et accede rapidement a ton profil.
            </p>
          </div>
          <p className="text-xs text-slate-400">Admin test: admin@bujamart.bi / admin123</p>
        </aside>

        <main className="flex items-center p-6 sm:p-10">
          <div className="w-full">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-2xl">
                <span className="material-symbols-outlined">shopping_basket</span>
                Bujamart
              </Link>
            </div>

            <h2 className="text-3xl font-black text-white">Connexion</h2>
            <p className="mt-2 text-sm text-slate-300">
              Pas de compte ? <Link to="/register" className="font-semibold text-primary">Creer un compte</Link>
            </p>

            <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="block w-full rounded-xl border border-white/15 bg-slate-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mot de passe</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-white/15 bg-slate-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div className="text-right">
                <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:brightness-110">
                  Mot de passe oublie ?
                </Link>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
