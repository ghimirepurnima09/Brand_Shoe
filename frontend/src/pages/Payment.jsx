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

export default function Payment() {
  const navigate = useNavigate();
  const { cart, totalPrice, totalItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Basic validation
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      toast.error("Please fill all delivery details!");
      return;
    }
    if (paymentMethod === "card" && (!form.cardNumber || !form.expiry || !form.cvv)) {
      toast.error("Please fill all card details!");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Place order
    setOrderPlaced(true);
    clearCart();
  };

  // ── ORDER SUCCESS ──
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

  // ── EMPTY CART GUARD ──
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

        {/* ── BACK BUTTON ── */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-[#8da27f] font-bold uppercase tracking-[3px] text-sm mb-12 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        {/* ── HEADER ── */}
        <div className="mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">
            Brand Shoe
          </p>
          <h1 className="text-white text-6xl font-black mt-4 leading-none">
            CHECKOUT
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* ══ LEFT — FORMS ══ */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* ── DELIVERY DETAILS ── */}
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <MapPin size={20} className="text-[#8da27f]" />
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">
                  Delivery Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">

                {/* Full Name */}
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

                {/* Phone */}
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

                {/* Address */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                    Street Address
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Thamel"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                    City
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Kathmandu"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                {/* State */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                    State / Province
                  </label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Bagmati"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                  />
                </div>

                {/* ZIP */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                    ZIP / Postal Code
                  </label>
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

            {/* ── PAYMENT METHOD ── */}
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard size={20} className="text-[#8da27f]" />
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">
                  Payment Method
                </h2>
              </div>

              {/* Method Toggle */}
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
                  onClick={() => setPaymentMethod("card")}
                  className={`h-16 rounded-2xl border font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 transition ${
                    paymentMethod === "card"
                      ? "border-[#8da27f] bg-[#8da27f]/10 text-[#8da27f]"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <CreditCard size={20} />
                  Credit / Debit Card
                </button>
              </div>

              {/* COD Info */}
              {paymentMethod === "cod" && (
                <div className="bg-black rounded-2xl border border-white/10 p-6 flex items-start gap-4">
                  <Banknote size={24} className="text-[#8da27f] mt-1 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-[1px]">
                      Pay when your order arrives
                    </p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      Our delivery partner will collect the payment at your doorstep. Make sure to have the exact amount ready.
                    </p>
                  </div>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                      Card Number
                    </label>
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                        Expiry Date
                      </label>
                      <input
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        maxLength={7}
                        className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                        CVV
                      </label>
                      <input
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="• • •"
                        maxLength={3}
                        type="password"
                        className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ══ RIGHT — ORDER SUMMARY ══ */}
          <div className="lg:col-span-1">
            <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 sticky top-[120px]">
              <h2 className="text-white text-2xl font-black mb-8 uppercase tracking-tight">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black border border-white/10 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/56x56?text=Img";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold leading-tight">
                        {item.name}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Size US {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-white font-black text-sm">
                      Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-white/10 mb-6" />

              {/* Totals */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                    Items
                  </span>
                  <span className="text-white font-bold">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                    Subtotal
                  </span>
                  <span className="text-white font-bold">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                    Shipping
                  </span>
                  <span className="text-[#8da27f] font-bold">Free</span>
                </div>

                <div className="w-full h-px bg-white/10 my-1" />

                <div className="flex justify-between items-center">
                  <span className="text-white font-black text-lg uppercase tracking-[2px]">
                    Total
                  </span>
                  <span className="text-white font-black text-2xl">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full h-[58px] rounded-full bg-[#8da27f] text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 shadow-2xl"
              >
                Place Order
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
