import { useState } from 'react';
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct, type DbProduct } from '@/hooks/useDatabase';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { toast } from 'sonner';

const ProductsManager = () => {
  const { data: products = [], isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    name: '', brand: '', price: 0, original_price: null as number | null, category: 'running',
    image: '/assets/shoe-runner-1.jpg', sizes: '40,41,42,43,44', colors: 'Black',
    description: '', stock: 50, is_active: true, is_trending: false, is_new: false,
  });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', brand: '', price: 0, original_price: null, category: 'running', image: '/assets/shoe-runner-1.jpg', sizes: '40,41,42,43,44', colors: 'Black', description: '', stock: 50, is_active: true, is_trending: false, is_new: false });
    setShowForm(true);
  };

  const openEdit = (p: DbProduct) => {
    setEditing(p);
    setForm({
      name: p.name, brand: p.brand, price: Number(p.price), original_price: p.original_price ? Number(p.original_price) : null,
      category: p.category, image: p.image, sizes: (p.sizes || []).join(','), colors: (p.colors || []).join(','),
      description: p.description || '', stock: p.stock || 50, is_active: p.is_active ?? true, is_trending: p.is_trending ?? false, is_new: p.is_new ?? false,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name, brand: form.brand, price: form.price, original_price: form.original_price,
      category: form.category, image: form.image,
      sizes: form.sizes.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)),
      colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
      description: form.description, stock: form.stock, is_active: form.is_active, is_trending: form.is_trending, is_new: form.is_new,
    };
    try {
      if (editing) {
        await updateProduct.mutateAsync({ id: editing.id, ...data });
        toast.success('Product updated');
      } else {
        await addProduct.mutateAsync(data);
        toast.success('Product added');
      }
      setShowForm(false);
    } catch { toast.error('Failed to save product'); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success('Product deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const images = [
    '/assets/shoe-runner-1.jpg', '/assets/shoe-basketball.jpg', '/assets/shoe-retro.jpg',
    '/assets/shoe-training.jpg', '/assets/shoe-lifestyle.jpg', '/assets/shoe-trail.jpg',
    '/assets/shoe-womens-run.jpg', '/assets/shoe-football.jpg',
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Products</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-border bg-card rounded-md font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
      </div>

      {isLoading ? (
        <p className="text-center py-10 text-muted-foreground">Loading...</p>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Brand</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Stock</th>
                <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-right p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded bg-secondary" />
                      <div>
                        <p className="font-body text-sm font-semibold text-foreground">{p.name}</p>
                        {p.is_new && <span className="text-xs text-primary font-bold">NEW</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm text-foreground">{p.brand}</td>
                  <td className="p-4 font-body text-sm font-bold text-primary">{Number(p.price)} KWD</td>
                  <td className="p-4 font-body text-sm capitalize text-foreground">{p.category}</td>
                  <td className="p-4 font-body text-sm text-foreground">{p.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-body font-bold rounded-full uppercase ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-secondary rounded-md transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground">{editing ? 'Edit' : 'Add'} Product</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Brand</label>
                  <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Price (KWD)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} required
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Original Price</label>
                  <input type="number" step="0.01" value={form.original_price || ''} onChange={e => setForm({ ...form, original_price: e.target.value ? +e.target.value : null })}
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: +e.target.value })}
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary">
                  {['running','basketball','football','training','lifestyle','trail','women'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Image</label>
                <div className="grid grid-cols-4 gap-2">
                  {images.map(img => (
                    <button key={img} type="button" onClick={() => setForm({ ...form, image: img })}
                      className={`aspect-square border-2 overflow-hidden rounded-md transition-all ${form.image === img ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Sizes (comma separated)</label>
                  <input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Colors (comma separated)</label>
                  <input value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 font-body text-sm cursor-pointer text-foreground">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-primary" /> Active
                </label>
                <label className="flex items-center gap-2 font-body text-sm cursor-pointer text-foreground">
                  <input type="checkbox" checked={form.is_trending} onChange={e => setForm({ ...form, is_trending: e.target.checked })} className="accent-primary" /> Trending
                </label>
                <label className="flex items-center gap-2 font-body text-sm cursor-pointer text-foreground">
                  <input type="checkbox" checked={form.is_new} onChange={e => setForm({ ...form, is_new: e.target.checked })} className="accent-primary" /> New
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={addProduct.isPending || updateProduct.isPending}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all disabled:opacity-50">
                  {editing ? 'Save Changes' : 'Add Product'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-md font-body text-sm font-medium hover:bg-secondary transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
