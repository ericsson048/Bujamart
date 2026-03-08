import clsx from 'clsx';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { api } from '../services/api';
import { clearCurrentUser, getCurrentUser } from '../services/auth';

export default function AdminLayout() {
  const location = useLocation();
  const currentUser = getCurrentUser();

  async function handleLogout() {
    const refreshToken = localStorage.getItem('bujamart_refresh_token');
    if (refreshToken) {
      try {
        await api.logout({ refresh_token: refreshToken });
      } catch {
        // ignore
      }
    }
    clearCurrentUser();
  }

  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: 'dashboard' },
    { name: 'Produits', href: '/admin/products', icon: 'inventory_2' },
    { name: 'Commandes', href: '/admin/orders', icon: 'shopping_bag' },
    { name: 'Clients', href: '/admin/customers', icon: 'group' },
    { name: 'Parametres', href: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#1e293b_0%,#0f172a_45%,#020617_100%)] text-slate-100 font-display md:grid md:grid-cols-[280px_1fr]">
      <aside className="hidden md:flex md:flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="border-b border-white/10 px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-black text-xl">
            <span className="material-symbols-outlined">shopping_basket</span>
            Bujamart Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                )}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs text-slate-400">Connecte</p>
            <p className="truncate text-sm font-bold text-white">{currentUser?.full_name ?? 'Admin'}</p>
            <p className="truncate text-xs text-slate-400">{currentUser?.email ?? ''}</p>
          </div>
          <Link
            to="/login"
            onClick={() => void handleLogout()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Se deconnecter
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex flex-col">
        <header className="md:hidden border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined">shopping_basket</span>
              Admin
            </Link>
            <Link
              to="/login"
              onClick={() => void handleLogout()}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold"
            >
              Logout
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
