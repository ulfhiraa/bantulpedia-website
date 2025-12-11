import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";

function useInView(ref, options = { threshold: 0.18 }) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setInView(true)),
      options
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, options])
  return inView
}

export default function FeatureSection() {
  const ref = useRef(null)
  const inView = useInView(ref)

  const features = [
    {
      id: "lapor",
      icon: "📸",
      title: "Lapor Bantul",
      excerpt: "Laporkan masalah publik seperti jalan rusak, drainase, dan lain-lain.",
      image: "/src/assets/LaporBantul.png",
      linkText: "Laporkan sekarang →",
      link: "https://www.lapor.go.id/"
    },
    {
      id: "berita",
      icon: "📰",
      title: "Berita",
      excerpt: "Berita terbaru dari Pemerintah Kabupaten Bantul.",
      image: "/src/assets/feature-berita.jpg",
      linkText: "Baca berita →",
      link: "/layanan/informasi#berita"
    },
    {
      id: "event",
      icon: "🎫",
      title: "Event",
      excerpt: "Agenda dan kegiatan resmi di Bantul.",
      image: "/src/assets/LogoBantulEvents.png",
      linkText: "Lihat event →",
      link: "/layanan/informasi#event"
    },
    {
      id: "wisata",
      icon: "🏖️",
      title: "Wisata",
      excerpt: "Rekomendasi wisata dan kuliner di Bantul.",
      image: "/src/assets/LogoBantulWisata.png",
      linkText: "Jelajahi wisata →",
      link: "/layanan/publik/pariwisata/jelajah-bantul"
    },
    {
      id: "cctv",
      icon: "📹",
      title: "CCTV",
      excerpt: "Pantau CCTV publik untuk melihat kondisi daerah.",
      image: "/src/assets/cctv.png",
      linkText: "Lihat CCTV →",
      link: "/layanan/informasi#cctv"
    },
  ]

  const [active, setActive] = useState(null)
  const defaultPreview = '/src/assets/default.png'
  const activeItem = active !== null ? features[active] : null

  function toggle(i) {
    setActive(prev => (prev === i ? null : i))
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#074b25ff" }}>
            Bantulpedia
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Fitur favorit yang bikin hidup makin update
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT LIST */}
          <div className={`lg:col-span-7 space-y-4 transition duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {features.map((f, i) => {
              const isOpen = active === i
              return (
                <div key={f.id} className="bg-white rounded-lg">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left px-4 py-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-lg">
                      {f.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-medium text-slate-800">{f.title}</div>
                        <div className="text-slate-400">{isOpen ? "∧" : "∨"}</div>
                      </div>

                      {isOpen && (
                        <p className="mt-2 text-sm text-slate-600">{f.excerpt}</p>
                      )}
                    </div>
                  </button>

                  <div className="border-b border-slate-200" />
                </div>
              )
            })}
          </div>

          {/* RIGHT PREVIEW */}
          <div className={`lg:col-span-5 transition duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="sticky top-28">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden">
                  <img
                    src={activeItem ? activeItem.image : defaultPreview}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {activeItem ? activeItem.title : "Aplikasi Bantulpedia"}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    {activeItem ? activeItem.excerpt : "Klik fitur di kiri untuk melihat detail."}
                  </p>

                  <div className="mt-4">
                    {activeItem && (
                      <Link
                        to={activeItem.link}
                        className="text-emerald-600 text-sm font-medium"
                      >
                        {activeItem.linkText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
