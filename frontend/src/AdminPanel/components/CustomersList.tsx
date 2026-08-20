import { useState } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  ShoppingBag, 
  Calendar, 
  UserCheck, 
  Trash2 
} from 'lucide-react';

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: string;
  status: 'Active' | 'Suspended';
}

export default function CustomersList() {
  const [searchTerm, setSearchTerm] = useState('');

  // Real-world dummy data aapke users aur customers metrics ke liye
  const [customers, setCustomers] = useState<CustomerItem[]>([
    { id: 'CST-001', name: 'Aarav Sharma', email: 'aarav@gmail.com', phone: '+91 98765 43210', joinDate: '12 Feb 2026', totalOrders: 5, totalSpent: '₹14,500', status: 'Active' },
    { id: 'CST-002', name: 'Priya Patel', email: 'priya.p@yahoo.com', phone: '+91 87654 32109', joinDate: '01 Mar 2026', totalOrders: 3, totalSpent: '₹9,200', status: 'Active' },
    { id: 'CST-003', name: 'Anjali Desai', email: 'anjali.d@outlook.com', phone: '+91 76543 21098', joinDate: '15 Mar 2026', totalOrders: 1, totalSpent: '₹2,450', status: 'Active' },
    { id: 'CST-004', name: 'Meera Reddy', email: 'meera.r@gmail.com', phone: '+91 65432 10987', joinDate: '22 Apr 2026', totalOrders: 8, totalSpent: '₹32,000', status: 'Active' },
    { id: 'CST-005', name: 'Kiran Verma', email: 'kiran.v@gmail.com', phone: '+91 54321 09876', joinDate: '10 May 2026', totalOrders: 0, totalSpent: '₹0', status: 'Suspended' },
  ]);

  // Search filter logic
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle status (Active/Suspend block execution)
  const toggleStatus = (id: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
        alert(`Customer account status changed to ${nextStatus}!`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6 font-sans text-sm text-left">
      
      {/* Page Title Block */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-wide flex items-center gap-2">
          <Users className="w-5 h-5 text-[#9A7B56]" /> Customer Registry Vault
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Audit consumer authentication profiles, trace purchase frequencies, and control access permissions.
        </p>
      </div>

      {/* 🔍 SEARCH UTILITY CONTROL */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)] w-full">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Customer Token, Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg outline-none focus:border-[#9A7B56] transition-colors text-xs"
          />
        </div>
      </div>

      {/* 📜 TABLE DATA GRID */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-stone-600 text-xs">
            <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-left">UID Token</th>
                <th className="px-6 py-4 font-semibold text-left">Profile Info</th>
                <th className="px-6 py-4 font-semibold text-left">Contact hotline</th>
                <th className="px-6 py-4 font-semibold text-left">Registry Date</th>
                <th className="px-6 py-4 font-semibold text-left">Volume (Orders)</th>
                <th className="px-6 py-4 font-semibold text-left">Total Value</th>
                <th className="px-6 py-4 font-semibold text-center">Account State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50/40 transition-colors">
                    
                    {/* Unique Identifier Token */}
                    <td className="px-6 py-4 text-stone-900 font-mono font-bold text-[11px]">
                      {user.id}
                    </td>

                    {/* Name & Email */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-stone-400 font-light mt-0.5 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-stone-400" /> {user.email}
                      </div>
                    </td>

                    {/* Phone details */}
                    <td className="px-6 py-4 text-stone-700 font-medium">
                      {user.phone}
                    </td>

                    {/* Created date block */}
                    <td className="px-6 py-4 text-stone-500 font-light">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {user.joinDate}
                      </div>
                    </td>

                    {/* Quantity of purchases logs */}
                    <td className="px-6 py-4 text-stone-800 font-bold">
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3 text-[#9A7B56]" />
                        {user.totalOrders} items
                      </div>
                    </td>

                    {/* Net Gross Worth Spends */}
                    <td className="px-6 py-4 text-stone-900 font-semibold text-sm">
                      {user.totalSpent}
                    </td>

                    {/* Status Badge + Suspension Toggle Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          user.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          {user.status}
                        </span>
                        
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className={`p-1.5 rounded-md border transition-colors ${
                            user.status === 'Active'
                              ? 'border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200'
                              : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                          title={user.status === 'Active' ? "Suspend User Credentials" : "Re-activate User Access"}
                        >
                          {user.status === 'Active' ? <Trash2 className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-400 font-serif italic text-base">
                    No customer profile matched your query criteria parameters.
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