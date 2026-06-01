import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Heart, ShoppingCart, ArrowLeft, Shield, RotateCcw, Truck } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const sizes = [7, 8, 9, 10, 11, 12, 13, 14];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  // ── FETCH PRODUCT ──
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/singleproduct/${id}`
        );
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.log("Error fetching product:", error);
        toast.error("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ── ADD TO CART ──
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    addToCart(product, selectedSize);
    toast.success(`Added to cart — Size ${selectedSize}`);
    navigate("/cart");
  };

  // ── WISHLIST ──
  const isWishlisted = product
    ? wishlist.some((item) => item.id === product.id)
    : false;

  // ── LOADING ──
  if (loading) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white text-xl font-bold mt-6 tracking-widest uppercase">
              Loading Product...
            </p>
          </div>
        </section>
      </>
    );
  }

  // ── NOT FOUND ──
  if (!product) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
          <p className="text-red-500 text-2xl font-black uppercase tracking-widest">
            Product Not Found
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-widest hover:bg-white hover:text-black transition"
          >
            GO BACK
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
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#8da27f] font-bold uppercase tracking-[3px] text-sm mb-12 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ══ LEFT — IMAGE ══ */}
          <div className="flex flex-col gap-4">

            {/* Main Image */}
            <div className="relative bg-[#161616] rounded-[32px] border border-white/10 overflow-hidden h-[480px] flex items-center justify-center group">

              {/* Glow */}
              <div className="absolute w-[340px] h-[340px] bg-[#8da27f]/10 rounded-full blur-3xl" />

              {/* Auth Badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                <Shield size={14} className="text-[#8da27f]" />
                <span className="text-white text-[11px] font-bold tracking-[2px] uppercase">
                  Authenticity Guaranteed
                </span>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => {
                  addToWishlist(product);
                  toast.success(
                    isWishlisted ? "Removed from Wishlist" : "Added to Wishlist"
                  );
                }}
                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition z-10 ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white text-black hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 max-h-[360px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)] group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x500?text=No+Image";
                }}
              />
            </div>

            {/* Thumbnail Row — same image x4 as views */}
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`bg-[#161616] rounded-2xl border overflow-hidden h-[90px] flex items-center justify-center cursor-pointer transition duration-300 ${
                    i === 0
                      ? "border-[#8da27f]"
                      : "border-white/10 hover:border-[#8da27f]/60"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`view-${i}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100x90?text=Img";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — INFO ══ */}
          <div className="flex flex-col gap-6">

            {/* Category & Gender Tags */}
            <div className="flex gap-3">
              <span className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold">
                {product.category}
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold">
                {product.gender}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-white text-5xl lg:text-6xl font-black leading-[90%] tracking-[-2px]">
              {product.name.toUpperCase()}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <span key={s} className="text-[#8da27f] text-lg">★</span>
              ))}
              <span className="text-white/30 text-lg">★</span>
              <span className="text-gray-400 text-sm ml-2">(128 Reviews)</span>
            </div>

            {/* Price */}
            <p className="text-white text-5xl font-black">
              Rs. {Number(product.price).toLocaleString()}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-white font-bold uppercase tracking-[3px] text-sm">
                  Select Size
                  {selectedSize && (
                    <span className="text-[#8da27f] ml-2">— US {selectedSize}</span>
                  )}
                </p>
                <button className="text-[#8da27f] text-xs font-bold uppercase tracking-[2px] underline underline-offset-4 hover:text-white transition">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-2xl font-bold text-sm tracking-widest transition duration-300 ${
                      selectedSize === size
                        ? "bg-[#8da27f] text-white border-2 border-[#8da27f]"
                        : "bg-[#161616] text-white border border-white/10 hover:border-[#8da27f]/60 hover:text-[#8da27f]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className="w-full h-[58px] rounded-full bg-[#8da27f] text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-3 shadow-2xl"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="w-full h-[58px] rounded-full border border-white/30 text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 backdrop-blur-md">
                Buy Now
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: <Truck size={18} />, title: "Free Shipping", sub: "2–4 days" },
                { icon: <RotateCcw size={18} />, title: "30-Day Returns", sub: "Hassle-free" },
                { icon: <Shield size={18} />, title: "Authentic", sub: "Guaranteed" },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  className="bg-[#161616] border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-[#8da27f]">{icon}</span>
                  <p className="text-white text-xs font-bold uppercase tracking-[1px]">{title}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESCRIPTION & SPECS ── */}
        <div className="mt-24 grid lg:grid-cols-2 gap-16 border-t border-white/10 pt-16">

          {/* Description */}
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold mb-4">
              About This Shoe
            </p>
            <h2 className="text-white text-4xl font-black leading-tight mb-6">
              THE ENGINEERED FIT
            </h2>
            <p className="text-gray-400 text-base leading-[32px]">
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold mb-4">
              Details
            </p>
            <h2 className="text-white text-4xl font-black leading-tight mb-6">
              SPECIFICATIONS
            </h2>
            <div className="flex flex-col gap-0">
              {[
                ["Category", product.category],
                ["Gender", product.gender],
                ["Price", `Rs. ${Number(product.price).toLocaleString()}`],
                ["Stock", `${product.quantity} units available`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-4 border-b border-white/10"
                >
                  <span className="text-gray-500 text-sm uppercase tracking-[2px]">
                    {label}
                  </span>
                  <span className="text-white font-bold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
