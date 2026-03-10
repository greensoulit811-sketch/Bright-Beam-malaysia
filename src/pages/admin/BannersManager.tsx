import { useState } from 'react';
import { useBanners, useAddBanner, useUpdateBanner, useDeleteBanner, type DbBanner } from '@/hooks/useDatabase';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const images = [
  '/assets/hero-sports.jpg', '/assets/shoe-basketball.jpg', '/assets/shoe-runner-1.jpg',
  '/assets/shoe-training.jpg', '/assets/shoe-football.jpg', '/assets/shoe-trail.jpg',
];

const BannersManager = () => {
  const { data: banners = [], isLoading } = useBanners();
  const addBanner = useAddBanner();
  const updateBanner = useUpdateBanner();
  const deleteBanner = useDeleteBanner();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbBanner | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', image_url: images[0], link_url: '/shop', is_active: true, position: 'promo' as string });

  const openAdd = () => { setEditing(null); setForm({ title: '', subtitle: '', image_url: images[0], link_url: '/shop', is_active: true, position: 'promo' }); setShowForm(true); };
  const openEdit = (b: DbBanner) => { setEditing(b); setForm({ title: b.title, subtitle: b.subtitle || '', image_url: b.image_url, link_url: b.link_url || '/shop', is_active: b.is_active ?? true, position: b.position }); setShowForm(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await updateBanner.mutateAsync({ id: editing.id, ...form }); toast.success('Banner updated'); }
      else { await addBanner.mutateAsync(form); toast.success('Banner created'); }
      setShowForm(false);
    } catch { toast.error('Failed to save'); }
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Banners</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Manage promotional banners</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {banners.map(b => (
          <div key={b.id} className="bg-card border border-border overflow-hidden rounded-lg hover:border-primary/20 transition-colors">
            <div className="aspect-video relative">
              <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2 py-0.5 text-xs font-body font-bold uppercase bg-white/20 text-white mb-2 rounded">{b.position}</span>
                <h3 className="font-heading text-xl font-bold uppercase text-white">{b.title}</h3>
                <p className="font-body text-sm text-white/80">{b.subtitle}</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">Link: {b.link_url}</span>
              <div className="flex gap-2">
                <button onClick={async () => { await updateBanner.mutateAsync({ id: b.id, is_active: !b.is_active }); }} className="p-2 hover:bg-secondary rounded-md transition-colors">
                  {b.is_active ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </button>
                <button onClick={() => openEdit(b)} className="p-2 hover:bg-secondary rounded-md transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={async () => { await deleteBanner.mutateAsync(b.id); toast.success('Deleted'); }} className="p-2 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-lg p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground">{editing ? 'Edit' : 'Add'} Banner</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Subtitle</label>
                <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Image</label>
                <div className="grid grid-cols-3 gap-2">
                  {images.map(img => (
                    <button key={img} type="button" onClick={() => setForm({ ...form, image_url: img })}
                      className={`aspect-video border-2 overflow-hidden rounded-md ${form.image_url === img ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Link URL</label>
                  <input value={form.link_url} onChange={e => setForm({ ...form, link_url: e.target.value })} className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Position</label>
                  <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary">
                    <option value="hero">Hero</option><option value="promo">Promo</option><option value="category">Category</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 font-body text-sm cursor-pointer text-foreground">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-primary" /> Active
              </label>
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all">
                {editing ? 'Save' : 'Create'} Banner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannersManager;
