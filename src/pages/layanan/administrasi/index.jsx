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
      {/* NAVBAR */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* ================= HERO ================= */}
      <header className="relative w-full h-56 md:h-72 lg:h-70 overflow-hidden">
        {/* Background */}
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
              rounded-3xl
              p-6 md:p-10
              bg-white/20
              backdrop-blur-xl
              border border-white/30
              shadow-[0_25px_60px_rgba(0,0,0,0.3)]
              overflow-hidden
            "
          >
            {/* Glass highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-slate-900 text-lg md:text-xl font-semibold">
                  Layanan Administrasi
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Pilih aplikasi yang ingin diakses. Semua link akan membuka tab
                  baru.
                </p>
              </div>

              {/* ===== Cards ===== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full max-w-xs"
                    aria-label={`Buka ${item.title}`}
                  >
                    {/* ===== CARD (PRESS-IN EFFECT) ===== */}
                    <div
                      className="
                        relative
                        rounded-2xl
                        p-6
                        flex flex-col items-center text-center

                        bg-white/30
                        backdrop-blur-2xl
                        border border-white/30

                        shadow-[0_14px_30px_rgba(0,0,0,0.25)]
                        transition-all duration-300 ease-out
                        transform-gpu

                        hover:translate-y-[2px]
                        hover:scale-[0.98]
                        hover:bg-white/25
                        hover:shadow-[inset_0_4px_12px_rgba(0,0,0,0.25)]

                        active:scale-[0.96]
                        active:shadow-[inset_0_6px_18px_rgba(0,0,0,0.35)]
                      "
                    >
                      {/* Card highlight */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-white/10 to-transparent opacity-60 pointer-events-none" />

                      {/* Icon bubble */}
                      <div
                        className="
                          relative
                          w-20 h-20 md:w-24 md:h-24
                          rounded-2xl
                          flex items-center justify-center
                          mb-4

                          bg-white/40
                          backdrop-blur-xl
                          border border-white/40
                          shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                        "
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
                      <p className="mt-1 text-xs md:text-sm text-slate-600">
                        {item.desc}
                      </p>

                      <span
                        className="
                          mt-4
                          text-xs font-medium
                          text-emerald-700
                          opacity-0
                          group-hover:opacity-100
                          transition-all duration-300
                        "
                      >
                        Buka aplikasi →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
