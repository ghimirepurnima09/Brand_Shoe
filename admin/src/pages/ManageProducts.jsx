import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Plus, Pencil, Trash2, X, Check, Link, Upload, Star, Tag, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api/admin";
const BACKEND = "http://localhost:5000";

const SHOE_SIZES = [6, 7, 8, 9, 10, 11, 12, 13];

const emptyForm = {
  name: "", category: "", gender: "", price: "",
  quantity: "", description: "",
  image: "", image2: "", image3: "", image4: "", image5: "",
  sizes: [],
  is_most_sold: false,
  is_new: false,
  discount: 0,
  is_out_of_stock: false,
};

// ✅ FIXED: Only prepend BACKEND for /uploads/ (multer files)
// /men/ /women/ /kids/ images are in Vite public folder — use as-is
const resolveImg = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return `${BACKEND}${src}`;
  return src;
};

export default function ManageProducts() {
  const [products,       setProducts]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [showModal,      setShowModal]      = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form,           setForm]           = useState(emptyForm);
  const [saving,         setSaving]         = useState(false);
  const [imageMode,      setImageMode]      = useState("url");
  const [uploading,      setUploading]      = useState(false);

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
    setImageMode("url");
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setForm({
      name:        p.name        || "",
      category:    p.category    || "",
      gender:      p.gender      || "",
      price:       p.price       || "",
      quantity:    p.quantity    || "",
      description: p.description || "",
      image:       p.image       || "",
      image2:      p.image2      || "",
      image3:      p.image3      || "",
      image4:      p.image4      || "",
      image5:      p.image5      || "",
      sizes: p.sizes
        ? (Array.isArray(p.sizes) ? p.sizes : (() => { try { return JSON.parse(p.sizes); } catch { return []; } })())
        : [],
      is_most_sold:    p.is_most_sold    || false,
      is_new:          p.is_new          || false,
      discount:        p.discount        || 0,
      is_out_of_stock: p.is_out_of_stock || false,
    });
    setImageMode("url");
    setShowModal(true);
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    try {
      setUploading(true);
      const res = await axios.post(`${BACKEND}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data", ...getHeaders() },
      });
      setForm((prev) => ({ ...prev, [field]: res.data.url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleFlag = (key) => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.gender || !form.price || !form.quantity || !form.description || !form.image) {
      toast.error("Please fill all required fields (at least 1 image)!"); return;
    }
    if (form.sizes.length === 0) {
      toast.error("Please select at least one size!"); return;
    }
    try {
      setSaving(true);
      const payload = {
        ...form,
        sizes:           JSON.stringify(form.sizes),
        is_most_sold:    form.is_most_sold,
        is_new:          form.is_new,
        discount:        form.discount,
        is_out_of_stock: form.is_out_of_stock,
      };
      if (editingProduct) {
        await axios.put(`${API}/products/${editingProduct.id}`, payload, { headers: getHeaders() });
        toast.success("Product Updated!");
      } else {
        await axios.post(`${API}/products`, payload, { headers: getHeaders() });
        toast.success("Product Added!");
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.error || err.response?.data?.message || "Error saving product");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/products/${id}`, { headers: getHeaders() });
      toast.success("Product Deleted!");
      fetchProducts();
    } catch { toast.error("Failed to delete product"); }
  };

  const imageFields = [
    { key: "image",  label: "Main Image *" },
    { key: "image2", label: "Image 2" },
    { key: "image3", label: "Image 3" },
    { key: "image4", label: "Image 4" },
    { key: "image5", label: "Image 5" },
  ];

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
                  {["Image", "Name", "Category", "Gender", "Price", "Qty", "Sizes", "Flags", "Actions"].map((h) => (
                    <th key={h} className="text-gray-500 text-xs uppercase tracking-[2px] font-bold px-6 py-4 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const sizeList = p.sizes
                    ? (Array.isArray(p.sizes) ? p.sizes : (() => { try { return JSON.parse(p.sizes); } catch { return []; } })())
                    : [];
                  return (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-black">
                          {resolveImg(p.image) ? (
                            <img
                              src={resolveImg(p.image)}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML =
                                  `<div class="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-bold text-sm">{p.name}</td>
                      <td className="px-6 py-4 text-[#8da27f] text-sm font-semibold">{p.category}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{p.gender}</td>
                      <td className="px-6 py-4 text-white font-black text-sm">
                        Rs. {Number(p.price).toLocaleString()}
                        {p.discount > 0 && (
                          <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                            -{p.discount}%
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{p.quantity}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {sizeList.map((s) => (
                            <span key={s} className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full">US {s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {p.is_most_sold    && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full w-fit">🔥 Most Sold</span>}
                          {p.is_new          && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full w-fit">✨ New</span>}
                          {p.is_out_of_stock && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full w-fit">❌ Out of Stock</span>}
                        </div>
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#161616] rounded-[32px] border border-white/10 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-2xl font-black uppercase">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-5">

              <Field label="Product Name *">
                <input type="text" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nike Air Max" className={inputCls} />
              </Field>

              <Field label="Category *">
                <input type="text" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Sneakers, Running, Casual..." className={inputCls} />
              </Field>

              <Field label="Gender *">
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className={inputCls}>
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Price (Rs.) *">
                  <input type="number" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="9500" className={inputCls} />
                </Field>
                <Field label="Quantity *">
                  <input type="number" value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    placeholder="10" className={inputCls} />
                </Field>
              </div>

              <Field label="Available Sizes (US) *">
                <div className="grid grid-cols-8 gap-2 mt-1">
                  {SHOE_SIZES.map((size) => (
                    <button key={size} type="button" onClick={() => toggleSize(size)}
                      className={`h-10 rounded-xl font-bold text-sm border transition ${
                        form.sizes.includes(size)
                          ? "bg-[#8da27f] border-[#8da27f] text-white"
                          : "bg-black border-white/10 text-gray-400 hover:border-[#8da27f]/60"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
                {form.sizes.length > 0 && (
                  <p className="text-[#8da27f] text-xs mt-2">
                    Selected: {[...form.sizes].sort((a, b) => a - b).map(s => `US ${s}`).join(", ")}
                  </p>
                )}
              </Field>

              <div className="flex flex-col gap-3">
                <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Product Flags</label>
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" onClick={() => toggleFlag("is_most_sold")}
                    className={`h-12 rounded-2xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                      form.is_most_sold
                        ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                        : "bg-black border-white/10 text-gray-400 hover:border-yellow-500/40"
                    }`}>
                    <Star size={14} /> Most Sold
                  </button>
                  <button type="button" onClick={() => toggleFlag("is_new")}
                    className={`h-12 rounded-2xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                      form.is_new
                        ? "bg-blue-500/20 border-blue-500 text-blue-400"
                        : "bg-black border-white/10 text-gray-400 hover:border-blue-500/40"
                    }`}>
                    ✨ New Arrival
                  </button>
                  <button type="button" onClick={() => toggleFlag("is_out_of_stock")}
                    className={`h-12 rounded-2xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                      form.is_out_of_stock
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-black border-white/10 text-gray-400 hover:border-red-500/40"
                    }`}>
                    <AlertTriangle size={14} /> Out of Stock
                  </button>
                </div>

                <Field label="Discount % (0 = no discount)">
                  <div className="flex items-center gap-3">
                    <input type="number" min="0" max="90" value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: e.target.value })}
                      placeholder="0" className={inputCls} />
                    {form.discount > 0 && (
                      <span className="text-red-400 font-bold text-sm whitespace-nowrap shrink-0">
                        <Tag size={12} className="inline mr-1" />-{form.discount}% OFF
                      </span>
                    )}
                  </div>
                </Field>
              </div>

              {/* Image Mode Toggle */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">Images (up to 5)</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setImageMode("url")}
                      className={`flex items-center gap-1 px-3 h-8 rounded-xl text-xs font-bold border transition ${
                        imageMode === "url" ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 text-gray-400 hover:border-white/30"
                      }`}>
                      <Link size={11} /> URL
                    </button>
                    <button type="button" onClick={() => setImageMode("upload")}
                      className={`flex items-center gap-1 px-3 h-8 rounded-xl text-xs font-bold border transition ${
                        imageMode === "upload" ? "bg-[#8da27f] border-[#8da27f] text-white" : "border-white/10 text-gray-400 hover:border-white/30"
                      }`}>
                      <Upload size={11} /> Upload
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {imageFields.map(({ key, label }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <span className="text-gray-600 text-[11px] uppercase tracking-[1px]">{label}</span>
                      {imageMode === "url" ? (
                        <input type="text" value={form[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          placeholder="https://... paste image URL"
                          className="bg-black border border-white/10 rounded-2xl px-5 h-11 text-white text-sm outline-none focus:border-blue-500 transition placeholder:text-gray-700" />
                      ) : (
                        <div className="flex items-center gap-3">
                          <label className="flex-1 flex items-center gap-2 bg-black border border-white/10 rounded-2xl px-5 h-11 cursor-pointer hover:border-[#8da27f] transition">
                            <Upload size={14} className="text-gray-500" />
                            <span className="text-gray-500 text-sm">
                              {form[key] ? "✓ Uploaded" : "Choose file from laptop..."}
                            </span>
                            <input type="file" accept="image/*" className="hidden"
                              onChange={(e) => handleFileUpload(e, key)} />
                          </label>
                          {form[key] && (
                            <button type="button" onClick={() => setForm({ ...form, [key]: "" })}
                              className="text-red-400 hover:text-red-300 transition">
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      )}
                      {form[key] && resolveImg(form[key]) && (
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-black border border-white/10">
                          <img src={resolveImg(form[key])} alt="preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = "none"; }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {uploading && (
                  <div className="flex items-center gap-2 text-[#8da27f] text-sm">
                    <div className="w-4 h-4 border-2 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </div>
                )}
              </div>

              <Field label="Description *">
                <textarea value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Product description..." rows={3}
                  className="bg-black border border-white/10 rounded-2xl px-5 py-3 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600 resize-none" />
              </Field>

              <div className="flex gap-3 mt-2">
                <button onClick={handleSave} disabled={saving || uploading}
                  className="flex-1 h-12 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] uppercase hover:bg-white hover:text-black transition disabled:opacity-50 flex items-center justify-center gap-2">
                  <Check size={16} />
                  {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
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

const inputCls = "bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600 w-full";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold">{label}</label>
      {children}
    </div>
  );
}