import { FormEvent, useEffect, useMemo, useState } from 'react';

import { api, type Product } from '../../services/api';

function formatBif(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} BIF`;
}

type ProductForm = {
  name: string;
  description: string;
  price: string;
  stock: string;
  image_url: string;
};

const initialForm: ProductForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  image_url: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const [createForm, setCreateForm] = useState<ProductForm>(initialForm);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<ProductForm>(initialForm);

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function loadProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.listProducts(false);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur chargement produits');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        (product.description ?? '').toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && product.is_active) ||
        (statusFilter === 'inactive' && !product.is_active);

      return matchesTerm && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  function openEdit(product: Product) {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description ?? '',
      price: String(product.price),
      stock: String(product.stock),
      image_url: product.image_url ?? '',
    });
    setError(null);
    setSuccess(null);
  }

  async function handleCreateProduct(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsCreating(true);

    try {
      await api.createProduct({
        name: createForm.name,
        description: createForm.description || null,
        image_url: createForm.image_url || null,
        price: Number(createForm.price),
        stock: Number(createForm.stock),
      });
      setCreateForm(initialForm);
      setSuccess('Produit ajoute au catalogue.');
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Creation impossible');
    } finally {
      setIsCreating(false);
    }
  }

  async function handleSaveEdit(event: FormEvent) {
    event.preventDefault();
    if (!editingProduct) {
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSavingEdit(true);

    try {
      await api.updateProduct(editingProduct.id, {
        name: editForm.name,
        description: editForm.description || null,
        image_url: editForm.image_url || null,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      });
      setSuccess('Produit mis a jour.');
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mise a jour impossible');
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function handleToggleActive(product: Product) {
    setError(null);
    setSuccess(null);

    try {
      await api.updateProduct(product.id, { is_active: !product.is_active });
      setSuccess(product.is_active ? 'Produit desactive.' : 'Produit reactive.');
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action impossible');
    }
  }

  async function handleArchive(product: Product) {
    setError(null);
    setSuccess(null);

    try {
      await api.archiveProduct(product.id);
      setSuccess('Produit archive du catalogue.');
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Suppression impossible');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Catalogue produits</h1>
        <p className="text-sm text-slate-300">Gestion complete: ajout, edition, activation et archivage.</p>
      </div>

      {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      {success && <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{success}</p>}

      <form className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl grid grid-cols-1 gap-3 lg:grid-cols-6" onSubmit={handleCreateProduct}>
        <input
          className="rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary lg:col-span-2"
          placeholder="Nom du produit"
          value={createForm.name}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          className="rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary"
          placeholder="Prix"
          type="number"
          min={1}
          value={createForm.price}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, price: e.target.value }))}
          required
        />
        <input
          className="rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary"
          placeholder="Stock"
          type="number"
          min={0}
          value={createForm.stock}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, stock: e.target.value }))}
          required
        />
        <input
          className="rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary lg:col-span-2"
          placeholder="URL image (optionnel)"
          value={createForm.image_url}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, image_url: e.target.value }))}
        />
        <input
          className="rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary lg:col-span-5"
          placeholder="Description (optionnel)"
          value={createForm.description}
          onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
        />
        <button type="submit" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60" disabled={isCreating}>
          {isCreating ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary md:col-span-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="rounded-xl border border-white/15 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
        >
          <option value="all">Tous</option>
          <option value="active">Actifs</option>
          <option value="inactive">Inactifs</option>
        </select>
      </div>

      {editingProduct && (
        <form className="rounded-2xl border border-primary/30 bg-primary/10 p-4 backdrop-blur-xl grid grid-cols-1 gap-3 lg:grid-cols-6" onSubmit={handleSaveEdit}>
          <h2 className="lg:col-span-6 text-sm font-bold uppercase tracking-wider text-primary">Edition produit</h2>
          <input
            className="rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary lg:col-span-2"
            value={editForm.name}
            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary"
            type="number"
            min={1}
            value={editForm.price}
            onChange={(e) => setEditForm((prev) => ({ ...prev, price: e.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary"
            type="number"
            min={0}
            value={editForm.stock}
            onChange={(e) => setEditForm((prev) => ({ ...prev, stock: e.target.value }))}
            required
          />
          <input
            className="rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary lg:col-span-2"
            value={editForm.image_url}
            onChange={(e) => setEditForm((prev) => ({ ...prev, image_url: e.target.value }))}
            placeholder="URL image"
          />
          <input
            className="rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-primary lg:col-span-4"
            value={editForm.description}
            onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
          />
          <button type="submit" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60" disabled={isSavingEdit}>
            {isSavingEdit ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <button type="button" onClick={() => setEditingProduct(null)} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">
            Annuler
          </button>
        </form>
      )}

      {isLoading && <p className="text-slate-300">Chargement...</p>}

      {!isLoading && (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium">Prix</th>
                  <th className="px-5 py-3 font-medium">Stock</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-t border-white/5 text-slate-200 align-top">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-white">{product.name}</p>
                      {product.description && <p className="mt-1 text-xs text-slate-400 line-clamp-2">{product.description}</p>}
                    </td>
                    <td className="px-5 py-3">{formatBif(product.price)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${product.stock <= 5 ? 'bg-amber-500/20 text-amber-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${product.is_active ? 'bg-emerald-500/20 text-emerald-200' : 'bg-slate-500/30 text-slate-300'}`}>
                        {product.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => openEdit(product)} className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10">
                          Modifier
                        </button>
                        <button type="button" onClick={() => void handleToggleActive(product)} className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10">
                          {product.is_active ? 'Desactiver' : 'Activer'}
                        </button>
                        <button type="button" onClick={() => void handleArchive(product)} className="rounded-lg border border-red-400/40 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-500/20">
                          Archiver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="px-5 py-4 text-sm text-slate-400">Aucun produit trouve.</p>}
        </div>
      )}
    </div>
  );
}
