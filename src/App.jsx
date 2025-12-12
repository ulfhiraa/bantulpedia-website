import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdministrasiIndex from "./pages/layanan/administrasi";
import InformasiIndex from "./pages/layanan/informasi/informasi";
import PublikIndex from "./pages/layanan/publik";
import DukcapilSmart from "./pages/layanan/publik/kependudukan/DukcapilSmart";
import PendaftaranRSUD from "./pages/layanan/publik/kesehatan/PendaftaranRSUD.jsx";
import StatusPasien from "./pages/layanan/publik/kesehatan/StatusPasien.jsx";
import CariDokter from "./pages/layanan/publik/kesehatan/CariDokter.jsx";
import Stunting from "./pages/layanan/publik/kesehatan/stunting.jsx";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/layanan/administrasi" element={<AdministrasiIndex />} />
        <Route path="/layanan/informasi" element={<InformasiIndex />} />
        <Route path="/layanan/publik" element={<PublikIndex />} />
        <Route path="/layanan/publik/kependudukan/dukcapil-smart" element={<DukcapilSmart />} />
        <Route path="/layanan/publik/kesehatan/pendaftaran-rsud" element={<PendaftaranRSUD />} />
        <Route path="/layanan/publik/kesehatan/status-pasien" element={<StatusPasien />} />
        <Route path="/layanan/publik/kesehatan/cari-dokter" element={<CariDokter />} />
        <Route path="/layanan/publik/kesehatan/statusgizi" element={<Stunting />} />
      </Routes>
    </div>
  );
}
