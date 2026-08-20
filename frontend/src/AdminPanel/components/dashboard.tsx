import { useState } from 'react';
import { 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  XCircle, 
  RefreshCcw, 
  CheckCircle,
  Globe,
  MousePointer
} from 'lucide-react';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'month' | 'week'>('month');

  // Dynamic conditional data based on time filters
  const analyticData = {
    month: {
      revenue: '₹1,48,500',
      revenueChange: '+12.5% vs last month',
      totalOrders: '312',
      ordersChange: '+8.2% vs last month',
      received: '260',
      cancelled: '18',
      returned: '34',
      trafficSource: { direct: '45%', search: '35%', social: '20%' },
      chartPoints: '20,80 40,65 60,70 80,45 100,50 120,30 140,35 160,15 180,25 200,10'
    },
    week: {
      revenue: '₹38,200',
      revenueChange: '+4.1% vs last week',
      totalOrders: '78',
      ordersChange: '+2.4% vs last week',
      received: '65',
      cancelled: '4',
      returned: '9',
      trafficSource: { direct: '40%', search: '30%', social: '30%' },
      chartPoints: '20,70 40,55 60,40 80,60 100,35 120,45 140,20 160,25 180,15 200,12'
    }
  };

  const activeData = timeframe === 'month' ? analyticData.month : analyticData.week;

  const recentOrders = [
    { id: 'ORD-9021', customer: 'Aarav Sharma', date: 'Today, 11:30 AM', items: 'Indigo Dabu Saree', amount: '₹3,499', status: 'Delivered', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { id: 'ORD-9020', customer: 'Priya Patel', date: 'Today, 09:15 AM', items: 'Kota Doria Silk Block', amount: '₹4,200', status: 'Pending', statusColor: 'bg-amber-50 text-amber-700 border-amber-100' },
    { id: 'ORD-9019', customer: 'Anjali Desai', date: 'Yesterday', items: 'Cotton Mulmul Whisper', amount: '₹2,899', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700 border-blue-100' },
    { id: 'ORD-9018', customer: 'Meera Reddy', date: '28 June 2026', items: 'Maheshwari Gold Zari', amount: '₹6,500', status: 'Cancelled', statusColor: 'bg-rose-50 text-rose-700 border-rose-100' },
  ];

  return (
    <div className="space-y-8 font-sans text-sm text-left">
      
      {/* 👑 HEADER SECTION WITH TIMEFRAME TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 tracking-wide">
            Atelier Analytics Centre
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Real-time multi-dimensional audit of your heritage handloom drapes and customer acquisitions.
          </p>
        </div>
        
        {/* Toggle Controls */}
        <div className="bg-stone-100 p-1 rounded-xl inline-flex self-start sm:self-auto border border-stone-200">
          <button 
            onClick={() => setTimeframe('month')}
            className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${timeframe === 'month' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeframe('week')}
            className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${timeframe === 'week' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* 📊 CORE FINANCIAL & USER TRAFFIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Revenue Node */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">Gross Revenue</span>
              <span className="text-2xl font-serif font-medium text-stone-900">{activeData.revenue}</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-emerald-50 border-emerald-100 text-emerald-600">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] font-medium text-emerald-700 bg-emerald-50/60 px-2 py-0.5 rounded-md mt-4 self-start flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> {activeData.revenueChange}
          </div>
        </div>

        {/* Card 2: Total Order Volume Node */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">Total Placed</span>
              <span className="text-2xl font-serif font-medium text-stone-900">{activeData.totalOrders} Units</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-amber-50 border-amber-100 text-amber-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] font-medium text-amber-700 bg-amber-50/60 px-2 py-0.5 rounded-md mt-4 self-start flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> {activeData.ordersChange}
          </div>
        </div>

        {/* Card 3: Active User Base */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">Artisan & Users</span>
              <span className="text-2xl font-serif font-medium text-stone-900">1,840</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-blue-50 border-blue-100 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] font-medium text-stone-500 mt-4 pt-3 border-t border-stone-50">
            +4.1% new signups audited
          </div>
        </div>

        {/* Card 4: Catalog Framework */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">Active Catalog</span>
              <span className="text-2xl font-serif font-medium text-stone-900">56 Drapes</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-stone-100 border-stone-200 text-stone-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] font-medium text-stone-500 mt-4 pt-3 border-t border-stone-50">
            5 heritage block styles listed
          </div>
        </div>

      </div>

      {/* 📦 NEW: DETAILED ORDER FULFILLMENT REGISTER (RECEIVED, CANCELLED, RETURNED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Received/Success Metric Box */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 flex items-center gap-4 shadow-[0_4px_25px_-12px_rgba(0,0,0,0.02)]">
          <div className="p-3 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Filled & Dispatched</span>
            <span className="text-xl font-bold font-serif text-stone-900">{activeData.received} Logs</span>
            <span className="text-[10px] text-stone-400 block mt-0.5">Cleared secure verification</span>
          </div>
        </div>

        {/* Cancelled Metric Box */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 flex items-center gap-4 shadow-[0_4px_25px_-12px_rgba(0,0,0,0.02)]">
          <div className="p-3 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Aborted / Cancelled</span>
            <span className="text-xl font-bold font-serif text-stone-900">{activeData.cancelled} Logs</span>
            <span className="text-[10px] text-stone-400 block mt-0.5">Payment bounce/user cancel</span>
          </div>
        </div>

        {/* Returned Metric Box */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 flex items-center gap-4 shadow-[0_4px_25px_-12px_rgba(0,0,0,0.02)]">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Artisan Return Reverse</span>
            <span className="text-xl font-bold font-serif text-stone-900">{activeData.returned} Logs</span>
            <span className="text-[10px] text-stone-400 block mt-0.5">Awaiting warehouse parsing</span>
          </div>
        </div>

      </div>

      {/* 📉 NEW: NATIVE HIGH-PERFORMANCE VISUALIZATION GRAPHS BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Flow Chart Matrix: Linear Analytics Timeline */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-medium text-stone-900 tracking-wide">Sales & Traffic Waveform</h3>
            <p className="text-[11px] text-stone-400 mt-0.5">Micro tracking linear vectors velocity metrics.</p>
          </div>
          
          {/* Native SVG High Performance Minimalist Sparkline Area Graph */}
          <div className="w-full pt-6">
            <svg className="w-full h-36 overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9A7B56" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#9A7B56" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area */}
              <path 
                d={`M 20,100 L ${activeData.chartPoints} L 200,100 Z`} 
                fill="url(#gradient)" 
                className="transition-all duration-500 ease-in-out"
              />
              {/* Vector Line */}
              <polyline 
                fill="none" 
                stroke="#9A7B56" 
                strokeWidth="2" 
                points={activeData.chartPoints} 
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold uppercase tracking-wider pt-3 border-t border-stone-50 mt-2">
              <span>Timeline Origin</span>
              <span>Mid Horizon Point</span>
              <span>Active Peak</span>
            </div>
          </div>
        </div>

        {/* Traffic Channels Breakdown Grid Frame */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-medium text-stone-900 tracking-wide">Acquisition Channels</h3>
            <p className="text-[11px] text-stone-400 mt-0.5">Auditing incoming entry nodes percentages.</p>
          </div>

          <div className="space-y-4 py-4">
            {/* Source 1 */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-stone-700"><Globe className="w-3.5 h-3.5 text-stone-400" /> Direct Browser</span>
                <span className="text-stone-900">{activeData.trafficSource.direct}</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-900 transition-all duration-500" style={{ width: activeData.trafficSource.direct }} />
              </div>
            </div>

            {/* Source 2 */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-stone-700"><MousePointer className="w-3.5 h-3.5 text-stone-400" /> Organic Search SEO</span>
                <span className="text-stone-900">{activeData.trafficSource.search}</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#9A7B56] transition-all duration-500" style={{ width: activeData.trafficSource.search }} />
              </div>
            </div>

            {/* Source 3 */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-stone-700"><Users className="w-3.5 h-3.5 text-stone-400" /> Social Networks</span>
                <span className="text-stone-900">{activeData.trafficSource.social}</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 transition-all duration-500" style={{ width: activeData.trafficSource.social }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 📜 RECENT LIVE ORDERS GRID REGISTRY */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-medium text-stone-900 tracking-wide">
              Recent Activity Register
            </h2>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Latest dynamic purchases triggering dispatch loops.
            </p>
          </div>
          <button className="text-xs font-semibold text-[#9A7B56] hover:text-stone-900 uppercase tracking-wider transition-colors">
            Audit All Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-stone-600 text-xs">
            <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-[10px] font-bold border-b border-stone-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold text-left">Order Token</th>
                <th className="px-6 py-3.5 font-semibold text-left">Customer Profile</th>
                <th className="px-6 py-3.5 font-semibold text-left">Weave Product</th>
                <th className="px-6 py-3.5 font-semibold text-left">Transaction</th>
                <th className="px-6 py-3.5 font-semibold text-left">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 text-stone-900 font-mono font-bold text-[11px]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-stone-800">{order.customer}</div>
                    <div className="text-[10px] text-stone-400 font-light mt-0.5">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-700">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-stone-900 font-semibold">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}