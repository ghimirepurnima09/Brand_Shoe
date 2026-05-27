// App.jsx

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainHome from "./pages/MainHome";

import CollectionsPage from "./pages/CollectionsPage";
import MostSoldPage from "./pages/MostSoldPage";
import OffersPage from "./pages/OffersPage";

import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";

export default function App() {

  return (

    <Routes>

      {/* FIRST HOME PAGE */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ACTUAL HOME PAGE AFTER LOGIN */}

      <Route
        path="/mainhome"
        element={<MainHome />}
      />

      {/* COLLECTIONS */}

      <Route
        path="/collections"
        element={<CollectionsPage />}
      />

      {/* MOST SOLD PAGE */}

      <Route
        path="/mostsold"
        element={<MostSoldPage />}
      />

      {/* OFFERS PAGE */}

      <Route
        path="/offers"
        element={<OffersPage />}
      />

      {/* CATEGORY PAGES */}

      <Route
        path="/women"
        element={<Women />}
      />

      <Route
        path="/men"
        element={<Men />}
      />

      <Route
        path="/kids"
        element={<Kids />}
      />

    </Routes>

  );

}