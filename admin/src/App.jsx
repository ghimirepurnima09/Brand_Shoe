import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from "./pages/ManageOrders";
import Payments     from "./pages/Payments";
import UploadCEO from "./pages/UploadCEO";
import ManageCEO from "./pages/ManageCEO";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
};


export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <ManageProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/orders"   element={<ManageOrders />} />
      <Route path="/admin/payments" element={<Payments />} /> 
      <Route path="/upload-ceo" element={<UploadCEO />} />
      <Route path="/admin/ceo" element={<ManageCEO />} />
      
  

      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}