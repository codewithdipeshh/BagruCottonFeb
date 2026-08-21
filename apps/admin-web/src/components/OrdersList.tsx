import { useState } from 'react';
import { 
  ListOrdered, 
  Eye,  
  Search, 
  Filter, 
  IndianRupee,
  Calendar
} from 'lucide-react';

interface OrderItem {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  productName: string;
  category: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export default function OrdersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Live real-world mock orders list matching your premium drapes inventory
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: 'ORD-9021', customerName: 'Aarav Sharma', customerEmail: 'aarav@gmail.com', date: '30 June 2026', productName: 'Elegant Kota Doria Saree', category: 'kota_doria', amount: 2899, paymentStatus: 'Paid', orderStatus: 'Delivered' },
    { id: 'ORD-9020', customerName: 'Priya Patel', customerEmail: 'priya.p@yahoo.com', date: '30 June 2026', productName: 'Indigo Dabu Handblock Cotton', category: 'indigo_dabu', amount: 3499, paymentStatus: 'Paid', orderStatus: 'Pending' },
    { id: 'ORD-9019', customerName: 'Anjali Desai', customerEmail: 'anjali.d@outlook.com', date: '29 June 2026', productName: 'Bagru Natural Print Classic', category: 'bagru_print', amount: 2450, paymentStatus: 'Pending', orderStatus: 'Processing' },
    { id: 'ORD-9018', customerName: 'Meera Reddy', customerEmail: 'meera.r@gmail.com', date: '28 June 2026', productName: 'Maheshwari Gold Zari Silk', category: 'chanderi_silk', amount: 6500, paymentStatus: 'Paid', orderStatus: 'Shipped' },
    { id: 'ORD-9017', customerName: 'Kiran Verma', customerEmail: 'kiran.v@gmail.com', date: '25 June 2026', productName: 'Elegant Kota Doria Saree', category: 'kota_doria', amount: 2899, paymentStatus: 'Failed', orderStatus: 'Cancelled' },
  ]);

  // Handle Order Status Update (Fulfillment loop workflow change)
  const handleStatusChange = (orderId: string, newStatus: OrderItem['orderStatus']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
    alert(`Order ${orderId} fulfillment updated to ${newStatus}!`);
  };

  // Filter and Search logic matching queries
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Dynamic Tailwind style mapping rules for custom badges
  const getStatusBadgeClass = (status: OrderItem['orderStatus']) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-stone-50 text-stone-700 border-stone-100';
    }
  };

  return (
    <div className="space-y-6 font-sans text-sm text-left">
      
      {/* Page Header Title Banner Block */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-wide flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-[#9A7B56]" /> Master Order Registry
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Monitor incoming customer drape purchases, manage digital invoicing, and dispatch fulfillment flags.
        </p>
      </div>

      {/* 🔍 SEARCH AND FILTER CONTROL UTILITIES */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-stone-200 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)] w-full">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Token, Customer, or Weave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg outline-none focus:border-[#9A7B56] transition-colors text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-stone-200 px-3 py-2 bg-white rounded-lg outline-none text-xs text-stone-700 min-w-[140px] focus:border-[#9A7B56]"
          >
            <option value="All">All Fulfillment Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* 📜 DATA MATRIX TABLE SHEET CONTAINER */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-stone-600 text-xs">
            <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-[10px] font-bold border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-left">Order Reference</th>
                <th className="px-6 py-4 font-semibold text-left">Customer / Contact</th>
                <th className="px-6 py-4 font-semibold text-left">Product Master Details</th>
                <th className="px-6 py-4 font-semibold text-left">Total Bill</th>
                <th className="px-6 py-4 font-semibold text-left">Financial Route</th>
                <th className="px-6 py-4 font-semibold text-left">Logistics Target</th>
                <th className="px-6 py-4 font-semibold text-center">Execution Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/40 transition-colors">
                    
                    {/* Token Identifier column */}
                    <td className="px-6 py-4 text-stone-900 font-mono font-bold text-[11px]">
                      {order.id}
                    </td>

                    {/* Customer Info row */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-800">{order.customerName}</div>
                      <div className="text-[10px] text-stone-400 font-light mt-0.5">{order.customerEmail}</div>
                    </td>

                    {/* Product Specs row mapping */}
                    <td className="px-6 py-4 text-stone-700">
                      <div className="truncate max-w-[180px] font-medium">{order.productName}</div>
                      <span className="text-[9px] uppercase tracking-wider text-[#9A7B56] block font-mono mt-0.5">{order.category}</span>
                    </td>

                    {/* Amount Block */}
                    <td className="px-6 py-4 text-stone-900 font-semibold text-left">
                      <div className="flex items-center text-[13px]">
                        <IndianRupee className="w-3 h-3 text-stone-500 mr-0.5" />
                        {order.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[9px] text-stone-400 font-light mt-0.5 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" /> {order.date}
                      </div>
                    </td>

                    {/* Payment Status Check Flag */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider border ${
                        order.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        order.paymentStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-rose-50 text-rose-700 border-rose-100'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Dynamic Fulfillment Dropdown selection */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Fulfillment Execution Control Actions Row */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderItem['orderStatus'])}
                          className="text-[10px] font-bold uppercase tracking-wider border border-stone-200 bg-stone-50 px-2 py-1 rounded-md outline-none focus:border-[#9A7B56] text-stone-600 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button 
                          onClick={() => alert(`Opening Full Invoice & Address details for ${order.id}`)}
                          className="p-1.5 border border-stone-200 hover:border-stone-900 rounded-md text-stone-400 hover:text-stone-900 transition-colors bg-white"
                          title="View Manifest Audit Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-400 font-medium font-serif italic text-base">
                    No records matched the active filter registry coordinates.
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