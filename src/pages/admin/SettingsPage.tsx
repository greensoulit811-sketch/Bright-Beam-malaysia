import { useAdmin } from '@/context/AdminContext';
import { useState } from 'react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { settings, updateSettings } = useAdmin();
  const [form, setForm] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    toast.success('Settings saved');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">Settings</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Site configuration & SEO</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* General */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Site Name</label>
              <input value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Site Description</label>
              <textarea value={form.siteDescription} onChange={e => setForm({ ...form, siteDescription: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Currency</label>
                <input value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Free Shipping Min (KWD)</label>
                <input type="number" value={form.freeShippingThreshold} onChange={e => setForm({ ...form, freeShippingThreshold: +e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Meta Title</label>
              <input value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
              <p className="font-body text-xs text-muted-foreground mt-1">{form.metaTitle.length}/60 characters</p>
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Meta Description</label>
              <textarea value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon resize-none" />
              <p className="font-body text-xs text-muted-foreground mt-1">{form.metaDescription.length}/160 characters</p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-card border border-border p-6">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">Social & Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">WhatsApp Number</label>
              <input value={form.whatsappNumber} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Instagram Handle</label>
              <input value={form.instagramHandle} onChange={e => setForm({ ...form, instagramHandle: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-neon" />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-neon text-accent-foreground px-8 py-3 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-all glow-neon">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
