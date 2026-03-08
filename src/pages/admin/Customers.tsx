export default function AdminCustomers() {
  const customers = [
    { id: 1, name: 'Jean Pierre', email: 'jean@example.com', phone: '+257 79 123 456', orders: 12, totalSpent: '1,250,000 Fbu', status: 'Actif', lastOrder: '08 Mar 2024' },
    { id: 2, name: 'Marie Claire', email: 'marie@example.com', phone: '+257 71 987 654', orders: 5, totalSpent: '350,000 Fbu', status: 'Actif', lastOrder: '05 Mar 2024' },
    { id: 3, name: 'Eric Ndayi', email: 'eric@example.com', phone: '+257 76 555 123', orders: 1, totalSpent: '85,000 Fbu', status: 'Inactif', lastOrder: '12 Fev 2024' },
    { id: 4, name: 'Alice Uwimana', email: 'alice@example.com', phone: '+257 69 444 777', orders: 8, totalSpent: '620,000 Fbu', status: 'Actif', lastOrder: '01 Mar 2024' },
    { id: 5, name: 'Paul Bizimana', email: 'paul@example.com', phone: '+257 75 222 888', orders: 3, totalSpent: '180,000 Fbu', status: 'Bloqué', lastOrder: '20 Jan 2024' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clients</h1>
          <p className="text-slate-500 dark:text-slate-400">Gérez votre base de clients.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined">person_add</span>
          Ajouter un client
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            placeholder="Rechercher un client (nom, email, téléphone)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Inactif</option>
            <option>Bloqué</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Commandes</th>
                <th className="px-6 py-4 font-medium">Total Dépensé</th>
                <th className="px-6 py-4 font-medium">Dernière Commande</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{customer.email}</div>
                    <div className="text-xs text-slate-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${customer.status === 'Actif' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        customer.status === 'Inactif' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
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
