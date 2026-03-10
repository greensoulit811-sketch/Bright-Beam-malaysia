import { useState } from 'react';
import { useAdmin, Banner } from '@/context/AdminContext';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const images = [
  '/assets/hero-sports.jpg', '/assets/shoe-basketball.jpg', '/assets/shoe-runner-1.jpg',
  '/assets/shoe-training.jpg', '/assets/shoe-football.jpg', '/assets/shoe-trail.jpg',
];

const defaultBanner: Omit<Banner, 'id'> = {
  title: '', subtitle: '', imageUrl: images[0], linkUrl: '/shop', isActive: true, position: 'promo',
};

const BannersManager = () => {
  const { banners, addBanner, updateBanner, deleteBanner } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(defaultBanner);

  const openAdd = () => { setEditing(null); setForm(defaultBanner); setShowForm(true); };
  const openEdit = (b: Banner) => { setEditing(b); setForm(b); setShowForm(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { updateBanner(editing.id, form); toast.success('Banner updated'); }
    else { addBanner(form); toast.success('Banner created'); }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">Banners</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Manage promotional banners</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-neon text-accent-foreground px-5 py-2.5 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all">
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {banners.map(b => (
          <div key={b.id} className="bg-card border border-border overflow-hidden hover:border-neon/20 transition-colors">
            <div className="aspect-video relative">
              <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2 py-0.5 text-xs font-body font-bold uppercase bg-neon/20 text-neon mb-2">{b.position}</span>
                <h3 className="font-heading text-xl font-bold uppercase">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{b.subtitle}</p>
              </div>
              {!b.isActive && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/20 text-red-400 text-xs font-body font-bold uppercase">
                  Hidden
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">Link: {b.linkUrl}</span>
              <div className="flex gap-2">
                <button onClick={() => updateBanner(b.id, { isActive: !b.isActive })} className="p-2 hover:bg-secondary rounded transition-colors">
                  {b.isActive ? <Eye className="w-4 h-4 text-neon" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </button>
                <button onClick={() => openEdit(b)} className="p-2 hover:bg-secondary rounded transition-colors">
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => { deleteBanner(b.id); toast.success('Deleted'); }} className="p-2 hover:bg-secondary rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider">{editing ? 'Edit' : 'Add'} Banner</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                  className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Subtitle</label>
                <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Image</label>
                <div className="grid grid-cols-3 gap-2">
                  {images.map(img => (
                    <button key={img} type="button" onClick={() => setForm({ ...form, imageUrl: img })}
                      className={`aspect-video border-2 overflow-hidden ${form.imageUrl === img ? 'border-neon' : 'border-border hover:border-neon/50'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Link URL</label>
                  <input value={form.linkUrl} onChange={e => setForm({ ...form, linkUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Position</label>
                  <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value as Banner['position'] })}
                    className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon">
                    <option value="hero">Hero</option>
                    <option value="promo">Promo</option>
                    <option value="category">Category</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="accent-neon" /> Active
              </label>
              <button type="submit" className="w-full bg-neon text-accent-foreground py-3 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all">
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
