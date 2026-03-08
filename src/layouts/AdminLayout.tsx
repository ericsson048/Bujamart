import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function AdminLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: 'dashboard' },
    { name: 'Produits', href: '/admin/products', icon: 'inventory_2' },
    { name: 'Commandes', href: '/admin/orders', icon: 'shopping_bag' },
    { name: 'Clients', href: '/admin/customers', icon: 'group' },
    { name: 'Paramètres', href: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex font-display">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl font-bold">shopping_basket</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Bujamart Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl font-bold">shopping_basket</span>
            <span className="font-bold text-slate-900 dark:text-white">Bujamart Admin</span>
          </Link>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
