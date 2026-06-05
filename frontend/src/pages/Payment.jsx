import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  Banknote,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

// ── Stripe input style — matches dark theme ──
const STRIPE_STYLE = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "14px",
      fontFamily: "sans-serif",
      fontWeight: "400",
      "::placeholder": { color: "#4b5563" },
      iconColor: "#8da27f",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  },
};

// ── Step indicator ──
function Steps({ current }) {
  const steps = ["Shipping", "Payment", "Review"];
  return (
    <div className="flex items-center mb-12">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = num === current;
        const done = num < current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  active
                    ? "bg-[#8da27f] border-[#8da27f] text-white"
                    : done
                    ? "bg-[#8da27f] border-[#8da27f] text-white"
                    : "bg-transparent border-white/20 text-gray-500"
                }`}
              >
                {done ? <CheckCircle size={16} /> : num}
              </div>
              <span
                className={`text-xs mt-1.5 font-semibold tracking-widest uppercase ${
                  active ? "text-[#8da27f]" : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-[2px] w-20 lg:w-32 mx-3 mb-5 ${
                  done ? "bg-[#8da27f]" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Pay button — must be inside <Elements> ──
function PayButton({ form, cart, totalFinal, paymentMethod, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.address || !form.city) {
      toast.error("Please fill all shipping details!");
      return false;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return false;
    }
    return true;
  };

  const handlePay = async () => {
    if (!validate()) return;

    if (paymentMethod === "cod") {
      onSuccess();
      return;
    }

    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-payment-intent",
        { amount: totalFinal }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={processing}
      className={`w-full h-[58px] rounded-full font-black text-sm tracking-[4px] uppercase transition duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${
        paymentMethod === "card"
          ? "bg-[#635bff] text-white hover:bg-white hover:text-black"
          : "bg-[#8da27f] text-white hover:bg-white hover:text-black"
      }`}
    >
      {processing
        ? "PROCESSING..."
        : paymentMethod === "card"
        ? "PAY WITH CARD"
        : "PLACE ORDER"}
    </button>
  );
}

// ── Inner component that uses Stripe hooks (must be inside <Elements>) ──
function CheckoutForm({ form, handleChange, cart, totalPrice, paymentMethod, setPaymentMethod, onSuccess, navigate }) {
  const shipping = 200;
  const tax = Math.round(totalPrice * 0.08);
  const grandTotal = totalPrice + shipping + tax;

  return (
    <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">

      {/* Back */}
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 text-[#8da27f] font-bold uppercase tracking-[3px] text-sm mb-10 hover:text-white transition"
      >
        <ArrowLeft size={18} /> Back to Cart
      </button>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe</p>
        <h1 className="text-white text-5xl lg:text-6xl font-black mt-3 leading-none">CHECKOUT</h1>
      </div>

      {/* Steps */}
      <Steps current={1} />

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-8">

          {/* Shipping */}
          <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
            <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">
              Shipping Address
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="bg-black border border-white/10 rounded-2xl px-4 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-700"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="bg-black border border-white/10 rounded-2xl px-4 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main Street, Thamel"
                className="bg-black border border-white/10 rounded-2xl px-4 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-700"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Kathmandu"
                  className="bg-black border border-white/10 rounded-2xl px-4 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-700"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Bagmati"
                  className="bg-black border border-white/10 rounded-2xl px-4 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-700"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">ZIP</label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="44600"
                  className="bg-black border border-white/10 rounded-2xl px-4 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard size={20} className="text-[#8da27f]" />
              <h2 className="text-white text-xl font-black uppercase tracking-tight">
                Payment Method
              </h2>
            </div>

            {/* Method toggles */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`h-14 rounded-2xl border font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2.5 transition ${
                  paymentMethod === "card"
                    ? "border-[#635bff] bg-[#635bff]/10 text-[#635bff]"
                    : "border-white/10 text-gray-500 hover:border-white/30"
                }`}
              >
                <CreditCard size={17} />
                Credit / Debit Card
              </button>
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`h-14 rounded-2xl border font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2.5 transition ${
                  paymentMethod === "cod"
                    ? "border-[#8da27f] bg-[#8da27f]/10 text-[#8da27f]"
                    : "border-white/10 text-gray-500 hover:border-white/30"
                }`}
              >
                <Banknote size={17} />
                Cash on Delivery
              </button>
            </div>

            {/* ── STRIPE CARD FIELDS — NO separate <Elements> wrapper needed ── */}
            {paymentMethod === "card" && (
              <div className="bg-black border border-[#635bff]/30 rounded-2xl p-6 flex flex-col gap-5">

                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#635bff] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                      <text x="50" y="68" textAnchor="middle" fontSize="62"
                        fontWeight="bold" fill="white" fontFamily="Arial">S</text>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-sm uppercase tracking-wide">
                      Secure Card Payment
                    </p>
                    <p className="text-gray-500 text-xs">Powered by Stripe · 256-bit SSL</p>
                  </div>
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">
                    Card Number
                  </label>
                  <div className="bg-[#161616] border border-white/10 rounded-2xl px-5 h-12 flex items-center focus-within:border-[#635bff] transition">
                    <CardNumberElement
                      className="w-full"
                      options={STRIPE_STYLE}
                    />
                  </div>
                </div>

                {/* Expiry + CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">
                      MM / YY
                    </label>
                    <div className="bg-[#161616] border border-white/10 rounded-2xl px-5 h-12 flex items-center focus-within:border-[#635bff] transition">
                      <CardExpiryElement
                        className="w-full"
                        options={STRIPE_STYLE}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-[2px]">
                      CVV
                    </label>
                    <div className="bg-[#161616] border border-white/10 rounded-2xl px-5 h-12 flex items-center focus-within:border-[#635bff] transition">
                      <CardCvcElement
                        className="w-full"
                        options={STRIPE_STYLE}
                      />
                    </div>
                  </div>
                </div>

                {/* Test card hint */}
                <div className="bg-[#635bff]/10 border border-[#635bff]/20 rounded-xl p-3.5">
                  <p className="text-[#635bff] text-[11px] font-black uppercase tracking-[1px] mb-1">
                    Test Mode
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Card:{" "}
                    <span className="text-white font-mono tracking-wider">
                      4242 4242 4242 4242
                    </span>{" "}
                    · Any future date · Any 3-digit CVV
                  </p>
                </div>
              </div>
            )}

            {/* COD panel */}
            {paymentMethod === "cod" && (
              <div className="bg-black border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <Banknote size={22} className="text-[#8da27f] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-wide">
                    Pay when your order arrives
                  </p>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Our delivery partner will collect payment at your doorstep.
                    Have the exact amount ready.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT — ORDER SUMMARY ── */}
        <div className="bg-[#161616] rounded-[32px] border border-white/10 p-7 sticky top-[120px]">
          <h2 className="text-white text-xl font-black uppercase tracking-tight mb-6">
            Order Summary
          </h2>

          {/* Cart items */}
          <div className="flex flex-col gap-4 mb-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                <div className="w-[68px] h-[68px] rounded-2xl bg-black border border-white/10 overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/68x68?text=Shoe";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-black uppercase leading-tight tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Size US {item.size} · Qty {item.quantity}
                  </p>
                  <span className="mt-1.5 inline-block text-[10px] font-black tracking-[1.5px] border border-[#8da27f] text-[#8da27f] px-2 py-0.5 uppercase">
                    Verified
                  </span>
                </div>
                <p className="text-white font-black text-sm shrink-0">
                  Rs.{(Number(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-white/10 mb-5" />

          {/* Pricing */}
          <div className="flex flex-col gap-3 text-sm mb-5">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-white font-semibold">Rs.{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping (Expedited)</span>
              <span className="text-white font-semibold">Rs.{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Authentication Fee</span>
              <span className="text-[#8da27f] font-bold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Tax</span>
              <span className="text-white font-semibold">Rs.{tax.toLocaleString()}</span>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-5" />

          {/* Total */}
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-white font-black text-lg uppercase tracking-wide">Total</span>
            <span className="text-white font-black text-2xl tracking-tight">
              Rs.{grandTotal.toLocaleString()}
            </span>
          </div>
          <p className="text-right text-[10px] text-gray-600 uppercase tracking-[2px] mb-6">
            Secure Transaction
          </p>

          {/* Pay button — NO separate <Elements> wrapper, already inside one */}
          <PayButton
            form={form}
            cart={cart}
            totalFinal={grandTotal}
            paymentMethod={paymentMethod}
            onSuccess={onSuccess}
          />

          <button
            onClick={() => navigate("/cart")}
            className="w-full h-[48px] rounded-full border border-white/20 text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition duration-300 mt-3 text-sm"
          >
            Back to Cart
          </button>

          {/* Guarantee */}
          <div className="bg-black rounded-2xl border border-white/10 p-4 flex items-start gap-3 mt-5">
            <ShieldCheck size={18} className="text-[#8da27f] shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-black text-sm tracking-tight">
                Brand_Shoe Guarantee
              </p>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                100% Authentic. Expertly verified. Every stitch inspected.
              </p>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-600 mt-4 leading-relaxed">
            By clicking, you agree to our Terms of Scarcity and Authentic Verification.
          </p>
        </div>

      </div>
    </section>
  );
}

// ── Main Payment Page ──
export default function Payment() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSuccess = () => {
    clearCart();
    setOrderPlaced(true);
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
              ORDER<br />PLACED!
            </h1>
            <p className="text-gray-400 text-base max-w-md leading-relaxed">
              Thank you for your purchase! Your order has been confirmed and
              will be delivered within 2–4 business days.
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

  // ── Wrap entire checkout in ONE <Elements> provider ──
  return (
    <>
      <Navbar />
      <Elements stripe={stripePromise}>
        <CheckoutForm
          form={form}
          handleChange={handleChange}
          cart={cart}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onSuccess={handleSuccess}
          navigate={navigate}
        />
      </Elements>
    </>
  );
}