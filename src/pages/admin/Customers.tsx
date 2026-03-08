import { useEffect, useState } from 'react';

import { api, type Customer } from '../../services/api';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

function initials(name: string | null): string {
  if (!name) {
    return 'C';
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.listCustomers();
        if (!cancelled) {
          setCustomers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur chargement clients');
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Clients</h1>
        <p className="text-sm text-slate-300">Base clients et historique d'achat consolides.</p>
      </div>

      {isLoading && <p className="text-slate-300">Chargement...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {!isLoading && (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Commandes</th>
                  <th className="px-5 py-3 font-medium">Total depense</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-white/5 text-slate-200">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-xs font-black text-primary">
                          {initials(customer.full_name)}
                        </div>
                        <span className="font-semibold text-white">{customer.full_name ?? 'Client'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">{customer.email}</td>
                    <td className="px-5 py-3">{customer.orders_count}</td>
                    <td className="px-5 py-3 font-semibold">{formatBif(customer.total_spent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
