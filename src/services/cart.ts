import type { Product } from "./api";

export type CartItem = {
  product: Product;
  quantity: number;
};

const CART_KEY = "bujamart_cart";

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) {
      return [];
    }
    const data = JSON.parse(raw) as CartItem[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const cart = getCart();
  const found = cart.find((item) => item.product.id === product.id);
  if (found) {
    found.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  saveCart(cart);
  return cart;
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

