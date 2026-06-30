import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingBag, CreditCard, LogOut, UserCircle } from "lucide-react";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const admin = JSON.parse(localStorage.getItem("adminUser") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
    };

    const links = [
        { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { path: "/admin/products",  label: "Products",  icon: <Package size={18} /> },
        { path: "/admin/users",     label: "Users",     icon: <Users size={18} /> },
        { path: "/admin/orders",    label: "Orders",    icon: <ShoppingBag size={18} /> },
        { path: "/admin/payments",  label: "Payments",  icon: <CreditCard size={18} /> },
        { path: "/admin/ceo",       label: "CEO",       icon: <UserCircle size={18} /> }, // ✅ added
    ];

    return (
        <aside className="w-[260px] min-w-[260px] min-h-screen bg-[#161616] border-r border-white/10 flex flex-col">
            <div className="p-8 border-b border-white/10">
                <p className="text-[#8da27f] uppercase tracking-[4px] text-xs font-bold">Brand Shoe</p>
                <h1 className="text-white text-2xl font-black mt-1">ADMIN</h1>
            </div>

            <div className="px-6 py-5 border-b border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8da27f]/20 border border-[#8da27f]/40 flex items-center justify-center">
                    <span className="text-[#8da27f] font-black text-lg">
                        {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
                    </span>
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{admin.name || "Admin"}</p>
                    <p className="text-gray-500 text-xs">{admin.email || ""}</p>
                </div>
            </div>

            <nav className="flex flex-col gap-2 p-4 flex-1">
                {links.map((link) => (
                    <button key={link.path} onClick={() => navigate(link.path)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm uppercase tracking-[1px] transition ${
                            location.pathname === link.path
                                ? "bg-[#8da27f] text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}>
                        {link.icon}
                        {link.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-red-400 font-bold text-sm uppercase tracking-[1px] hover:bg-red-500/10 transition">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}