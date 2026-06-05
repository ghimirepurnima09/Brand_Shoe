import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api/admin";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  useEffect(() => {
    axios
      .get(`${API}/users`, { headers: getHeaders() })
      .then((res) => { if (res.data.success) setUsers(res.data.users); })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const refetch = () => {
    axios
      .get(`${API}/users`, { headers: getHeaders() })
      .then((res) => { if (res.data.success) setUsers(res.data.users); })
      .catch((e) => console.log(e));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API}/users/${id}`, { headers: getHeaders() });
      toast.success("User Deleted!");
      refetch();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-y-auto">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[#8da27f] uppercase tracking-[4px] text-sm font-bold">Brand Shoe Admin</p>
            <h1 className="text-white text-5xl font-black mt-2 leading-none">USERS</h1>
          </div>
          <div className="flex items-center gap-3 bg-[#161616] border border-white/10 px-5 rounded-full w-[280px] h-[48px]">
            <Search size={16} className="text-gray-500 shrink-0" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="bg-transparent outline-none text-sm text-white w-full placeholder:text-gray-600" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {[
            { label: "Total Users", value: users.length, color: "text-[#8da27f]" },
            { label: "Showing", value: filtered.length, color: "text-blue-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#161616] rounded-[24px] border border-white/10 p-6">
              <p className={`text-4xl font-black ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-[2px] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="w-12 h-12 border-4 border-[#8da27f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-[#161616] rounded-[32px] border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {["#", "Name", "Email", "Phone", "Action"].map((h) => (
                    <th key={h} className="text-gray-500 text-xs uppercase tracking-[2px] font-bold px-6 py-4 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-gray-500 py-10 text-sm">No users found</td></tr>
                ) : (
                  filtered.map((u, i) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-gray-500 text-sm">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#8da27f]/20 flex items-center justify-center shrink-0">
                            <span className="text-[#8da27f] font-black text-sm">{u.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <p className="text-white font-bold text-sm">{u.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{u.email}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{u.phone || "—"}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete(u.id)}
                          className="w-9 h-9 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}