import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Search, ShoppingCart, CircleUserRound, Heart } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const { totalItems } = useCart();

  const isLoggedInHome = !!localStorage.getItem("token");

  return (
    <nav className="fixed top-0 left-0 w-full h-[82px] bg-white flex items-center justify-between px-6 lg:px-14 border-b border-gray-200 z-[9999] shadow-sm">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt=""
          className="w-[48px] h-[48px] rounded-full object-cover shadow-md"
        />
        <h1 className="text-[34px] font-black tracking-[-3px] text-black">
          Brand_Shoe
        </h1>
      </div>

      {/* CENTER MENU */}
      <div className="hidden lg:flex items-center gap-9 text-[15px] font-semibold">
        <Link
          to="/mainhome"
          className={`transition duration-300 ${
            location.pathname === "/mainhome"
              ? "text-[#8da27f]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Home
        </Link>

        <Link
          to={isLoggedInHome ? "/women" : "/login"}
          className={`transition duration-300 ${
            location.pathname === "/women"
              ? "text-[#8da27f]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Womens
        </Link>

        <Link
          to={isLoggedInHome ? "/kids" : "/login"}
          className={`transition duration-300 ${
            location.pathname === "/kids"
              ? "text-[#8da27f]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Kids
        </Link>

        <Link
          to={isLoggedInHome ? "/men" : "/login"}
          className={`transition duration-300 ${
            location.pathname === "/men"
              ? "text-[#8da27f]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Men
        </Link>

        <Link
          to={isLoggedInHome ? "/collections" : "/login"}
          className={`transition duration-300 ${
            location.pathname === "/collections"
              ? "text-[#8da27f]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          New Arrival
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3 bg-[#f5f5f5] border border-gray-200 px-5 rounded-full w-[290px] h-[48px]">
          <Search size={17} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search sneakers..."
            className="bg-transparent outline-none text-[14px] w-full"
          />
        </div>

        {isLoggedInHome ? (
          <>
            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="relative w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#8da27f] hover:text-white transition duration-300 shadow-sm"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART ── with badge */}
            <button
              onClick={() => navigate("/cart")}
              className="relative w-[46px] h-[46px] rounded-full bg-black text-white flex items-center justify-center hover:bg-[#8da27f] transition duration-300 shadow-lg"
            >
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8da27f] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* USER */}
            <button className="w-[46px] h-[46px] rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition duration-300 shadow-sm">
              <CircleUserRound size={20} />
            </button>

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
              }}
              className="text-sm font-bold text-gray-500 hover:text-red-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-7 h-[48px] rounded-full bg-black text-white flex items-center justify-center text-[14px] font-semibold hover:bg-[#8da27f] transition duration-300 shadow-md"
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
