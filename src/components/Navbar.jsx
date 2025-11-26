import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // halaman yg HIDE menu
  const hideMenu = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    if (isHome) window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const menuText = isHome
    ? scrolled ? "text-slate-700" : "text-white"
    : "text-slate-700";

  const btnOutline = isHome
    ? scrolled ? "border-emerald-500 text-emerald-600" : "border-white text-white"
    : "border-emerald-500 text-emerald-600";

  const btnPrimary = isHome
    ? scrolled ? "bg-emerald-600 text-white" : "bg-emerald-400 text-white"
    : "bg-emerald-600 text-white";

  // fungsi untuk cek halaman aktif
  const activeClass = (path) =>
    location.pathname === path
      ? "border-b-2 border-black-500"
      : "border-b-2 border-transparent";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[60] transition-all duration-300 backdrop-blur-md
        ${
          isHome
            ? scrolled ? "bg-white/90 shadow-md" : "bg-transparent"
            : "bg-white/40 shadow-lg"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="font-bold hidden sm:inline text-emerald-600">
            Bantulpedia
          </span>
        </Link>

        {/* MENU */}
        {!hideMenu && (
          <ul className={`flex items-center gap-10 font-medium ${menuText}`}>
            
            <li className={`pb-1 ${activeClass("/")}`}>
              <Link to="/">Beranda</Link>
            </li>

            <li className="relative group cursor-pointer pb-1">
              <span className="flex items-center gap-1">
                Layanan ▾
              </span>

              <div
                className="
                  absolute left-0 mt-3 w-56 bg-white/70 backdrop-blur-xl
                  border border-white/40 shadow-xl rounded-2xl py-3
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  translate-y-2 group-hover:translate-y-0 transition-all duration-300
                "
              >
                {/* <-- FIX: gunakan leading slash (absolute path) */}
                <Link
                  to="/layanan/informasi"
                  className="block px-5 py-2.5 hover:bg-emerald-50/60 rounded-lg text-slate-700 transition"
                >
                  Informasi Publik
                </Link>

                <Link
                  to="/layanan/publik"
                  className="block px-5 py-2.5 hover:bg-emerald-50/60 rounded-lg text-slate-700 transition"
                >
                  Layanan Publik
                </Link>

                <Link
                  to="/layanan/administrasi"
                  className="block px-5 py-2.5 hover:bg-emerald-50/60 rounded-lg text-slate-700 transition"
                >
                  Administrasi
                </Link>
              </div>
            </li>

            <li className={`pb-1 ${activeClass("/tentang")}`}>
              <Link to="/tentang">Tentang</Link>
            </li>

          </ul>
        )}

        {/* BUTTONS */}
        {!hideMenu && (
          <div className="flex items-center gap-4">
            <Link to="/login" className={`px-6 py-2 rounded-full border font-medium ${btnOutline}`}>
              Masuk
            </Link>
            <Link to="/register" className={`px-6 py-2 rounded-full font-medium ${btnPrimary}`}>
              Daftar
            </Link>
          </div>
        )}

        {/* LOGIN / REGISTER → Hanya Beranda */}
        {hideMenu && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-slate-700 font-medium hover:underline">
              Beranda
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}
