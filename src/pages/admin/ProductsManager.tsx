import { useState } from 'react';
import { useAdmin, AdminProduct } from '@/context/AdminContext';
import { products as catalogProducts } from '@/data/products';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { toast } from 'sonner';

const defaultProduct: Omit<AdminProduct, 'id' | 'createdAt'> = {
  name: '', brand: '', price: 0, category: 'running', image: '/assets/shoe-runner-1.jpg',
  sizes: [40, 41, 42, 43, 44], colors: ['Black'], description: '', stock: 50,
  isActive: true, isTrending: false, isNew: false,
};

const ProductsManager = () => {
  const { products: adminProducts, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [form, setForm] = useState(defaultProduct);
  const [search, setSearch] = useState('');
  const [sizesInput, setSizesInput] = useState('40,41,42,43,44');
  const [colorsInput, setColorsInput] = useState('Black');

  const allProducts = [
    ...catalogProducts.map(p => ({ ...p, stock: 50, isActive: true, isTrending: p.isTrending || false, isNew: p.isNew || false, createdAt: '2026-01-01', sizes: p.sizes, colors: p.colors } as AdminProduct)),
    ...adminProducts,
  ];

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(defaultProduct);
    setSizesInput('40,41,42,43,44');
    setColorsInput('Black');
    setShowForm(true);
  };

  const openEdit = (p: AdminProduct) => {
    setEditing(p);
    setForm(p);
    setSizesInput(p.sizes.join(','));
    setColorsInput(p.colors.join(','));
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      sizes: sizesInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)),
      colors: colorsInput.split(',').map(c => c.trim()).filter(Boolean),
    };
    if (editing) {
      updateProduct(editing.id, data);
      toast.success('Product updated');
    } else {
      addProduct(data);
      toast.success('Product added');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success('Product deleted');
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
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">Products</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">{allProducts.length} total products</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-neon text-accent-foreground px-5 py-2.5 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text" placeholder="Search products..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-border bg-card font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon transition-colors"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border overflow-x-auto">
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
            {filtered.map(p => {
              const isCustom = adminProducts.some(ap => ap.id === p.id);
              return (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover bg-secondary" />
                      <div>
                        <p className="font-body text-sm font-semibold">{p.name}</p>
                        {p.isNew && <span className="text-xs text-neon font-bold">NEW</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm">{p.brand}</td>
                  <td className="p-4 font-body text-sm font-bold text-neon">{p.price} KWD</td>
                  <td className="p-4 font-body text-sm capitalize">{p.category}</td>
                  <td className="p-4 font-body text-sm">{p.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-body font-bold rounded-sm uppercase ${p.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {p.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {isCustom ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 hover:bg-secondary rounded transition-colors">
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-secondary rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ) : (
                      <span className="font-body text-xs text-muted-foreground">Catalog</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider">{editing ? 'Edit' : 'Add'} Product</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Brand</label>
                  <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Price (KWD)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} required
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Original Price</label>
                  <input type="number" step="0.01" value={form.originalPrice || ''} onChange={e => setForm({ ...form, originalPrice: e.target.value ? +e.target.value : undefined })}
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: +e.target.value })}
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon">
                  {['running', 'basketball', 'football', 'training', 'lifestyle', 'trail', 'women'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Image</label>
                <div className="grid grid-cols-4 gap-2">
                  {images.map(img => (
                    <button key={img} type="button" onClick={() => setForm({ ...form, image: img })}
                      className={`aspect-square border-2 overflow-hidden transition-all ${form.image === img ? 'border-neon' : 'border-border hover:border-neon/50'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Sizes (comma separated)</label>
                  <input value={sizesInput} onChange={e => setSizesInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Colors (comma separated)</label>
                  <input value={colorsInput} onChange={e => setColorsInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon resize-none" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="accent-neon" /> Active
                </label>
                <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isTrending} onChange={e => setForm({ ...form, isTrending: e.target.checked })} className="accent-neon" /> Trending
                </label>
                <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="accent-neon" /> New
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-neon text-accent-foreground py-3 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all">
                  {editing ? 'Save Changes' : 'Add Product'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border font-body text-sm font-medium hover:bg-secondary transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
