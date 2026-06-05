import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN SUCCESS:", res.data);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);

        localStorage.setItem(
          "adminUser",
          JSON.stringify(res.data.admin)
        );

        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold mb-3">
            Brand Shoe
          </p>

          <h1 className="text-white text-5xl font-black leading-none">
            ADMIN
            <br />
            PANEL
          </h1>

          <p className="text-gray-500 text-sm mt-4">
            Restricted access — admins only
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#161616] rounded-[32px] border border-white/10 p-10 flex flex-col gap-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-3 text-red-400 text-sm font-bold">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold flex items-center gap-2">
              <Mail size={12} />
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
              placeholder="admin@gmail.com"
              className="bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs uppercase tracking-[2px] font-bold flex items-center gap-2">
              <Lock size={12} />
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleLogin()
                }
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-2xl px-5 h-12 text-white text-sm outline-none focus:border-[#8da27f] transition placeholder:text-gray-600 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                {showPass ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[52px] rounded-full bg-[#8da27f] text-white font-bold tracking-[3px] uppercase hover:bg-white hover:text-black transition duration-300 disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </section>
  );
}