import { useState, useRef } from 'react';
import { useBrands, useAddBrand, useUpdateBrand, useDeleteBrand, type DbBrand } from '@/hooks/useDatabase';
import { uploadProductImage, deleteProductImage } from '@/lib/image-upload';
import { Plus, Pencil, Trash2, X, Upload, ImageIcon, Loader2, Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const BrandsManager = () => {
  const { data: brands = [], isLoading } = useBrands();
  const addBrand = useAddBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();
  
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbBrand | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    image_url: '',
    link_url: '',
    is_active: true,
    sort_order: 0,
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', image_url: '', link_url: '', is_active: true, sort_order: brands.length });
    setShowForm(true);
  };

  const openEdit = (brand: DbBrand) => {
    setEditing(brand);
    setForm({
      title: brand.title,
      image_url: brand.image_url,
      link_url: brand.link_url || '',
      is_active: brand.is_active ?? true,
      sort_order: brand.sort_order ?? 0,
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file, 'brand');
      setForm(f => ({ ...f, image_url: url }));
      toast.success('Logo uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image_url) {
      toast.error('Name and logo are required');
      return;
    }

    const data = {
      title: form.title,
      image_url: form.image_url,
      link_url: form.link_url,
      is_active: form.is_active,
      sort_order: form.sort_order,
    };

    try {
      if (editing) {
        await updateBrand.mutateAsync({ id: editing.id, ...data });
        toast.success('Brand updated');
      } else {
        await addBrand.mutateAsync(data);
        toast.success('Brand added');
      }
      setShowForm(false);
    } catch {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete brand "${name}"?`)) return;
    try {
      await deleteBrand.mutateAsync(id);
      toast.success(`"${name}" deleted`);
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0A2342] uppercase tracking-tight">Brand Logos</h1>
          <p className="text-gray-500 mt-1">Manage brand logos for the Dealer and Home pages</p>
        </div>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 font-bold uppercase tracking-wider gap-2">
          <Plus className="w-4 h-4" /> Add New Brand
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : brands.map(brand => (
          <div key={brand.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group relative">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-square flex items-center justify-center bg-gray-50 rounded-2xl p-4">
                <img src={brand.image_url} alt={brand.title} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#0A2342]">{brand.title}</p>
                <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${brand.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {brand.is_active ? 'Active' : 'Hidden'}
                </div>
              </div>
            </div>
            
            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => openEdit(brand)} className="bg-white shadow-lg p-2 rounded-full text-blue-600 hover:bg-blue-50"><Pencil className="w-3.5 h-3.5" /></button>
               <button onClick={() => handleDelete(brand.id, brand.title)} className="bg-white shadow-lg p-2 rounded-full text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {brands.length === 0 && !isLoading && (
          <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
             <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
             <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No brands added yet</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl overflow-hidden relative">
             <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X className="w-6 h-6" /></button>
             
             <h2 className="text-2xl font-black text-[#0A2342] mb-8 uppercase tracking-tight">{editing ? 'Edit Brand' : 'Add Brand'}</h2>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Brand Name</label>
                  <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. ASUS" className="rounded-xl border-gray-100 bg-gray-50/50" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Brand Logo</label>
                  <div className="flex items-center gap-4">
                    {form.image_url ? (
                      <div className="relative w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 p-2 group">
                        <img src={form.image_url} alt="Logo" className="w-full h-full object-contain" />
                        <button type="button" onClick={() => setForm({ ...form, image_url: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => imageRef.current?.click()} className="w-24 h-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-blue-300 hover:bg-blue-50 transition-all text-gray-400">
                        {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Upload className="w-6 h-6 mb-2" /><span className="text-[9px] font-black uppercase">Upload</span></>}
                      </button>
                    )}
                    <input ref={imageRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Sort Order</label>
                      <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className="rounded-xl border-gray-100 bg-gray-50/50" />
                   </div>
                   <div className="flex flex-col">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Status</label>
                      <div className="flex items-center gap-2 h-10 px-4 bg-gray-50 rounded-xl border border-gray-100">
                         <span className="text-xs font-bold text-gray-500">Active</span>
                         <Switch checked={form.is_active} onCheckedChange={checked => setForm({ ...form, is_active: checked })} />
                      </div>
                   </div>
                </div>

                <div>
                   <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Official Website (Optional)</label>
                   <Input value={form.link_url} onChange={e => setForm({ ...form, link_url: e.target.value })} placeholder="https://..." className="rounded-xl border-gray-100 bg-gray-50/50" />
                </div>

                <Button type="submit" disabled={uploading || addBrand.isPending || updateBrand.isPending} className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-200 mt-4">
                   {uploading ? 'Uploading...' : editing ? 'Update Brand' : 'Save Brand'}
                </Button>
             </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BrandsManager;
