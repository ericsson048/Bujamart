import { useEffect, useState } from 'react';

import { api, type OrderAdmin } from '../../services/api';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.listOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur chargement commandes');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  async function setStatus(orderId: number, status: string) {
    try {
      const updated = await api.updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((order) => (order.id === orderId ? updated : order)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mise a jour impossible');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Commandes</h1>
        <p className="text-sm text-slate-300">Suivi et mise a jour des statuts de livraison.</p>
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
                  <th className="px-5 py-3 font-medium">Montant</th>
                  <th className="px-5 py-3 font-medium">Articles</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-white/5 text-slate-200">
                    <td className="px-5 py-3">{order.customer_name ?? order.customer_email}</td>
                    <td className="px-5 py-3">{formatBif(order.total_amount)}</td>
                    <td className="px-5 py-3">{order.items_count}</td>
                    <td className="px-5 py-3">
                      <select
                        className="rounded-lg border border-white/15 bg-slate-900/60 px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-100 outline-none"
                        value={order.status}
                        onChange={(e) => void setStatus(order.id, e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
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
