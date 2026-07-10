import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const FRONTEND = "http://localhost:5173";

const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return `${FRONTEND}${src}`;
};

export default function Trending() {
  const location = useLocation();
  const isActualHome = location.pathname === "/mainhome";

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, cart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/getproducts");
        if (res.data.success) {
          setProducts(res.data.products.slice(0, 4));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getCartCount = (productId) =>
    cart.filter((item) => item.id === productId).reduce((sum, item) => sum + item.quantity, 0);

  // ── WISHLIST TOGGLE — add if not present, remove if already present ──
  const handleToggleWishlist = (product) => {
    const already = wishlist.some((item) => item.id === product.id);
    if (already) {
      removeFromWishlist(product.id);
      toast.success("Removed from Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist");
    }
  };

  const STOCK_LABELS = ["LOW STOCK", "LIMITED", "IN STOCK", "NEW DROP"];

  return (
    <section className="px-6 lg:px-16 py-24 bg-white">

      {/* TOP */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <p className="text-[#8da27f] font-bold tracking-[3px] text-[13px]">NEW RELEASE</p>
          <h1 className="text-[52px] font-black tracking-[-3px] text-black mt-3">TRENDING</h1>
        </div>
        <Link
          to={isActualHome ? "/collections" : "/login"}
          className="text-black font-semibold hover:text-[#8da27f] transition duration-300"
        >
          View All Collections →
        </Link>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-gray-400 text-lg font-bold">Loading Trending...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product, index) => (
            <div key={product.id} className="group bg-[#f7f7f7] rounded-[30px] p-6 overflow-hidden hover:shadow-2xl transition">

              {/* TOP ROW */}
              <div className="flex justify-between items-center">
                <p className="bg-white px-4 py-2 rounded-full text-[11px] font-bold">AUTHENTIC SHIELD</p>
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className={`transition ${wishlist.some((item) => item.id === product.id) ? "text-red-500" : "text-gray-400 group-hover:text-red-500"}`}
                >
                  <Heart size={20} fill={wishlist.some((item) => item.id === product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* IMAGE */}
              <Link to={isActualHome ? `/product/${product._id || product.id}` : "/login"}>
                <div className="relative mt-6">
                  <img
                    src={resolveImg(product.image)}
                    alt={product.name}
                    className="w-full h-[180px] object-cover rounded-2xl group-hover:scale-105 transition duration-700"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  {getCartCount(product.id) > 0 && (
                    <div className="absolute top-2 left-2 bg-[#8da27f] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center">
                      {getCartCount(product.id)}
                    </div>
                  )}
                </div>
              </Link>

              {/* INFO */}
              <p className="text-[#8da27f] text-xs tracking-[3px] uppercase font-semibold mt-5">{product.category}</p>
              <h2 className="text-[22px] font-black mt-1">{product.name}</h2>
              <p className="text-gray-500 text-[13px] leading-[24px] mt-3 line-clamp-2">{product.description}</p>

              {/* PRICE + STOCK */}
              <div className="flex justify-between mt-5 items-center">
                <h3 className="text-[22px] font-black">Rs. {Number(product.price).toLocaleString()}</h3>
                <p className="text-[#8da27f] text-[12px] font-bold">{STOCK_LABELS[index % STOCK_LABELS.length]}</p>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={() => { addToCart(product, "Default"); toast.success("Added to Cart!"); }}
                className="w-full flex items-center justify-center gap-2 h-[44px] rounded-full bg-black text-white text-[11px] font-bold tracking-[2px] hover:bg-[#8da27f] transition mt-5"
              >
                <ShoppingCart size={14} /> ADD TO CART
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}