import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { api, type Product } from '../services/api';
import { addToCart, getCartCount } from '../services/cart';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    const query = searchParams.get('q') ?? '';
    setSearchTerm(query);
  }, [searchParams]);

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

  function handleAddToCart(product: Product) {
    addToCart(product, 1);
    setCartCount(getCartCount());
  }

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    const trimmed = value.trim();
    if (!trimmed) {
      setSearchParams({});
      return;
    }
    setSearchParams({ q: trimmed });
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">shopping_basket</span>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold">Bujamart</h2>
          </Link>
          <div className="flex-1 max-w-xl">
            <input
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 px-4 focus:ring-2 focus:ring-primary text-sm outline-none"
              placeholder="Rechercher un produit..."
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <Link to="/cart" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative text-slate-700 dark:text-slate-200">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 rounded-full">{cartCount}</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Catalogue produits</h1>
          <p className="text-sm text-slate-500">{filteredProducts.length} produit(s)</p>
        </div>

        {isLoading && <p>Chargement des produits...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <p className="text-sm text-slate-500">Aucun produit trouvé.</p>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="aspect-square bg-slate-100 dark:bg-slate-700">
                  {product.image_url ? (
                    <img className="w-full h-full object-cover" src={product.image_url} alt={product.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Image indisponible</div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold hover:text-primary">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 line-clamp-2">{product.description ?? 'Aucune description.'}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-primary">{formatBif(product.price)}</span>
                    <button
                      className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      onClick={() => handleAddToCart(product)}
                      type="button"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
