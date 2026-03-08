export default function AdminDashboard() {
  const stats = [
    { name: 'Ventes du jour', value: '1,250,000 Fbu', change: '+12%', icon: 'payments', color: 'bg-green-500' },
    { name: 'Commandes', value: '48', change: '+5%', icon: 'shopping_cart', color: 'bg-blue-500' },
    { name: 'Nouveaux Clients', value: '12', change: '+2%', icon: 'group_add', color: 'bg-purple-500' },
    { name: 'Produits en rupture', value: '3', change: '-1', icon: 'warning', color: 'bg-red-500' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Jean Pierre', product: 'Sac de riz 25kg', amount: '75,000 Fbu', status: 'Livré', date: 'Il y a 2h' },
    { id: '#ORD-002', customer: 'Marie Claire', product: 'Huile de palme 5L', amount: '30,000 Fbu', status: 'En cours', date: 'Il y a 4h' },
    { id: '#ORD-003', customer: 'Eric Ndayi', product: 'Smartphone Pro', amount: '850,000 Fbu', status: 'En attente', date: 'Il y a 5h' },
    { id: '#ORD-004', customer: 'Alice Uwimana', product: 'Panier Légumes', amount: '15,000 Fbu', status: 'Livré', date: 'Hier' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tableau de bord</h1>
        <p className="text-slate-500 dark:text-slate-400">Aperçu de l'activité de votre boutique.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.replace('bg-', '')}`}>
                 <span className={`material-symbols-outlined text-${stat.color.replace('bg-', '')} text-opacity-100`}>{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium flex items-center">
                {stat.change.startsWith('+') ? <span className="material-symbols-outlined text-sm mr-1">trending_up</span> : <span className="material-symbols-outlined text-sm mr-1">trending_down</span>}
                {stat.change}
              </span>
              <span className="text-slate-400 ml-2">vs hier</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Commandes Récentes</h2>
            <button className="text-sm text-primary font-medium hover:underline">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium">ID Commande</th>
                  <th className="px-6 py-3 font-medium">Client</th>
                  <th className="px-6 py-3 font-medium">Produit</th>
                  <th className="px-6 py-3 font-medium">Montant</th>
                  <th className="px-6 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.product}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'Livré' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          order.status === 'En cours' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Produits Populaires</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">Produit Populaire #{i}</h4>
                  <p className="text-xs text-slate-500">124 ventes</p>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">12k Fbu</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
            Voir le rapport complet
          </button>
        </div>
      </div>
    </div>
  );
}
