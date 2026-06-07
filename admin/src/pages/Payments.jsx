import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { CreditCard, Banknote, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api/orders";

export default function Payments() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
  });

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/all`, { headers: getHeaders() });
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => { await fetchOrders(); };
    load();
  }, []);

  const filtered      = filter === "all" ? orders : orders.filter((o) => o.payment_method === filter);
  const totalRevenue  = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + Number(o.total_price || 0), 0);
  const cardRevenue   = orders.filter(o => o.payment_method === "card" && o.status !== "cancelled").reduce((s, o) => s + Number(o.total_price || 0), 0);
  const codRevenue    = orders.filter(o => o.payment_method === "cod"  && o.status !== "cancelled").reduce((s, o) => s + Number(o.total_price || 0), 0);

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe Admin</p>
            <h1 className="text-white text-5xl font-black mt-2 leading-none">PAYMENTS</h1>
          </div>
          <button onClick={fetchOrders}
            className="flex items-center gap-2 px-6 h-12 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition font-bold uppercase tracking-[2px] text-sm">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            { label: "Total Revenue",    value: `Rs.${totalRevenue.toLocaleString()}`, color: "text-[#8da27f]"  },
            { label: "Card Payments",    value: `Rs.${cardRevenue.toLocaleString()}`,  color: "text-[#635bff]"  },
            { label: "Cash on Delivery", value: `Rs.${codRevenue.toLocaleString()}`,   color: "text-yellow-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#161616] rounded-[24px] border border-white/10 p-6">
              <p className="text-gray-500 text-xs uppercase tracking-[2px] font-bold mb-2">{label}</p>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-6">
          {[["all","All"], ["card","Card"], ["cod","Cash on Delivery"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[1px] border transition ${
                filter === val
                  ? "bg-[#8da27f] border-[#8da27f] text-white"
                  : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-[#161616] rounded-[32px] border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {["Order ID", "Customer", "Amount", "Method", "Status", "Date"].map((h) => (
                    <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-[2px] px-6 py-4 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center text-gray-600 py-12">No payments found</td></tr>
                ) : filtered.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white font-bold">#{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-white font-bold">{order.user_name}</p>
                      <p className="text-gray-500 text-xs">{order.user_email}</p>
                    </td>
                    <td className="px-6 py-4 text-[#8da27f] font-black">
                      Rs.{Number(order.total_price || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-2 text-xs font-black uppercase ${
                        order.payment_method === "card" ? "text-[#635bff]" : "text-yellow-400"
                      }`}>
                        {order.payment_method === "card" ? <CreditCard size={14}/> : <Banknote size={14}/>}
                        {order.payment_method === "card" ? "Card" : "Cash"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${
                        order.status === "delivered"  ? "bg-green-500/20 text-green-400 border-green-500/30"   :
                        order.status === "cancelled"  ? "bg-red-500/20 text-red-400 border-red-500/30"         :
                        order.status === "shipped"    ? "bg-purple-500/20 text-purple-400 border-purple-500/30":
                        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}