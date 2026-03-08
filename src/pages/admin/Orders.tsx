export default function AdminOrders() {
  const orders = [
    { id: '#ORD-7829', customer: 'Jean Pierre', email: 'jean@example.com', date: '08 Mar 2024', total: '75,000 Fbu', status: 'Livré', payment: 'Lumicash' },
    { id: '#ORD-7828', customer: 'Marie Claire', email: 'marie@example.com', date: '08 Mar 2024', total: '30,000 Fbu', status: 'En cours', payment: 'Ecocash' },
    { id: '#ORD-7827', customer: 'Eric Ndayi', email: 'eric@example.com', date: '07 Mar 2024', total: '850,000 Fbu', status: 'En attente', payment: 'Carte' },
    { id: '#ORD-7826', customer: 'Alice Uwimana', email: 'alice@example.com', date: '07 Mar 2024', total: '15,000 Fbu', status: 'Annulé', payment: 'Lumicash' },
    { id: '#ORD-7825', customer: 'Paul Bizimana', email: 'paul@example.com', date: '06 Mar 2024', total: '120,000 Fbu', status: 'Livré', payment: 'Espèces' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Commandes</h1>
          <p className="text-slate-500 dark:text-slate-400">Suivez et gérez les commandes clients.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined">download</span>
          Exporter
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium whitespace-nowrap">Toutes</button>
        <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700">En attente</button>
        <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700">En cours</button>
        <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700">Livrées</button>
        <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700">Annulées</button>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 font-medium">Commande</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Paiement</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{order.customer}</div>
                      <div className="text-xs text-slate-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.total}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.payment}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Livré' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'En cours' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        order.status === 'Annulé' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
