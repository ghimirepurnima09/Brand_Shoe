import logo from "../assets/logo.png";

import {
  Search,
  ShoppingBag,
  User
} from "lucide-react";

export default function Navbar() {

  return (

    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">

      <div className="max-w-[1180px] mx-auto h-[78px] px-6 flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt=""
              className="w-[48px] h-[48px] rounded-full object-cover border border-gray-200 shadow-md"
            />

            <h1 className="text-[28px] font-black tracking-[-2px]">

              Brand_Shoe

            </h1>

          </div>

        </div>

        {/* CENTER MENU */}

        <ul className="hidden md:flex items-center gap-10 text-[14px] font-medium">

          <li className="hover:text-red-600 transition cursor-pointer">
            Home
          </li>

          <li className="hover:text-red-600 transition cursor-pointer">
            Womens
          </li>

          <li className="hover:text-red-600 transition cursor-pointer">
            Kids
          </li>

          <li className="hover:text-red-600 transition cursor-pointer">
            Men
          </li>

          <li className="hover:text-red-600 transition cursor-pointer">
            New Arrival
          </li>

        </ul>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* SEARCH */}

          <div className="hidden md:flex items-center bg-[#f5f5f5] rounded-full px-4 h-[40px] w-[230px]">

            <Search size={16} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-[13px] ml-3 w-full"
            />

          </div>

          {/* CART */}

          <div className="w-[40px] h-[40px] rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">

            <ShoppingBag size={18} />

          </div>

          {/* PROFILE */}

          <div className="w-[40px] h-[40px] rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">

            <User size={18} />

          </div>

        </div>

      </div>

    </nav>

  );

}