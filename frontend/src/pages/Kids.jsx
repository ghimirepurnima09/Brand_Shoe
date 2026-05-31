import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Kids() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wishlist, addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchKidsProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/kids"
        );

        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("Error fetching kids products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKidsProducts();
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-20">
        <div className="mb-16">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">
            Brand Shoe
          </p>

          <h1 className="text-white text-6xl font-black mt-4 leading-none">
            KIDS
            <br />
            COLLECTION
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <h1 className="text-white text-2xl font-bold">
              Loading Products...
            </h1>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center h-[300px]">
            <h1 className="text-red-500 text-2xl font-bold">
              No Kids Products Found
            </h1>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/10 hover:-translate-y-2 transition duration-500"
              >
                <div className="relative h-[280px] overflow-hidden">
                  <Link to={`/product/${product._id || product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-700 cursor-pointer"
                      onError={(e) => {
                        e.target.src =
                        "https://via.placeholder.com/500x500?text=No+Image";
                    }}
                  />
                  </Link>

                 <button
                   onClick={() => {
                     addToWishlist(product);
                     toast.success("Added to Wishlist");
                }}
 
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${
   
                  wishlist.some((item) => item.id === product.id)
      
                  ? "bg-red-500 text-white"
      
                  : "bg-white text-black hover:bg-red-500 hover:text-white"
 
                }`}
         >
               <Heart
                 size={18}
                      fill={
                     wishlist.some((item) => item.id === product.id)
                          ? "currentColor"
                            : "none"
               }
                />
                     </button>
                </div>

                <div className="p-6">
                  <p className="text-[#8da27f] uppercase text-xs tracking-[3px] font-semibold">
                    {product.category}
                  </p>

                  <h2 className="text-white text-2xl font-black mt-3">
                    {product.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-4 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-8">
                    <h3 className="text-white text-3xl font-black">
                      Rs. {product.price}
                    </h3>

                    <button className="px-5 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] hover:bg-white hover:text-black transition">
                      ADD TO CART
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