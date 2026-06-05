import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Heart, ShoppingCart, Tag, Sparkles, Flame, ArrowLeft, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const ALL_SIZES = [6, 7, 8, 9, 10, 11, 12, 13, 14];

// Randomly assign a discount % to each product for display
const DISCOUNTS = [10, 15, 20, 25, 30];
const getDiscount = (id) => DISCOUNTS[String(id).charCodeAt(0) % DISCOUNTS.length];

export default function OffersPage() {
  const location = useLocation();
  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart, cart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [openBrand, setOpenBrand] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/getproducts");
        if (res.data.success) {
          const data = res.data.products;
          setProducts(data);
          const max = Math.max(...data.map((p) => Number(p.price)), 100000);
          setMaxPrice(max);
          setPriceRange([0, max]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const brands = useMemo(() => [...new Set(products.map((p) => p.name.split(" ")[0]))].sort(), [products]);
  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))], [products]);

  const filtered = useMemo(() => products.filter((p) => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.some((b) => p.name.toLowerCase().startsWith(b.toLowerCase()));
    const priceMatch = Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1];
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    return brandMatch && priceMatch && categoryMatch;
  }), [products, selectedBrands, priceRange, selectedCategory]);

  const clearFilters = () => { setSelectedBrands([]); setSelectedSizes([]); setSelectedCategory("All"); setPriceRange([0, maxPrice]); };
  const hasActiveFilters = selectedBrands.length > 0 || selectedCategory !== "All" || priceRange[0] > 0 || priceRange[1] < maxPrice;
  const getCartCount = (productId) => cart.filter((item) => item.id === productId).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="bg-black min-h-screen pb-20">
      <Navbar />

      {/* HERO */}
      <div className="relative h-[520px] overflow-hidden rounded-b-[50px]">
        <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1800&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <Link to="/mainhome" className="absolute top-8 left-6 lg:left-16 z-20 w-[52px] h-[52px] rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300 shadow-lg">
          <ArrowLeft size={22} />
        </Link>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 pt-[82px]">
          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold">LIMITED PREMIUM OFFERS</p>
          <h1 className="text-white text-[65px] lg:text-[95px] leading-[88%] font-black tracking-[-6px] mt-5">EXCLUSIVE<br />DISCOUNTS</h1>
          <p className="text-gray-200 text-[16px] leading-[32px] mt-7 max-w-[720px]">Limited time deals on your favourite sneakers. Grab them before they're gone!</p>
        </div>
      </div>

      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-4 px-6 lg:px-16 mt-12">
        {[
          { to: "/collections", icon: <Sparkles size={18} />, label: "NEW COLLECTIONS" },
          { to: "/mostsold", icon: <Flame size={18} />, label: "MOST SOLD" },
          { to: "/offers", icon: <Tag size={18} />, label: "OFFERS" },
        ].map(({ to, icon, label }) => (
          <Link key={to} to={to} className={`h-[54px] px-8 rounded-full font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-lg transition ${location.pathname === to ? "bg-[#8da27f] text-white" : "bg-[#161616] text-gray-400 border border-white/10 hover:border-[#8da27f] hover:text-white"}`}>
            {icon}{label}
          </Link>
        ))}
      </div>

      {/* CATEGORY TABS + FILTER TOGGLE */}
      <div className="px-6 lg:px-16 mt-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-5 h-10 rounded-full text-xs font-bold uppercase tracking-[2px] transition ${selectedCategory === cat ? "bg-[#8da27f] text-white" : "border border-white/20 text-gray-400 hover:border-[#8da27f] hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-2 px-4 h-10 rounded-full border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-[2px] hover:bg-red-500/10 transition">
              <X size={14} /> Clear
            </button>
          )}
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-5 h-10 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-[2px] hover:border-[#8da27f] hover:text-[#8da27f] transition">
            <SlidersHorizontal size={15} /> {showFilters ? "Hide Filters" : "Filters"}
          </button>
        </div>
      </div>

      <div className="flex gap-10 px-6 lg:px-16 mt-8">
        {/* SIDEBAR */}
        {showFilters && (
          <div className="w-[240px] min-w-[240px] flex flex-col gap-4">
            <div className="bg-[#161616] rounded-[24px] border border-white/10 overflow-hidden">
              <button onClick={() => setOpenBrand(!openBrand)} className="w-full flex items-center justify-between px-6 py-5 text-white font-black uppercase tracking-[2px] text-sm">
                Brand {openBrand ? <ChevronUp size={16} className="text-[#8da27f]" /> : <ChevronDown size={16} className="text-gray-500" />}
              </button>
              {openBrand && (
                <div className="px-6 pb-5 flex flex-col gap-3">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${selectedBrands.includes(brand) ? "bg-[#8da27f] border-[#8da27f]" : "border-white/20 group-hover:border-[#8da27f]"}`}>
                        {selectedBrands.includes(brand) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span className={`text-sm font-semibold transition ${selectedBrands.includes(brand) ? "text-[#8da27f]" : "text-gray-400 group-hover:text-white"}`}>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-[#161616] rounded-[24px] border border-white/10 overflow-hidden">
              <button onClick={() => setOpenPrice(!openPrice)} className="w-full flex items-center justify-between px-6 py-5 text-white font-black uppercase tracking-[2px] text-sm">
                Price Range {openPrice ? <ChevronUp size={16} className="text-[#8da27f]" /> : <ChevronDown size={16} className="text-gray-500" />}
              </button>
              {openPrice && (
                <div className="px-6 pb-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-[#8da27f] text-sm font-bold">Rs. {priceRange[0].toLocaleString()}</span>
                    <span className="text-[#8da27f] text-sm font-bold">Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                  <input type="range" min={0} max={maxPrice} step={500} value={priceRange[0]} onChange={(e) => { const v = Number(e.target.value); if (v < priceRange[1]) setPriceRange([v, priceRange[1]]); }} className="w-full accent-[#8da27f] cursor-pointer mb-3" />
                  <input type="range" min={0} max={maxPrice} step={500} value={priceRange[1]} onChange={(e) => { const v = Number(e.target.value); if (v > priceRange[0]) setPriceRange([priceRange[0], v]); }} className="w-full accent-[#8da27f] cursor-pointer" />
                </div>
              )}
            </div>
            <div className="bg-[#161616] rounded-[24px] border border-white/10 overflow-hidden">
              <button onClick={() => setOpenSize(!openSize)} className="w-full flex items-center justify-between px-6 py-5 text-white font-black uppercase tracking-[2px] text-sm">
                Size (US) {openSize ? <ChevronUp size={16} className="text-[#8da27f]" /> : <ChevronDown size={16} className="text-gray-500" />}
              </button>
              {openSize && (
                <div className="px-6 pb-5 grid grid-cols-3 gap-2">
                  {ALL_SIZES.map((size) => (
                    <button key={size} onClick={() => setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])}
                      className={`h-10 rounded-xl text-sm font-bold transition ${selectedSizes.includes(size) ? "bg-[#8da27f] text-white" : "bg-black text-gray-400 border border-white/10 hover:border-[#8da27f] hover:text-white"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-[2px] text-center">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-[300px]"><h1 className="text-white text-2xl font-bold">Loading Products...</h1></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] gap-4">
              <p className="text-gray-400 text-xl font-bold">No products match your filters</p>
              <button onClick={clearFilters} className="px-6 h-10 rounded-full bg-[#8da27f] text-white text-sm font-bold uppercase hover:bg-white hover:text-black transition">Clear Filters</button>
            </div>
          ) : (
            <div className={`grid gap-8 ${showFilters ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
              {filtered.map((product) => {
                const discount = getDiscount(product.id);
                const originalPrice = Math.round(Number(product.price) / (1 - discount / 100));
                return (
                  <div key={product.id} className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/10 hover:-translate-y-2 transition duration-500">
                    <div className="relative h-[280px] overflow-hidden">
                      <Link to={`/product/${product._id || product.id}`}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition duration-700 cursor-pointer" onError={(e) => { e.target.src = "https://via.placeholder.com/500x500?text=No+Image"; }} />
                      </Link>
                      {/* DISCOUNT BADGE */}
                      <div className="absolute top-4 left-4 bg-[#8da27f] text-white px-4 py-1.5 rounded-full text-[11px] tracking-[2px] font-bold flex items-center gap-1.5">
                        <Tag size={12} /> {discount}% OFF
                      </div>
                      <button onClick={() => { addToWishlist(product); toast.success("Added to Wishlist"); }}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${wishlist.some((item) => item.id === product.id) ? "bg-red-500 text-white" : "bg-white text-black hover:bg-red-500 hover:text-white"}`}>
                        <Heart size={18} fill={wishlist.some((item) => item.id === product.id) ? "currentColor" : "none"} />
                      </button>
                      {getCartCount(product.id) > 0 && (
                        <div className="absolute bottom-4 left-4 bg-[#8da27f] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center">{getCartCount(product.id)}</div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-[#8da27f] text-xs tracking-[3px] uppercase font-semibold">{product.category}</p>
                      <h2 className="text-white text-2xl font-black mt-2">{product.name}</h2>
                      <div className="flex items-center gap-4 mt-4">
                        <h3 className="text-white text-3xl font-black">Rs. {Number(product.price).toLocaleString()}</h3>
                        <p className="text-gray-500 line-through text-lg">Rs. {originalPrice.toLocaleString()}</p>
                      </div>
                      <button onClick={() => { addToCart(product, "Default"); toast.success("Added to Cart!"); }}
                        className="w-full flex items-center justify-center gap-2 h-[48px] rounded-full bg-[#8da27f] text-white text-xs font-bold tracking-[2px] hover:bg-white hover:text-black transition mt-5">
                        <ShoppingCart size={15} /> ADD TO CART
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}