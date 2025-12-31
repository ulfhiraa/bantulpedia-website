import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// HERO IMAGE
import heroBg from "../../../assets/pandansimo1.jpg";

// icons
import surbanIcon from "../../../assets/surban.png";
import presensiIcon from "../../../assets/presensi.png";
import ekinerjaIcon from "../../../assets/ekinerja.png";

export default function AdministrasiIndex() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* ================= HERO BACKGROUND ================= */}
      <div
        className="absolute top-0 left-0 w-full h-[80vh] bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ================= NAVBAR ================= */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ================= MAIN ================= */}
      <main className="relative z-30 flex-grow px-4 md:px-6 pt-28 md:pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* ===== PANEL ===== */}
          <div className="relative rounded-2xl bg-white shadow-sm px-10 py-10">
            {/* HEADER */}
            <div className="text-center mb-10">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Layanan Administrasi
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Pilih aplikasi yang ingin diakses. Semua link akan membuka tab baru.
              </p>
            </div>

            {/* SERVICES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              {/* SURBAN */}
              <a
                href="https://esurat.bantulkab.go.id/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img src={surbanIcon} className="w-16 h-16 mb-4" />
                <h3 className="font-semibold text-gray-900">SURBAN</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Sistem Urusan Bantul
                </p>
              </a>

              {/* PRESENSI */}
              <a
                href="https://play.google.com/store/apps/details?id=dmi.presensibantul&hl=id&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img src={presensiIcon} className="w-16 h-16 mb-4" />
                <h3 className="font-semibold text-gray-900">Presensi</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Presensi Pegawai
                </p>
              </a>

              {/* EKINERJA */}
              <a
                href="https://kinerja.bkn.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img src={ekinerjaIcon} className="w-16 h-16 mb-4" />
                <h3 className="font-semibold text-gray-900">eKinerja</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Kinerja ASN
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
