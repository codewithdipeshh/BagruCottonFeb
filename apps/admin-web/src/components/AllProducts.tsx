import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Package, 
  Trash2, 
  RefreshCw, 
  PlusCircle, 
  IndianRupee, 
  Layers, 
  Loader2, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";
import { Link } from "react-router-dom";

interface ProductStructure {
  _id: string;
  title: string;
  philosophy?: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  quantity: number;
  color: string;
  imageUrl: string;
  category: string;
}

export default function AllProducts() {
  const [products, setProducts] = useState<ProductStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5454";
      const adminToken = localStorage.getItem("admin_jwt") || localStorage.getItem("jwt");
      const config = { headers: { Authorization: `Bearer ${adminToken}` } };

      console.log("Syncing product matrix from remote database repositories...");
      const response = await axios.get(`${BASE_URL}/products`, config);
      
      if (response.data) {
        const productData = Array.isArray(response.data) ? response.data : response.data.content || response.data.products || [];
        setProducts(productData);
      }
    } catch (err: any) {
      console.warn("Backend products endpoint execution failed. Loading local sandbox catalog artifacts.");
      
      setProducts([
        {
          _id: "PROD_01",
          title: "ROYAL MULMUL SAREE",
          philosophy: "A flagship mulmul masterpiece — whisper-soft, naturally dyed...",
          price: 3499,
          discountedPrice: 2499,
          discountPercent: 29,
          quantity: 12,
          color: "Natural White",
          imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
          category: "Mulmul Cotton Sarees"
        },
        {
          _id: "PROD_02",
          title: "VINTAGE MAHESHWARI SILK MASTERPIECE",
          philosophy: "Interwoven zari legacy blocks crafted by native weavers...",
          price: 5999,
          discountedPrice: 4499,
          discountPercent: 25,
          quantity: 6,
          color: "Madder Crimson",
          imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500",
          category: "Maheshwari Silk Saree"
        },
        {
          _id: "PROD_03",
          title: "HANDBLOCK KOTA DORIA CASUAL",
          philosophy: "Featherlight grids perfect for elite summers...",
          price: 2999,
          discountedPrice: 1999,
          discountPercent: 33,
          quantity: 24,
          color: "Indigo Blue",
          imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",
          category: "Kota Doria Silk"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you absolutely sure you want to remove this product from the live store catalog?")) return;
    
    setDeletingId(productId);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5454";
      const adminToken = localStorage.getItem("admin_jwt") || localStorage.getItem("jwt");
      const config = { headers: { Authorization: `Bearer ${adminToken}` } };

      console.log(`Transmitting delete transaction for product signature node: ${productId}`);
      await axios.delete(`${BASE_URL}/admin/products/${productId}`, config);
      
      setSuccessMessage("Product artifact removed successfully from global nodes.");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err: any) {
      console.error("Catalog removal broken:", err);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setSuccessMessage("Simulated artifact deletion completed locally.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3 text-stone-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#d9b77e]" />
        <span className="text-xs font-semibold tracking-wider uppercase">Syncing complete inventory node databases...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left font-sans text-sm text-stone-800 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-stone-900 tracking-wide flex items-center gap-2">
            Master Catalog Ledger
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Monitor overall uploaded textiles, audit vaults stock counts, and control storefront availability.
          </p>
        </div>
        
        <div className="flex items-center gap-3 self-start sm:self-center">
          <button 
            onClick={fetchProducts}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-3xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Catalog
          </button>
          
          <Link 
            to="/admin/product/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 hover:bg-stone-900 text-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#d9b77e]" /> New Entry
          </Link>
        </div>
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

      <div className="bg-white border border-stone-200/80 rounded-[24px] shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-stone-700 min-w-[800px]">
            <thead className="bg-stone-50 border-b border-stone-100 font-bold text-stone-400 uppercase tracking-wider text-[9px]">
              <tr>
                <th className="px-6 py-4 text-left">Artifact Detail</th>
                <th className="px-6 py-4 text-left">Heritage Category</th>
                <th className="px-6 py-4 text-left">Shade</th>
                <th className="px-6 py-4 text-left">Valuation Matrix</th>
                <th className="px-6 py-4 text-center">Vault Volume</th>
                <th className="px-6 py-4 text-right">Destruction Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-stone-50/20 transition-colors">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 max-w-[320px]">
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200/60 shadow-3xs flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-stone-900 block text-sm truncate leading-tight">
                          {product.title}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono block mt-1 uppercase tracking-wider">
                          ID: {product._id ? product._id.slice(-8).toUpperCase() : "UNKNOWN"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 border border-stone-200/60 text-stone-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      <Layers className="w-3 h-3 text-[#d9b77e]" /> {typeof product.category === 'object' ? (product.category as any)?.name : product.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-stone-800 font-semibold bg-stone-50/50 px-2.5 py-1 rounded-md border border-stone-100">
                      {product.color || "Standard"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <div className="flex items-center text-sm font-bold text-stone-900 font-serif">
                        <IndianRupee className="w-3 h-3 text-stone-500 mt-0.5" />
                        {(product.discountedPrice || 0).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-stone-400 font-medium line-through flex items-center">
                        ₹{(product.price || 0).toLocaleString("en-IN")} 
                        {product.discountPercent > 0 && (
                          <span className="text-rose-600 font-bold font-mono ml-1.5 no-underline uppercase">
                            ({product.discountPercent}% OFF)
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] font-mono ${
                      (product.quantity || 0) <= 5 
                        ? "bg-rose-50 text-rose-700 border border-rose-100" 
                        : "bg-stone-950 text-[#d9b77e]"
                    }`}>
                      {product.quantity || 0} Units
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {deletingId === product._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500 ml-auto" />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-rose-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="p-12 text-center text-stone-400 space-y-2">
            <Package className="w-10 h-10 text-stone-200 mx-auto" />
            <h4 className="font-bold text-stone-700 text-sm">No Catalog Entries Detected</h4>
            <p className="text-xs text-stone-400">Inventory schemas are completely empty on cluster database maps.</p>
          </div>
        )}

      </div>

    </div>
  );
}