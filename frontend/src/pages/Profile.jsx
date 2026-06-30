import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useWishlist } from "../context/WishlistContext";
import {
  User, Mail, Phone, Lock, LogOut, ShoppingBag, Heart,
  Eye, EyeOff, CheckCircle, ChevronRight, X, Camera,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND = "http://localhost:5000";

// ✅ Cloudinary URLs start with https — return as-is. Local paths get BACKEND prefix.
const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;   // Cloudinary full URL
  return `${BACKEND}${src}`;               // local fallback
};

const STATUS_COLORS = {
  pending:    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped:    "bg-purple-500/20 text-purple-400 border-purple-500/30",
  delivered:  "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled:  "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Profile() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState(storedUser);
  const [activeTab, setActiveTab] = useState("profile");

  const [profilePic, setProfilePic] = useState(storedUser.image || null);
  const picInputRef = useRef(null);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/upload/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const stored = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...stored, image: res.data.imageUrl }; // ✅ imageUrl from uploadRoutes

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setProfilePic(res.data.imageUrl);

      toast.success("Profile picture updated!");
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    }

    e.target.value = "";
  };

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [cancelling, setCancelling] = useState(null);

  const [passwords, setPasswords] = useState({
    email: user.email || "", otp: "", password: "", confirm: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setProfilePic(parsed.image || null);
    }

    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setOrders(res.data.orders);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load orders");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;
    setCancelling(orderId);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Order cancelled!");
        setOrders((prev) =>
          prev.map((o) => o.id === orderId ? { ...o, status: "cancelled" } : o)
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleSendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/sendotp", {
        email: passwords.email,
      });
      if (res.data.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.otp || !passwords.password || !passwords.confirm) {
      toast.error("Please fill all fields!");
      return;
    }
    if (passwords.password !== passwords.confirm) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setChangingPass(true);
      const res = await axios.post("http://localhost:5000/api/auth/resetpassword", {
        email: passwords.email,
        otp: passwords.otp,
        password: passwords.password,
      });
      if (res.data.success) {
        toast.success("Password changed successfully!");
        setOtpSent(false);
        setPasswords({ ...passwords, otp: "", password: "", confirm: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPass(false);
    }
  };

  const tabs = [
    { id: "profile",  label: "My Profile",     icon: <User size={18} /> },
    { id: "orders",   label: "Order History",   icon: <ShoppingBag size={18} /> },
    { id: "wishlist", label: "Wishlist",        icon: <Heart size={18} /> },
    { id: "password", label: "Change Password", icon: <Lock size={18} /> },
  ];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">

        <div className="mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe</p>
          <h1 className="text-white text-6xl font-black mt-4 leading-none">MY<br />PROFILE</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 flex flex-col items-center gap-4">

              <div
                onClick={() => picInputRef.current?.click()}
                className="relative w-24 h-24 rounded-full cursor-pointer group"
                title="Click to change profile picture"
              >
                {profilePic ? (
                  <img
                    src={resolveImg(profilePic)}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#8da27f]"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#8da27f]/20 border-2 border-[#8da27f] flex items-center justify-center">
                    <span className="text-[#8da27f] text-4xl font-black">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 rounded-full bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <Camera size={20} className="text-[#8da27f]" />
                  <span className="text-[#8da27f] text-[9px] font-bold mt-1 uppercase tracking-[1px]">Change</span>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={picInputRef}
                onChange={handleProfilePicChange}
                className="hidden"
              />

              <div className="text-center">
                <h2 className="text-white text-xl font-black">{user.name || "User"}</h2>
                <p className="text-gray-500 text-sm mt-1">{user.email || ""}</p>
                {profilePic && (
                  <button
                    onClick={() => {
                      setProfilePic(null);
                      toast.success("Photo removed");
                    }}
                    className="text-[10px] text-gray-600 hover:text-red-400 uppercase tracking-[1px] mt-2 transition"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-2">
                <div className="bg-black rounded-2xl p-3 text-center border border-white/10">
                  <p className="text-[#8da27f] text-2xl font-black">{orders.length}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-[1px] mt-1">Orders</p>
                </div>
                <div className="bg-black rounded-2xl p-3 text-center border border-white/10">
                  <p className="text-[#8da27f] text-2xl font-black">{wishlist.length}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-[1px] mt-1">Wishlist</p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-4 flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm uppercase tracking-[1px] transition ${
                    activeTab === tab.id
                      ? "bg-[#8da27f] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">{tab.icon}{tab.label}</div>
                  <ChevronRight size={16} />
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm uppercase tracking-[1px] text-red-400 hover:bg-red-500/10 transition mt-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">

            {activeTab === "profile" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  Personal Information
                </h2>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: <User size={18} />,  label: "Full Name",     value: user.name  || "—" },
                    { icon: <Mail size={18} />,  label: "Email Address", value: user.email || "—" },
                    { icon: <Phone size={18} />, label: "Phone Number",  value: user.phone || "—" },
                  ].map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-5 bg-black rounded-2xl border border-white/10 px-6 py-5"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#8da27f]/10 flex items-center justify-center text-[#8da27f] shrink-0">
                        {icon}
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-[2px] font-bold">{label}</p>
                        <p className="text-white font-bold text-base mt-1">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-5 bg-black rounded-2xl border border-[#8da27f]/20 flex items-center gap-4">
                  <CheckCircle size={20} className="text-[#8da27f] shrink-0" />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your account is verified and secure.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  Order History
                </h2>
                {ordersLoading ? (
                  <div className="flex justify-center h-[200px] items-center">
                    <div className="w-10 h-10 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                    <ShoppingBag size={64} className="text-white/10" />
                    <p className="text-gray-400 text-lg font-bold">No orders yet</p>
                    <button
                      onClick={() => navigate("/mainhome")}
                      className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {orders.map((order) => {
                      const items = typeof order.items === "string"
                        ? JSON.parse(order.items) : (order.items || []);
                      const statusKey = (order.status || "pending").toLowerCase();
                      const canCancel = !["delivered", "cancelled"].includes(statusKey);
                      return (
                        <div key={order.id} className="bg-black rounded-2xl border border-white/10 p-5">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <p className="text-white font-black text-base">Order #{order.id}</p>
                              <p className="text-gray-500 text-xs mt-0.5">
                                {new Date(order.created_at).toLocaleDateString()} · {order.payment_method?.toUpperCase()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full border text-xs font-black uppercase ${STATUS_COLORS[statusKey] || STATUS_COLORS.pending}`}>
                                {order.status}
                              </span>
                              {canCancel && (
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  disabled={cancelling === order.id}
                                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase hover:bg-red-500/20 transition disabled:opacity-50"
                                >
                                  <X size={11} />
                                  {cancelling === order.id ? "..." : "Cancel"}
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="mb-4 px-3 py-2 rounded-xl bg-white/5 text-xs font-semibold text-gray-400">
                            {statusKey === "pending"    && "⏳ Your order is being reviewed"}
                            {statusKey === "processing" && "📦 Your order is being prepared"}
                            {statusKey === "shipped"    && "🚚 Your order is on the way!"}
                            {statusKey === "delivered"  && "✅ Your order has been delivered!"}
                            {statusKey === "cancelled"  && "❌ Your order was cancelled"}
                          </div>
                          <div className="flex flex-col gap-3 mb-4">
                            {items.map((item, i) => (
                              <div key={i} className="flex items-center gap-4">
                                {resolveImg(item.image) && (
                                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#161616] shrink-0">
                                    <img
                                      src={resolveImg(item.image)}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => { e.target.style.display = "none"; }}
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-white font-bold text-sm">{item.name}</p>
                                  <p className="text-gray-500 text-xs">Size US {item.size} · Qty {item.quantity}</p>
                                </div>
                                <p className="text-[#8da27f] font-black text-sm">
                                  Rs.{Number(item.price).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center border-t border-white/10 pt-3">
                            <span className="text-gray-500 text-xs uppercase tracking-[2px]">Total</span>
                            <span className="text-white font-black text-lg">
                              Rs.{Number(order.total_price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  My Wishlist
                </h2>
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                    <Heart size={64} className="text-white/10" />
                    <p className="text-gray-400 text-lg font-bold">Your wishlist is empty</p>
                    <button
                      onClick={() => navigate("/mainhome")}
                      className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigate(`/product/${item._id || item.id}`)}
                        className="flex items-center gap-4 bg-black rounded-2xl border border-white/10 p-4 cursor-pointer hover:border-[#8da27f]/50 transition group"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#161616] shrink-0">
                          <img
                            src={resolveImg(item.image)}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#8da27f] text-xs uppercase tracking-[2px] font-bold">{item.category}</p>
                          <h3 className="text-white font-black truncate mt-1">{item.name}</h3>
                          <p className="text-white font-bold text-sm mt-1">Rs. {Number(item.price).toLocaleString()}</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-[#8da27f] transition shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "password" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  Change Password
                </h2>
                <div className="flex flex-col gap-5 max-w-lg">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold flex items-center gap-2">
                      <Mail size={12} /> Email
                    </label>
                    <input
                      value={passwords.email}
                      readOnly
                      className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-gray-400 text-sm outline-none cursor-not-allowed"
                    />
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={handleSendOTP}
                      className="h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
                    >
                      Send OTP to Email
                    </button>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">OTP</label>
                        <input
                          value={passwords.otp}
                          onChange={(e) => setPasswords({ ...passwords, otp: e.target.value })}
                          placeholder="Enter OTP from email"
                          className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold flex items-center gap-2">
                          <Lock size={12} /> New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPass ? "text" : "password"}
                            value={passwords.password}
                            onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                            placeholder="Enter new password"
                            className="w-full bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600 pr-12"
                          />
                          <button
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirm ? "text" : "password"}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            placeholder="Confirm new password"
                            className="w-full bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600 pr-12"
                          />
                          <button
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                          >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {passwords.confirm && (
                        <p className={`text-xs font-bold ${passwords.password === passwords.confirm ? "text-[#8da27f]" : "text-red-400"}`}>
                          {passwords.password === passwords.confirm ? "✔ Passwords match" : "✘ Passwords do not match"}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={handleChangePassword}
                          disabled={changingPass}
                          className="flex-1 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition disabled:opacity-50"
                        >
                          {changingPass ? "Updating..." : "Update Password"}
                        </button>
                        <button
                          onClick={() => {
                            setOtpSent(false);
                            setPasswords({ ...passwords, otp: "", password: "", confirm: "" });
                          }}
                          className="px-6 h-12 rounded-full border border-white/20 text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}