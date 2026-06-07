import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Trash2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const API  = "http://localhost:5000/api/orders";
const IMG = "http://localhost:5173";

const STATUS_COLORS = {
  pending:    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped:    "bg-purple-500/20 text-purple-400 border-purple-500/30",
  delivered:  "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled:  "bg-red-500/20 text-red-400 border-red-500/30",
};

const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return `${IMG}${src}`;
};

export default function ManageOrders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
  });

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/all`, { headers: getHeaders() });
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => { await fetchOrders(); };
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API}/${id}/status`, { status }, { headers: getHeaders() });
      toast.success("Status updated!");
      fetchOrders();
    } catch { toast.error("Failed to update status"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(`${API}/${id}`, { headers: getHeaders() });
      toast.success("Order deleted!");
      fetchOrders();
    } catch { toast.error("Failed to delete order"); }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe Admin</p>
            <h1 className="text-white text-5xl font-black mt-2 leading-none">ORDERS</h1>
          </div>
          <button onClick={fetchOrders}
            className="flex items-center gap-2 px-6 h-12 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition font-bold uppercase tracking-[2px] text-sm">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Orders",  value: orders.length,                                              color: "text-[#8da27f]"  },
            { label: "Pending",       value: orders.filter(o => o.status === "pending").length,          color: "text-yellow-400" },
            { label: "Delivered",     value: orders.filter(o => o.status === "delivered").length,        color: "text-green-400"  },
            { label: "Cancelled",     value: orders.filter(o => o.status === "cancelled").length,        color: "text-red-400"    },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#161616] rounded-[24px] border border-white/10 p-6">
              <p className={`text-4xl font-black ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-[2px] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#161616] rounded-[32px] border border-white/10 flex items-center justify-center h-[200px]">
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const items     = typeof order.items === "string" ? JSON.parse(order.items) : (order.items || []);
              const statusKey = (order.status || "pending").toLowerCase();

              return (
                <div key={order.id} className="bg-[#161616] border border-white/10 rounded-[24px] p-6">

                  {/* Order Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-white font-black text-lg">Order #{order.id}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{order.user_name} · {order.user_email}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{order.address}, {order.city}, {order.state} {order.zip}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{new Date(order.created_at).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wide ${STATUS_COLORS[statusKey] || STATUS_COLORS.pending}`}>
                        {order.status}
                      </span>
                      <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-black border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#8da27f] transition">
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => handleDelete(order.id)}
                        className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-4 py-2">
                        {resolveImg(item.image) && (
                          <img src={resolveImg(item.image)} alt={item.name}
                            className="w-10 h-10 rounded-xl object-cover bg-gray-800"
                            onError={(e) => { e.target.style.display = "none"; }} />
                        )}
                        <div>
                          <p className="text-white text-xs font-bold">{item.name}</p>
                          <p className="text-gray-500 text-xs">Size {item.size} · Qty {item.quantity}</p>
                          <p className="text-[#8da27f] text-xs font-bold">Rs.{Number(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="flex flex-wrap gap-6 border-t border-white/10 pt-4">
                    {[
                      ["Subtotal", `Rs.${Number(order.subtotal || 0).toLocaleString()}`],
                      ["Shipping", `Rs.${Number(order.shipping || 0).toLocaleString()}`],
                      ["Tax",      `Rs.${Number(order.tax || 0).toLocaleString()}`],
                      ["Total",    `Rs.${Number(order.total_price || 0).toLocaleString()}`],
                      ["Payment",  (order.payment_method || "cod").toUpperCase()],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="text-gray-600 text-xs uppercase tracking-[1px]">{label}</p>
                        <p className={`font-black mt-0.5 text-sm ${label === "Total" ? "text-[#8da27f] text-base" : "text-white"}`}>{val}</p>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}