import { Search } from "lucide-react";

import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Navbar() {

  return (

    <nav className="w-full h-[84px] bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-14 sticky top-0 z-50">

      {/* LEFT */}

      <div className="flex items-center gap-3">

        <img
          src={logo}
          alt=""
          className="w-[48px] h-[48px] rounded-full object-cover shadow-md"
        />

        <h1 className="text-[28px] font-black tracking-[-2px] text-black">

          Brand_Shoe

        </h1>

      </div>

      {/* CENTER */}

      <div className="hidden lg:flex items-center gap-9 text-[14px] font-semibold text-gray-600">

        <button className="hover:text-black transition duration-300">

          Home

        </button>

        <button className="hover:text-black transition duration-300">

          Womens

        </button>

        <button className="hover:text-black transition duration-300">

          Kids

        </button>

        <button className="hover:text-black transition duration-300">

          Men

        </button>

        <button className="hover:text-black transition duration-300">

          New Arrival

        </button>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* SEARCH */}

        <div className="hidden md:flex items-center gap-3 bg-[#f5f5f5] px-5 h-[44px] rounded-full border border-gray-200 shadow-sm">

          <Search
            size={15}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search premium sneakers..."
            className="bg-transparent outline-none text-[13px] w-[240px]"
          />

        </div>

        {/* LOGIN */}

        <Link
          to="/login"
          className="px-6 h-[42px] rounded-full bg-black text-white text-[13px] font-semibold tracking-[1px] flex items-center justify-center hover:bg-[#c8161d] transition duration-300 shadow-md"
        >

          LOGIN

        </Link>

      </div>

    </nav>

  );

}