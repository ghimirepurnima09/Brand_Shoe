import Shoe1 from "../assets/Shoe2.png";
import Shoe2 from "../assets/Shoe3.png";
import Shoe3 from "../assets/Shoe4.png";

export default function Trending() {

  const products = [

    {
      id: 1,
      image: Shoe1,
      name: "Nike Air Max",
      price: "$250"
    },

    {
      id: 2,
      image: Shoe2,
      name: "Adidas Ultraboost",
      price: "$220"
    },

    {
      id: 3,
      image: Shoe3,
      name: "Puma RS-X",
      price: "$180"
    }

  ];

  return (

    <section className="px-10 py-20 bg-white">

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-5xl font-bold">
          Trending Now
        </h1>

        <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">

          View All

        </button>

      </div>

      <div className="grid grid-cols-3 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-[#f5f5f5] rounded-3xl p-6 hover:scale-105 transition duration-300"
          >

            <img
              src={product.image}
              alt=""
              className="w-full h-[300px] object-contain"
            />

            <div className="mt-6">

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Premium Collection
              </p>

              <p className="text-2xl font-bold mt-4">
                {product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}