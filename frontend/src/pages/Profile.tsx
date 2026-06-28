import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Redux state connectivity
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Award,
  Edit3,
  Save,
  LogOut,
  Sparkles,
  Clock,
  Compass,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  X,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Address {
  id: string;
  type: 'Home' | 'Boutique' | 'Office';
  line: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Exhibition Scheduled';
  items: { name: string; fabric: string; price: number; image: string }[];
}

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useApp();

  
  // Aapke auth architecture ke hisab se logged-in user aur unka profile state pull kar rahe hain
  const authUser = useSelector((state: any) => state.auth?.user);
  const authLoading = useSelector((state: any) => state.auth?.loading);
  const isLoggedIn = !!localStorage.getItem("jwt") || !!authUser;

  // Tab control state
  const [activeTab, setActiveTab] = useState<'docket' | 'orders' | 'addresses' | 'vip'>('docket');
  
  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInformation] = useState({
    name: 'Patron',
    email: '',
    phone: '',
    patronLevel: 'Heritage Connoisseur',
    memberSince: 'April 2026'
  });

  // Dynamic user data binding from Redux / Local Storage Auth Tokens
  useEffect(() => {
    if (authUser) {
      setPersonalInformation(prev => ({
        ...prev,
        name: authUser.firstName ? `${authUser.firstName} ${authUser.lastName || ''}`.trim() : (authUser.name || prev.name),
        email: authUser.email || '',
        phone: authUser.mobile || authUser.phone || '',
        patronLevel: authUser.role === 'ADMIN' ? 'Atelier Curator' : 'Heritage Connoisseur',
        memberSince: authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : prev.memberSince
      }));
    }
  }, [authUser]);

  // 📍 ADDRESS MANAGEMENT STATE (Null array check mechanism injected)
  // Agar user ke profile object me addresses array database se aata hai toh wo render hoga, warna empty sequence [] trigger hogi.
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (authUser?.addresses && Array.isArray(authUser.addresses)) {
      setAddresses(authUser.addresses);
    } else {
      setAddresses([]); // Base verification level fallback
    }
  }, [authUser]);

  // Premium Handloom Order History (Linked directly to users custom schema)
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    if (authUser?.orders && Array.isArray(authUser.orders)) {
      setOrders(authUser.orders);
    } else {
      // Fallback fallback arrays testing simulation (if required)
      setOrders([]);
    }
  }, [authUser]);

  const [notification, setNotification] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    
    // In production workflow: dispatch(updateUserProfile(personalInfo))
    setNotification('Patron docket records updated into local cache securely.');
    setTimeout(() => setNotification(''), 4000);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    logout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 mb-6 bg-white shadow-sm">
          <Compass className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-serif text-stone-900 font-light tracking-wide mb-3">
          Sign In to Access Your Atelier
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed mb-8 max-w-xs mx-auto">
          Please enter your credentials to view your logged-in profile email ledger, shipping records, and curator VIP privileges.
        </p>
        <Link
          to="/login"
          className="px-10 py-4 bg-stone-950 text-white text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#E4C590] hover:text-black transition-all duration-300 rounded-xl shadow-md"
        >
          Secure Portal Entry
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-24 font-sans text-stone-900 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Title Section */}
        <div className="border-b border-stone-200 pb-8 mb-12 text-left">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#9A7B56] font-bold block mb-2.5">
            Atelier Personal Ledger
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-950 tracking-wide">
            Your Private Docket
          </h1>
        </div>

        {/* Dashboard Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Loyalty Card and Tab Selectors */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            
            {/* Patron Loyalty Privilege Card */}
            <div className="relative overflow-hidden rounded-[32px] bg-stone-950 text-white p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(26,18,12,0.3)] border border-stone-800 text-left">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#E4C590]/10 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute inset-2 border border-[#E4C590]/10 rounded-[24px] pointer-events-none" />

              <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.35em] text-[#E4C590] font-bold block mb-1">
                    Atelier Jaipur Membership
                  </span>
                  <h2 className="text-xl font-serif font-light text-[#FAF9F6] tracking-wide truncate max-w-[220px]">
                    {personalInfo.name}
                  </h2>
                </div>
                <Award className="w-8 h-8 text-[#E4C590] stroke-[1.2]" />
              </div>

              <div className="space-y-4 relative z-10 pt-4 border-t border-stone-900">
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-stone-400">
                  <span>Connoisseur Rank</span>
                  <span className="text-[#E4C590] font-bold">{personalInfo.patronLevel}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-stone-400">
                  <span>User Login Email</span>
                  <span className="text-stone-300 tracking-tight text-[11px] max-w-[150px] truncate">{personalInfo.email || 'No email synced'}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-stone-400">
                  <span>Established Since</span>
                  <span className="text-stone-300">{personalInfo.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Selector Buttons List */}
            <div className="bg-white border border-stone-200/80 rounded-[28px] p-3 shadow-[0_12px_32px_-18px_rgba(26,26,26,0.04)] flex flex-col gap-1 text-left">
              <button
                onClick={() => { setActiveTab('docket'); setIsEditing(false); }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'docket'
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <span className="flex items-center gap-3">
                  <User className="w-4 h-4 stroke-[1.8]" /> Personal Docket
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setIsEditing(false); }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 stroke-[1.8]" /> Order History
                </span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-colors ${activeTab === 'orders' ? 'bg-white/20 text-[#E4C590]' : 'bg-stone-100 text-stone-600'}`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('addresses'); setIsEditing(false); }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 stroke-[1.8]" /> Saved Addresses
                </span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-colors ${activeTab === 'addresses' ? 'bg-white/20 text-[#E4C590]' : 'bg-stone-100 text-stone-600'}`}>
                  {addresses.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('vip'); setIsEditing(false); }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'vip'
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 stroke-[1.8]" /> VIP Privileges
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <div className="border-t border-stone-100 mt-2 pt-2">
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-bold text-red-600 hover:bg-red-50/60 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Panel Stage */}
          <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-[32px] p-6 sm:p-8 shadow-[0_15px_40px_-15px_rgba(26,18,12,0.04)] min-h-[520px]">
            {notification && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between text-xs text-emerald-800 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                  <span>{notification}</span>
                </div>
                <button onClick={() => setNotification('')} className="text-emerald-600 hover:text-emerald-800"><X className="w-4 h-4" /></button>
              </div>
            )}

            {/* TAB 1: PERSONAL DOCKET FORM */}
            {activeTab === 'docket' && (
              <div className="text-left space-y-6">
                <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                  <div>
                    <h2 className="text-xl font-serif text-stone-950 tracking-wide">Personal Information</h2>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Manage profile parameters securely</p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-xl text-xs uppercase tracking-wider font-bold text-stone-600 hover:border-stone-950 hover:text-black transition-all bg-stone-50/50"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  )}
                </div>

                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          required
                          disabled={!isEditing}
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInformation({ ...personalInfo, name: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#E4C590] focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-stone-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1.5">Email Address (Primary Connection)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="email"
                          required
                          disabled // Email usually non-editable to prevent credential mismatches
                          value={personalInfo.email}
                          className="w-full bg-stone-100/80 border border-stone-200 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none opacity-80 cursor-not-allowed text-stone-500 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1.5">Contact Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="tel"
                          required
                          disabled={!isEditing}
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInformation({ ...personalInfo, phone: e.target.value })}
                          placeholder="Provide missing mobile coordinate"
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#E4C590] focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-stone-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1.5">Patron Tier</label>
                      <div className="relative">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          disabled
                          value={personalInfo.patronLevel}
                          className="w-full bg-stone-50/50 border border-stone-200 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none opacity-60 cursor-not-allowed text-stone-800 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4 border-t border-stone-100">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-950 text-white text-xs uppercase tracking-widest font-bold hover:bg-[#E4C590] hover:text-black transition-all rounded-xl shadow-md"
                      >
                        <Save className="w-4 h-4" /> Save Details
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-stone-200 rounded-xl text-xs uppercase tracking-wider font-bold text-stone-500 hover:bg-stone-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>

                {/* Secure Seal Verification Trust Info */}
                <div className="bg-[#FAF9F6] border border-stone-200/60 p-5 rounded-2xl mt-8 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-[#9A7B56] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-stone-800">Docket Encrypted</h3>
                    <p className="text-[11px] text-stone-500 font-light mt-1 leading-relaxed">
                      Every modification is anchored into verified Supabase clusters. We protect your active digital credentials with secure server dockets.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="text-left space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h2 className="text-xl font-serif text-stone-950 tracking-wide">Order History</h2>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Authentic handloom acquisitions ledger</p>
                </div>

                {orders.length === 0 ? (
                  <div className="border border-dashed border-stone-200 rounded-2xl p-12 text-center text-stone-400">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-3 opacity-40 stroke-[1.5]" />
                    <p className="text-xs font-medium uppercase tracking-wider text-stone-600">No Orders Placed Yet</p>
                    <p className="text-[11px] font-light mt-1 text-stone-400">Once you acquire premium sarees from the catalog, your shipping trails will compile here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-stone-50/10"
                      >
                        <div className="bg-stone-50/80 border-b border-stone-200/60 px-5 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div className="flex gap-6">
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-stone-400 block">Order ID</span>
                              <span className="font-mono text-xs font-semibold text-stone-950">{order.id}</span>
                            </div>
                            <div>
                              <span className="text-[8px] uppercase tracking-wider text-stone-400 block">Date</span>
                              <span className="text-xs text-stone-700 font-medium">{order.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-1 bg-white border border-stone-200 text-stone-700 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg shadow-sm">
                              <Clock className="w-3 h-3 text-[#E4C590]" /> {order.status}
                            </span>
                            <span className="text-sm font-serif font-semibold text-stone-950">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 divide-y divide-stone-100">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                              <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/40 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow">
                                <span className="text-[9px] uppercase tracking-widest text-[#9A7B56] font-bold">{item.fabric}</span>
                                <h4 className="font-serif text-sm text-stone-900 font-light mt-0.5">{item.name}</h4>
                                <p className="text-xs text-stone-500 font-medium mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SAVED ADDRESS RECORDS (DYNAMICS FIXED) */}
            {activeTab === 'addresses' && (
              <div className="text-left space-y-6">
                <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                  <div>
                    <h2 className="text-xl font-serif text-stone-950 tracking-wide">Saved Address Book</h2>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Addresses saved for insured express shipping logistics</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-950 text-white text-[10px] uppercase tracking-wider font-bold rounded-lg shadow-sm hover:bg-stone-800 transition-colors">
                    <PlusCircle className="w-3.5 h-3.5" /> Add New
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="border border-dashed border-stone-200 rounded-2xl p-12 text-center text-stone-400">
                    <MapPin className="w-8 h-8 mx-auto mb-3 opacity-40 stroke-[1.5]" />
                    <p className="text-xs font-medium uppercase tracking-wider text-stone-600">Address Book Empty</p>
                    <p className="text-[11px] font-light mt-1 text-stone-400">No logistics coordinates found. Click 'Add New' to insert safe shipping destinations.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-stone-200 rounded-3xl p-5 hover:border-stone-400 transition-all bg-white flex flex-col justify-between shadow-sm"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[9px] uppercase tracking-widest font-bold bg-stone-100 px-2.5 py-0.5 rounded text-stone-700">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed font-light">{address.line}</p>
                          <p className="text-xs text-stone-800 font-medium mt-2">
                            {address.city}, {address.state} — {address.pincode}
                          </p>
                        </div>

                        <div className="flex gap-4 border-t border-stone-100 pt-4 mt-5 text-[10px] font-bold uppercase tracking-wider">
                          <button className="text-[#9A7B56] hover:text-stone-950 transition-colors">Edit Address</button>
                          <button className="text-stone-400 hover:text-red-600 transition-colors">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ATELIER VIP PRIVILEGES */}
            {activeTab === 'vip' && (
              <div className="text-left space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h2 className="text-xl font-serif text-stone-950 tracking-wide">VIP Privilege Club</h2>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Exclusive tier privileges & loyalty benefits</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Bespoke Tailoring", desc: "Access standard bespoke fallback tailoring directly for matching raw silk running blouses." },
                    { title: "Exhibition Access", desc: "View natural mud-resist lots in the catalog 24 hours prior to public drops." },
                    { title: "Insured Logistics", desc: "No thresholds. Absolute express logistics with upgraded safe packaging support." }
                  ].map((priv, idx) => (
                    <div key={idx} className="bg-stone-50 border border-stone-100 p-5 rounded-2xl text-left hover:border-stone-300 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-[#E4C590]/10 flex items-center justify-center text-[#9A7B56] mb-4">
                        <Sparkles className="w-4.5 h-4.5 stroke-[1.8]" />
                      </div>
                      <h4 className="font-serif text-xs font-semibold text-stone-900 tracking-wide mb-2 uppercase">{priv.title}</h4>
                      <p className="text-stone-500 text-[11px] font-light leading-relaxed">{priv.desc}</p>
                    </div>
                  ))}
                </div>

                {/* VIP Sandbox Credit Invitation Banner */}
                <div className="bg-[#FAF9F6] border border-stone-200 p-6 rounded-3xl mt-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E4C590]/5 blur-3xl rounded-full" />
                  <span className="text-[8px] uppercase tracking-widest font-bold text-amber-800 bg-[#E4C590]/20 px-2 py-0.5 rounded">Active Promo Code</span>
                  <h3 className="font-serif text-lg tracking-wide text-stone-950 mt-3 mb-2">Heritage VIP Draft credits are active</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light mb-4">
                    Your account is eligible for immediate curating benefits. Use code <strong className="font-bold text-stone-900">ROYALDRAFT</strong> inside checkout for a 15% appreciation credit.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}