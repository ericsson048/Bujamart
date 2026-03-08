import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { api } from '../services/api';
import { getCurrentRole, getCurrentUser } from '../services/auth';
import { clearCart, getCart, getCartCount, saveCart, type CartItem } from '../services/cart';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

export default function Cart() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const currentRole = getCurrentRole();
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState(currentUser?.full_name ?? '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  function updateQuantity(productId: number, quantity: number) {
    const next = items
      .map((item) => (item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
      .filter((item) => item.quantity > 0);
    setItems(next);
    saveCart(next);
  }

  async function submitOrder() {
    if (!customerEmail || items.length === 0) {
      setError('Email client et panier sont requis.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const order = await api.createOrder({
        customer_email: customerEmail,
        customer_name: customerName || undefined,
        items: items.map((item) => ({ product_id: item.product.id, quantity: item.quantity })),
      });

      if (currentRole !== 'guest') {
        const successUrl = `${window.location.origin}/checkout/success?source=stripe`;
        const cancelUrl = `${window.location.origin}/cart`;
        const checkout = await api.createStripeCheckout({
          order_id: order.id,
          success_url: successUrl,
          cancel_url: cancelUrl,
        });
        window.location.assign(checkout.checkout_url);
        return;
      }

      clearCart();
      navigate('/checkout/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Commande impossible.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <header className="flex items-center justify-between">
          <Link to="/" className="text-primary font-bold">Bujamart</Link>
          <Link to="/products" className="text-sm underline">Continuer les achats</Link>
        </header>

        <h1 className="text-2xl font-bold">Panier ({getCartCount()} articles)</h1>

        {items.length === 0 && <p>Votre panier est vide.</p>}

        {items.map((item) => (
          <div key={item.product.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <p className="font-bold">{item.product.name}</p>
              <p className="text-sm text-slate-500">{formatBif(item.product.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="px-2 border rounded" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button type="button" className="px-2 border rounded" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
            </div>
          </div>
        ))}

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <h2 className="font-bold">Informations client</h2>
          <input
            className="w-full px-3 py-2 rounded border bg-transparent"
            placeholder="Nom complet"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            readOnly={currentRole !== 'guest'}
          />
          <input
            className="w-full px-3 py-2 rounded border bg-transparent"
            placeholder="Email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            readOnly={currentRole !== 'guest'}
          />
        </section>

        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{formatBif(total)}</span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="button"
          className="w-full py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
          onClick={() => void submitOrder()}
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? 'Validation...' : 'Confirmer la commande'}
        </button>
      </div>
    </div>
  );
}
