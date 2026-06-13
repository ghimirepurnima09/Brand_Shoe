import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Heart, ShoppingCart, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ALL_SIZES = [6, 7, 8, 9, 10, 11, 12, 13, 14];
const BACKEND   = "http://localhost:5000";

const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return `${BACKEND}${src}`;
  return src;
};

export default function Kids() {
  const [products,         setProducts]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [showFilters,      setShowFilters]      = useState(true);
  const [selectedBrands,   setSelectedBrands]   = useState([]);
  const [selectedSizes,    setSelectedSizes]    = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange,       setPriceRange]       = useState([0, 100000]);
  const [maxPrice,         setMaxPrice]         = useState(100000);
  const [openBrand,        setOpenBrand]        = useState(true);
  const [openSize,         setOpenSize]         = useState(true);
  const [openPrice,        setOpenPrice]        = useState(true);

  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart, cart }         = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND}/api/products/kids`);
        if (response.data.success) {
          const data = response.data.products;
          setProducts(data);
          const max = Math.max(...data.map((p) => Number(p.price)), 100000);
          setMaxPrice(max);
          setPriceRange([0, max]);
        }
      } catch (error) {
        console.log("Error fetching kids products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const brands     = useMemo(() => [...new Set(products.map((p) => p.name.split(" ")[0]))].sort(), [products]);
  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))], [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const brandMatch    = selectedBrands.length === 0 ||
        selectedBrands.some((b) => p.name.toLowerCase().startsWith(b.toLowerCase()));
      const priceMatch    = Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1];
      const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
      const sizeMatch     = selectedSizes.length === 0 || (() => {
        let productSizes = [];
        if (p.sizes) {
          try {
            const parsed = Array.isArray(p.sizes) ? p.sizes : JSON.parse(p.sizes);
            productSizes = parsed.map(Number).filter(Boolean);
          } catch { productSizes = []; }
        }
        if (productSizes.length === 0 && p.size) {
          productSizes = p.size.split(",").map((s) => Number(s.trim())).filter(Boolean);
        }
        return selectedSizes.some((s) => productSizes.includes(s));
      })();
      return brandMatch && priceMatch && categoryMatch && sizeMatch;
    });
  }, [products, selectedBrands, priceRange, selectedCategory, selectedSizes]);

  const toggleBrand  = (brand) => setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  const toggleSize   = (size)  => setSelectedSizes((prev)  => prev.includes(size)  ? prev.filter((s) => s !== size)  : [...prev, size]);
  const clearFilters = () => { setSelectedBrands([]); setSelectedSizes([]); setSelectedCategory("All"); setPriceRange([0, maxPrice]); };
  const hasActiveFilters = selectedBrands.length > 0 || selectedSizes.length > 0 || selectedCategory !== "All" || priceRange[0] > 0 || priceRange[1] < maxPrice;
  const handleAddToCart  = (product) => { addToCart(product, "Default"); toast.success("Added to Cart!"); };
  const getCartCount     = (productId) => cart.filter((item) => item.id === productId).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe</p>
            <h1 className="text-white text-6xl font-black mt-4 leading-none">KIDS<br />COLLECTION</h1>
          </div>
          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-2 px-4 h-10 rounded-full border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-[2px] hover:bg-red-500/10 transition">
                <X size={14} /> Clear Filters
              </button>
            )}
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-5 h-10 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-[2px] hover:border-[#8da27f] hover:text-[#8da27f] transition">
              <SlidersHorizontal size={15} /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-5 h-10 rounded-full text-xs font-bold uppercase tracking-[2px] transition duration-300 ${selectedCategory === cat ? "bg-[#8da27f] text-white" : "border border-white/20 text-gray-400 hover:border-[#8da27f] hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-10">
          {showFilters && (
            <div className="w-[260px] min-w-[260px] flex flex-col gap-4">
              <div className="bg-[#161616] rounded-[24px] border border-white/10 overflow-hidden">
                <button onClick={() => setOpenBrand(!openBrand)} className="w-full flex items-center justify-between px-6 py-5 text-white font-black uppercase tracking-[2px] text-sm">
                  Brand {openBrand ? <ChevronUp size={16} className="text-[#8da27f]" /> : <ChevronDown size={16} className="text-gray-500" />}
                </button>
                {openBrand && (
                  <div className="px-6 pb-5 flex flex-col gap-3">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
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
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-[2px] mb-2">Min</p>
                        <input type="range" min={0} max={maxPrice} step={500} value={priceRange[0]} onChange={(e) => { const v = Number(e.target.value); if (v < priceRange[1]) setPriceRange([v, priceRange[1]]); }} className="w-full accent-[#8da27f] cursor-pointer" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-[2px] mb-2">Max</p>
                        <input type="range" min={0} max={maxPrice} step={500} value={priceRange[1]} onChange={(e) => { const v = Number(e.target.value); if (v > priceRange[0]) setPriceRange([priceRange[0], v]); }} className="w-full accent-[#8da27f] cursor-pointer" />
                      </div>
                    </div>
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
                      <button key={size} onClick={() => toggleSize(size)}
                        className={`h-10 rounded-xl text-sm font-bold transition ${selectedSizes.includes(size) ? "bg-[#8da27f] text-white border-2 border-[#8da27f]" : "bg-black text-gray-400 border border-white/10 hover:border-[#8da27f] hover:text-white"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-[2px] text-center">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                <p className="text-gray-400 text-xl font-bold">No products match your filters</p>
                <button onClick={clearFilters} className="px-6 h-10 rounded-full bg-[#8da27f] text-white text-sm font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition">Clear Filters</button>
              </div>
            ) : (
              <div className={`grid gap-8 ${showFilters ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
                {filtered.map((product) => (
                  <div key={product.id} className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/10 hover:-translate-y-2 transition duration-500">
                    <div className="relative h-[280px] overflow-hidden">
                      <Link to={`/product/${product._id || product.id}`}>
                        <img src={resolveImg(product.image)} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition duration-700 cursor-pointer" onError={(e) => { e.target.src = "https://via.placeholder.com/500x500?text=No+Image"; }} />
                      </Link>
                      <button onClick={() => { addToWishlist(product); toast.success("Added to Wishlist"); }}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${wishlist.some((item) => item.id === product.id) ? "bg-red-500 text-white" : "bg-white text-black hover:bg-red-500 hover:text-white"}`}>
                        <Heart size={18} fill={wishlist.some((item) => item.id === product.id) ? "currentColor" : "none"} />
                      </button>
                      {getCartCount(product.id) > 0 && (
                        <div className="absolute top-4 left-4 bg-[#8da27f] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center">{getCartCount(product.id)}</div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-[#8da27f] text-xs tracking-[3px] uppercase font-semibold">{product.category}</p>
                      <h2 className="text-white text-2xl font-black mt-3">{product.name}</h2>
                      <p className="text-gray-400 text-sm mt-4 line-clamp-3">{product.description}</p>
                      <div className="flex items-center justify-between mt-8">
                        <h3 className="text-white text-3xl font-black">Rs. {Number(product.price).toLocaleString()}</h3>
                        <button onClick={() => handleAddToCart(product)} className="flex items-center gap-2 px-5 h-[48px] rounded-full bg-[#8da27f] text-white text-xs font-bold tracking-[2px] hover:bg-white hover:text-black transition">
                          <ShoppingCart size={15} /> ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}