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
      <header className="relative w-full h-44 md:h-56 lg:h-64 overflow-visible">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* floating badge */}
        {/* <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-30">
          <div className="bg-white/95 px-8 py-2 rounded-full shadow-md border border-slate-200 text-slate-800 font-semibold text-sm">
            Administrasi Pemerintahan
          </div>
        </div> */}
      </header>

      {/* MAIN */}
      <main className="relative z-20 w-full px-4 md:px-6 py-12 -mt-8">
        <div className="w-full bg-white rounded-xl p-4 md:p-8 shadow-sm border border-slate-100">
          <div className="flex flex-col items-center gap-6 w-full">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-[90vw] md:w-[70vw] lg:w-[60vw] max-w-[1100px]
                  rounded-lg border
                  bg-slate-100 border-slate-200
                  transition-all duration-200
                  hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-md
                "
              >
                <div className="flex flex-col items-center text-center py-6 md:py-8 px-6 md:px-12">
                  <div className="w-20 h-20 rounded-md flex items-center justify-center mb-3 bg-white">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-14 h-14 object-contain"
                    />
                  </div>

                  <h3 className="text-sm font-semibold tracking-wide text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}