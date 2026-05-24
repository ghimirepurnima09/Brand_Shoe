import { Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {

  return (

    <nav className="bg-white flex items-center justify-between px-10 py-5">

      <h1 className="text-2xl font-bold">
        Brand_Shoe
      </h1>

      <ul className="flex gap-8 text-sm font-medium">

        <li className="cursor-pointer hover:text-gray-500">
          Collections
        </li>

        <li className="cursor-pointer hover:text-gray-500">
          Womens
        </li>

        <li className="cursor-pointer hover:text-gray-500">
          Kids
        </li>

        <li className="cursor-pointer hover:text-gray-500">
          Mens
        </li>

        <li className="cursor-pointer hover:text-gray-500">
          New Arrival
        </li>

      </ul>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search the collection..."
            className="bg-transparent outline-none ml-2 text-sm"
          />

        </div>

        <ShoppingCart
          size={18}
          className="cursor-pointer"
        />

        <User
          size={18}
          className="cursor-pointer"
        />

      </div>

    </nav>

  );

}