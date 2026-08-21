import { useState, ChangeEvent, FormEvent } from 'react';
import { UploadCloud, X, Sparkles, Loader2, Layers } from 'lucide-react';
import axios from 'axios';

interface ProductState {
  name: string;
  category: string;
  price: string;
  discountedPrice: string;
  discountPercent: string;
  philosophy: string;
  specifications: string;
  washCare: string;
  stock: string;
  tag: string;
}

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<ProductState>({
    name: 'COTTON MULMUL',
    category: 'bagru_print',
    price: '3899',
    discountedPrice: '2899',
    discountPercent: '26',
    philosophy: 'Traditional hand-blocked Bagru print premium organic cotton drape.',
    specifications: 'Material: Pure Malmal Cotton | Weave: Traditional Handblock Print',
    washCare: 'Gentle hand wash separately in cold water with liquid detergents.',
    stock: '15',
    tag: 'Certified Handloom',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultipleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImageFromDeck = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Kam se kam ek image upload karna zaroori hai bhai!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const dynamicJwt = localStorage.getItem("jwt");

      if (!dynamicJwt) {
        alert("Session Error: Token nahi mila storage me! Ek baar logout karke fresh login kijiye bhai.");
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5454/api/admin/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${dynamicJwt}`
        },
      });

      if (response.status === 201 || response.status === 200 || response.data.success) {
        alert('Masterpiece successfully uploaded to cloud repository inventory vault! 🎉');
        setSelectedFiles([]);
        setImagePreviews([]);
      }
    } catch (error: any) {
      console.error('API Pipeline Fault Crash Dump:', error);
      alert(error.response?.data?.message || error.response?.data?.error || 'Database connection runtime fault.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto font-sans text-sm text-left space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-wide flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#9A7B56]" /> Publish Heritage Masterpiece
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Catalog fresh handloom clusters, map dynamic price nodes, and control responsive display configurations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5 bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Saree Master Title</label>
              <input type="text" name="name" required value={productData.name} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] font-serif uppercase tracking-wider" />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Luxury Artisan Badge / Tag</label>
              <input type="text" name="tag" required value={productData.tag} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] text-amber-800 font-medium" />
            </div>
          </div>

          <div className="space-y-4 pt-3 border-t border-stone-100">
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Philosophy Core Narrative</label>
              <textarea name="philosophy" required rows={3} value={productData.philosophy} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] resize-none text-stone-600 leading-relaxed" />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Specifications Sheet Content</label>
              <input type="text" name="specifications" required value={productData.specifications} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] text-stone-600" />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Wash & Care Directives</label>
              <input type="text" name="washCare" required value={productData.washCare} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] text-stone-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-stone-100">
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Original Price (₹)</label>
              <input type="number" name="price" required value={productData.price} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] font-semibold" />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Live Retail Display (₹)</label>
              <input type="number" name="discountedPrice" required value={productData.discountedPrice} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] font-bold text-stone-900" />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Save Markdown (%)</label>
              <input type="number" name="discountPercent" required value={productData.discountPercent} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56] text-rose-600 font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Loom Identity Category</label>
              <select name="category" required value={productData.category} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg bg-white outline-none focus:border-[#9A7B56] font-medium text-stone-800">
                <option value="maheshwari_silk_saree">Maheshwari Silk Saree</option>
                <option value="kota_doria_silk">Kota Doria Silk</option>
                <option value="chanderi_silk_saree">Chanderi Silk Saree</option>
                <option value="mulmul_cotton_sarees">Mulmul Cotton Sarees</option>
                <option value="cotton_handblock_sarees">Cotton HandBlock Sarees</option>
                <option value="cotton_linen_saree">Cotton Linen Saree</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">Stock Volume Allocation</label>
              <input type="number" name="stock" required value={productData.stock} onChange={handleInputChange} className="w-full border border-stone-200 px-3.5 py-2.5 rounded-lg outline-none focus:border-[#9A7B56]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <label className="block text-stone-700 font-semibold">Media Portfolio Asset Rig</label>
            <label className="border-2 border-dashed border-stone-200 hover:border-[#9A7B56] transition-colors rounded-xl flex flex-col items-center justify-center py-8 px-4 text-center cursor-pointer bg-stone-50/50 group">
              <UploadCloud className="w-8 h-8 text-stone-400 group-hover:text-[#9A7B56] transition-colors mb-2" />
              <span className="text-xs font-semibold text-stone-700">Attach Multiple Angle Frames</span>
              <span className="text-[10px] text-stone-400 mt-0.5">Pick up to 3-5 images combo</span>
              <input type="file" multiple accept="image/*" onChange={handleMultipleFiles} className="hidden" />
            </label>

            {imagePreviews.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">Active Asset Deck Queue ({imagePreviews.length})</span>
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative aspect-[3/4] border border-stone-200 rounded-lg overflow-hidden group bg-stone-100 shadow-2xs">
                      <img src={preview} alt="Preview element" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImageFromDeck(idx)} className="absolute top-1 right-1 bg-stone-900/80 p-1 rounded-full text-white hover:bg-stone-950 transition-colors shadow-sm">
                        <X className="w-3 h-3" />
                      </button>
                      {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white text-[8px] font-semibold text-center py-0.5 tracking-widest uppercase">Cover</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-stone-950 hover:bg-stone-900 disabled:bg-stone-400 text-white text-xs tracking-widest uppercase py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Vaulting Assets...</> : <><Layers className="w-4 h-4" /> Publish Premium Product</>}
          </button>
        </div>
      </form>
    </div>
  );
}