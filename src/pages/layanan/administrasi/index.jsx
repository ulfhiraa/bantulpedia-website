// src/pages/layanan/administrasi/index.jsx
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
      <div className="z-50">
        <Navbar />
      </div>

      {/* HERO */}
      <header className="relative w-full h-56 md:h-72 lg:h-96 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transform-gpu"
          style={{
            backgroundImage: `url(${heroBg})`,
            filter: "contrast(0.95)",
          }}
          aria-hidden="true"
        />

        {/* Dark + green tint overlay untuk sinkron dengan footer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,30,20,0.45) 0%, rgba(0,20,15,0.55) 60%, rgba(0,10,8,0.65) 100%)",
            backdropFilter: "saturate(120%)",
          }}
          aria-hidden="true"
        />

        {/* Optional hero text (centered) */}
        <div className="relative z-20 flex items-center justify-center h-full px-4">
          <div className="text-center text-white">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold drop-shadow-md">
              Administrasi Pemerintahan
            </h1>
            <p className="mt-2 text-sm md:text-base text-emerald-100/80 max-w-2xl">
              Akses cepat ke aplikasi administrasi & layanan internal pemerintah
              daerah Bantul.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN - card container floating di atas hero */}
      <main className="relative z-30 w-full px-4 md:px-6 -mt-16 md:-mt-20 mb-12">
        <div className="max-w-6xl mx-auto">
          {/* Floating panel */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10">
            <div className="text-center mb-6">
              <h2 className="text-slate-900 text-lg md:text-xl font-semibold">
                Layanan Administrasi
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Pilih aplikasi yang ingin diakses. Semua link akan membuka tab
                baru.
              </p>
            </div>

            {/* Grid kartu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs group"
                  aria-label={`Buka ${item.title}`}
                >
                  <div
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center transition-transform duration-200 transform-gpu
                      hover:-translate-y-3 hover:shadow-lg focus-within:-translate-y-3 focus-within:shadow-lg"
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        boxShadow: "inset 0 -6px 18px rgba(0,0,0,0.06)",
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={`${item.title} icon`}
                        className="w-12 h-12 md:w-14 md:h-14 object-contain"
                      />
                    </div>

                    <h3 className="text-sm md:text-base font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-slate-500">
                      {item.desc}
                    </p>

                    <span
                      className="mt-4 inline-flex items-center gap-2 text-emerald-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      aria-hidden="true"
                    >
                      Buka aplikasi →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
