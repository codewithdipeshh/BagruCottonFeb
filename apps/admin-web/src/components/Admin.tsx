import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  ListOrdered, 
  Users,   
  Menu, 
  X,
  LogOut 
} from 'lucide-react';

import AddProductForm from './AddProductForm';
import AllProducts from './AllProducts';
import CustomersList from './CustomersList';
import Dashboard from './dashboard';
import OrdersList from './OrdersList';

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_jwt");
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_jwt");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_user_role");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { path: '/products', name: 'All Products', icon: <ShoppingBag className="w-4 h-4" /> },
    { path: '/product/add', name: 'Add Product', icon: <PlusCircle className="w-4 h-4" /> },
    { path: '/orders', name: 'Orders', icon: <ListOrdered className="w-4 h-4" /> },
    { path: '/customers', name: 'Customers', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex text-stone-800 font-sans antialiased">
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 z-40">
        <h1 className="font-serif font-bold tracking-wide text-stone-900">Bagru Atelier Admin</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-stone-700 hover:text-black">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-950 text-stone-300 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col flex-shrink-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-stone-800/60 hidden lg:block text-left">
          <h1 className="font-serif font-medium text-lg text-white tracking-widest uppercase">Bagru Cotton</h1>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block mt-0.5">Control Centre</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 mt-16 lg:mt-0 text-left flex flex-col justify-between">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive ? 'bg-[#9A7B56] text-white shadow-md' : 'hover:bg-stone-900 hover:text-white text-stone-400'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-800/60">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-all text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Terminate Session
            </button>
          </div>
        </nav>
      </aside>

      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden" />}

      <main className="flex-1 p-4 sm:p-8 lg:p-10 pt-24 lg:pt-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/add" element={<AddProductForm />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/customers" element={<CustomersList />} />
        </Routes>
      </main>
    </div>
  );
}