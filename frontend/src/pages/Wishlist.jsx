import Navbar from "./Navbar";
import { useWishlist } from "../context/WishlistContext";
import { Trash2 } from "lucide-react";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black pt-[120px] px-6 lg:px-16 pb-20">

        <h1 className="text-white text-6xl font-black mb-12">
          MY
          <br />
          WISHLIST
        </h1>

        {wishlist.length === 0 ? (
          <h2 className="text-gray-400 text-2xl">
            No products in wishlist
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-[#161616] rounded-[32px] overflow-hidden"
              >
                <div className="h-[280px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">

                  <h2 className="text-white text-2xl font-black">
                    {product.name}
                  </h2>

                  <p className="text-gray-400 mt-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">

                    <h3 className="text-white text-3xl font-black">
                      Rs. {product.price}
                    </h3>

                    <button
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </section>
    </>
  );
}