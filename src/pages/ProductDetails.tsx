import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api, type Product } from '../services/api';
import { addToCart, getCartCount } from '../services/cart';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!id) {
        setError('Produit invalide.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getProduct(Number(id));
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Impossible de charger le produit.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleAddToCart() {
    if (!product) {
      return;
    }
    addToCart(product, quantity);
    setCartCount(getCartCount());
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold">Bujamart</Link>
          <Link to="/cart" className="relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] px-1.5 rounded-full">{cartCount}</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
              {product.image_url ? (
                <img alt={product.name} className="w-full h-full object-cover" src={product.image_url} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">Image indisponible</div>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-slate-500">{product.description ?? 'Aucune description disponible.'}</p>
              <p className="text-2xl font-black text-primary">{formatBif(product.price)}</p>
              <p className="text-sm">Stock: {product.stock}</p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-3 py-2 rounded border"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  className="px-3 py-2 rounded border"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button type="button" className="px-4 py-3 bg-primary text-white rounded-lg" onClick={handleAddToCart}>
                Ajouter au panier
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

