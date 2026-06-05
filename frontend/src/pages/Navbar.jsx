import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Search, ShoppingCart, CircleUserRound, Heart, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const { totalItems } = useCart();

  const isLoggedInHome = !!localStorage.getItem("token");

  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/getproducts");
        if (res.data.success) setAllProducts(res.data.products);
      } catch (err) {
        console.log("Search fetch error:", err);
      }
    };
    fetchAll();
  }, []);

  const suggestions = query.trim().length === 0
    ? []
    : allProducts
        .filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.gender.toLowerCase().includes(q)
          );
        })
        .slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (product) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/product/${product._id || product.id}`);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[82px] bg-white flex items-center justify-between px-6 lg:px-14 border-b border-gray-200 z-[9999] shadow-sm">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="" className="w-[48px] h-[48px] rounded-full object-cover shadow-md" />
        <h1 className="text-[34px] font-black tracking-[-3px] text-black">Brand_Shoe</h1>
      </div>

      {/* CENTER MENU */}
      <div className="hidden lg:flex items-center gap-9 text-[15px] font-semibold">
        <Link to="/mainhome" className={`transition duration-300 ${location.pathname === "/mainhome" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>Home</Link>
        <Link to={isLoggedInHome ? "/women" : "/login"} className={`transition duration-300 ${location.pathname === "/women" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>Womens</Link>
        <Link to={isLoggedInHome ? "/kids" : "/login"} className={`transition duration-300 ${location.pathname === "/kids" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>Kids</Link>
        <Link to={isLoggedInHome ? "/men" : "/login"} className={`transition duration-300 ${location.pathname === "/men" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>Men</Link>
        <Link to={isLoggedInHome ? "/collections" : "/login"} className={`transition duration-300 ${location.pathname === "/collections" ? "text-[#8da27f]" : "text-gray-600 hover:text-black"}`}>New Arrival</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div ref={searchRef} className="hidden lg:block relative">
          <div className="flex items-center gap-3 bg-[#f5f5f5] border border-gray-200 px-5 rounded-full w-[290px] h-[48px] focus-within:border-[#8da27f] transition">
            <Search size={17} className="text-gray-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
              onKeyDown={handleSearchEnter}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search sneakers..."
              className="bg-transparent outline-none text-[14px] w-full"
            />
            {query && (
              <button onClick={clearSearch}>
                <X size={15} className="text-gray-400 hover:text-black transition" />
              </button>
            )}
          </div>

          {/* DROPDOWN */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-[56px] left-0 w-full bg-white border border-gray-200 rounded-[20px] shadow-2xl overflow-hidden z-[99999]">
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-400 px-5 pt-4 pb-2">Suggestions</p>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onMouseDown={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-[#f5f5f5] cursor-pointer transition group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/48x48?text=Img"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm font-bold truncate group-hover:text-[#8da27f] transition">{product.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{product.category} • {product.gender}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => { setShowDropdown(false); navigate(`/search?q=${encodeURIComponent(query.trim())}`); }}
                className="w-full py-3 text-center text-[#8da27f] text-xs font-bold uppercase tracking-[2px] border-t border-gray-100 hover:bg-[#8da27f] hover:text-white transition"
              >
                See all results for "{query}"
              </button>
            </div>
          )}

          {/* No results */}
          {showDropdown && suggestions.length === 0 && query.trim().length > 0 && (
            <div className="absolute top-[56px] left-0 w-full bg-white border border-gray-200 rounded-[20px] shadow-2xl overflow-hidden z-[99999] px-5 py-5 text-center">
              <p className="text-gray-400 text-sm font-semibold">No results for "{query}"</p>
            </div>
          )}
        </div>

        {isLoggedInHome ? (
          <>
            {/* WISHLIST */}
            <Link to="/wishlist" className="relative w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#8da27f] hover:text-white transition duration-300 shadow-sm">
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART — white with green hover instead of black */}
            <button onClick={() => navigate("/cart")} className="relative w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-[#8da27f] hover:text-white hover:border-[#8da27f] transition duration-300 shadow-sm">
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8da27f] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* USER → PROFILE */}
            <button
              onClick={() => navigate("/profile")}
              className="w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition duration-300 shadow-sm"
            >
              <CircleUserRound size={20} />
            </button>
          </>
        ) : (
          <Link to="/login" className="px-7 h-[48px] rounded-full bg-black text-white flex items-center justify-center text-[14px] font-semibold hover:bg-[#8da27f] transition duration-300 shadow-md">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}