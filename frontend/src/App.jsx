import { Routes, Route } from "react-router-dom";

import Home           from "./pages/Home";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword  from "./pages/ResetPassword";
import MainHome       from "./pages/MainHome";
import Wishlist       from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import CollectionsPage from "./pages/CollectionsPage";
import MostSoldPage   from "./pages/MostSoldPage";
import OffersPage     from "./pages/OffersPage";
import Payment        from "./pages/Payment";
import Orders         from "./pages/Orders";
import Women          from "./pages/Women";
import Men            from "./pages/Men";
import Kids           from "./pages/Kids";
import Cart           from "./pages/Cart";
import Profile        from "./pages/Profile";
import AddProduct     from "./pages/AddProduct";

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<Home />} />
      <Route path="/login"         element={<Login />} />
      <Route path="/register"      element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/mainhome"      element={<MainHome />} />
      <Route path="/collections"   element={<CollectionsPage />} />
      <Route path="/mostsold"      element={<MostSoldPage />} />
      <Route path="/offers"        element={<OffersPage />} />
      <Route path="/wishlist"      element={<Wishlist />} />
      <Route path="/women"         element={<Women />} />
      <Route path="/men"           element={<Men />} />
      <Route path="/kids"          element={<Kids />} />
      <Route path="/product/:id"   element={<ProductDetails />} />
      <Route path="/cart"          element={<Cart />} />
      <Route path="/payment"       element={<Payment />} />
      <Route path="/orders"        element={<Orders />} />
      <Route path="/profile"       element={<Profile />} />
      <Route path="/addproduct"    element={<AddProduct />} />
    </Routes>
  );
}