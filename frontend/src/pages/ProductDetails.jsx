import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Heart, ShoppingCart, ArrowLeft, Shield, RotateCcw, Truck, Tag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const BACKEND = "http://localhost:5000";

// Resolve image — Cloudinary URLs start with http, local uploads served from backend
const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return `${BACKEND}${src}`;
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [product,      setProduct]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg,    setActiveImg]    = useState(null);

  // ── FETCH PRODUCT ──
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/singleproduct/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
          setActiveImg(res.data.product.image);
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
    if (!selectedSize) { toast.error("Please select a size first!"); return; }
    addToCart(product, selectedSize);
    toast.success(`Added to cart — US ${selectedSize}`);
  };

  // ── BUY NOW ──
  const handleBuyNow = () => {
    if (!selectedSize) { toast.error("Please select a size first!"); return; }
    addToCart(product, selectedSize);
    navigate("/payment");
  };

  const isWishlisted = product ? wishlist.some((item) => item.id === product.id) : false;

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white text-xl font-bold mt-6 tracking-widest uppercase">Loading Product...</p>
          </div>
        </section>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
          <p className="text-red-500 text-2xl font-black uppercase tracking-widest">Product Not Found</p>
          <button onClick={() => navigate(-1)}
            className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-widest hover:bg-white hover:text-black transition">
            GO BACK
          </button>
        </section>
      </>
    );
  }

  // ── BUILD IMAGE GALLERY — use resolveImg so backend images work ──
  const allImages = [
    product.image, product.image2, product.image3, product.image4, product.image5
  ].filter(Boolean).map(resolveImg).filter(Boolean);

  // ── BUILD SIZES from "sizes" JSON column (set by admin) ──
  // Falls back to legacy "size" comma-string, then to defaults
  let availableSizes = [];
  if (product.sizes) {
    try {
      const parsed = Array.isArray(product.sizes) ? product.sizes : JSON.parse(product.sizes);
      availableSizes = parsed.map(Number).filter(Boolean);
    } catch { availableSizes = []; }
  }
  if (availableSizes.length === 0 && product.size) {
    // legacy comma-string: "6,7,8,9,10,11"
    availableSizes = product.size.split(",").map((s) => Number(s.trim())).filter(Boolean);
  }
  if (availableSizes.length === 0) {
    availableSizes = [7, 8, 9, 10, 11, 12];
  }

  // All standard sizes to show — greyed out if not available
  const allStandardSizes = [6, 7, 8, 9, 10, 11, 12, 13];

  // ── DISCOUNT PRICE ──
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : null;

  // ── OUT OF STOCK ──
  const isOutOfStock = product.is_out_of_stock || product.quantity <= 0;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">

        {/* ── BACK ── */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#8da27f] font-bold uppercase tracking-[3px] text-sm mb-12 hover:text-white transition">
          <ArrowLeft size={18} /> Back
        </button>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ══ LEFT — IMAGE GALLERY ══ */}
          <div className="flex flex-col gap-4">

            {/* Main Image */}
            <div className="relative bg-[#161616] rounded-[32px] border border-white/10 overflow-hidden h-[480px] flex items-center justify-center group">
              <div className="absolute w-[340px] h-[340px] bg-[#8da27f]/10 rounded-full blur-3xl" />

              {/* Auth Badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                <Shield size={14} className="text-[#8da27f]" />
                <span className="text-white text-[11px] font-bold tracking-[2px] uppercase">Authenticity Guaranteed</span>
              </div>

              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-5 right-16 flex items-center gap-1 bg-red-500 rounded-full px-3 py-1.5 z-10">
                  <Tag size={11} className="text-white" />
                  <span className="text-white text-[11px] font-bold">-{product.discount}%</span>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={() => {
                  addToWishlist(product);
                  toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
                }}
                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition z-10 ${
                  isWishlisted ? "bg-red-500 text-white" : "bg-white text-black hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-[32px]">
                  <span className="text-red-400 font-black text-2xl uppercase tracking-widest border border-red-400 px-6 py-3 rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Active Image */}
              {activeImg ? (
                <img
                  src={activeImg}
                  alt={product.name}
                  className="relative z-10 max-h-[360px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)] group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
              )}
            </div>

            {/* ── THUMBNAIL ROW — up to 5 real images ── */}
            {allImages.length > 1 && (
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(${Math.min(allImages.length, 5)}, 1fr)` }}
              >
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`bg-[#161616] rounded-2xl border overflow-hidden h-[90px] flex items-center justify-center transition duration-300 ${
                      activeImg === img ? "border-[#8da27f]" : "border-white/10 hover:border-[#8da27f]/60"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`view-${i}`}
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ══ RIGHT — INFO ══ */}
          <div className="flex flex-col gap-6">

            {/* Tags */}
            <div className="flex gap-3 flex-wrap">
              <span className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold">{product.category}</span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold">{product.gender}</span>
              {product.is_most_sold && (
                <>
                  <span className="text-white/30 text-xs">•</span>
                  <span className="text-yellow-400 uppercase tracking-[4px] text-xs font-bold">🔥 Most Sold</span>
                </>
              )}
              {product.is_new && (
                <>
                  <span className="text-white/30 text-xs">•</span>
                  <span className="text-blue-400 uppercase tracking-[4px] text-xs font-bold">✨ New Arrival</span>
                </>
              )}
            </div>

            {/* Name */}
            <h1 className="text-white text-5xl lg:text-6xl font-black leading-[90%] tracking-[-2px]">
              {product.name.toUpperCase()}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (<span key={s} className="text-[#8da27f] text-lg">★</span>))}
              <span className="text-white/30 text-lg">★</span>
              <span className="text-gray-400 text-sm ml-2">(128 Reviews)</span>
            </div>

            {/* Price — with discount support */}
            <div className="flex items-end gap-4">
              <p className="text-white text-5xl font-black">
                Rs. {Number(hasDiscount ? discountedPrice : product.price).toLocaleString()}
              </p>
              {hasDiscount && (
                <div className="flex flex-col mb-1">
                  <span className="text-gray-500 line-through text-xl font-bold">
                    Rs. {Number(product.price).toLocaleString()}
                  </span>
                  <span className="text-red-400 text-sm font-bold">Save Rs. {Number(product.price - discountedPrice).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* ── SIZE SELECTOR — shows all sizes, greys out unavailable ── */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-white font-bold uppercase tracking-[3px] text-sm">
                  Select Size
                  {selectedSize && <span className="text-[#8da27f] ml-2">— US {selectedSize}</span>}
                </p>
                <button className="text-[#8da27f] text-xs font-bold uppercase tracking-[2px] underline underline-offset-4 hover:text-white transition">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {allStandardSizes.map((size) => {
                  const isAvailable = availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        if (!isAvailable) {
                          toast.error(`US ${size} is not available`);
                          return;
                        }
                        setSelectedSize(size);
                      }}
                      disabled={isOutOfStock}
                      className={`h-14 rounded-2xl font-bold text-sm tracking-widest transition duration-300 flex flex-col items-center justify-center relative ${
                        isOutOfStock
                          ? "bg-[#0d0d0d] text-gray-700 border border-white/5 cursor-not-allowed"
                          : !isAvailable
                          ? "bg-[#0d0d0d] text-gray-700 border border-white/5 cursor-not-allowed line-through"
                          : selectedSize === size
                          ? "bg-[#8da27f] text-white border-2 border-[#8da27f]"
                          : "bg-[#161616] text-white border border-white/10 hover:border-[#8da27f]/60 hover:text-[#8da27f]"
                      }`}
                      title={!isAvailable && !isOutOfStock ? "Not available in this size" : `US ${size}`}
                    >
                      <span>US {size}</span>
                      {!isAvailable && !isOutOfStock && (
                        <span className="text-[9px] tracking-normal font-normal text-red-500/70 mt-0.5">N/A</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isOutOfStock && (
                <p className="text-red-400 text-sm font-bold mt-3 text-center">
                  ❌ This product is currently out of stock
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full h-[58px] rounded-full bg-[#8da27f] text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-3 shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full h-[58px] rounded-full border border-white/30 text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 backdrop-blur-md disabled:opacity-40 disabled:cursor-not-allowed">
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
                <div key={title} className="bg-[#161616] border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 text-center">
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
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold mb-4">About This Shoe</p>
            <h2 className="text-white text-4xl font-black leading-tight mb-6">THE ENGINEERED FIT</h2>
            <p className="text-gray-400 text-base leading-[32px]">{product.description}</p>
          </div>
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold mb-4">Details</p>
            <h2 className="text-white text-4xl font-black leading-tight mb-6">SPECIFICATIONS</h2>
            <div className="flex flex-col gap-0">
              {[
                ["Category",        product.category],
                ["Gender",          product.gender],
                ["Price",           hasDiscount
                  ? `Rs. ${discountedPrice.toLocaleString()} (${product.discount}% off)`
                  : `Rs. ${Number(product.price).toLocaleString()}`],
                ["Stock",           isOutOfStock ? "Out of Stock" : `${product.quantity} units available`],
                ["Available Sizes", availableSizes.map(s => `US ${s}`).join(", ")],
                ...(product.is_most_sold ? [["Badge", "🔥 Most Sold"]] : []),
                ...(product.is_new       ? [["Badge", "✨ New Arrival"]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-gray-500 text-sm uppercase tracking-[2px]">{label}</span>
                  <span className="text-white font-bold text-sm text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}