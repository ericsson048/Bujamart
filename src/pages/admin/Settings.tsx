import { FormEvent, useEffect, useState } from 'react';

import { api } from '../../services/api';

type FormState = {
  store_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  currency: string;
  timezone: string;
};

const initialState: FormState = {
  store_name: '',
  contact_email: '',
  contact_phone: '',
  address: '',
  currency: 'BIF',
  timezone: 'Africa/Bujumbura',
};

export default function AdminSettings() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getSettings();
        if (!cancelled) {
          setForm({
            store_name: data.store_name,
            contact_email: data.contact_email,
            contact_phone: data.contact_phone,
            address: data.address,
            currency: data.currency,
            timezone: data.timezone,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Chargement impossible');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.updateSettings(form);
      setSuccess('Parametres enregistres.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sauvegarde impossible');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Parametres</h1>
        <p className="text-sm text-slate-300">Configuration generale de la boutique.</p>
      </div>

      {isLoading && <p className="text-slate-300">Chargement...</p>}
      {error && <p className="text-red-300">{error}</p>}
      {success && <p className="text-emerald-300">{success}</p>}

      {!isLoading && (
        <form className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" onSubmit={(event) => void handleSubmit(event)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Nom boutique</span>
              <input className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary" value={form.store_name} onChange={(e) => setForm((prev) => ({ ...prev, store_name: e.target.value }))} />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span>
              <input className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary" value={form.contact_email} onChange={(e) => setForm((prev) => ({ ...prev, contact_email: e.target.value }))} type="email" />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Telephone</span>
              <input className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary" value={form.contact_phone} onChange={(e) => setForm((prev) => ({ ...prev, contact_phone: e.target.value }))} />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Devise</span>
              <input className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary" value={form.currency} onChange={(e) => setForm((prev) => ({ ...prev, currency: e.target.value }))} />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Adresse</span>
            <textarea className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary" value={form.address} onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))} rows={3} />
          </label>

          <label className="space-y-1 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Fuseau horaire</span>
            <input className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary" value={form.timezone} onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))} />
          </label>

          <div className="pt-2">
            <button type="submit" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:brightness-110" disabled={isSaving}>
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
