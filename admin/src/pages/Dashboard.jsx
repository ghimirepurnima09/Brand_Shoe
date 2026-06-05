import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Package, Users, TrendingUp, ShoppingBag } from "lucide-react";

const API = "http://localhost:5000/api/admin";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`${API}/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.stats);
          setRecentProducts(res.data.recentProducts);
          setRecentUsers(res.data.recentUsers);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Products", value: stats.totalProducts, icon: <Package size={24} />, color: "text-[#8da27f]" },
        { label: "Total Users", value: stats.totalUsers, icon: <Users size={24} />, color: "text-blue-400" },
        { label: "Men Products", value: stats.menProducts, icon: <ShoppingBag size={24} />, color: "text-purple-400" },
        { label: "Women Products", value: stats.womenProducts, icon: <TrendingUp size={24} />, color: "text-pink-400" },
        { label: "Kids Products", value: stats.kidsProducts, icon: <Package size={24} />, color: "text-yellow-400" },
      ]
    : [];

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
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
              {statCards.map(({ label, value, icon, color }) => (
                <div key={label} className="bg-[#161616] rounded-[24px] border border-white/10 p-6 flex flex-col gap-4">
                  <div className={color}>{icon}</div>
                  <div>
                    <p className={`text-4xl font-black ${color}`}>{value}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-[2px] mt-1">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* RECENT PRODUCTS */}
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">Recent Products</h2>
                <div className="flex flex-col gap-3">
                  {recentProducts.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 bg-black rounded-2xl border border-white/10 p-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#161616] shrink-0">
                        <img src={`http://localhost:5000${p.image}`} alt={p.name} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/48?text=Img"; }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{p.name}</p>
                        <p className="text-[#8da27f] text-xs">{p.category} • {p.gender}</p>
                      </div>
                      <p className="text-white font-black text-sm shrink-0">Rs. {Number(p.price).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT USERS */}
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">Recent Users</h2>
                <div className="flex flex-col gap-3">
                  {recentUsers.map((u) => (
                    <div key={u.id} className="flex items-center gap-4 bg-black rounded-2xl border border-white/10 p-4">
                      <div className="w-10 h-10 rounded-full bg-[#8da27f]/20 flex items-center justify-center shrink-0">
                        <span className="text-[#8da27f] font-black">{u.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{u.name}</p>
                        <p className="text-gray-500 text-xs truncate">{u.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}