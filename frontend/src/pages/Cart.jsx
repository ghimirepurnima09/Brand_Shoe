import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black pt-[120px] px-6 lg:px-16 pb-20">

        {/* ── HEADER ── */}
        <div className="mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">
            Brand Shoe
          </p>
          <h1 className="text-white text-6xl font-black mt-4 leading-none">
            MY
            <br />
            CART
          </h1>
        </div>

        {/* ── EMPTY STATE ── */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-6">
            <ShoppingBag size={64} className="text-white/20" />
            <h2 className="text-gray-400 text-2xl font-bold">
              Your cart is empty
            </h2>
            <button
              onClick={() => navigate("/mainhome")}
              className="px-8 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── CART ITEMS ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cart.map((product) => (
                <div
                  key={`${product.id}-${product.size}`}
                  className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/10 flex gap-0 hover:-translate-y-1 transition duration-300"
                >
                  {/* Image */}
                  <div className="w-[180px] min-w-[180px] h-[180px] overflow-hidden bg-[#1e1e1e] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/180x180?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-[#8da27f] uppercase text-xs tracking-[3px] font-semibold">
                        {product.category} • {product.gender}
                      </p>
                      <h2 className="text-white text-2xl font-black mt-1">
                        {product.name}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Size: <span className="text-white font-bold">US {product.size}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQty(product.id, product.size)}
                          className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#8da27f] transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-black text-lg w-6 text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(product.id, product.size)}
                          className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#8da27f] transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Item Total */}
                        <h3 className="text-white text-2xl font-black">
                          Rs. {(Number(product.price) * product.quantity).toLocaleString()}
                        </h3>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(product.id, product.size)}
                          className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="self-start text-red-400 text-sm font-bold uppercase tracking-[2px] hover:text-red-500 transition underline underline-offset-4"
              >
                Clear Cart
              </button>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="lg:col-span-1">
              <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 sticky top-[120px]">
                <h2 className="text-white text-2xl font-black mb-8 tracking-tight">
                  ORDER SUMMARY
                </h2>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                      Items
                    </span>
                    <span className="text-white font-bold">{totalItems}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                      Subtotal
                    </span>
                    <span className="text-white font-bold">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm uppercase tracking-[2px]">
                      Shipping
                    </span>
                    <span className="text-[#8da27f] font-bold">Free</span>
                  </div>

                  <div className="w-full h-px bg-white/10 my-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-white font-black text-lg uppercase tracking-[2px]">
                      Total
                    </span>
                    <span className="text-white font-black text-2xl">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/payment")}
                  className="w-full h-[58px] rounded-full bg-[#8da27f] text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 shadow-2xl"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => navigate("/mainhome")}
                  className="w-full h-[52px] rounded-full border border-white/20 text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition duration-300 mt-3"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>
        )}
      </section>
    </>
  );
}
