import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { ShoppingBag } from "lucide-react";

export default function ManageOrders() {
  const [orders] = useState([]);

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-y-auto">

        <div className="mb-10">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe Admin</p>
          <h1 className="text-white text-5xl font-black mt-2 leading-none">ORDERS</h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4">
            <ShoppingBag size={64} className="text-white/10" />
            <p className="text-gray-500 text-xl font-bold uppercase tracking-widest">No Orders Yet</p>
            <p className="text-gray-600 text-sm text-center max-w-sm">
              Orders will appear here once customers start placing them through the checkout.
            </p>
          </div>
        ) : (
          <div className="bg-[#161616] rounded-[32px] border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {["Order ID", "Customer", "Products", "Total", "Status", "Date"].map((h) => (
                    <th key={h} className="text-gray-500 text-xs uppercase tracking-[2px] font-bold px-6 py-4 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-[#8da27f] font-black text-sm">#{o.id}</td>
                    <td className="px-6 py-4 text-white font-bold text-sm">{o.customer}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{o.products}</td>
                    <td className="px-6 py-4 text-white font-black text-sm">Rs. {o.total}</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#8da27f]/20 text-[#8da27f] text-xs font-bold uppercase tracking-[1px] px-3 py-1 rounded-full">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}