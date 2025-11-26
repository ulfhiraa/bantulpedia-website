import React, { useEffect, useRef, useState } from "react";

export default function CategorySection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  // DATA KATEGORI
  const CATEGORIES = [
    {
      id: "info",
      title: "Informasi Publik",
      itemsCount: 8,
      image: "/src/assets/icon-category.png",
      services: [
        { name: "Pengumuman", icon: "📢" },
        { name: "Berita", icon: "📰" },
        { name: "CCTV", icon: "📹" },
        { name: "Titik Wifi", icon: "📶" },
        { name: "Galeri Foto", icon: "📷" },
      ],
    },
    {
      id: "layanan",
      title: "Layanan Publik",
      itemsCount: 45,
      image: "/src/assets/icon-category.png",
      services: [
        { name: "Kesehatan", icon: "🩺" },
        { name: "Pendidikan", icon: "🎓" },
        { name: "Pariwisata", icon: "🗺️" },
        { name: "Kebudayaan", icon: "🎭" },
        { name: "Pemerintahan", icon: "🏛️" },
      ],
    },
    {
      id: "admin",
      title: "Administrasi Pemerintahan",
      itemsCount: 3,
      image: "/src/assets/icon-category.png",
      services: [
        { name: "SURBAN", icon: "🗂️" },
        { name: "Presensi Bantul", icon: "👤" },
        { name: "eKinerja", icon: "📈" },
      ],
    },
  ];

  // ANIMASI SCROLL
  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return;

      const top = sectionRef.current.getBoundingClientRect().top;
      if (top < window.innerHeight - 120) {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // cek awal load

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Kategori Layanan</h2>
            <p className="text-sm text-slate-600 mt-2">
              Berbagai layanan dan informasi untuk memudahkan masyarakat
            </p>
          </div>

          <a className="px-4 py-2 bg-slate-100 rounded-full text-sm cursor-pointer">
            Semua Layanan →
          </a>
        </div>

        {/* GRID CARD */}
        <div
          className={`
            grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {CATEGORIES.map((item) => (
                <div
                key={item.id}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                className="group bg-gray-50 hover:bg-emerald-50 transition-colors duration-300 
                    rounded-xl shadow-sm p-6 cursor-pointer flex flex-col h-full"         >
                {/* IMAGE */}
                <div className="bg-white p-4 rounded-lg flex items-center justify-center h-40">
                    <img src={item.image} className="w-24 h-24 object-contain" />
                </div>

                {/* TITLE + COUNT */}
                <div className="mt-4 h-[52px] flex items-start justify-between">
                    <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 leading-tight">
                    {item.title}
                    </h3>

                    <span className="text-xs bg-slate-200 px-2 py-1 rounded-full whitespace-nowrap">
                    {item.itemsCount} layanan
                    </span>
                </div>

                {/* LIST */}
                <ul className="mt-2 space-y-2 text-sm">
                    {item.services.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <span>{s.icon}</span>
                        <span>{s.name}</span>
                    </li>
                    ))}
                </ul>

                {/* SEE ALL */}
                <div className="mt-auto pt-4 text-right">
                    <span className="text-emerald-600 text-sm cursor-pointer">
                    Lihat Semua →
                    </span>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
