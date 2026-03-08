import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.register({ full_name: fullName, email, password });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inscription impossible');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#1e293b_0%,#0f172a_45%,#020617_100%)] p-4 font-display text-slate-100 sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-[1fr_1.1fr]">
        <main className="order-2 lg:order-1 flex items-center p-6 sm:p-10">
          <div className="w-full">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-2xl">
                <span className="material-symbols-outlined">shopping_basket</span>
                Bujamart
              </Link>
            </div>

            <h2 className="text-3xl font-black text-white">Creer un compte</h2>
            <p className="mt-2 text-sm text-slate-300">
              Deja inscrit ? <Link to="/login" className="font-semibold text-primary">Se connecter</Link>
            </p>

            <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Nom complet</span>
                <input
                  type="text"
                  required
                  placeholder="Ex: Eric Ndayi"
                  className="block w-full rounded-xl border border-white/15 bg-slate-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-primary"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>

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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Confirmation</span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-xl border border-white/15 bg-slate-900/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-primary"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
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
                {isSubmitting ? 'Inscription...' : "S'inscrire"}
              </button>
            </form>
          </div>
        </main>

        <aside className="order-1 lg:order-2 hidden lg:flex flex-col justify-between border-l border-white/10 p-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-2xl">
              <span className="material-symbols-outlined">shopping_basket</span>
              Bujamart
            </Link>
            <h1 className="mt-10 text-4xl font-black leading-tight">Bienvenue sur la marketplace locale</h1>
            <p className="mt-4 max-w-sm text-slate-300">
              Cree ton compte pour commander rapidement et suivre tes achats depuis ton profil.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            En t'inscrivant, tu acceptes nos conditions d'utilisation et notre politique de confidentialite.
          </div>
        </aside>
      </div>
    </div>
  );
}
