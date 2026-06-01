import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();
  const { cart, totalPrice, totalItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [esewaVerified, setEsewaVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    esewaId: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "esewaId") {
      setEsewaVerified(false);
      const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, esewaId: digitsOnly });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── VERIFY ESEWA ──
  const handleVerifyEsewa = async () => {
    if (!form.esewaId) {
      toast.error("Please enter your eSewa ID!");
      return;
    }
    if (form.esewaId.length !== 10) {
      toast.error("eSewa ID must be exactly 10 digits!");
      return;
    }

    setVerifying(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/validate-esewa",
        { esewaId: form.esewaId }
      );

      if (data.success) {
        setEsewaVerified(true);
        toast.success("eSewa ID verified! Now click Pay with eSewa to place your order.");
      } else {
        setEsewaVerified(false);
        toast.error(data.message || "Invalid eSewa ID!");
      }
    } catch (err) {
      setEsewaVerified(false);
      toast.error(err.response?.data?.message || "Invalid eSewa ID! Number not registered.");
    } finally {
      setVerifying(false);
    }
  };

  // ── PLACE ORDER ──
  const handlePlaceOrder = () => {
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      toast.error("Please fill all delivery details!");
      return;
    }

    if (paymentMethod === "esewa") {
      if (!form.esewaId) {
        toast.error("Please enter your eSewa ID!");
        return;
      }
      if (form.esewaId.length !== 10) {
        toast.error("eSewa ID must be exactly 10 digits!");
        return;
      }
      if (!esewaVerified) {
        toast.error("Please verify your eSewa ID first!");
        return;
      }
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setOrderPlaced(true);
    clearCart();
  };

  // ── ORDER SUCCESS PAGE ──
  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="text-center flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#8da27f]/20 flex items-center justify-center">
              <CheckCircle size={52} className="text-[#8da27f]" />
            </div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">
              Brand Shoe
            </p>
            <h1 className="text-white text-5xl lg:text-6xl font-black leading-none">
              ORDER
              <br />
              PLACED!
            </h1>
            <p className="text-gray-400 text-base max-w-md leading-relaxed">
              Thank you for your purchase! Your order has been confirmed and will be delivered within 2–4 business days.
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate("/mainhome")}
                className="px-8 h-[52px] rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 h-[52px] rounded-full border border-white/20 text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
              >
                Go Home
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── EMPTY CART ──
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
          <p className="text-gray-400 text-2xl font-bold">Your cart is empty!</p>
          <button
            onClick={() => navigate("/mainhome")}
            className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
          >
            Shop Now
          </button>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">

        {/* BACK */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-[#8da27f] font-bold uppercase tracking-[3px] text-sm mb-12 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        {/* HEADER */}
        <div className="mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe</p>
          <h1 className="text-white text-6xl font-black mt-4 leading-none">CHECKOUT</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* DELIVERY */}
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <MapPin size={20} className="text-[#8da27f]" />
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">Delivery Details</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold flex items-center gap-2">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold flex items-center gap-2">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Street Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Thamel"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Kathmandu"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">State / Province</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Bagmati"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">ZIP / Postal Code</label>
                  <input
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="44600"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard size={20} className="text-[#8da27f]" />
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`h-16 rounded-2xl border font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 transition ${
                    paymentMethod === "cod"
                      ? "border-[#8da27f] bg-[#8da27f]/10 text-[#8da27f]"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <Banknote size={20} />
                  Cash on Delivery
                </button>

                <button
                  onClick={() => setPaymentMethod("esewa")}
                  className={`h-16 rounded-2xl border font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 transition ${
                    paymentMethod === "esewa"
                      ? "border-[#60bb46] bg-[#60bb46]/10 text-[#60bb46]"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" rx="16" fill="#60BB46"/>
                    <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="bold" fill="white" fontFamily="Arial">e</text>
                  </svg>
                  eSewa
                </button>
              </div>

              {/* COD */}
              {paymentMethod === "cod" && (
                <div className="bg-black rounded-2xl border border-white/10 p-6 flex items-start gap-4">
                  <Banknote size={24} className="text-[#8da27f] mt-1 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-[1px]">Pay when your order arrives</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      Our delivery partner will collect the payment at your doorstep. Make sure to have the exact amount ready.
                    </p>
                  </div>
                </div>
              )}

              {/* ESEWA */}
              {paymentMethod === "esewa" && (
                <div className="bg-black rounded-2xl border border-[#60bb46]/30 p-6 flex flex-col gap-5">

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#60bb46] flex items-center justify-center shrink-0">
                      <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
                        <text x="50" y="68" textAnchor="middle" fontSize="58" fontWeight="bold" fill="white" fontFamily="Arial">e</text>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-black text-base uppercase tracking-[1px]">Pay with eSewa</p>
                      <p className="text-gray-500 text-xs mt-1">Nepal's most trusted digital wallet</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                      eSewa ID / Mobile Number (10 digits)
                    </label>
                    <div className="flex gap-3">
                      <input
                        name="esewaId"
                        value={form.esewaId}
                        onChange={handleChange}
                        placeholder="98XXXXXXXX"
                        maxLength={10}
                        inputMode="numeric"
                        className={`flex-1 bg-[#161616] border rounded-2xl px-5 h-12 text-white text-sm outline-none transition placeholder:text-gray-600 ${
                          esewaVerified ? "border-[#60bb46]" : "border-[#60bb46]/40 focus:border-[#60bb46]"
                        }`}
                      />
                      <button
                        onClick={handleVerifyEsewa}
                        disabled={verifying || esewaVerified}
                        className={`px-5 h-12 rounded-2xl font-bold text-sm uppercase tracking-[1px] transition shrink-0 disabled:opacity-60 disabled:cursor-not-allowed ${
                          esewaVerified
                            ? "bg-[#60bb46]/20 text-[#60bb46] border border-[#60bb46]"
                            : "bg-[#60bb46] text-white hover:bg-[#4fa535]"
                        }`}
                      >
                        {verifying ? "Checking…" : esewaVerified ? "✓ Verified" : "Verify"}
                      </button>
                    </div>
                    <p className={`text-xs mt-1 ${form.esewaId.length === 10 ? "text-[#60bb46]" : "text-gray-500"}`}>
                      {form.esewaId.length}/10 digits
                    </p>
                  </div>

                  {/* Status message */}
                  {esewaVerified ? (
                    <div className="flex items-center gap-3 bg-[#60bb46]/10 border border-[#60bb46]/30 rounded-2xl p-4">
                      <CheckCircle size={18} className="text-[#60bb46] shrink-0" />
                      <p className="text-[#60bb46] text-sm font-bold">
                        eSewa verified! Click "Pay with eSewa" below to complete your order.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-[#60bb46]/10 border border-[#60bb46]/20 rounded-2xl p-4">
                      <svg width="18" height="18" viewBox="0 0 100 100" fill="none" className="shrink-0 mt-0.5">
                        <rect width="100" height="100" rx="50" fill="#60BB46"/>
                        <text x="50" y="68" textAnchor="middle" fontSize="58" fontWeight="bold" fill="white" fontFamily="Arial">i</text>
                      </svg>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Enter your 10-digit eSewa mobile number and click <strong className="text-white">Verify</strong> first, then place your order.
                      </p>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 sticky top-[120px]">
              <h2 className="text-white text-2xl font-black mb-8 uppercase tracking-tight">Order Summary</h2>

              <div className="flex flex-col gap-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black border border-white/10 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/56x56?text=Img"; }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold leading-tight">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-1">Size US {item.size} × {item.quantity}</p>
                    </div>
                    <p className="text-white font-black text-sm">
                      Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-white/10 mb-6" />

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-[2px]">Items</span>
                  <span className="text-white font-bold">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-[2px]">Subtotal</span>
                  <span className="text-white font-bold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-[2px]">Shipping</span>
                  <span className="text-[#8da27f] font-bold">Free</span>
                </div>
                <div className="w-full h-px bg-white/10 my-1" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-black text-lg uppercase tracking-[2px]">Total</span>
                  <span className="text-white font-black text-2xl">Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className={`w-full h-[58px] rounded-full font-bold tracking-[3px] uppercase transition duration-300 shadow-2xl ${
                  paymentMethod === "esewa"
                    ? "bg-[#60bb46] text-white hover:bg-white hover:text-black"
                    : "bg-[#8da27f] text-white hover:bg-white hover:text-black"
                }`}
              >
                {paymentMethod === "esewa" ? "Pay with eSewa" : "Place Order"}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full h-[52px] rounded-full border border-white/20 text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition duration-300 mt-3"
              >
                Back to Cart
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}