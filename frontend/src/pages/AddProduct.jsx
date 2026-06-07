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

  // IMAGE HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max size 5MB!");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // SUBMIT
  const handleAddProduct = async () => {
    if (!name || !category || !gender || !price || !quantity || !description || !imageFile) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("gender", gender);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);

      // IMPORTANT: must match backend upload.single("image")
      formData.append("image", imageFile);

      const res = await axios.post(
        "http://localhost:5000/api/products/addproduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data.message || "Product added!");

      // reset
      setName("");
      setCategory("");
      setGender("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);

    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3f3f3] px-6 py-10">
      <div className="max-w-[700px] mx-auto bg-white p-8 rounded-[30px] shadow-lg">

        <h1 className="text-[45px] font-black tracking-[-3px]">Add Product</h1>

        <div className="space-y-5 mt-8">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border px-4"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border px-4"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border px-4"
          >
            <option value="">Select Gender</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border px-4"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full h-[58px] border rounded-[14px] px-4"
          />

          {/* IMAGE */}
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-[180px] border-dashed border-2 cursor-pointer rounded-[14px]">
              <UploadCloud />
              <p>Upload Image</p>
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          ) : (
            <div className="relative h-[220px]">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover rounded-[14px]"
              />

              <button
                onClick={removeImage}
                className="absolute top-3 right-3 bg-black text-white p-2 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[120px] border rounded-[14px] p-3"
          />

          <button
            onClick={handleAddProduct}
            disabled={loading}
            className="w-full h-[58px] bg-black text-white rounded-[14px]"
          >
            {loading ? "ADDING..." : "ADD PRODUCT"}
          </button>

        </div>
      </div>
    </section>
  );
}