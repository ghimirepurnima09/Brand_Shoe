import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart }     from "../context/CartContext";
import { Search, ShoppingCart, CircleUserRound, Heart, X, Bell } from "lucide-react";
import logo from "../assets/logo.png";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const BACKEND = "http://localhost:5000";

const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return `${BACKEND}${src}`;
  return src;
};

const STATUS_COLORS = {
  pending:    "bg-yellow-500/20 text-yellow-400",
  processing: "bg-blue-500/20 text-blue-400",
  shipped:    "bg-purple-500/20 text-purple-400",
  delivered:  "bg-green-500/20 text-green-400",
  cancelled:  "bg-red-500/20 text-red-400",
};

const STATUS_MSG = {
  pending:    "⏳ Your order is being reviewed",
  processing: "📦 Your order is being prepared",
  shipped:    "🚚 Your order is on the way!",
  delivered:  "✅ Your order has been delivered!",
  cancelled:  "❌ Your order was cancelled",
};

const PREV_STATUSES_KEY = "prevOrderStatuses";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist }   = useWishlist();
  const { totalItems } = useCart();

  // Re-evaluate on every render so logout instantly hides the bell/icons
  const token      = localStorage.getItem("token");
  const isLoggedIn = !!token && token !== "null" && token !== "undefined";

  const [query,        setQuery]        = useState("");
  const [allProducts,  setAllProducts]  = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBell,     setShowBell]     = useState(false);
  const [orders,       setOrders]       = useState([]);
  const [unread,       setUnread]       = useState(0);

  const searchRef = useRef(null);
  const bellRef   = useRef(null);

  // ── Fetch products for search ────────────────────────────────
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/products/getproducts`);
      if (res.data.success) setAllProducts(res.data.products);
    } catch { /* silent */ }
  }, []);

  // ── Fetch user orders for bell notifications ─────────────────
  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) return;

    const storedToken = localStorage.getItem("token");
    if (!storedToken || storedToken === "null" || storedToken === "undefined") return;

    try {
      const res = await axios.get(`${BACKEND}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (!res.data.success) return;

      const fetchedOrders = res.data.orders;
      const prevStatuses  = JSON.parse(localStorage.getItem(PREV_STATUSES_KEY) || "{}");
      const readIds       = JSON.parse(localStorage.getItem("readNotifs")       || "[]");

      let newUnread = 0;
      fetchedOrders.forEach((o) => {
        const prev     = prevStatuses[o.id];
        const changed  = prev && prev !== o.status;
        const neverSeen = !prev;
        if ((changed || neverSeen) && !readIds.includes(`${o.id}-${o.status}`)) {
          newUnread++;
        }
      });

      // Persist latest statuses so next poll can detect changes
      const newStatuses = {};
      fetchedOrders.forEach((o) => { newStatuses[o.id] = o.status; });
      localStorage.setItem(PREV_STATUSES_KEY, JSON.stringify(newStatuses));

      setOrders(fetchedOrders);
      setUnread(newUnread);
    } catch (err) {
      const status = err?.response?.status;
      // If token is truly expired, clear storage so the user is prompted to log in
      if (status === 401) {
        console.warn("Token expired or invalid — clearing session");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
      }
    }
  }, [isLoggedIn]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // ── Close dropdowns on outside click ────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false);
      if (bellRef.current   && !bellRef.current.contains(e.target))   setShowBell(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellOpen = () => {
    setShowBell((prev) => {
      if (!prev) {
        const readIds = orders.map((o) => `${o.id}-${o.status}`);
        localStorage.setItem("readNotifs", JSON.stringify(readIds));
        setUnread(0);
      }
      return !prev;
    });
  };

  const handleViewOrder = () => {
    setShowBell(false);
    navigate("/orders");
  };

  // ── Search suggestions ───────────────────────────────────────
  const suggestions = query.trim().length === 0 ? [] : allProducts
    .filter((p) => {
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q)     ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);

  const handleSelectProduct = (product) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/product/${product._id || product.id}`);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[82px] bg-white flex items-center justify-between px-6 lg:px-14 border-b border-gray-200 z-[9999] shadow-sm">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-[48px] h-[48px] rounded-full object-cover shadow-md" />
        <h1 className="text-[34px] font-black tracking-[-3px] text-black">Brand_Shoe</h1>
      </div>

      {/* CENTER MENU */}
      <div className="hidden lg:flex items-center gap-9 text-[15px] font-semibold">
        <Link to="/mainhome"
          className={`transition ${location.pathname === "/mainhome" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>
          Home
        </Link>
        <Link to={isLoggedIn ? "/women" : "/login"}
          className={`transition ${location.pathname === "/women" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>
          Womens
        </Link>
        <Link to={isLoggedIn ? "/kids" : "/login"}
          className={`transition ${location.pathname === "/kids" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>
          Kids
        </Link>
        <Link to={isLoggedIn ? "/men" : "/login"}
          className={`transition ${location.pathname === "/men" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>
          Men
        </Link>
        <Link to={isLoggedIn ? "/collections" : "/login"}
          className={`transition ${location.pathname === "/collections" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>
          New Arrival
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div ref={searchRef} className="hidden lg:block relative">
          <div className="flex items-center gap-3 bg-[#f5f5f5] border border-gray-200 px-5 rounded-full w-[290px] h-[48px] focus-within:border-[#8da27f] transition">
            <Search size={17} className="text-gray-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
              onKeyDown={handleSearchEnter}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search sneakers..."
              className="bg-transparent outline-none text-[14px] w-full"
            />
            {query && (
              <button onClick={() => { setQuery(""); setShowDropdown(false); }}>
                <X size={15} className="text-gray-400 hover:text-black transition" />
              </button>
            )}
          </div>

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-[56px] left-0 w-full bg-white border border-gray-200 rounded-[20px] shadow-2xl overflow-hidden z-[99999]">
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-400 px-5 pt-4 pb-2">Suggestions</p>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onMouseDown={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-[#f5f5f5] cursor-pointer transition group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={resolveImg(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm font-bold truncate group-hover:text-[#8da27f] transition">{product.name}</p>
                    <p className="text-gray-400 text-xs">{product.category} • {product.gender}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => { setShowDropdown(false); navigate(`/search?q=${encodeURIComponent(query.trim())}`); }}
                className="w-full py-3 text-center text-[#8da27f] text-xs font-bold uppercase tracking-[2px] border-t border-gray-100 hover:bg-[#8da27f] hover:text-white transition"
              >
                See all results for "{query}"
              </button>
            </div>
          )}

          {showDropdown && suggestions.length === 0 && query.trim().length > 0 && (
            <div className="absolute top-[56px] left-0 w-full bg-white border border-gray-200 rounded-[20px] shadow-2xl px-5 py-5 text-center z-[99999]">
              <p className="text-gray-400 text-sm font-semibold">No results for "{query}"</p>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <>
            {/* BELL */}
            <div ref={bellRef} className="relative">
              <button
                onClick={handleBellOpen}
                className="relative w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#8da27f] hover:text-white transition duration-300 shadow-sm"
              >
                <Bell size={19} />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {unread}
                  </span>
                )}
              </button>

              {showBell && (
                <div className="absolute top-[56px] right-0 w-[380px] bg-white border border-gray-200 rounded-[20px] shadow-2xl overflow-hidden z-[99999]">
                  <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                    <p className="font-black text-black text-sm uppercase tracking-[2px]">Order Updates</p>
                    <p className="text-xs text-gray-400">{orders.length} orders</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <Bell size={32} className="text-gray-200 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm font-semibold">No orders yet</p>
                    </div>
                  ) : (
                    <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100">
                      {orders.map((order) => {
                        const statusKey = (order.status || "pending").toLowerCase();
                        const items = typeof order.items === "string"
                          ? (() => { try { return JSON.parse(order.items); } catch { return []; } })()
                          : (order.items || []);

                        return (
                          <div key={order.id} className="px-4 py-4 hover:bg-gray-50 transition">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-black font-bold text-sm">Order #{order.id}</p>
                                <p className="text-gray-500 text-xs mt-0.5">
                                  {items.length} item{items.length !== 1 ? "s" : ""} · Rs.{Number(order.total_price).toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-xs mt-0.5">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase whitespace-nowrap ${STATUS_COLORS[statusKey] || STATUS_COLORS.pending}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-500 mb-3">
                              {STATUS_MSG[statusKey] || "Order status updated"}
                            </p>
                            <button
                              onClick={handleViewOrder}
                              className="w-full h-8 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-[1px] hover:bg-[#8da27f] transition"
                            >
                              View Complete Order
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => { setShowBell(false); navigate("/orders"); }}
                    className="w-full py-3 text-center text-[#8da27f] text-xs font-bold uppercase tracking-[2px] border-t border-gray-100 hover:bg-[#8da27f] hover:text-white transition"
                  >
                    View All Orders
                  </button>
                </div>
              )}
            </div>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="relative w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#8da27f] hover:text-white transition duration-300 shadow-sm"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="relative w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-[#8da27f] hover:text-white hover:border-[#8da27f] transition duration-300 shadow-sm"
            >
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8da27f] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* PROFILE */}
            <button
              onClick={() => navigate("/profile")}
              className="w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition duration-300 shadow-sm"
            >
              <CircleUserRound size={20} />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-7 h-[48px] rounded-full bg-black text-white flex items-center justify-center text-[14px] font-semibold hover:bg-[#8da27f] transition duration-300 shadow-md"
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}