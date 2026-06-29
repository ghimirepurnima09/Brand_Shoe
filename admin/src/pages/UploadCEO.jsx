import { useState } from "react";
import axios from "axios";

export default function UploadCEO() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/upload-ceo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("CEO Image Uploaded");
      console.log(res.data);

    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">
      <div className="bg-[#161616] p-8 rounded-3xl w-full max-w-md border border-white/10">

        <h1 className="text-white text-3xl font-black mb-8 text-center">
          Upload CEO Image
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="text-white mb-6"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-[#8da27f]"
          />
        )}

        <button
          onClick={uploadImage}
          disabled={loading}
          className="w-full bg-[#8da27f] text-white py-3 rounded-xl font-bold hover:opacity-90"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}