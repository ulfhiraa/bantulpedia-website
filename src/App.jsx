import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdministrasiIndex from "./pages/layanan/administrasi";
import InformasiIndex from "./pages/layanan/informasi/informasi";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/layanan/administrasi" element={<AdministrasiIndex />} />
      <Route path="/layanan/informasi" element={<InformasiIndex />} />
    </Routes>
  );
}
