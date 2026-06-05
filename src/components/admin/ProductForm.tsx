'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X } from 'lucide-react';
import { saveProduct } from '@/lib/supabase/actions';

export default function AdminProductForm({ product, categories }: { product?: any, categories: any[] }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(product?.images || (product?.image_url ? [product.image_url] : []));
  const supabase = createClient();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    // If it was a new file being uploaded
    if (index >= (product?.images?.length || 0)) {
      setImages(prev => prev.filter((_, i) => i !== (index - (product?.images?.length || 0))));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const price = parseFloat(formData.get('price') as string);
      const description = formData.get('description') as string;
      const category_id = formData.get('category_id') as string;
      const badge = formData.get('badge') as string;
      const stock_quantity = parseInt(formData.get('stock_quantity') as string) || 0;
      const old_price = formData.get('old_price') ? parseFloat(formData.get('old_price') as string) : null;
      const is_sold_out = formData.get('is_sold_out') === 'on';

      let finalImages = previews.filter(p => p.startsWith('http'));

      // Upload new images
      for (const imgFile of images) {
        const fileName = `${Date.now()}-${imgFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, imgFile);
        
        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);
          finalImages.push(publicUrl);
        }
      }

      const productData = {
        name,
        slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
        price,
        description,
        category_id: category_id || null,
        badge,
        image_url: finalImages[0] || '',
        images: finalImages,
        stock_quantity,
        old_price,
        is_sold_out,
      };

      const result = await saveProduct(productData, product?.id);

      if (result.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert(`ERREUR: ${result.error}`);
      }
    } catch (err: any) {
      alert("Erreur critique: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-outline/5 shadow-[0_20px_50px_rgba(112,90,76,0.04)]">
            <h3 className="font-headline-md text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">01</span>
              Informations Générales
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Nom du produit</label>
                <input required name="name" defaultValue={product?.name} placeholder="ex: Sauce Truffe Noire" className="w-full h-14 px-6 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-on-surface font-medium placeholder:opacity-30" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Prix Actuel (DH)</label>
                  <div className="relative">
                    <input required name="price" type="number" step="0.01" defaultValue={product?.price} placeholder="0.00" className="w-full h-14 pl-6 pr-14 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-bold" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant opacity-40">DH</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Ancien Prix (Promo)</label>
                  <div className="relative">
                    <input name="old_price" type="number" step="0.01" defaultValue={product?.old_price} placeholder="Optionnel" className="w-full h-14 pl-6 pr-14 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-bold" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant opacity-40 text-error/40">DH</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Badge</label>
                  <input name="badge" defaultValue={product?.badge} placeholder="Nouveau, Bio..." className="w-full h-14 px-6 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Description</label>
                <textarea name="description" rows={5} defaultValue={product?.description} placeholder="Décrivez l'excellence de ce produit..." className="w-full p-6 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all resize-none font-body-md"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-outline/5 shadow-[0_20px_50px_rgba(112,90,76,0.04)]">
            <h3 className="font-headline-md text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">02</span>
              Inventaire & Catégorie
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Catégorie</label>
                <select name="category_id" defaultValue={product?.category_id} className="w-full h-14 px-6 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Quantité en Stock</label>
                <input required name="stock_quantity" type="number" defaultValue={product?.stock_quantity || 100} className="w-full h-14 px-6 rounded-2xl bg-surface-container-low border border-outline/10 focus:outline-none focus:border-primary transition-all font-bold" />
              </div>
              <div className="flex items-center gap-4 h-14 mt-auto pb-2">
                <input 
                  type="checkbox" 
                  name="is_sold_out" 
                  id="is_sold_out" 
                  defaultChecked={product?.is_sold_out} 
                  className="w-6 h-6 rounded-lg accent-primary cursor-pointer"
                />
                <label htmlFor="is_sold_out" className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface cursor-pointer select-none">Rupture de Stock</label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media */}
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-outline/5 shadow-[0_20px_50px_rgba(112,90,76,0.04)]">
            <h3 className="font-headline-md text-lg font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">03</span>
              Média (Galerie)
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-outline/5 group shadow-sm bg-surface-container-low">
                  <img src={preview} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)} 
                    className="absolute inset-0 bg-error/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <label className="relative aspect-square rounded-2xl border-2 border-dashed border-outline/10 flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-white hover:border-primary/40 transition-all cursor-pointer group">
                <Upload className="w-6 h-6 text-on-surface-variant/20 group-hover:text-primary transition-colors" />
                <span className="font-label-md text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/40 mt-3 group-hover:text-primary transition-colors">Ajouter</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </label>
            </div>
            <p className="mt-6 text-[10px] text-on-surface-variant/40 font-label-md uppercase tracking-widest text-center">
              Format suggéré: 1000x1000px
            </p>
          </div>

          <button 
            disabled={loading}
            className="w-full h-20 bg-primary text-on-primary rounded-[2rem] font-label-md uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-primary-container transition-all shadow-2xl shadow-primary/20 group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                {product ? 'Mettre à jour' : 'Enregistrer le Produit'}
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-4 h-4" />
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
