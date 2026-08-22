import React, { useState } from "react";
import axios from "axios";
import { 
  PlusCircle, 
  Image as ImageIcon, 
  Trash2, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Images,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductFormData {
  title: string;
  philosophy: string;      
  specifications: string;  
  washCare: string;        
  price: number;
  discountedPrice: number;
  discountPercent: number;
  quantity: number;
  brand: string;
  imageUrls: string[];     
  category: {
    name: string;
    level: number;
    parentId: string | null;
  };       
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categoriesList = [
    "Kota Doria Silk",
    "Maheshwari Silk Saree",
    "Mulmul Cotton Sarees",
    "Cotton HandBlock Sarees",
    "Cotton Linen Saree",
    "Chanderi Silk Saree",
    "Khadi Cotton Saree",
    "Temple Border Saree"
  ];

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    philosophy: "",
    specifications: "",
    washCare: "",
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
    quantity: 1,
    brand: "Jaipur Print Trails", 
    imageUrls: [],          
    category: {
      name: "Kota Doria Silk", 
      level: 3,                    
      parentId: null
    }, 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      if (name === "categoryName") {
        return {
          ...prev,
          category: {
            ...prev.category,
            name: value
          }
        };
      }

      const updated = { ...prev, [name]: value };
      
      // Safe math calculation to prevent NaN backend crashes
      if (name === "price" || name === "discountedPrice") {
        const price = Number(name === "price" ? value : prev.price) || 0;
        const discPrice = Number(name === "discountedPrice" ? value : prev.discountedPrice) || 0;
        
        if (price > 0 && discPrice > 0 && price >= discPrice) {
          updated.discountPercent = Math.round(((price - discPrice) / price) * 100);
        } else {
          updated.discountPercent = 0;
        }
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setErrorMessage(null);

    const CLOUD_NAME = "zjr85bqp"; 
    const UPLOAD_PRESET = "bagru_cotton_preset"; 

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const fileToUpload = files[i];
        const data = new FormData();
        data.append("file", fileToUpload);
        data.append("upload_preset", UPLOAD_PRESET); 
        data.append("cloud_name", CLOUD_NAME); 

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          data
        );
        
        if (response.data && response.data.secure_url) {
          uploadedUrls.push(response.data.secure_url);
        }
      }

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...uploadedUrls]
      }));

    } catch (err: any) {
      console.error("Cloudinary multi-upload handshake cycle broken:", err);
      setErrorMessage("Multi-image cloud upload failed. Check your network or Cloudinary preset.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // ✅ FIX: Throw a visible error instead of just locking the button
    if (formData.imageUrls.length === 0) {
      setErrorMessage("Please upload at least one image before publishing.");
      return;
    }

    setLoading(true);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5454";
    const adminToken = localStorage.getItem("admin_jwt") || localStorage.getItem("jwt");

    if (!adminToken) {
      setErrorMessage("Authentication token missing. Please log in again.");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    };

    // ✅ FIX: Safely parse all numbers so Mongoose doesn't reject the payload
    const finalPayload = {
      title: formData.title.trim(),
      description: formData.philosophy.trim(), 
      philosophy: formData.philosophy.trim(),
      specifications: formData.specifications.trim(),
      washCare: formData.washCare.trim(),
      price: Number(formData.price) || 0,                
      discountedPrice: Number(formData.discountedPrice) || 0, 
      discountPercent: Number(formData.discountPercent) || 0,
      quantity: Number(formData.quantity) || 1,
      brand: formData.brand.trim(),
      category: formData.category, 
      imageUrl: formData.imageUrls[0] || "", 
      imageUrls: formData.imageUrls     
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/admin/products/create`, finalPayload, config);
      
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Product mapped into live system catalog successfully! Redirecting...");
        setTimeout(() => navigate("/admin/products"), 1500);
      }
    } catch (err: any) {
      console.error("Master catalog logging error detail:", err.response?.data || err);
      // Extracts exact validation error message from backend
      const serverErrorMessage = err.response?.data?.message || err.response?.data?.error || "Database entry validation check failed.";
      setErrorMessage(`Backend Reject: ${serverErrorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-left font-sans text-sm text-stone-800 animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif text-stone-900 tracking-wide font-light">
          Catalog Premium Textile
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Deploy premium masterpieces into dynamic client interface gallery grids.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-medium flex items-center gap-2.5 shadow-2xs">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 font-medium flex items-center gap-2.5 shadow-2xs">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-stone-200/80 p-6 sm:p-8 rounded-[24px] shadow-3xs space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Product Name / Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., ROYAL MULMUL SAREE"
              className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 font-medium text-stone-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Product Philosophy</label>
            <textarea
              name="philosophy"
              required
              rows={3}
              value={formData.philosophy}
              onChange={handleChange}
              placeholder="A flagship mulmul masterpiece — whisper-soft, naturally dyed..."
              className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Specifications Mapping</label>
            <textarea
              name="specifications"
              required
              rows={3}
              value={formData.specifications}
              onChange={handleChange}
              placeholder="Fabric: Pure Mulmul Cotton, Length: 5.5 mtrs..."
              className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Wash & Care Instructions</label>
            <textarea
              name="washCare"
              required
              rows={2}
              value={formData.washCare}
              onChange={handleChange}
              placeholder="Dry clean only / Gentle hand wash separately..."
              className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Original Price (₹)</label>
              <input
                type="number"
                name="price"
                required
                min={0}
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Deal Price (₹)</label>
              <input
                type="number"
                name="discountedPrice"
                required
                min={0}
                value={formData.discountedPrice || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">Auto Markdown (%)</label>
              <input
                type="text"
                name="discountPercent"
                disabled
                value={`SAVE ${formData.discountPercent}%`}
                className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-xl text-rose-600 font-bold font-mono cursor-not-allowed text-center uppercase text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Stock Quantity</label>
              <input
                type="number"
                name="quantity"
                required
                min={1}
                value={formData.quantity || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">Atelier Brand</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-stone-200/80 p-6 rounded-[24px] shadow-3xs space-y-4">
            <label className="black text-xs font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
              <Images className="w-4 h-4 text-[#d9b77e]" /> Media Gallery ({formData.imageUrls.length})
            </label>
            
            {formData.imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-3 max-h-[260px] overflow-y-auto p-1 bg-stone-50/40 border border-stone-100 rounded-xl">
                {formData.imageUrls.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-stone-200/70 aspect-square bg-white">
                    <img src={url} alt="Saree Gallery Asset" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-2 bg-white text-rose-600 rounded-lg shadow-md cursor-pointer border-none outline-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-stone-200 hover:border-stone-400 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 bg-stone-50/50 relative min-h-[140px]">
              {uploadingImage ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-[#d9b77e]" />
                  <span className="text-[11px] text-stone-400 font-medium">Uploading items to Cloudinary node...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5 text-stone-400" />
                  <div className="text-center">
                    <span className="text-xs font-bold text-[#d9b77e] hover:underline cursor-pointer block">Select Product Assets</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Upload multi-angle photos</span>
                  </div>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                </>
              )}
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 p-6 rounded-[24px] shadow-3xs space-y-4">
            <label className="black text-xs font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#d9b77e]" /> Heritage Category Type
            </label>
            
            <div className="space-y-1">
              <select 
                name="categoryName" 
                value={formData.category.name} 
                onChange={handleChange} 
                className="w-full px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-xs font-semibold text-stone-700 cursor-pointer"
              >
                {categoriesList.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            // ✅ FIX: Removed imageUrls length check so the user can actually click the button to see the error message
            disabled={loading || uploadingImage}
            className="w-full bg-stone-950 hover:bg-stone-900 disabled:bg-stone-300 text-stone-100 text-xs tracking-widest uppercase py-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none outline-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#d9b77e]" />
                Committing Data Packet...
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 text-[#d9b77e]" />
                <span>Publish To Live Pipeline</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}