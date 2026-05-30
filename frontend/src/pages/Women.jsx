import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Women() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/women"
        );

        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("Error fetching women's products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
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
            WOMEN
            <br />
            COLLECTION
          </h1>

          <p className="text-gray-400 mt-4">
            Products Found: {products.length}
          </p>
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
              No Women's Products Found
            </h1>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/10 hover:-translate-y-2 transition duration-500"
              >
                <div className="h-[280px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[#8da27f] uppercase text-xs tracking-[3px]">
                    {product.category}
                  </p>

                  <h2 className="text-white text-2xl font-black mt-3">
                    {product.name}
                  </h2>

                  <p className="text-gray-400 mt-4 line-clamp-3">
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