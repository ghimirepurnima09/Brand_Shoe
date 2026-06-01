import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import {
  User,
  Mail,
  Phone,
  Lock,
  LogOut,
  ShoppingBag,
  Heart,
  Eye,
  EyeOff,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { cart, totalPrice } = useCart();

  // ── GET USER FROM LOCALSTORAGE ──
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user] = useState(storedUser);

  // ── ACTIVE TAB ──
  const [activeTab, setActiveTab] = useState("profile");

  // ── CHANGE PASSWORD STATE ──
  const [passwords, setPasswords] = useState({ email: user.email || "", otp: "", password: "", confirm: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  // ── LOGOUT ──
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  // ── SEND OTP ──
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

  // ── CHANGE PASSWORD ──
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
    { id: "profile", label: "My Profile", icon: <User size={18} /> },
    { id: "orders", label: "Order History", icon: <ShoppingBag size={18} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={18} /> },
    { id: "password", label: "Change Password", icon: <Lock size={18} /> },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">

        {/* ── HEADER ── */}
        <div className="mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe</p>
          <h1 className="text-white text-6xl font-black mt-4 leading-none">
            MY<br />PROFILE
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* ══ SIDEBAR ══ */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            {/* Avatar Card */}
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-[#8da27f]/20 border-2 border-[#8da27f] flex items-center justify-center">
                <span className="text-[#8da27f] text-4xl font-black">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div className="text-center">
                <h2 className="text-white text-xl font-black">{user.name || "User"}</h2>
                <p className="text-gray-500 text-sm mt-1">{user.email || ""}</p>
              </div>

              {/* Stats */}
              <div className="w-full grid grid-cols-2 gap-3 mt-2">
                <div className="bg-black rounded-2xl p-3 text-center border border-white/10">
                  <p className="text-[#8da27f] text-2xl font-black">{cart.length}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-[1px] mt-1">In Cart</p>
                </div>
                <div className="bg-black rounded-2xl p-3 text-center border border-white/10">
                  <p className="text-[#8da27f] text-2xl font-black">{wishlist.length}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-[1px] mt-1">Wishlist</p>
                </div>
              </div>
            </div>

            {/* Nav Tabs */}
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
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    {tab.label}
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm uppercase tracking-[1px] text-red-400 hover:bg-red-500/10 transition mt-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* ══ MAIN CONTENT ══ */}
          <div className="lg:col-span-3">

            {/* ── PROFILE TAB ── */}
            {activeTab === "profile" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  Personal Information
                </h2>

                <div className="flex flex-col gap-5">
                  {[
                    { icon: <User size={18} />, label: "Full Name", value: user.name || "—" },
                    { icon: <Mail size={18} />, label: "Email Address", value: user.email || "—" },
                    { icon: <Phone size={18} />, label: "Phone Number", value: user.phone || "—" },
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
                    Your account is verified and secure. To update your information, please contact support.
                  </p>
                </div>
              </div>
            )}

            {/* ── ORDERS TAB ── */}
            {activeTab === "orders" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  Order History
                </h2>

                {cart.length === 0 ? (
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
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex items-center gap-5 bg-black rounded-2xl border border-white/10 p-4"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#161616] shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/64x64?text=Img"; }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#8da27f] text-xs uppercase tracking-[2px] font-bold">{item.category}</p>
                          <h3 className="text-white font-black text-lg mt-1">{item.name}</h3>
                          <p className="text-gray-500 text-sm">Size US {item.size} • Qty {item.quantity}</p>
                        </div>
                        <p className="text-white font-black text-xl shrink-0">
                          Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="flex justify-between items-center bg-black rounded-2xl border border-[#8da27f]/20 px-6 py-4 mt-2">
                      <span className="text-white font-black uppercase tracking-[2px]">Total</span>
                      <span className="text-[#8da27f] font-black text-2xl">
                        Rs. {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── WISHLIST TAB ── */}
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
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/64x64?text=Img"; }}
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

            {/* ── CHANGE PASSWORD TAB ── */}
            {activeTab === "password" && (
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
                <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-8">
                  Change Password
                </h2>

                <div className="flex flex-col gap-5 max-w-lg">

                  {/* Email (prefilled) */}
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

                  {/* Send OTP */}
                  {!otpSent ? (
                    <button
                      onClick={handleSendOTP}
                      className="h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
                    >
                      Send OTP to Email
                    </button>
                  ) : (
                    <>
                      {/* OTP */}
                      <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">OTP</label>
                        <input
                          value={passwords.otp}
                          onChange={(e) => setPasswords({ ...passwords, otp: e.target.value })}
                          placeholder="Enter OTP from email"
                          className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                        />
                      </div>

                      {/* New Password */}
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

                      {/* Confirm Password */}
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

                      {/* Passwords match indicator */}
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
                          onClick={() => { setOtpSent(false); setPasswords({ ...passwords, otp: "", password: "", confirm: "" }); }}
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