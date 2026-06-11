import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BACKEND = "http://localhost:5000";

const STATUS_COLORS = {
  pending:    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped:    "bg-purple-500/20 text-purple-400 border-purple-500/30",
  delivered:  "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled:  "bg-red-500/20 text-red-400 border-red-500/30",
};

const STATUS_ICONS = {
  pending:    <Clock size={16} />,
  processing: <Package size={16} />,
  shipped:    <Truck size={16} />,
  delivered:  <CheckCircle size={16} />,
  cancelled:  <XCircle size={16} />,
};

const STATUS_MSG = {
  pending:    "Your order is being reviewed",
  processing: "Your order is being prepared",
  shipped:    "Your order is on the way!",
  delivered:  "Your order has been delivered!",
  cancelled:  "Your order was cancelled",
};

const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return `${BACKEND}${src}`;
  return src;
};

export default function Orders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    axios.get(`${BACKEND}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => { if (res.data.success) setOrders(res.data.orders); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black pt-[120px] px-6 lg:px-16 pb-20">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe</p>
          <h1 className="text-white text-6xl font-black mt-4 leading-none">MY<br />ORDERS</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-6">
            <ShoppingBag size={64} className="text-white/20" />
            <h2 className="text-gray-400 text-2xl font-bold">No orders yet</h2>
            <button onClick={() => navigate("/mainhome")}
              className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-4xl">
            {orders.map((order) => {
              const statusKey = (order.status || "pending").toLowerCase();
              const items = typeof order.items === "string"
                ? (() => { try { return JSON.parse(order.items); } catch { return []; } })()
                : (order.items || []);

              return (
                <div key={order.id} className="bg-[#161616] rounded-[32px] border border-white/10 p-8">

                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                      <p className="text-white font-black text-xl">Order #{order.id}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric"
                        })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-black text-sm uppercase tracking-wider ${STATUS_COLORS[statusKey] || STATUS_COLORS.pending}`}>
                      {STATUS_ICONS[statusKey]}
                      {order.status}
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="bg-black rounded-2xl border border-white/5 px-5 py-3 mb-6">
                    <p className="text-gray-400 text-sm font-semibold">
                      {STATUS_MSG[statusKey] || "Order status updated"}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-3 mb-6">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-black rounded-2xl border border-white/5 p-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#161616] shrink-0">
                          {resolveImg(item.image) ? (
                            <img src={resolveImg(item.image)} alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = "none"; }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">IMG</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm truncate">{item.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5">
                            Size: <span className="text-white font-bold">US {item.size}</span>
                            {" · "}Qty: <span className="text-white font-bold">{item.quantity}</span>
                          </p>
                        </div>
                        <p className="text-white font-black text-sm shrink-0">
                          Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                      {items.length} item{items.length !== 1 ? "s" : ""}
                    </span>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs uppercase tracking-[2px]">Total</p>
                      <p className="text-white font-black text-2xl">
                        Rs. {Number(order.total_price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}