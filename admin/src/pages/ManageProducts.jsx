import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Plus, Pencil, Trash2, X, Check, Link } from "lucide-react";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api/admin";
const IMG = "http://localhost:5173";

const emptyForm = {
  name: "", category: "", gender: "", price: "",
  quantity: "", description: "", image: ""
};

const resolveImg = (src) => {
  if (!src) return "https://via.placeholder.com/48?text=Img";
  if (src.startsWith("http")) return src;
  return `${IMG}${src}`;
};

export default function ManageProducts() {
  const [products,       setProducts]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [showModal,      setShowModal]      = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form,           setForm]           = useState(emptyForm);
  const [saving,         setSaving]         = useState(false);
  const [imageMode,      setImageMode]      = useState("path"); // "path" | "url"

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`
  });

  const fetchProducts = () => {
    axios.get(`${API}/products`, { headers: getHeaders() })
      .then((res) => { if (res.data.success) setProducts(res.data.products); })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setImageMode("path");
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setForm({
      name: p.name, category: p.category, gender: p.gender,
      price: p.price, quantity: p.quantity,
      description: p.description, image: p.image
    });
    setImageMode(p.image?.startsWith("http") ? "url" : "path");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.gender || !form.price || !form.quantity || !form.description || !form.image) {
      toast.error("Please fill all fields!"); return;
    }
    try {
      setSaving(true);
      if (editingProduct) {
        await axios.put(`${API}/products/${editingProduct.id}`, form, { headers: getHeaders() });
        toast.success("Product Updated!");
      } else {
        await axios.post(`${API}/products`, form, { headers: getHeaders() });
        toast.success("Product Added!");
      }
      setShowModal(false);
      fetchProducts();
    } catch { toast.error("Error saving product"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/products/${id}`, { headers: getHeaders() });
      toast.success("Product Deleted!");
      fetchProducts();
    } catch { toast.error("Failed to delete product"); }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe Admin</p>
            <h1 className="text-white text-5xl font-black mt-2 leading-none">PRODUCTS</h1>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-6 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition">
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-[#161616] rounded-[32px] border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {["Image", "Name", "Category", "Gender", "Price", "Qty", "Actions"].map((h) => (
                    <th key={h} className="text-gray-500 text-xs uppercase tracking-[2px] font-bold px-6 py-4 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-black">
                        <img
                          src={resolveImg(p.image)}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/48?text=Img"; }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-bold text-sm">{p.name}</td>
                    <td className="px-6 py-4 text-[#8da27f] text-sm font-semibold">{p.category}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{p.gender}</td>
                    <td className="px-6 py-4 text-white font-black text-sm">Rs. {Number(p.price).toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{p.quantity}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)}
                          className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          className="w-9 h-9 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-2xl font-black uppercase">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Product Name</label>
                <input type="text" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nike Air Max"
                  className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600" />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Category</label>
                <input type="text" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Sneakers, Running, Casual..."
                  className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600" />
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Gender</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition">
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Price (Rs.)</label>
                <input type="number" value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="9500"
                  className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600" />
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Quantity</label>
                <input type="number" value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  placeholder="10"
                  className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600" />
              </div>

              {/* IMAGE SECTION */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Image</label>

                {/* Toggle Buttons */}
                <div className="flex gap-2 mb-1">
                  <button
                    onClick={() => { setImageMode("path"); setForm({ ...form, image: "" }); }}
                    className={`flex-1 h-10 rounded-xl text-xs font-bold uppercase tracking-[1px] border transition ${
                      imageMode === "path"
                        ? "bg-[#8da27f] border-[#8da27f] text-white"
                        : "border-white/10 text-gray-400 hover:border-white/30"
                    }`}>
                    📁 Local Path
                  </button>
                  <button
                    onClick={() => { setImageMode("url"); setForm({ ...form, image: "" }); }}
                    className={`flex-1 h-10 rounded-xl text-xs font-bold uppercase tracking-[1px] border transition ${
                      imageMode === "url"
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-white/10 text-gray-400 hover:border-white/30"
                    }`}>
                    <span className="flex items-center justify-center gap-1"><Link size={12} /> Google URL</span>
                  </button>
                </div>

                {imageMode === "path" ? (
                  <input type="text" value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/men/nike-air-max.png"
                    className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600" />
                ) : (
                  <div className="flex flex-col gap-2">
                    <input type="text" value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      placeholder="https://... (right-click image on Google → Copy image address)"
                      className="bg-black border border-blue-500/30 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-blue-500 transition placeholder:text-gray-600" />
                    <p className="text-blue-400 text-xs">
                      💡 Go to Google Images → right-click any shoe image → <strong>Copy image address</strong> → paste above
                    </p>
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {form.image && (
                <div className="w-full h-36 rounded-2xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={resolveImg(form.image)}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x144?text=Invalid"; }}
                  />
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Description</label>
                <textarea value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Product description..." rows={3}
                  className="bg-black border border-white/10 rounded-2xl px-5 py-3 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600 resize-none" />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition disabled:opacity-50 flex items-center justify-center gap-2">
                  <Check size={16} />
                  {saving ? "Saving..." : editingProduct ? "Update" : "Add Product"}
                </button>
                <button onClick={() => setShowModal(false)}
                  className="px-6 h-12 rounded-full border border-white/20 text-white font-bold uppercase tracking-[2px] hover:bg-white hover:text-black transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}