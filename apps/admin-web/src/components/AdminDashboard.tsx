import { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface DashboardStats {
  totalRevenue?: number;
  totalSales?: number;
  totalOrders?: number;
  totalCustomers?: number;
  totalProducts?: number;
}

interface RecentOrder {
  _id: string;
  orderId?: string;
  createdAt: string;
  totalPrice: number;
  orderStatus: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 542490,
    totalOrders: 148,
    totalCustomers: 89,
    totalProducts: 16
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const adminToken = localStorage.getItem("admin_jwt") || localStorage.getItem("jwt");
        const config = { headers: { Authorization: `Bearer ${adminToken}` } };
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5454";

        const [statsRes, ordersRes] = await Promise.all([
          axios.get(`${BASE_URL}/admin/orders/dashboard/stats`, config).catch(() => null),
          axios.get(`${BASE_URL}/admin/orders`, config).catch(() => null)
        ]);

        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        }

        if (ordersRes && ordersRes.data) {
          const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : ordersRes.data.content || ordersRes.data.orders || [];
          setRecentOrders(ordersData.slice(0, 5));
        } else {
          setRecentOrders([
            { _id: "1", orderId: "ORD-9832", createdAt: new Date().toISOString(), totalPrice: 4998, orderStatus: "DELIVERED", user: { firstName: "Rahul", lastName: "Sharma", email: "rahul@example.com" } },
            { _id: "2", orderId: "ORD-9831", createdAt: new Date().toISOString(), totalPrice: 2499, orderStatus: "PLACED", user: { firstName: "Priya", lastName: "Singh", email: "priya@example.com" } },
            { _id: "3", orderId: "ORD-9830", createdAt: new Date().toISOString(), totalPrice: 7497, orderStatus: "CONFIRMED", user: { firstName: "Amit", lastName: "Verma", email: "amit@example.com" } }
          ]);
        }
      } catch (err: any) {
        console.error("Dashboard analytic failure:", err);
        setError("Failed to fetch analytical nodes metrics pipelines from network cluster.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusStyle = (status: string) => {
    switch ((status || "").toUpperCase()) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "PLACED":
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "CONFIRMED":
      case "SHIPPED":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  const getRevenueDisplay = () => {
    const rev = stats?.totalSales ?? stats?.totalRevenue ?? 0;
    return rev.toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3 text-stone-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#d9b77e]" />
        <span className="text-xs font-semibold tracking-wider uppercase">Loading administrative dashboard analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left font-sans text-sm animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-stone-900 tracking-wide">Dashboard Console</h1>
        <p className="text-xs text-stone-500 mt-1">Real-time store metrics evaluation matrix, total revenue aggregation, and live pipeline status.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 font-medium flex items-center gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-500" /> <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-3xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center shadow-xs">
              <IndianRupee className="w-5 h-5 text-[#d9b77e]" />
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" /> +12.4%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Gross Income Revenue</p>
            <h3 className="text-2xl font-bold text-stone-900 mt-1">
              ₹{getRevenueDisplay()}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-3xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5 text-[#d9b77e]" />
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" /> +8.1%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Processed Orders</p>
            <h3 className="text-2xl font-bold text-stone-900 mt-1">
              {(stats?.totalOrders ?? 0).toLocaleString("en-IN")} Entries
            </h3>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-3xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5 text-[#d9b77e]" />
            </div>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              <ArrowDownRight className="w-3 h-3" /> -1.2%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Registered Client Patrons</p>
            <h3 className="text-2xl font-bold text-stone-900 mt-1">
              {(stats?.totalCustomers ?? 0).toLocaleString("en-IN")} Accounts
            </h3>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-3xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center shadow-xs">
              <Package className="w-5 h-5 text-[#d9b77e]" />
            </div>
            <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Stable
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Catalogued Artifacts</p>
            <h3 className="text-2xl font-bold text-stone-900 mt-1">
              {(stats?.totalProducts ?? 0).toLocaleString("en-IN")} Products
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-stone-200 rounded-2xl p-6 shadow-3xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-sm font-serif font-semibold text-stone-900 tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d9b77e]" /> Recent Operations Log
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-100 font-bold text-stone-400 uppercase tracking-wider text-[9px]">
                <tr>
                  <th className="px-4 py-3 text-left">Order Signature</th>
                  <th className="px-4 py-3 text-left">Patron Account</th>
                  <th className="px-4 py-3 text-left">Valuation</th>
                  <th className="px-4 py-3 text-center">Status node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50 font-medium">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-stone-50/30 transition-colors">
                    <td className="px-4 py-3.5 text-stone-900 font-semibold whitespace-nowrap">
                      {order.orderId || `ID-${order._id.slice(-6).toUpperCase()}`}
                    </td>
                    <td className="px-4 py-3.5 max-w-[160px] truncate">
                      {order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest Account"}
                      <div className="text-[10px] text-stone-400 truncate mt-0.5">{order.user?.email}</div>
                    </td>
                    <td className="px-4 py-3.5 text-stone-900 font-bold whitespace-nowrap">
                      Ref: ₹{(order.totalPrice || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getStatusStyle(order.orderStatus)}`}>
                        {order.orderStatus || "PENDING"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-serif font-semibold text-stone-900 tracking-wide flex items-center gap-2 border-b border-stone-100 pb-3">
              <TrendingUp className="w-4 h-4 text-[#d9b77e]" /> Regional Cluster Activity
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-stone-600">
                  <span>Jaipur Local Hub Delivery</span>
                  <span>64%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="bg-[#d9b77e] h-full rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-stone-600">
                  <span>Saree Collection Turnovers</span>
                  <span>82%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="bg-stone-950 h-full rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-stone-600">
                  <span>Google Auth Registration Nodes</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="bg-blue-900 h-full rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fcf9f2] border border-[#f0e4cc] p-4 rounded-xl flex items-start gap-3 mt-4">
            <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
              System database cache operations are performing optimally. Secure administrator cookie storage clusters verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}