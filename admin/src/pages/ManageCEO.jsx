import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const API = "http://localhost:5000/api/admin";

export default function ManageCEO() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [currentCEO, setCurrentCEO] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const fetchCEO = async () => {
    try {
      const res = await axios.get(`${API}/ceo`, { headers: getHeaders() });
      setCurrentCEO(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCEO();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadCEO = async () => {
    if (!image) return alert("Select image first");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      await axios.post(`${API}/upload-ceo`, formData, {
        headers: getHeaders(), // multipart is set automatically by browser
      });

      alert("CEO Updated Successfully!");
      setImage(null);
      setPreview("");
      fetchCEO();
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-[#161616] p-10 rounded-3xl border border-white/10 w-full max-w-md">
          <h1 className="text-white text-3xl font-black mb-6 text-center">
            Manage CEO
          </h1>

          {/* ✅ Cloudinary URL is already full — no BACKEND prefix */}
          {currentCEO?.image && (
            <img
              src={currentCEO.image}
              alt="Current CEO"
              className="w-40 h-40 rounded-full mx-auto mb-5 object-cover border-4 border-[#8da27f]"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="text-white mb-5 w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded-full mx-auto mb-5 object-cover border-4 border-white/20"
            />
          )}

          <button
            onClick={uploadCEO}
            disabled={loading}
            className="w-full bg-[#8da27f] text-white py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload CEO Image"}
          </button>
        </div>
      </div>
    </div>
  );
}