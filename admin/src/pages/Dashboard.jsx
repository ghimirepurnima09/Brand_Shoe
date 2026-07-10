import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Package, Users, TrendingUp, ShoppingBag, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const API     = "http://localhost:5000/api/admin";
const ORDERS  = "http://localhost:5000/api/orders";
const BACKEND = "http://localhost:5000";

// ── resolveImg ──
// Cloudinary/external http  → use as-is
// /uploads/file.jpg          → backend (multer)
// /men/... /women/... /kids/ → Vite public folder — use as-is (no prefix needed)
const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return `${BACKEND}${src}`;
  return src; // /men/... /women/... served by Vite from frontend/public
};

export default function Dashboard() {
  const [stats,          setStats]          = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentUsers,    setRecentUsers]    = useState([]);
  const [allOrders,      setAllOrders]      = useState([]);
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    const token   = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get(`${API}/dashboard`, { headers }),
      axios.get(`${ORDERS}/all`,    { headers }),
    ]).then(([dashRes, ordersRes]) => {
      if (dashRes.data.success) {
        setStats(dashRes.data.stats);
        setRecentProducts(dashRes.data.recentProducts);
        setRecentUsers(dashRes.data.recentUsers);
      }
      if (ordersRes.data.success) setAllOrders(ordersRes.data.orders);
    }).catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const chartData = (() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const label   = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const dateStr = d.toISOString().split("T")[0];
      const count   = allOrders.filter((o) => new Date(o.created_at).toISOString().split("T")[0] === dateStr).length;
      const revenue = allOrders
        .filter((o) => new Date(o.created_at).toISOString().split("T")[0] === dateStr && o.status !== "cancelled")
        .reduce((sum, o) => sum + Number(o.total_price || 0), 0);
      days.push({ date: label, orders: count, revenue });
    }
    return days;
  })();

  const statCards = stats ? [
    { label: "Total Products", value: stats.totalProducts, icon: <Package size={24} />,    color: "text-[#8da27f]"  },
    { label: "Total Users",    value: stats.totalUsers,    icon: <Users size={24} />,       color: "text-blue-400"   },
    { label: "Total Orders",   value: allOrders.length,    icon: <ShoppingBag size={24} />, color: "text-purple-400" },
    {
      label: "Revenue",
      value: `Rs.${allOrders.filter(o => o.status !== "cancelled").reduce((s, o) => s + Number(o.total_price || 0), 0).toLocaleString()}`,
      icon: <DollarSign size={24} />, color: "text-yellow-400"
    },
    { label: "Men Products", value: stats.menProducts, icon: <TrendingUp size={24} />, color: "text-pink-400" },
  ] : [];

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="mb-10">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe Admin</p>
          <h1 className="text-white text-5xl font-black mt-2 leading-none">DASHBOARD</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* STAT CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
              {statCards.map(({ label, value, icon, color }) => (
                <div key={label} className="bg-[#161616] rounded-[24px] border border-white/10 p-6 flex flex-col gap-4">
                  <div className={color}>{icon}</div>
                  <div>
                    <p className={`text-3xl font-black ${color}`}>{value}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-[2px] mt-1">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* LINE CHART */}
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 mb-10">
              <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">Orders — Last 7 Days</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "#161616", border: "1px solid #ffffff20", borderRadius: 12, color: "#fff" }} labelStyle={{ color: "#8da27f", fontWeight: "bold" }} />
                  <Legend wrapperStyle={{ color: "#6b7280", fontSize: 12 }} />
                  <Line type="monotone" dataKey="orders"  stroke="#8da27f" strokeWidth={3} dot={{ fill: "#8da27f", r: 5 }} name="Orders" />
                  <Line type="monotone" dataKey="revenue" stroke="#635bff" strokeWidth={3} dot={{ fill: "#635bff", r: 5 }} name="Revenue (Rs.)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* RECENT PRODUCTS */}
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">Recent Products</h2>
                <div className="flex flex-col gap-3">
                  {recentProducts.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-8">No products yet</p>
                  ) : (
                    recentProducts.map((p) => {
                      const imgSrc = resolveImg(p.image);
                      return (
                        <div key={p.id} className="flex items-center gap-4 bg-black rounded-2xl border border-white/10 p-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#161616] shrink-0 flex items-center justify-center">
                            {imgSrc ? (
                              <img src={imgSrc} alt={p.name} className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML = `<span class="text-gray-600 text-[10px] font-bold">IMG</span>`;
                                }} />
                            ) : (
                              <span className="text-gray-600 text-[10px] font-bold">IMG</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm truncate">{p.name}</p>
                            <p className="text-[#8da27f] text-xs">
                              {p.category} • {p.gender}
                              {p.is_most_sold && " • 🔥 Most Sold"}
                              {p.is_new && " • ✨ New"}
                              {p.is_out_of_stock && " • ❌ Out of Stock"}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-white font-black text-sm">Rs. {Number(p.price).toLocaleString()}</p>
                            {p.discount > 0 && <span className="text-red-400 text-[10px] font-bold">-{p.discount}%</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* RECENT USERS */}
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">Recent Users</h2>
                <div className="flex flex-col gap-3">
                  {recentUsers.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-8">No users yet</p>
                  ) : (
                    recentUsers.map((u) => (
                      <div key={u.id} className="flex items-center gap-4 bg-black rounded-2xl border border-white/10 p-4">
                        <div className="w-10 h-10 rounded-full bg-[#8da27f]/20 flex items-center justify-center shrink-0 overflow-hidden">
                          {u.image ? (
                            <img
                              src={resolveImg(u.image)}
                              alt={u.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                          ) : (
                            <span className="text-[#8da27f] font-black">{u.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm truncate">{u.name}</p>
                          <p className="text-gray-500 text-xs truncate">{u.email}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}