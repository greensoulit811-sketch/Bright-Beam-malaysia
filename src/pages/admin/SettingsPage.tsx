import { useSettings, useUpdateSettings } from '@/hooks/useDatabase';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const [form, setForm] = useState({
    site_name: '', site_description: '', meta_title: '', meta_description: '',
    whatsapp_number: '', instagram_handle: '', free_shipping_threshold: 30, currency: 'KWD',
  });

  useEffect(() => {
    if (settings) {
      setForm({
        site_name: settings.site_name || '', site_description: settings.site_description || '',
        meta_title: settings.meta_title || '', meta_description: settings.meta_description || '',
        whatsapp_number: settings.whatsapp_number || '', instagram_handle: settings.instagram_handle || '',
        free_shipping_threshold: Number(settings.free_shipping_threshold) || 30, currency: settings.currency || 'KWD',
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      toast.success('Settings saved');
    } catch { toast.error('Failed to save'); }
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Settings</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Site configuration & SEO</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Site Name</label>
              <input value={form.site_name} onChange={e => setForm({ ...form, site_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Site Description</label>
              <textarea value={form.site_description} onChange={e => setForm({ ...form, site_description: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Currency</label>
                <input value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Free Shipping Min (KWD)</label>
                <input type="number" value={form.free_shipping_threshold} onChange={e => setForm({ ...form, free_shipping_threshold: +e.target.value })}
                  className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Meta Title</label>
              <input value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              <p className="font-body text-xs text-muted-foreground mt-1">{form.meta_title.length}/60 characters</p>
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Meta Description</label>
              <textarea value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
              <p className="font-body text-xs text-muted-foreground mt-1">{form.meta_description.length}/160 characters</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg">
          <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">Social & Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">WhatsApp Number</label>
              <input value={form.whatsapp_number} onChange={e => setForm({ ...form, whatsapp_number: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Instagram Handle</label>
              <input value={form.instagram_handle} onChange={e => setForm({ ...form, instagram_handle: e.target.value })}
                className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={updateSettings.isPending}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all disabled:opacity-50">
          {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
