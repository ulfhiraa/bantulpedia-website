import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdministrasiIndex from "./pages/layanan/administrasi";
import InformasiIndex from "./pages/layanan/informasi/informasi";
import PublikIndex from "./pages/layanan/publik";
import DukcapilSmart from "./pages/layanan/publik/kependudukan/DukcapilSmart";
import "leaflet/dist/leaflet.css";
import Tentang from "./pages/Tentang";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/layanan/administrasi" element={<AdministrasiIndex />} />
      <Route path="/layanan/informasi" element={<InformasiIndex />} />
      <Route path="/layanan/publik" element={<PublikIndex />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/layanan/publik/kependudukan/dukcapil-smart" element={<DukcapilSmart />} />
    </Routes>
  );
}
