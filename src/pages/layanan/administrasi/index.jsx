import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

// HERO IMAGE
import heroBg from "../../../assets/pandansimo1.jpg";

// icons
import surbanIcon from "../../../assets/surban.png";
import presensiIcon from "../../../assets/presensi.png";
import ekinerjaIcon from "../../../assets/ekinerja.png";

export default function AdministrasiIndex() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ================= NAVBAR ================= */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* ================= HERO ================= */}
      <header className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden">
        <div className="h-40 md:h-60 relative">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative z-30 w-full -mt-34 px-4 md:px-8 pb-16">
        {/* ===== PANEL PUTIH ===== */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10">
          
          {/* ===== HEADER ===== */}
          <div className="text-center mb-12">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Layanan Administrasi
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Pilih aplikasi yang ingin diakses. Semua link akan membuka tab baru.
            </p>
          </div>

          {/* ===== ICON MENU ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            
            {/* SURBAN */}
            <a
              href="https://esurat.bantulkab.go.id/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center"
            >
              <img
                src={surbanIcon}
                alt="SURBAN"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-semibold text-gray-900">
                SURBAN
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Sistem Urusan Bantul
              </p>
            </a>

            {/* PRESENSI */}
            <a
              href="https://play.google.com/store/apps/details?id=dmi.presensibantul&hl=id&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center"
            >
              <img
                src={presensiIcon}
                alt="Presensi"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-semibold text-gray-900">
                Presensi
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Presensi Pegawai
              </p>
            </a>

            {/* EKINERJA */}
            <a
              href="https://kinerja.bkn.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center"
            >
              <img
                src={ekinerjaIcon}
                alt="eKinerja"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-semibold text-gray-900">
                eKinerja
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Kinerja ASN
              </p>
            </a>

          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
