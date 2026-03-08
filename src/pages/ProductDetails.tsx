import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200 min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">storefront</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary">Bujamart</h1>
            </Link>
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm outline-none" placeholder="Rechercher un produit..." type="text" />
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/cart" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">2</span>
              </Link>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <span className="material-symbols-outlined">person</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 overflow-hidden hidden sm:block">
                <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjX4ydQ8H6tLJmffMXFBlXASjfhZymeAujheyqC7uQI9adxnYV7lRBqQuU989ByHrlhgO_cWF3SOOUz0hKaiREJhfCN3Lwndl4Jdz-DeRV-7Ja4El-TKpkhOc-oBqVQG9hFT1HO2gm5E1ZWHJcXbOPMrTMji4i6EUIbvX3rfE2Y-5Kh9UFoBizpHHqw5rF5q41UcQkKvQeufyZ7eYegfSOuJpCt9OLW3d5_P7PtHXv_N0HIycIV-IZ0n1lEAbh0uNQcs2MAjEHbflm" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link className="hover:text-primary" to="/">Accueil</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary" to="/products">Électronique</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">Smartphone Premium Pro Max</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square w-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden">
              <img alt="Smartphone de face" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoNwCZMFCilnjwItXS9SNYopLE6_--P_U5whWAFVbYTZjUv9AaE9ocuFOqJtIo3ImMixN_6JyQO3xj1PC1KGEPwpwN6lEz-SgrpGn4xVyFcSwMbB_PWXElhvfBIw8BjmfFrWuwLlrEI9v35J7tadiTOw7xxauVBYmt5WAru1dqjpJYZJCf6D91Jmi9WoZp8-jJ-3UTwBjAFwZjA0dIsQC63DoGEY_KjHgnN4YDFtho9-iEwMSWSbt4hxBB5UuXJqcqbDEqrFtvM6OQ" />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              <button className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-primary overflow-hidden">
                <img alt="Vue 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApyZPWio_rKauQr-F24ty_I4XW6hFUNTJqYZ7xXRZybAvjyzc-BOcQfvVr-ILl4dBI_4XdQfzMDUeUxe_I7fe6dLQxNaaxM2XC1GQwVlNISbR5COPezu74zPBabXs8jMzbi774pSLe1n-6a8zpLVIjAPF8Pfo4hW4hWh0d6WhfeGuDIoMmV9af3PG42VCx8u2FNqp0ysbbsw71749jWInV32BP4eqMgk78olCCdgyXr9NRElSO-rT_Z0mWH724us0L5aR5IDL1JEAv" />
              </button>
              <button className="flex-shrink-0 w-20 h-20 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <img alt="Vue 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqr4N3Mgtg9Bxr7ev3I4cYg6WkagnUSPGh523CKCqVbwaroW5qP4SnZaTM5bJorZWrn4XL-RrLtJo-fp6xeWDoOGa7drRKQN2egNZTzMGwbakhjSAVb5UsStvuBpn7XSDBtcv9ZwNheIO80BBTYsxTy60_OVuAF8KFr-n8p2zdpBeSoxGs-MZFc8GH9bVUDoKU3A0Rcfr36ZPE37rDM_gUmEU4f9ZIGNNO8n_A7CWyAPotUHQYmFjbLcTvmhqzE6flPdr4hpbzkPkj" />
              </button>
              <button className="flex-shrink-0 w-20 h-20 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <img alt="Vue 3" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Kc4-DLAc5InqZSUH5VlX4AZw_UsEJOslkoc43cs2n3fz4drZ-xoFE0Gd9-rp9OSv7shP5Ut7lwnbX3Lbs8MgHUHno-ojCZbgQVB5Pw9gncyqPHzqy_kzb3C0zRM7FDBEqf4GpTiXbvZ9oImPvK9_pt---9zucS-q8AHQ48mD95F3TKYss6GzZfCrAzhccfMQIpJMqd0Vmsq3bHhuDwllayaeAw-qiG0nNwy6iuRTHTftoWsmYpTB8afpMERxxDMkf1IcshyLLG5f" />
              </button>
            </div>
          </div>
          {/* Product Details Section */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-sm leading-none">check_circle</span>
                En Stock
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight">Smartphone Premium Pro Max - 256GB Platinum</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-400 fill-1">star</span>
                  <span className="font-bold">4.8</span>
                  <span className="text-slate-400 text-sm">(124 avis)</span>
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <div className="text-sm text-slate-500">Réf: BM-99821</div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="mb-4">
                <span className="text-4xl font-black text-primary">45,000 BIF</span>
                <p className="text-sm text-slate-400 mt-1 line-through">52,000 BIF</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium w-20">Quantité:</label>
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setQuantity(Math.max(1, quantity - 1))}><span className="material-symbols-outlined text-sm">remove</span></button>
                    <input className="w-12 text-center border-none bg-transparent text-sm font-bold focus:ring-0" type="text" value={quantity} readOnly />
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setQuantity(quantity + 1)}><span className="material-symbols-outlined text-sm">add</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Ajouter au panier
                  </button>
                  <button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Acheter maintenant
                  </button>
                </div>
              </div>
            </div>
            {/* Delivery Info */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                <div>
                  <p className="text-sm font-bold">Livraison Rapide à Bujumbura</p>
                  <p className="text-xs text-slate-500">Disponible sous 24h. Livraison gratuite dès 100k BIF.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <div>
                  <p className="text-sm font-bold">Garantie Bujamart 1 An</p>
                  <p className="text-xs text-slate-500">Service après-vente et support technique inclus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Details & Specs Tabs (Conceptual Section) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Description du produit
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                <p>Découvrez la puissance et l'élégance réunies dans le nouveau Smartphone Premium Pro Max. Équipé d'un écran Retina LTPO de 6.7 pouces et de la puce la plus rapide du marché, il redéfinit ce qu'un smartphone peut accomplir.</p>
                <p className="mt-4">Sa finition en titane de qualité aérospatiale le rend plus léger et plus résistant que jamais. Le système photo professionnel capture des détails incroyables, même en basse lumière, idéal pour vos souvenirs à Bujumbura et partout ailleurs.</p>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Spécifications techniques
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 text-sm">Écran</span>
                  <span className="font-medium text-sm">6.7" OLED 120Hz</span>
                </div>
                <div className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 text-sm">Stockage</span>
                  <span className="font-medium text-sm">256 GB NVMe</span>
                </div>
                <div className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 text-sm">Batterie</span>
                  <span className="font-medium text-sm">4500 mAh (Fast Charge)</span>
                </div>
                <div className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 text-sm">OS</span>
                  <span className="font-medium text-sm">B-OS v14.2</span>
                </div>
              </div>
            </section>
          </div>
          {/* Review Summary (Right column on desktop) */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              Avis Clients
            </h2>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-black">4.8</div>
                <div>
                  <div className="flex text-yellow-400">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Sur 128 évaluations</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                  <span className="text-sm">5</span>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500 text-right">80%</span>
                </div>
                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                  <span className="text-sm">4</span>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500 text-right">15%</span>
                </div>
                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                  <span className="text-sm">3</span>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500 text-right">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products */}
        <section className="mt-16 pb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Produits Similaires</h2>
            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
              Voir tout <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Product Card 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA-djg4qze1QG1cLySosx7tB7NuX8Xs70roxh_eekCC0aNX_cu0K6tgTocLsdTuSvubvBLKhRZHsLrsXdyVHGZkCeDsoaFP3S0wNBZjICAfmtxq9tDuRtD6Yf2LM-AzmFzrP3JTR7WBSx6Aj-WjlL5XAg7SYBqS4KaUOyW82oWrW9ZdchSCdMF5joirYvK9ZM-2KDL2Nh6TCyqbrQL710W6uuJopkdE35cauv3c40tJXxFLWNEPMp6WvxLJApTdmNcW7aQqsdZ5OB5" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 rounded-full hover:text-primary">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-slate-500 mb-1">Accessoires</p>
                <h3 className="font-bold text-sm sm:text-base line-clamp-1">Smartwatch Series X</h3>
                <p className="text-primary font-black mt-2">12,500 BIF</p>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByg0nO9fxUkTlFH6-6erZbI4PoECH8GvMbKgagpV_vY2xTFvEZ_24-KgqN0zuRAfdwHna01pcGO7arX8qs70kOfwX8HdNk1DUbtjnCUHeEpFJM58CpuyGDW3mpMgpMoCruNvl_J0Iy0S72xLHMKWq1XFn1FCNd0DUoVGaIxaeTPzg_JTEQWWu9VJW5QE6-M91UTuAUtLZ8ZMEC6pnOjm41QQxCqbyCCAKoF-eU16E99mINMAarCgK6zQgC9D63iEYLvg5cixt-sVcK" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 rounded-full hover:text-primary">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-slate-500 mb-1">Audio</p>
                <h3 className="font-bold text-sm sm:text-base line-clamp-1">Casque Noise Cancelling</h3>
                <p className="text-primary font-black mt-2">35,000 BIF</p>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4P1D84UoQ5ZSpJcJc8cHG2Is2S1zi54Bpx9qx7LbuydxFbOFtB3Qd_MjMM4C_-Ur131dgAyOTum3s4K3DO21DNXkhCQwvROicsH0CpaEPwNe1p_CZQqDqRSK_AbMDFdSHRHbbqEC43R7plJ2lyjeHefpj9X44DUxGSFsNkX_2SZHPKmizEqtiw8QU-EMbfU3IOZmMKhPAEG_3lLi_YwyTxtfPVqLlb9c5SziIxKdK08-xecl0tGrn2PYMYnVgOQHNjRRHrZePB5LJ" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 rounded-full hover:text-primary">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-slate-500 mb-1">Laptop</p>
                <h3 class="font-bold text-sm sm:text-base line-clamp-1">Laptop Ultrafin 14"</h3>
                <p className="text-primary font-black mt-2">1,200,000 BIF</p>
              </div>
            </div>
            {/* Product Card 4 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxQzIvvukZKE541Z7uAOy5LiRgaWH9XV0TBGxb55rKb_bXZCLfpeA_PaGBHe9WYjW863CVj2EVdBJDpQZuQnwVNjksPgobRDyw4xTqAoQcG_jpt16DWmx8XmxiKirLF__BAEQouN1MJ_Uz7ed5gtvjyyxpVQjx26HaxJm2CIWUh3oZRifu-unVObznyABNdTWqsPWAJH1SBZzWjs5XBBQZxA_IYxOKMtqJ5V_lOTBCh3NmipoBQnn8JpzMiQ6fLYmrAbIiKaVrIkLZ" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-900/80 rounded-full hover:text-primary">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-slate-500 mb-1">Tablette</p>
                <h3 className="font-bold text-sm sm:text-base line-clamp-1">Tab Creative Pro</h3>
                <p className="text-primary font-black mt-2">85,000 BIF</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Mobile Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-50">
        <div className="flex gap-3">
          <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-3 rounded-xl font-bold text-sm">
            Ajouter
          </button>
          <button className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold text-sm">
            Acheter Maintenant
          </button>
        </div>
      </div>
      {/* Footer Simple */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 mb-20 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xs">storefront</span>
                </div>
                <h3 className="text-white font-bold">Bujamart</h3>
              </div>
              <p className="text-sm">Le premier marketplace au Burundi pour tous vos besoins quotidiens.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Liens Utiles</h4>
              <ul className="text-sm space-y-2">
                <li><a className="hover:text-white" href="#">Conditions de vente</a></li>
                <li><a className="hover:text-white" href="#">Politique de retour</a></li>
                <li><a className="hover:text-white" href="#">Contactez-nous</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <input className="flex-1 bg-slate-800 border-none rounded-lg text-sm px-4 outline-none" placeholder="Email" type="email" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">Ok</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            © 2024 Bujamart. Tous droits réservés. Made for Bujumbura.
          </div>
        </div>
      </footer>
    </div>
  );
}
