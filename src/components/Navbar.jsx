import React from "react";
import { Link, useLocation } from "react-router-dom";
// import logo from "../assets/LogoBantulpedia.png";
import logo from "../assets/bantulpedia-iconblack.png";

export default function Navbar() {
  const location = useLocation();
  const hideMenu = ["/login", "/register"].includes(location.pathname);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300
        ${hideMenu 
          ? "bg-white/20 backdrop-blur-md" 
          : "bg-white/20 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 h-full">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        {/* MENU */}
        {!hideMenu && (
          <ul className="flex items-center gap-8 font-medium text-black h-full ${textColor}">
            <li className="h-full flex items-center">
              <Link
                to="/"
                className={`inline-flex items-center h-full px-1 pb-1 transition ${
                  isActive("/") ? "border-b-2 border-white" : "border-b-2 border-transparent hover:border-white/60"
                }`}
              >
                Beranda
              </Link>
            </li>

            <li className="relative group h-full flex items-center">
              <span
                className={`inline-flex items-center h-full px-1 pb-1 cursor-pointer transition ${
                  ["/layanan/informasi", "/layanan/publik", "/layanan/administrasi"].some((p) =>
                    location.pathname.startsWith(p)
                  )
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent hover:border-white/60"
                }`}
              >
                Layanan 
              </span>

              <div
                className="absolute left-0 top-full mt-3 w-56 bg-white/95
                  border border-slate-200 shadow-lg rounded-2xl py-3
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  translate-y-2 group-hover:translate-y-0 transition-all duration-200"
              >
                <Link
                  to="/layanan/informasi"
                  className="block px-5 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                >
                  Informasi Publik
                </Link>

                <Link
                  to="/layanan/publik"
                  className="block px-5 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                >
                  Layanan Publik
                </Link>

                <Link
                  to="/layanan/administrasi"
                  className="block px-5 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                >
                  Administrasi
                </Link>
              </div>
            </li>

            <li className="h-full flex items-center">
              <Link
                to="/tentang"
                className={`inline-flex items-center h-full px-1 pb-1 transition ${
                  isActive("/tentang") ? "border-b-2 border-white" : "border-b-2 border-transparent hover:border-white/60"
                }`}
              >
                Tentang
              </Link>
            </li>
          </ul>
        )}

        {/* BUTTONS */}
        {!hideMenu && (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-full font-medium border text-black border-black hover:bg-white/10 transition"
            >
              Masuk
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 rounded-full font-medium border bg-transparent text-black hover:bg-white/90 transition"
            >
              Daftar
            </Link>
          </div>
        )}

        {/* LOGIN/REGISTER → hanya tampilkan link “Beranda” */}
        {hideMenu && (
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-medium hover:underline text-black"
          >
            Beranda
          </Link>
        )}
      </div>
    </nav>
  );
}
