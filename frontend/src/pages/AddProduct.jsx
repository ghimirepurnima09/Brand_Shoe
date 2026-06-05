import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UploadCloud, X } from "lucide-react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP images allowed!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB!");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAddProduct = async () => {
    if (!name || !category || !gender || !price || !quantity || !description || !imageFile) {
      toast.error("Please fill all fields and upload an image!");
      return;
    }

    try {
      setLoading(true);

      // Use FormData to send file
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("gender", gender);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/products/addproduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(response.data.message);

      // Reset form
      setName("");
      setCategory("");
      setGender("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3f3f3] px-6 py-10">
      <div className="max-w-[700px] mx-auto bg-white p-8 rounded-[30px] shadow-lg">

        <h1 className="text-[45px] font-black tracking-[-3px]">Add Product</h1>

        <div className="space-y-5 mt-8">

          {/* PRODUCT NAME */}
          <input
            type="text" placeholder="Product Name" value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none focus:border-black transition"
          />

          {/* CATEGORY */}
          <input
            type="text" placeholder="Category (e.g. Runner, Sneaker, Casual)"
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none focus:border-black transition"
          />

          {/* GENDER */}
          <select
            value={gender} onChange={(e) => setGender(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none focus:border-black transition"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          {/* PRICE */}
          <input
            type="number" placeholder="Price (Rs.)" value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none focus:border-black transition"
          />

          {/* QUANTITY */}
          <input
            type="number" placeholder="Quantity" value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none focus:border-black transition"
          />

          {/* IMAGE UPLOAD */}
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-[2px] mb-3">Product Image</p>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-[180px] rounded-[14px] border-2 border-dashed border-gray-300 cursor-pointer hover:border-black transition bg-gray-50">
                <UploadCloud size={36} className="text-gray-400 mb-3" />
                <p className="text-gray-500 font-semibold text-sm">Click to upload image</p>
                <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP — Max 5MB</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            ) : (
              <div className="relative w-full h-[220px] rounded-[14px] overflow-hidden border border-gray-200">
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-500 transition"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                  {imageFile?.name}
                </div>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[150px] rounded-[14px] border border-gray-300 px-4 py-4 outline-none resize-none focus:border-black transition"
          />

          {/* BUTTON */}
          <button
            onClick={handleAddProduct} disabled={loading}
            className="w-full h-[58px] rounded-[14px] bg-black text-white font-bold tracking-[2px] hover:bg-[#8da27f] transition disabled:opacity-60"
          >
            {loading ? "ADDING..." : "ADD PRODUCT"}
          </button>

        </div>
      </div>
    </section>
  );
}