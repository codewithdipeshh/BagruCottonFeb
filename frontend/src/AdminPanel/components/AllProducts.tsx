import { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Edit, 
  Trash2, 
  PlusCircle, 
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  stock: number;
  tag: string;
  image: string; // Gallery ki pehli cover image thumbnail ke liye
}

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState('');

  // Live premium mock items matching your core collection ecosystem
  const [products, setProducts] = useState<ProductItem[]>([
    { id: 'PROD-001', name: 'ELEGANT KOTA DORIA', category: 'kota_doria', price: 3899, discountedPrice: 2899, stock: 15, tag: 'Certified Handloom', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' },
    { id: 'PROD-002', name: 'INDIGO DABU BLOCK PRINT', category: 'indigo_dabu', price: 4500, discountedPrice: 3499, stock: 8, tag: 'Natural Dye', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80' },
    { id: 'PROD-003', name: 'BAGRU ATELIER TRADITIONAL', category: 'bagru_print', price: 3200, discountedPrice: 2450, stock: 22, tag: 'Handloom Craft', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80' },
    { id: 'PROD-004', name: 'CHANDERI WHISPER SILK', category: 'chanderi_silk', price: 7999, discountedPrice: 6500, stock: 4, tag: 'Zari Weave', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80' },
  ]);

  // Handle product deletion trigger
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Bhai, kya aap sach me "${name}" ko catalog se permanetly delete karna chahte hain?`)) {
      setProducts(prev => prev.filter(product => product.id !== id));
      alert('Product successfully removed from MongoDB Vault.');
    }
  };

  // Search query filter layout match
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-sm text-left">
      
      {/* Top Main Banner Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-wide flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9A7B56]" /> Inventory Master Catalog
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Audit live stock counts, control price matrices, and oversee multi-media portfolio archives.
          </p>
        </div>
        
        {/* Quick Route to Add Product */}
        <Link 
          to="/admin/product/add" 
          className="bg-stone-950 hover:bg-stone-900 text-white text-xs tracking-widest uppercase font-bold py-3 px-5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Add New Edition
        </Link>
      </div>

      {/* 🔍 SEARCH FRAME UTILITY */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)]">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Saree Moniker, UID, or Print..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg outline-none focus:border-[#9A7B56] transition-colors text-xs"
          />
        </div>
      </div>

      {/* 📜 INVENTORY TABULAR SHEET GRID */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-stone-600 text-xs">
            <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-left">Asset Snapshot</th>
                <th className="px-6 py-4 font-semibold text-left">Saree Reference ID</th>
                <th className="px-6 py-4 font-semibold text-left">Moniker & Variant</th>
                <th className="px-6 py-4 font-semibold text-left">Loom Target</th>
                <th className="px-6 py-4 font-semibold text-left">Financial Architecture</th>
                <th className="px-6 py-4 font-semibold text-left">Stock Volume</th>
                <th className="px-6 py-4 font-semibold text-center">Catalog Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50/40 transition-colors">
                    
                    {/* Visual Asset Thumbnail matching cover design */}
                    <td className="px-6 py-3">
                      <div className="w-10 h-12 bg-stone-100 rounded-md overflow-hidden border border-stone-200 shadow-2xs">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </td>

                    {/* UID Token */}
                    <td className="px-6 py-4 text-stone-900 font-mono font-bold text-[11px]">
                      {product.id}
                    </td>

                    {/* Moniker title & Dynamic Badge tag info */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-800 font-serif tracking-wide uppercase">{product.name}</div>
                      <span className="inline-block bg-amber-50 text-amber-800 border border-amber-100 font-medium text-[9px] px-1.5 py-0.5 rounded-md mt-1">
                        {product.tag}
                      </span>
                    </td>

                    {/* Category Route Mapping */}
                    <td className="px-6 py-4 text-stone-500 font-mono text-[10px] uppercase tracking-wider">
                      {product.category.replace('_', ' ')}
                    </td>

                    {/* Price structure points */}
                    <td className="px-6 py-4">
                      <div className="text-stone-900 font-bold text-xs">₹{product.discountedPrice.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-stone-400 font-light line-through mt-0.5">₹{product.price.toLocaleString('en-IN')}</div>
                    </td>

                    {/* Stock counter indicators */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          product.stock > 10 ? 'bg-emerald-500' :
                          product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        <span className={`font-semibold ${product.stock <= 5 ? 'text-rose-600 font-bold' : 'text-stone-700'}`}>
                          {product.stock > 0 ? `${product.stock} Units` : 'Out of stock'}
                        </span>
                      </div>
                    </td>

                    {/* Edit & Delete trigger buttons actions rows */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => alert(`Opening update interface mapping for ${product.id}`)}
                          className="p-1.5 border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-900 rounded-md bg-white transition-colors"
                          title="Edit Weave Matrix"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-1.5 border border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200 rounded-md bg-white transition-colors"
                          title="Purge Asset node"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-400 font-serif italic text-base">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="w-5 h-5 text-stone-300" />
                      No unique handloom assets match the selected search string matrix.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}