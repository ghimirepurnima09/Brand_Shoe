import { Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {

  return (

    <nav className="bg-white border-b border-gray-200">

      <div className="max-w-[1280px] mx-auto h-[82px] px-10 flex items-center justify-between">

        {/* LOGO */}

        <h1 className="text-[32px] font-black tracking-[-2px]">

          Brand_Shoe

        </h1>

        {/* MENU */}

        <ul className="flex gap-12 text-[15px] font-medium">

          <li className="cursor-pointer hover:text-gray-500 transition">
            Home
          </li>

          <li className="cursor-pointer hover:text-gray-500 transition">
            Womens
          </li>

          <li className="cursor-pointer hover:text-gray-500 transition">
            Kids
          </li>

          <li className="cursor-pointer hover:text-gray-500 transition">
            Male
          </li>

          <li className="cursor-pointer hover:text-gray-500 transition">
            New Arrival
          </li>

        </ul>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          <div className="bg-[#f5f5f5] w-[260px] h-[42px] rounded-full flex items-center px-5">

            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search the collection..."
              className="bg-transparent outline-none ml-3 text-[14px] w-full"
            />

          </div>

          <ShoppingBag
            size={20}
            className="cursor-pointer"
          />

          <User
            size={20}
            className="cursor-pointer"
          />

        </div>

      </div>

    </nav>

  );

}