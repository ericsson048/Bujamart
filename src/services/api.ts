import { clearCurrentUser, getAccessToken, getRefreshToken, setAuthTokens, setCurrentUser } from "./auth";

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: number;
  customer_id: number;
  status: string;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
};

export type OrderAdmin = {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  customer_id: number;
  customer_email: string;
  customer_name: string | null;
  items_count: number;
};

export type Customer = {
  id: number;
  email: string;
  full_name: string | null;
  created_at: string;
  orders_count: number;
  total_spent: number;
};

export type Dashboard = {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  low_stock_products: number;
  recent_orders: OrderAdmin[];
};

export type AuthUser = {
  id: number;
  full_name: string;
  email: string;
  is_admin: boolean;
  role: "admin" | "client";
  access_token?: string | null;
  token_type?: string | null;
  refresh_token?: string | null;
};

export type StoreSettings = {
  id: number;
  store_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  currency: string;
  timezone: string;
  updated_at: string;
};

type CreateOrderPayload = {
  customer_email: string;
  customer_name?: string;
  items: Array<{ product_id: number; quantity: number }>;
};

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken();
  let response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 401 && path !== "/auth/login" && path !== "/auth/refresh") {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (refreshResponse.ok) {
        const refreshed = (await refreshResponse.json()) as AuthUser;
        if (refreshed.access_token) {
          setAuthTokens(refreshed.access_token, refreshed.refresh_token ?? refreshToken);
        }
        setCurrentUser({
          ...refreshed,
          refresh_token: refreshed.refresh_token ?? refreshToken,
        });
        const renewedToken = getAccessToken();
        response = await fetch(`${API_BASE}${path}`, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...(renewedToken ? { Authorization: `Bearer ${renewedToken}` } : {}),
            ...(init?.headers ?? {}),
          },
        });
      } else {
        clearCurrentUser();
      }
    }
  }

  if (!response.ok) {
    let detail = "Erreur API";
    try {
      const body = await response.json();
      detail = body.detail ?? detail;
    } catch {
      // ignore parse errors and keep default message
    }
    throw new Error(detail);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export const api = {
  listProducts: (activeOnly = true) =>
    request<Product[]>(`/products?active_only=${activeOnly ? "true" : "false"}`),
  getProduct: (id: number) => request<Product>(`/products/${id}`),
  createProduct: (payload: {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    image_url?: string | null;
  }) => request<Product>("/products", { method: "POST", body: JSON.stringify(payload) }),
  updateProduct: (
    productId: number,
    payload: {
      name?: string;
      description?: string | null;
      price?: number;
      stock?: number;
      image_url?: string | null;
      is_active?: boolean;
    },
  ) => request<Product>(`/products/${productId}`, { method: "PATCH", body: JSON.stringify(payload) }),
  archiveProduct: (productId: number) => request<void>(`/products/${productId}`, { method: "DELETE" }),
  createOrder: (payload: CreateOrderPayload) =>
    request<Order>("/orders", { method: "POST", body: JSON.stringify(payload) }),
  listOrders: () => request<OrderAdmin[]>("/orders"),
  updateOrderStatus: (orderId: number, status: string) =>
    request<OrderAdmin>(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  listCustomers: () => request<Customer[]>("/admin/customers"),
  getDashboard: () => request<Dashboard>("/admin/dashboard"),
  getSettings: () => request<StoreSettings>("/admin/settings"),
  updateSettings: (payload: Omit<StoreSettings, "id" | "updated_at">) =>
    request<StoreSettings>("/admin/settings", { method: "PUT", body: JSON.stringify(payload) }),
  register: (payload: { full_name: string; email: string; password: string }) =>
    request<AuthUser>("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    request<AuthUser>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request<AuthUser>("/auth/me"),
  logout: (payload: { refresh_token: string }) =>
    request<{ status: string }>("/auth/logout", { method: "POST", body: JSON.stringify(payload) }),
  changePassword: (payload: { current_password: string; new_password: string }) =>
    request<{ status: string }>("/auth/change-password", { method: "POST", body: JSON.stringify(payload) }),
  forgotPassword: (payload: { email: string }) =>
    request<{ status: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify(payload) }),
  resetPassword: (payload: { token: string; new_password: string }) =>
    request<{ status: string }>("/auth/reset-password", { method: "POST", body: JSON.stringify(payload) }),
  createStripeCheckout: (payload: { order_id: number; success_url: string; cancel_url: string }) =>
    request<{ checkout_url: string; session_id: string }>("/payments/checkout-session", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
