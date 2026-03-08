import { Link } from 'react-router-dom';

export default function ProductList() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Header / TopNavBar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">shopping_basket</span>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Bujamart</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Boutique</a>
              <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Promotions</a>
              <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Nouveautés</a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <label className="hidden sm:flex flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary text-sm outline-none" placeholder="Rechercher un produit..." type="text" />
            </label>
            <div className="flex items-center gap-2">
              <Link to="/cart" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative text-slate-700 dark:text-slate-200">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 rounded-full">3</span>
              </Link>
              <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
          <Link className="hover:text-primary flex items-center gap-1" to="/">
            <span className="material-symbols-outlined text-lg">home</span>
            Accueil
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <a className="hover:text-primary" href="#">Alimentation</a>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">Fruits & Légumes</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div className="flex items-center justify-between lg:block">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Filtres</h1>
              <button className="lg:hidden flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                <span className="material-symbols-outlined">tune</span>
                Filtres
              </button>
            </div>
            <div className="hidden lg:block space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Catégories</h3>
                <ul className="space-y-3">
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Tous les produits</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Fruits Frais</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Légumes Bio</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Épicerie Fine</span>
                    </label>
                  </li>
                </ul>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Prix</h3>
                <div className="space-y-4">
                  <input className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" max="10000" min="0" type="range" />
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded border border-slate-200 dark:border-slate-700">0 Fbu</span>
                    <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded border border-slate-200 dark:border-slate-700">10k Fbu</span>
                  </div>
                </div>
              </div>
              {/* Brands */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Marques</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm hover:border-primary hover:text-primary transition-all">Laiterie Bujumbura</button>
                  <button className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm hover:border-primary hover:text-primary transition-all">Savonor</button>
                  <button className="px-3 py-1.5 rounded-full border border-primary bg-primary/10 text-primary text-sm">Bio-Organic</button>
                  <button className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm hover:border-primary hover:text-primary transition-all">Gitega Gold</button>
                </div>
              </div>
            </div>
          </aside>
          {/* Product Listing */}
          <div className="flex-1">
            {/* Sorting & View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-slate-500 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-white">124</span> produits trouvés</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Trier par :</span>
                <select className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-4 py-2 outline-none">
                  <option>Pertinence</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Nouveautés</option>
                </select>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button className="p-2 bg-slate-100 dark:bg-slate-800 text-primary border-r border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400">
                    <span className="material-symbols-outlined">view_list</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Card 1 */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfT-UYGfsrbsoswNdrQYxZCb0JMqIPdc4ERp5isGNq1f9fw7pHaub2PVyMa11SB9RK9oby29FK0bmTOhhIMPPlWq5JIGI6lI6XE0TWcwExop2WXq9ENhgw4XiIVr11eG4Tu3inniESGM3bVgQjf3z-wez2VyLtXlF9DdaGbnVWvvCmTV9XJNdRaHWbMbLUym88bFTIYyBRmaAjAo0rK5kANKnBvZbXxCWm8jkjm4TxhrloPYDhnLn__xAvsEN1VKoY4SUh4h6Hh--8" alt="Panier de légumes frais de saison" />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Promo -20%</span>
                    <span className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Frais</span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Légumes Bio Burundi</p>
                  <Link to="/product/1" className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Panier Maraîcher Premium</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                    </div>
                    <span className="text-[12px] text-slate-400">(42)</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 line-through">12.500 Fbu</span>
                      <span className="text-xl font-bold text-primary">10.000 Fbu</span>
                    </div>
                    <button className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-xl transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 2 */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXxMvyIsJn3qqDMix8u84zmZ0pralT0zxNf-gEkln0bEdNrfV6sOxJL0Y3Bf7ZKx53kYHsGoQwebPcqHU9DMOMQLW1jauAeHfeJsLtDo27GqJIZ37fkkRCp1cKAVNq8jz-U7OgDDhQUAUkBhmTJNDDtUWprHyMjmck2A9WkmiJZ3m_WXbq5ogwRF67KjmiAlqLdCLMgRRRrJjsIrzqCkQdRakXSsKWzDOAnXn2XFiNnpHNfpfduCic5UIjjqNiRcFD1hDXYr4C6d0z" alt="Régime de bananes mûres jaunes" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Nouveauté</span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Fruits de Gitega</p>
                  <Link to="/product/2" className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Bananes Douces (Régime)</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                    </div>
                    <span className="text-[12px] text-slate-400">(89)</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-primary">5.500 Fbu</span>
                    </div>
                    <button className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-xl transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 3 */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjtzblC3Q3GqPW2BRLTvCivYo4VmVwf7qSRy-sN86A78R2S3h66r0n_0VzFQn5f73LZwj_Jzqyl664DJLCU60gW3bUAIy6_HPl5D1wmmqyUJNMwo6yDHH0b4BtO9gYA4b_HbJ5HU-mS3dlADBpev0z25aiyTWKYGT2TFU4aW3fo3-J2NhpoywDKNLjdFAja2CuyTq68Uchia7-rbMmY6jbJ40vcvYVFiKyr2O-T3vbkp-69G9_ttJrYjggqnO_HK5Ld1GTSfABhFX9" alt="Fraises rouges fraîches en barquette" />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bio-Organic</p>
                  <Link to="/product/3" className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Fraises de Montagne (500g)</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                    </div>
                    <span className="text-[12px] text-slate-400">(15)</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-primary">8.200 Fbu</span>
                    </div>
                    <button className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-xl transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgNKLLfl3gE8mVcimCs221miFh-QzaIFOZmeXWsUP_oduMf4X7-Yx-iuO3wYBrKxpcxWRrieXYn-lPF2kdxIJCtry--NOG1s0fbgkdrL5mU-QRzWCDLIfHiLjta6onH-m2wwNRRZJLjlupGGi7RLbX8L5vLV9OrpHb9587fg3sJVm8lRmD3_QFOph_vLrpPKcsxLOmn4JETUXhR-Hx3wXpxD1QKh_7yuTlWv3AkCBs623fXhW8BUomCi2yW03Whg1gryMQcJRK24ts" alt="Avocats bien mûrs coupés en deux" />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Local</p>
                  <Link to="/product/4" className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Avocats Beurre (x3)</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                    </div>
                    <span className="text-[12px] text-slate-400">(112)</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-primary">2.000 Fbu</span>
                    </div>
                    <button className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-xl transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Card 5 */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxQ6eQehNiSKEofpN3J4sqQwVP5HcGRgAKA45QKNeh7uJgAIA_49b6CRW9ND1KpwUWyvcDGVM_3dwRW5f0unuF89ypSOvS2VXlXPUTB7pnmAA7LNWDu_L1bc1IKxuCJjqgqhihhXD9airZCIWSPV9AGe46LBqBD2MJC9qv2O9xpgnadRhl0N-Je33uleSshU3E_NMWgg0Bbl3qaoqa-HXIN9HTxr2KelAM32ePTjh2Vv_lCK09YiVvA8DMnOao4mjkb9_8kWNPwHBf" alt="Ananas entier mûr posé sur une table" />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cibitoke Farms</p>
                  <Link to="/product/5" className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Ananas Victoria Sucré</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                    </div>
                    <span className="text-[12px] text-slate-400">(56)</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-primary">3.500 Fbu</span>
                    </div>
                    <button className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-xl transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Card 6 */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_VWkP8uiQMk1BhhrKyUVa_bOlCNuKXinBzq5K7tNrwdu_ArJKgMREuS38H-tXF00b9OlzxKAtRDfhJmznLLW9g5leaMGBso27J4GY3vvttntHe43EtvvAm96KwUfm6AxkensEl2781lcjeoNRX4dCp1mFnG35HhsB5DFyADckxOGU_5FkDhYYc9bOQSwrknhJnfDi4j5NUGKOadQVxkPylSzfOxTErB3a7ty7KfctZavtOvRw5wqNOdXwopAWfV3dYdBYpcQjuv0j" alt="Tomates cerises rouges fraîches" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Flash Deal</span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Légumes Bujumbura</p>
                  <Link to="/product/6" className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">Tomates Cerises (Kg)</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                    </div>
                    <span className="text-[12px] text-slate-400">(24)</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 line-through">4.500 Fbu</span>
                      <span className="text-xl font-bold text-primary">3.200 Fbu</span>
                    </div>
                    <button className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-xl transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <button className="flex items-center gap-2 bg-slate-900 dark:bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined">refresh</span>
                Charger plus de produits
              </button>
              <nav className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all">3</button>
                <span className="px-2">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all">12</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      {/* Simple Footer for Context */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">shopping_basket</span>
              <h2 className="text-xl font-bold">Bujamart</h2>
            </div>
            <p className="text-sm text-slate-500">Votre supermarché en ligne n°1 au Burundi. Qualité et fraîcheur garanties.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Aide & Service</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-primary" href="#">Contactez-nous</a></li>
              <li><a className="hover:text-primary" href="#">Livraison</a></li>
              <li><a className="hover:text-primary" href="#">Retours</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-primary" href="#">À propos</a></li>
              <li><a className="hover:text-primary" href="#">Conditions Générales</a></li>
              <li><a className="hover:text-primary" href="#">Confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg flex-1 text-sm outline-none px-4" placeholder="Email..." type="email" />
              <button className="bg-primary text-white p-2 rounded-lg">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          © 2024 Bujamart. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
