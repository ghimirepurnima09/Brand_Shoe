import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/men"
        );

        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("Error fetching men's products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenProducts();
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black px-6 lg:px-16 pt-[120px] pb-16">
        {/* Heading */}

        <div className="mb-16">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">
            Brand Shoe
          </p>

          <h1 className="text-white text-6xl font-black mt-4">
            MEN
            <br />
            COLLECTION
          </h1>

          <p className="text-gray-400 mt-6">
            Products Found: {products.length}
          </p>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center text-white text-2xl">
            Loading Products...
          </div>
        ) : (
          <>
            {/* No Products */}

            {products.length === 0 ? (
              <div className="text-center text-red-500 text-2xl">
                No Men's Products Found
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/5 hover:-translate-y-2 transition duration-500"
                  >
                    {/* Image */}

                    <div className="h-[280px] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-700"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/500x500?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Content */}

                    <div className="p-6">
                      <p className="text-[#8da27f] text-[11px] tracking-[3px] uppercase font-semibold">
                        {product.category}
                      </p>

                      <h2 className="text-white text-[28px] font-black tracking-[-2px] mt-3">
                        {product.name}
                      </h2>

                      <p className="text-gray-400 text-[14px] leading-[26px] mt-4">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-8">
                        <h3 className="text-white text-[30px] font-black">
                          Rs. {product.price}
                        </h3>

                        <button className="h-[48px] px-6 rounded-full bg-[#8da27f] text-white text-[11px] font-bold tracking-[2px] hover:bg-white hover:text-black transition">
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}