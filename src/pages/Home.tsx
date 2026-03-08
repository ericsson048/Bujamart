import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-10">
            <div className="flex items-center gap-2 text-primary">
              <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Bujamart</h1>
            </div>
            <div className="hidden flex-1 justify-center px-8 md:flex">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800 outline-none" placeholder="Rechercher un produit..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/cart" className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-200">
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
              <div className="size-10 rounded-full border-2 border-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZQjDoyd07_L8PRNJJyEYFWbaFWYEkNwzyu8z7aASAAQkh44FYJbG-yxA5Xq7Es-ow4qvWkUWMzyLo0CVNUjvGZDEv7sS_C1H5z3nW0GXgqe6MH5vuJkw_6T_k8kw_ajDirfmetS7OsXWGZslK1sARSNaVtJikrMxtbQIuZZDh2kW_iRAt9tRdw3RAOPHjs29Vq7K50ip9ee0OsCh5ob4I4gr50QV2K1S-g5RKQe0xKgEKmGr6dloe1WyyeDXyi9lqSDLqJIa5Oj-m')" }}></div>
            </div>
          </div>
          <div className="px-4 pb-3 md:hidden">
            <div className="relative w-full">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800 outline-none" placeholder="Rechercher..." type="text" />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1200px] flex-1">
          <section className="p-4">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white">
              <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAV4hHUX3AncPkfhCbcV35CxibSwvdQkgQ2j7jUzXXU-Xb0lJ7LCDA7By-AlLXGgUU_o6sjnyylba2EmqyzTT_x3uNdYEJFn4Hasz__BlaIgwb9wvN_3bgP2hzXnpa_oiTpROf_LpDZO5DI2_4Uj2PAiMLxh3vAEixZJrG3bYnJg4NG6f1n9lrk_Kt1AI8F9Wh6etynd5pgSRsO3z_rejtslzW9tlBxrArPr9xrGPXip3yOnWOMGBP3jVwWiuPtz7ah88bRZEgDFRPz')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-start justify-center p-8 md:p-16">
                <span className="mb-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">Promo de Saison</span>
                <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">Fraîcheur locale <br />à votre porte</h2>
                <p className="mb-6 max-w-md text-slate-300">Profitez de jusqu'à -30% sur tous les produits frais de la région cette semaine.</p>
                <Link to="/products" className="rounded-xl bg-primary px-8 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95">Acheter maintenant</Link>
              </div>
            </div>
          </section>
          <section className="px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Catégories Populaires</h3>
              <Link to="/products" className="text-sm font-semibold text-primary">Voir tout</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-primary dark:bg-emerald-900/30">
                  <span className="material-symbols-outlined text-3xl">restaurant</span>
                </div>
                <span className="text-sm font-bold">Épicerie</span>
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-16 items-center justify-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/30">
                  <span className="material-symbols-outlined text-3xl">devices</span>
                </div>
                <span className="text-sm font-bold">High-Tech</span>
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 dark:bg-orange-900/30">
                  <span className="material-symbols-outlined text-3xl">home</span>
                </div>
                <span className="text-sm font-bold">Maison</span>
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-16 items-center justify-center rounded-full bg-purple-50 text-purple-500 dark:bg-purple-900/30">
                  <span className="material-symbols-outlined text-3xl">checkroom</span>
                </div>
                <span className="text-sm font-bold">Mode</span>
              </div>
            </div>
          </section>
          <section className="px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Offres Spéciales</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Les meilleures réductions du moment à Bujumbura</p>
              </div>
              <div className="flex gap-2">
                <button className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
              {/* Product 1 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img alt="Montre élégante" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDENPN3W--CqPcsg4hx9Y5D_ty_fE6OIjbamrwDDM8XltZq9_BdGpvIllqdYTlQ8VMWWooZsS12LCyQ5a-9cILF_u4tBzkxTPhg3ArIqqVRGrBXSEsnlR58lTnP-kLWBLyA7RyyW3tz1_1FPXf03A5IKuS3SPErfHvCgKw6F8npRtrXm9f0Q5dl4cS83Z3MHiIk7EYD0oBWBGjFdbKH0tJWPgLW1AQkZ55wPRwbQW6Fb2TMcEyuE2tccAfOn1JnRCFODjWVrHA7X2WX" />
                  <span className="absolute left-2 top-2 rounded-lg bg-red-500 px-2 py-1 text-[10px] font-bold text-white uppercase">-15%</span>
                  <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/80 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Accessoires</span>
                  <h4 className="mt-1 line-clamp-1 font-bold text-slate-900 dark:text-white">Montre Premium</h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">85.000 BIF</span>
                    <span className="text-xs text-slate-400 line-through">100.000 BIF</span>
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-100">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    Ajouter
                  </button>
                </div>
              </div>
              {/* Product 2 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img alt="Casque audio" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4-DOurIGOrbcKxXts5VdCc-D8FauBdhZNDKJiSdJ2OwxRWdtJoLz1hvsZLmdwady6lroTsryPfnHNy5FCKOHoooQ76JupPTWoxGcVYo_mwubmcUJgt1UjtN71dMsPxJFzfpWMYswdeUyIe98pnx-ai9R13oisMJcHAyovtUpGvXypkZEJs5vmGaOBZuEgfxddK7K1PNwY_9ZofEoRJNNZt7MNYo7yq9MOVnw2td-Ec_zBD83nvsXPVkDNMP8GVgUIUnvnckgAsdes" />
                  <span className="absolute left-2 top-2 rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white uppercase">Nouveau</span>
                  <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/80 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Électronique</span>
                  <h4 className="mt-1 line-clamp-1 font-bold text-slate-900 dark:text-white">Casque Studio Max</h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">245.000 BIF</span>
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-100">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    Ajouter
                  </button>
                </div>
              </div>
              {/* Product 3 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img alt="Chaussures de sport" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV6dpbCY1RpKOmHQ83dpdA3sN7s33Jg0Ng3nbW8t28e08RyEudFzxvF8xkqbwd9VEtV7U07AJ4yr_GXeKFI8ovYx9Vtj32b7CbPt3bCQhl3cflr6gjc_CSVxCyz46LQTJA9vnSYu_iiJ6CDVWiPtz1ACTxzBtZLtuuTHy9t4cPbBdp38PE52W6AJJODMV0kMJGO4YGnsGBprJB40yoKb5haoUqfdkejRJjEJzFs-2jRLLSvP3HEq7vMTW2IFaIJYksS07UOY3l-wBg" />
                  <span className="absolute left-2 top-2 rounded-lg bg-red-500 px-2 py-1 text-[10px] font-bold text-white uppercase">-20%</span>
                  <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/80 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Mode</span>
                  <h4 className="mt-1 line-clamp-1 font-bold text-slate-900 dark:text-white">Baskets Speed Runner</h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">120.000 BIF</span>
                    <span className="text-xs text-slate-400 line-through">150.000 BIF</span>
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-100">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    Ajouter
                  </button>
                </div>
              </div>
              {/* Product 4 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img alt="Appareil photo" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSQf9b3JcnNoym6wkT4eC1DS7s9mTpJ_zvSbcAG6yyP53tN-IhbgkvQwcgjbebCeDctclmg3Bi2uDgDG1E7jMos12rkr1-pZcI-hSpa9WTuDarz-854WVirxMRb0PKDoCMaz5WWFiGUjUEpO9jr3MQFrvisId8Y2GPz1miyvKeh_oa0xpop2Bq7PUdYluyHuGzkPhnvOz2iAemVyuLYhpjvd1s8ac5QOUVWS1axVejnCx-qgSqGqwvqKysukhEjeUm45YZnkzjDAXt" />
                  <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/80 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                </div>
                <div className="flex flex-col p-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Électronique</span>
                  <h4 className="mt-1 line-clamp-1 font-bold text-slate-900 dark:text-white">Caméra Focus Pro</h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">890.000 BIF</span>
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-100">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 dark:border-slate-800 dark:bg-background-dark">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">shopping_bag</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Bujamart</h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Le n°1 de l'e-commerce au Burundi. Livraison rapide à Bujumbura et dans toutes les provinces.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Liens Utiles</h4>
              <nav className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                <a className="hover:text-primary" href="#">À propos de nous</a>
                <a className="hover:text-primary" href="#">Conditions de livraison</a>
                <a className="hover:text-primary" href="#">Service client</a>
                <a className="hover:text-primary" href="#">FAQ</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Contact</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Email: info@bujamart.bi</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tel: +257 22 22 00 00</p>
              <div className="mt-2 flex gap-4">
                <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-primary">social_leaderboard</span>
                <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-primary">share</span>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-[1200px] border-t border-slate-100 pt-6 text-center text-xs text-slate-400 dark:border-slate-800">
            © 2024 Bujamart. Tous droits réservés.
          </div>
        </footer>
        <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden dark:border-slate-800 dark:bg-background-dark/95">
          <Link to="/" className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-bold">Accueil</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-[10px]">Catégories</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">search</span>
            <span className="text-[10px]">Explorer</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px]">Profil</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
