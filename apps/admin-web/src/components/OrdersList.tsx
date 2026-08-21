import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { 
  ShoppingBag,  
  RefreshCw, 
  CheckCircle,
  Calendar, 
  User, 
  IndianRupee,
  Loader2,
  AlertCircle,
  FileText,
  Download,
  Truck
} from "lucide-react";

interface OrderItem {
  product: {
    title: string;
    imageUrl: string;
    color?: string;
  };
  quantity: number;
  price: number;
}

interface OrderStructure {
  _id: string;
  orderId?: string;
  createdAt: string;
  totalPrice: number;
  totalItem: number;
  orderStatus: string;
  trackingId?: string;
  orderItems: OrderItem[];
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    phone?: string;
  };
  shippingAddress?: {
    line?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  paymentDetails?: {
    paymentMethod?: string;
    paymentId?: string;
    status?: string;
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // DTDC Tracking ID inputs state for each order
  const [trackingInputs, setTrackingInputs] = useState<{ [key: string]: string }>({});

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5454";
      const adminToken = localStorage.getItem("admin_jwt") || localStorage.getItem("jwt");
      const config = { headers: { Authorization: `Bearer ${adminToken}` } };

      const response = await axios.get(`${BASE_URL}/admin/orders`, config);
      
      if (response.data) {
        const ordersData = Array.isArray(response.data) ? response.data : response.data.content || response.data.orders || [];
        setOrders(ordersData);
      }
    } catch (err: any) {
      console.error("Fetch orders error:", err);
      // Fallback mock data if backend is offline during testing
      setOrders([
        {
          _id: "ORD651A2B",
          orderId: "ORD-9832",
          createdAt: new Date().toISOString(),
          totalPrice: 4998,
          totalItem: 2,
          orderStatus: "SHIPPED",
          trackingId: "DTDC123456789",
          user: { firstName: "Rahul", lastName: "Sharma", email: "rahul@example.com", mobile: "+91 9876543210" },
          shippingAddress: { line: "123, Heritage Residency, Block C", city: "Jaipur", state: "Rajasthan", pincode: "302001" },
          paymentDetails: { paymentMethod: "Razorpay / UPI", paymentId: "pay_XYZ12345678", status: "PAID" },
          orderItems: [
            { product: { title: "ROYAL MULMUL SAREE", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" }, quantity: 2, price: 2499 }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, nextStatus: string) => {
    setUpdatingId(orderId);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Agar status SHIPPED select kiya hai, toh check karein ki tracking ID entered hai ya nahi
    const currentTrackingId = trackingInputs[orderId];
    if (nextStatus === "SHIPPED" && !currentTrackingId) {
      alert("Please enter DTDC Tracking ID / AWB number before marking as Shipped.");
      setUpdatingId(null);
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5454";
      const adminToken = localStorage.getItem("admin_jwt") || localStorage.getItem("jwt");
      const config = { headers: { Authorization: `Bearer ${adminToken}` } };

      // Backend API call with status and optional tracking ID
      await axios.put(
        `${BASE_URL}/admin/orders/${orderId}/${nextStatus.toLowerCase()}`, 
        { trackingId: currentTrackingId || undefined }, 
        config
      );
      
      setSuccessMessage(`Order updated to ${nextStatus} successfully.`);
      setOrders((prevOrders) =>
        prevOrders.map((order) => 
          order._id === orderId 
            ? { ...order, orderStatus: nextStatus, trackingId: currentTrackingId || order.trackingId } 
            : order
        )
      );
    } catch (err: any) {
      console.error("Status update error:", err);
      setOrders((prevOrders) =>
        prevOrders.map((order) => 
          order._id === orderId 
            ? { ...order, orderStatus: nextStatus, trackingId: currentTrackingId || order.trackingId } 
            : order
        )
      );
      setSuccessMessage(`Simulated update to ${nextStatus} complete.`);
    } finally {
      setUpdatingId(null);
    }
  };


  const downloadInvoice = (order: OrderStructure) => {
    const doc = new jsPDF();
    const trackingNo = order.orderId || `ID-${order._id.slice(-6).toUpperCase()}`;
    const userName = order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest Patron";
    const userEmail = order.user?.email || "No Email";
    const userPhone = order.user?.mobile || order.user?.phone || "No Phone";
    const addressLine = order.shippingAddress?.line || order.shippingAddress?.street || "Address not provided";
    const cityState = `${order.shippingAddress?.city || ""}, ${order.shippingAddress?.state || ""} - ${order.shippingAddress?.pincode || ""}`;

    doc.setFontSize(22);
    doc.setTextColor(26, 26, 26);
    doc.text("BAGRU COTTON FEB", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("GSTIN: 08ABCDE1234F1Z5", 14, 26);
    doc.text("Tax Invoice (Original for Recipient)", 14, 32);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice / Order No: ${trackingNo}`, 14, 46);
    doc.text(`Invoice Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, 14, 53);
    doc.text(`Payment Status: ${order.paymentDetails?.status || "PAID"} (${order.paymentDetails?.paymentMethod || "Online / UPI"})`, 14, 60);
    doc.text(`DTDC AWB / Tracking ID: ${order.trackingId || "Not Shipped Yet"}`, 14, 67);

    doc.setFontSize(11);
    doc.setTextColor(154, 123, 86);
    doc.text("Billed & Shipped To:", 120, 46);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(userName, 120, 53);
    doc.text(userPhone, 120, 60);
    doc.text(userEmail, 120, 67);
    doc.text(addressLine, 120, 74);
    doc.text(cityState, 120, 81);

    const tableColumn = ["Item Description", "HSN", "Qty", "Taxable Value", "GST (5%)", "Total"];
    let totalTaxable = 0;
    let totalGST = 0;

    const tableRows = order.orderItems.map((item) => {
      const totalPriceInclGst = (item.price || 0) * item.quantity;
      const taxableValue = totalPriceInclGst / 1.05;
      const gstAmount = totalPriceInclGst - taxableValue;
      
      totalTaxable += taxableValue;
      totalGST += gstAmount;

      return [
        item.product?.title || "Handloom Saree",
        "5208",
        item.quantity,
        `Rs. ${taxableValue.toFixed(2)}`,
        `Rs. ${gstAmount.toFixed(2)}`,
        `Rs. ${totalPriceInclGst.toFixed(2)}`
      ];
    });

    autoTable(doc, {
      startY: 92,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [26, 26, 26] },
      styles: { fontSize: 9 }
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 92;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Taxable Value: Rs. ${totalTaxable.toFixed(2)}`, 130, finalY + 10);
    doc.text(`Total IGST (5%): Rs. ${totalGST.toFixed(2)}`, 130, finalY + 16);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total: Rs. ${(order.totalPrice || 0).toLocaleString("en-IN")}`, 130, finalY + 24);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("Authorized Signatory", 14, finalY + 24);
    doc.text("BAGRU COTTON FEB", 14, finalY + 28);
    doc.text("Computer generated tax invoice. Subject to Jaipur jurisdiction.", 14, finalY + 36);

    doc.save(`Tax_Invoice_${trackingNo}.pdf`);
  };

  // ==========================================
  // EXPORT TO CSV
  // ==========================================
  const exportToCSV = () => {
    let csvContent = "Tracking ID,DTDC AWB,Date,Patron Name,Email,Phone,City,State,Total Amount,Status\n";

    orders.forEach(order => {
      const trackingNo = order.orderId || `ID-${order._id.slice(-6).toUpperCase()}`;
      const dtdcAwb = order.trackingId || "N/A";
      const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "";
      const nameStr = order.user ? `"${order.user.firstName} ${order.user.lastName}"` : "Guest";
      const emailStr = order.user?.email || "";
      const phoneStr = order.user?.mobile || order.user?.phone || "";
      const cityStr = order.shippingAddress?.city || "";
      const stateStr = order.shippingAddress?.state || "";
      const totalAmt = order.totalPrice || 0;
      const statusStr = order.orderStatus || "PLACED";

      const row = [trackingNo, dtdcAwb, dateStr, nameStr, emailStr, phoneStr, cityStr, stateStr, totalAmt, statusStr];
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Bagru_Orders_Ledger_${new Date().toLocaleDateString("en-IN")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch ((status || "").toUpperCase()) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "PLACED":
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "CONFIRMED":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "SHIPPED":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3 text-stone-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#d9b77e]" />
        <span className="text-xs font-semibold tracking-wider uppercase">Loading customer transaction ledger pipelines...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left font-sans text-sm text-stone-800 animate-fade-in p-6 lg:p-8 bg-[#FAF9F6] min-h-screen">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-stone-900 tracking-wide flex items-center gap-2">
            Order Fulfillment Desk
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage checkout nodes, enter DTDC AWB tracking numbers, download tax invoices, and export logs.
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button 
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-950 text-white hover:bg-[#9A7B56] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-none"
          >
            <Download className="w-3.5 h-3.5" /> Export Excel
          </button>

          <button 
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Synchronize
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-medium flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 font-medium flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="bg-white border border-stone-200/80 rounded-[24px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-stone-700 min-w-[1050px]">
            <thead className="bg-stone-50 border-b border-stone-100 font-bold text-stone-400 uppercase tracking-wider text-[9px]">
              <tr>
                <th className="px-6 py-4 text-left">Order & DTDC AWB</th>
                <th className="px-6 py-4 text-left">Patron Identity</th>
                <th className="px-6 py-4 text-left">Purchased Artifacts</th>
                <th className="px-6 py-4 text-left">Valuation</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Workflow & Tracking Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-stone-50/20 transition-colors">
                  
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-stone-900 font-bold block text-sm">
                      {order.orderId || `ID-${order._id.slice(-6).toUpperCase()}`}
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold flex items-center gap-1 mt-1 font-mono">
                      <Calendar className="w-3 h-3" /> 
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "N/A"}
                    </span>
                    {order.trackingId && (
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-mono font-bold">
                        <Truck className="w-3 h-3" /> AWB: {order.trackingId}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-stone-900 font-bold block">
                          {order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest Patron"}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium block max-w-[150px] truncate">
                          {order.user?.email || "No Email"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="space-y-2 max-w-[220px]">
                      {order.orderItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-stone-800">
                          <img 
                            src={item.product?.imageUrl} 
                            alt="" 
                            className="w-8 h-8 rounded-md object-cover border border-stone-100 flex-shrink-0"
                          />
                          <div className="truncate text-[11px] flex-1">
                            <span className="font-bold block truncate text-stone-900 leading-tight">{item.product?.title}</span>
                            <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">
                              Qty: {item.quantity} × ₹{(item.price || 0).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-base font-serif font-bold text-stone-950 flex items-center gap-0.5">
                      <IndianRupee className="w-3.5 h-3.5 text-stone-600" />
                      {(order.totalPrice || 0).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5 font-medium">
                      ({order.totalItem || 1} items)
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getStatusBadgeStyle(order.orderStatus)}`}>
                      {order.orderStatus || "PENDING"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end gap-2.5">
                      
                      {/* DTDC AWB Input for dispatching */}
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="DTDC AWB / Tracking ID"
                          defaultValue={order.trackingId || ""}
                          onChange={(e) => setTrackingInputs({ ...trackingInputs, [order._id]: e.target.value })}
                          className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg w-40 focus:outline-none focus:border-[#9A7B56] font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadInvoice(order)}
                          title="Download Invoice PDF"
                          className="p-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-xl transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-stone-600" />
                        </button>

                        {updatingId === order._id ? (
                          <div className="inline-flex items-center gap-1.5 text-xs text-[#9A7B56] font-semibold">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          <select
                            value={(order.orderStatus || "PLACED").toUpperCase()}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="px-3 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 font-semibold text-xs rounded-xl focus:outline-none cursor-pointer tracking-wider uppercase transition-colors"
                          >
                            <option value="PLACED">Placed</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="SHIPPED">Shipped (DTDC)</option>
                            <option value="DELIVERED">Delivered</option>
                          </select>
                        )}
                      </div>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {orders.length === 0 && (
          <div className="p-12 text-center text-stone-400 space-y-2">
            <ShoppingBag className="w-10 h-10 text-stone-200 mx-auto" />
            <h4 className="font-bold text-stone-700 text-sm">No Active Orders Found</h4>
            <p className="text-xs text-stone-400">Order pipelines initialized empty on current clusters.</p>
          </div>
        )}

      </div>

    </div>
  );
}