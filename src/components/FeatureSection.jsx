import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBullhorn,
  faNewspaper,
  faCalendarDays,
  faUmbrellaBeach,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

/* ================= IN VIEW ================= */
function useInView(ref, options = { threshold: 0.2 }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      options
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, options]);

  return inView;
}

export default function FeatureSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const features = [
    {
      title: "Lapor Bantul",
      icon: faBullhorn,
      excerpt:
        "Laporkan masalah publik seperti jalan rusak, drainase, dan fasilitas umum lainnya.",
      image: "/src/assets/LaporBantul.png",
      linkText: "Laporkan sekarang →",
      link: "https://www.lapor.go.id/",
    },
    {
      title: "Berita",
      icon: faNewspaper,
      excerpt: "Berita terbaru dan resmi dari Pemerintah Kabupaten Bantul.",
      image: "/src/assets/Berita.png",
      linkText: "Baca berita →",
      link: "/layanan/informasi#berita",
    },
    {
      title: "Event",
      icon: faCalendarDays,
      excerpt: "Agenda kegiatan, acara daerah, dan event resmi di Bantul.",
      image: "/src/assets/LogoBantulEvents.png",
      linkText: "Lihat event →",
      link: "/layanan/informasi#event",
    },
    {
      title: "Wisata",
      icon: faUmbrellaBeach,
      excerpt: "Rekomendasi destinasi wisata, budaya, dan kuliner Bantul.",
      image: "/src/assets/LogoBantulWisata.png",
      linkText: "Jelajahi wisata →",
      link: "/layanan/publik/Pariwisata/jelajah-bantul",
    },
    {
      title: "CCTV",
      icon: faVideo,
      excerpt: "Pantau CCTV publik untuk melihat kondisi lalu lintas dan wilayah.",
      image: "/src/assets/cctv.png",
      linkText: "Lihat CCTV →",
      link: "/layanan/informasi#cctv",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section ref={sectionRef} className="py-24 bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold" style={{ color: "#074b25ff" }}>
            Bantulpedia
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Fitur favorit yang bikin hidup makin update
          </p>
        </div>

        {/* CARD */}
        <div
          className={`bg-white rounded-3xl shadow-sm transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-10">

            {/* LEFT — SMOOTH EXPAND */}
            <div className="lg:col-span-6 space-y-2">
              {features.map((item, i) => {
                const isActive = active === i;

                return (
                  <div key={i} className="border-b border-slate-200 pb-3">
                    <button
                      onClick={() => setActive(i)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                            isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <FontAwesomeIcon icon={item.icon} />
                        </span>

                        <h3 className="text-base font-semibold text-slate-900">
                          {item.title}
                        </h3>
                      </div>

                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* 🔥 SMOOTH GRID EXPAND (KEY PART) */}
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 mt-2"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-slate-600 leading-snug">
                          {item.excerpt}
                        </p>
                        <Link
                          to={item.link}
                          className="inline-block mt-1 text-sm font-medium text-emerald-600"
                        >
                          {item.linkText}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — STABLE PREVIEW */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full h-[320px] rounded-2xl bg-[#f5f5f7] overflow-hidden">
                {features.map((f, i) => (
                  <img
                    key={i}
                    src={f.image}
                    alt={f.title}
                    className={`absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-500 ease-out ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
