import { useEffect, useState } from 'react';

import { api, type Dashboard } from '../../services/api';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

const statCards = [
  { key: 'total_revenue', title: 'Ventes totales', icon: 'payments' },
  { key: 'total_orders', title: 'Commandes', icon: 'shopping_bag' },
  { key: 'total_customers', title: 'Clients', icon: 'group' },
  { key: 'low_stock_products', title: 'Stock faible', icon: 'warning' },
] as const;

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.getDashboard();
        if (!cancelled) {
          setData(response);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur dashboard');
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
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Tableau de bord</h1>
          <p className="text-sm text-slate-300">Vue globale des performances de la boutique.</p>
        </div>
      </div>

      {isLoading && <p className="text-slate-300">Chargement...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.key} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">{card.title}</p>
                  <span className="material-symbols-outlined text-primary">{card.icon}</span>
                </div>
                <p className="mt-3 text-2xl font-black text-white">
                  {card.key === 'total_revenue' ? formatBif(data.total_revenue) : data[card.key]}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-bold text-white">Commandes recentes</h2>
              <span className="text-xs text-slate-400">{data.recent_orders.length} resultats</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">Client</th>
                    <th className="px-5 py-3 font-medium">Montant</th>
                    <th className="px-5 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_orders.map((order) => (
                    <tr key={order.id} className="border-t border-white/5 text-slate-200">
                      <td className="px-5 py-3">{order.customer_name ?? order.customer_email}</td>
                      <td className="px-5 py-3">{formatBif(order.total_amount)}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
