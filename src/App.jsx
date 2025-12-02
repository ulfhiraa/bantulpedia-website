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
import AgendaPerangkatDaerah from "./pages/layanan/publik/pemerintahan/AgendaPerangkatDaerah.jsx";
import BukuTamu from "./pages/layanan/publik/pemerintahan/BukuTamu.jsx";
import ReservasiKunjungan from "./pages/layanan/publik/pemerintahan/ReservasiKunjungan.jsx";
import Ipkd from "./pages/layanan/publik/pemerintahan/ipkd";
import CekTagihan from './pages/layanan/publik/pajakretri/CekTagihan';
import SiPenthol from "./pages/layanan/publik/pajakretri/SiPenthol.jsx";
import RealisasiRetribusi from "./pages/layanan/publik/pajakretri/RealisasiRetribusi.jsx";

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
      <Route path="/layanan/publik/kesehatan/pendaftaran-rsud" element={<PendaftaranRSUD />} />
      <Route path="/layanan/publik/kesehatan/status-pasien" element={<StatusPasien />} />
      <Route path="/layanan/publik/kesehatan/cari-dokter" element={<CariDokter />} />
      <Route path="/layanan/publik/pemerintahan/agenda-perangkat-daerah" element={<AgendaPerangkatDaerah />} />
      <Route path="/layanan/publik/pemerintahan/buku-tamu" element={<BukuTamu />} />
      <Route path="/layanan/publik/pemerintahan/reservasi-kunjungan" element={<ReservasiKunjungan />} />
      <Route path="/layanan/publik/pemerintahan/ipkd" element={<Ipkd />} />
      <Route path="/layanan/publik/pajakretri/cek-tagihan" element={<CekTagihan />} />
      <Route path="/layanan/publik/pajakretri/sipenthol" element={<SiPenthol />} />
      <Route path="/layanan/publik/pajakretri/realisasi-retribusi" element={<RealisasiRetribusi />} />
    </Routes>
  );
}
