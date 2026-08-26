import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; 
import pengumumanIcon from "../assets/Pengumuman.png";
import beritaIcon from "../assets/Berita.png";
import cctvIcon from "../assets/cctv.png";
import wifiIcon from "../assets/Wi-Fi.png";
import galeriFotoIcon from "../assets/GaleriFoto.png";

// Admin Pemerintahan
import surbanIcon from "../assets/surban.png";
import presensiIcon from "../assets/presensi.png";
import ekinerjaIcon from "../assets/ekinerja.png";

import informasiImg from "../assets/Informasi.png";
import pemerintahanImg from "../assets/Pemerintahan.jpg";
import administrasiImg from "../assets/Administrasi.jpg";

import kesehatanIcon from "../assets/bedrs.png";
import pendidikanIcon from "../assets/Pendidikan.png";
import pariwisataIcon from "../assets/JelajahBantul.png";
import kebudayaanIcon from "../assets/Kebudayaan.png";
import pemerintahanIcon from "../assets/Pemerintahan.png";

export default function CategorySection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  // DATA KATEGORI + LINK
  const CATEGORIES = [
    {
      id: "info",
      title: "Informasi Publik",
      itemsCount: 8,
      image: informasiImg,
      link: "/layanan/informasi",
      services: [
        { name: "Pengumuman", image: pengumumanIcon },
        { name: "Berita", image: beritaIcon },
        { name: "CCTV", image: cctvIcon },
        { name: "Titik Wifi", image: wifiIcon },
        { name: "Galeri Foto", image: galeriFotoIcon },
      ],
    },
    {
      id: "layanan",
      title: "Layanan Publik",
      itemsCount: 45,
      image: pemerintahanImg,
      link: "/layanan/publik",
      services: [
        { name: "Kesehatan", image: kesehatanIcon },
        { name: "Pendidikan", image: pendidikanIcon },
        { name: "Pariwisata", image: pariwisataIcon },
        { name: "Kebudayaan", image: kebudayaanIcon },
        { name: "Pemerintahan", image: pemerintahanIcon },
      ],
    },
    {
      id: "admin",
      title: "Administrasi Pemerintahan",
      itemsCount: 3,
      image: administrasiImg,
      link: "/layanan/administrasi",
      services: [
        { name: "SURBAN", image: surbanIcon },
        { name: "Presensi Bantul", image: presensiIcon },
        { name: "eKinerja", image: ekinerjaIcon },
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

          <Link
            to="/layanan/semua-layanan"
            className="px-4 py-2 bg-slate-100 rounded-full text-sm cursor-pointer hover:bg-slate-200 transition"
          >
            Semua Layanan →
          </Link>
        </div>

        {/* GRID CARD */}
        <div
          className={`
            grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {CATEGORIES.map((item) => (
            
            <Link 
              key={item.id}
              to={item.link}
              className="block shadow-sm rounded-xl overflow-hidden"
            >
              <div
                className="group bg-gray-50 hover:bg-emerald-50 transition-colors duration-300 
                  rounded-xl p-6 cursor-pointer flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="bg-white p-4 rounded-lg flex items-center justify-center h-40">
                  <img src={item.image} className="w-64 h-24 object-contain" />
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
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span>{s.name}</span>
                    </li>
                  ))}
                </ul>

                {/* SEE ALL */}
                <div className="mt-auto pt-4 text-right">
                  <span className="text-emerald-600 text-sm cursor-pointer group-hover:underline">
                    Lihat Semua →
                  </span>
                </div>
              </div>
            </Link>

          ))}
        </div>
      </div>
    </section>
  );
}
