import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { api, type Product } from '../services/api';
import { getCurrentRole } from '../services/auth';
import { addToCart, getCartCount } from '../services/cart';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

const CATEGORY_META = [
  { key: 'epicerie', label: 'Epicerie', icon: 'restaurant' },
  { key: 'high-tech', label: 'High-Tech', icon: 'devices' },
  { key: 'maison', label: 'Maison', icon: 'home' },
  { key: 'mode', label: 'Mode', icon: 'checkroom' },
] as const;

export default function Home() {
  const navigate = useNavigate();
  const currentRole = getCurrentRole();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.listProducts();
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Impossible de charger les produits.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return products;
    }
    return products.filter((product) => {
      const name = product.name.toLowerCase();
      const description = (product.description ?? '').toLowerCase();
      return name.includes(term) || description.includes(term);
    });
  }, [products, searchTerm]);

  const featuredProducts = useMemo(() => filteredProducts.slice(0, 4), [filteredProducts]);

  function handleAddToCart(product: Product) {
    addToCart(product, 1);
    setCartCount(getCartCount());
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) {
      navigate('/products');
      return;
    }
    navigate(`/products?q=${encodeURIComponent(query)}`);
  }

  function getProfileTarget(): string {
    if (currentRole === 'admin') {
      return '/admin';
    }
    return '/profile';
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-10">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Bujamart</h1>
            </Link>
            <div className="hidden flex-1 justify-center px-8 md:flex">
              <form className="relative w-full max-w-md" onSubmit={handleSearchSubmit}>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800 outline-none"
                  placeholder="Rechercher un produit..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-slate-500 hover:text-primary"
                  aria-label="Lancer la recherche"
                >
                  <span className="material-symbols-outlined text-base">search</span>
                </button>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-200">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">{cartCount}</span>
              </Link>
              {currentRole === 'guest' ? (
                <Link
                  to="/login"
                  className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white hover:brightness-110"
                >
                  Se connecter
                </Link>
              ) : (
                <Link
                  to={getProfileTarget()}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-primary/20 bg-slate-100 text-slate-700 hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-200"
                  aria-label="Profil utilisateur"
                  title="Mon espace"
                >
                  <span className="material-symbols-outlined">person</span>
                </Link>
              )}
            </div>
          </div>
          <div className="px-4 pb-3 md:hidden">
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800 outline-none"
                placeholder="Rechercher..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-slate-500 hover:text-primary"
                aria-label="Lancer la recherche"
              >
                <span className="material-symbols-outlined text-base">search</span>
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] flex-1">
          <section className="p-4">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-start justify-center p-8 md:p-16">
                <span className="mb-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">Promo de Saison</span>
                <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">Fraicheur locale <br />a votre porte</h2>
                <p className="mb-6 max-w-md text-slate-300">Explore des produits reels charges depuis l'API FastAPI.</p>
                <Link to="/products" className="rounded-xl bg-primary px-8 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95">Acheter maintenant</Link>
              </div>
            </div>
          </section>

          <section className="px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Categories Populaires</h3>
              <Link to="/products" className="text-sm font-semibold text-primary">Voir tout</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {CATEGORY_META.map((category) => (
                <Link
                  key={category.key}
                  to={`/products?q=${encodeURIComponent(category.label)}`}
                  className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-primary dark:bg-slate-800">
                    <span className="material-symbols-outlined text-3xl">{category.icon}</span>
                  </div>
                  <span className="text-sm font-bold">{category.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Offres Speciales</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Produits alimentes depuis l'endpoint /products</p>
              </div>
              <Link to="/products" className="text-sm font-semibold text-primary">Voir catalogue</Link>
            </div>

            {isLoading && <p>Chargement des produits...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!isLoading && !error && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      {product.image_url ? (
                        <img alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" src={product.image_url} />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-xs text-slate-400">Image indisponible</div>
                      )}
                    </div>
                    <div className="flex flex-col p-4">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Produit</span>
                      <Link to={`/product/${product.id}`} className="mt-1 line-clamp-1 font-bold text-slate-900 dark:text-white hover:text-primary">
                        {product.name}
                      </Link>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">{formatBif(product.price)}</span>
                      </div>
                      <button
                        type="button"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                        Ajouter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !error && featuredProducts.length === 0 && (
              <p className="text-sm text-slate-500">Aucun produit ne correspond a votre recherche.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
