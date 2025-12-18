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
          {/* Banner – clear image with deep tone */}
          <div className="h-40 md:h-60 relative overflow-hidden ">
            {/* Background image (jernih) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Deep dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Subtle color tone (optional, for depth) */}
            <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="relative z-30 w-full -mt-12 md:-mt-16 px-4 md:px-8 pb-10">
            {/* ===== Glass Panel ===== */}
            <div
              className="
                relative
                rounded-3xl
                p-6 md:p-8
                bg-white/20
                backdrop-blur-sm
                border border-white/10
                shadow-[0_25px_60px_rgba(0,0,0,0.3)]
                overflow-hidden
              "
            >
              {/* Glass highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="relative z-10">

                {/* ===== HEADER ===== */}
                <div className="text-center mb-10">
                  <h2 className="text-slate-900 text-lg md:text-xl font-semibold">
                    Layanan Administrasi
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Pilih aplikasi yang ingin diakses. Semua link akan membuka tab baru.
                  </p>
                </div>

                {/* ===== CARDS ===== */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                    {/* SURBAN */}
                    <a
                      href="https://esurat.bantulkab.go.id/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-64
                        rounded-2xl
                        p-6
                        bg-white/80
                        border border-slate-200
                        shadow-md
                        flex flex-col items-center text-center
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition
                      "
                    >
                      <img src={surbanIcon} className="w-12 h-12 mb-4" />
                      <h3 className="text-sm font-semibold text-slate-900">SURBAN</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Sistem Urusan Bantul
                      </p>
                    </a>

                    {/* PRESENSI */}
                    <a
                      href="https://play.google.com/store/apps/details?id=dmi.presensibantul&hl=id&pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-64
                        rounded-2xl
                        p-6
                        bg-white/80
                        border border-slate-200
                        shadow-md
                        flex flex-col items-center text-center
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition
                      "
                    >
                      <img src={presensiIcon} className="w-12 h-12 mb-4" />
                      <h3 className="text-sm font-semibold text-slate-900">Presensi</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Presensi Pegawai
                      </p>
                    </a>

                    {/* EKINERJA */}
                    <a
                      href="https://kinerja.bkn.go.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-64
                        rounded-2xl
                        p-6
                        bg-white/80
                        border border-slate-200
                        shadow-md
                        flex flex-col items-center text-center
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition
                      "
                    >
                      <img src={ekinerjaIcon} className="w-12 h-12 mb-4" />
                      <h3 className="text-sm font-semibold text-slate-900">eKinerja</h3>
                      <p className="text-xs text-slate-600 mt-1">
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
