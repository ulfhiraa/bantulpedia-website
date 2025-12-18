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

  const items = [
    {
      id: "surban",
      title: "SURBAN",
      desc: "Sistem Urusan Bantul",
      icon: surbanIcon,
      url: "https://esurat.bantulkab.go.id/login",
    },
    {
      id: "presensi",
      title: "Presensi",
      desc: "Aplikasi presensi pegawai",
      icon: presensiIcon,
      url: "https://play.google.com/store/apps/details?id=dmi.presensibantul&hl=id&pli=1",
    },
    {
      id: "ekinerja",
      title: "eKinerja",
      desc: "Sistem penilaian kinerja ASN",
      icon: ekinerjaIcon,
      url: "https://kinerja.bkn.go.id/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* ================= HERO ================= */}
      <header className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,40,30,0.45), rgba(0,25,20,0.6), rgba(0,15,12,0.7))",
          }}
        />
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative z-30 w-full px-4 md:px-6 -mt-16 md:-mt-20 mb-16">
        <div className="max-w-6xl mx-auto">
          {/* ===== Glass Panel ===== */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                px-8 py-10

                bg-white/14
                backdrop-blur-md
                border border-white/25

                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              "
            >

            {/* Glass highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* HEADER */}
              <div className="text-center mb-8">
                <h2 className="text-slate-900 text-lg md:text-xl font-semibold">
                  Layanan Administrasi
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Pilih aplikasi yang ingin diakses. Semua link akan membuka tab
                  baru.
                </p>
              </div>

              {/* ===== SERVICES ===== */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

                {/* SURBAN */}
                <a
                  href="https://esurat.bantulkab.go.id/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 transition"
                >
                  <img
                    src={surbanIcon}
                    className="w-14 h-14 object-contain opacity-90 group-hover:scale-105 transition"
                  />
                  <h3 className="text-sm font-semibold text-slate-900">
                    SURBAN
                  </h3>
                  <p className="text-xs text-slate-600">
                    Sistem Urusan Bantul
                  </p>
                </a>

                {/* PRESENSI */}
                <a
                  href="https://play.google.com/store/apps/details?id=dmi.presensibantul&hl=id&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 transition"
                >
                  <img
                    src={presensiIcon}
                    className="w-14 h-14 object-contain opacity-90 group-hover:scale-105 transition"
                  />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Presensi
                  </h3>
                  <p className="text-xs text-slate-600">
                    Presensi Pegawai
                  </p>
                </a>

                {/* EKINERJA */}
                <a
                  href="https://kinerja.bkn.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 transition"
                >
                  <img
                    src={ekinerjaIcon}
                    className="w-14 h-14 object-contain opacity-90 group-hover:scale-105 transition"
                  />
                  <h3 className="text-sm font-semibold text-slate-900">
                    eKinerja
                  </h3>
                  <p className="text-xs text-slate-600">
                    Kinerja ASN
                  </p>
                </a>

              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
