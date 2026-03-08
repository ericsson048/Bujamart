import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      await api.forgotPassword({ email });
      setSuccess('Si votre email existe, un lien de reinitialisation a ete envoye.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Requete impossible');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#1e293b_0%,#0f172a_45%,#020617_100%)] p-4 font-display text-slate-100 sm:p-8">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Retour connexion
        </Link>

        <h1 className="mt-6 text-3xl font-black text-white">Mot de passe oublie</h1>
        <p className="mt-2 text-sm text-slate-300">Entrez votre email pour recevoir un lien de reinitialisation.</p>

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

          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>}
          {success && <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{success}</div>}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi...' : 'Envoyer le lien'}
          </button>
        </form>
      </div>
    </div>
  );
}
