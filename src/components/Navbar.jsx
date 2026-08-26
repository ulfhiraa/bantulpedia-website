import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/bantulpedia-iconblack.png";
import logoWhite from "../assets/Bantulpedia-white.png";

export default function Navbar() {
  const location = useLocation();
  const hideMenu = ["/login", "/register"].includes(location.pathname);

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Deteksi scroll dengan fallback lintas peramban
  React.useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollPosition > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Tutup menu mobile setiap kali pindah halaman
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Kunci scroll body saat menu mobile terbuka
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  // Class dinamis untuk perubahan warna berdasarkan status scroll
  const textColor = scrolled ? "text-black" : "text-white";
  const borderActive = scrolled ? "border-black" : "border-white";
  const borderHover = scrolled ? "hover:border-black/40" : "hover:border-white/60";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[60]
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-white/20 backdrop-blur-md"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={scrolled ? logo : logoWhite}
            alt="Bantulpedia"
            className="h-7 md:h-8 transition duration-300"
          />
        </Link>

        {/* MENU (DESKTOP) */}
        {hideMenu ? (
          <Link
            to="/"
            className={`
              hidden sm:block absolute left-1/2 -translate-x-1/2
              text-md font-medium ${textColor}
              hover:underline
            `}
          >
            Beranda
          </Link>
        ) : (
          <ul className={`hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium ${textColor}`}>
            <li>
              <Link
                to="/"
                className={`pb-1 border-b-2 transition ${
                  isActive("/")
                    ? borderActive
                    : `border-transparent ${borderHover}`
                }`}
              >
                Beranda
              </Link>
            </li>

            <li className="relative group">
              <span
                className={`pb-1 cursor-pointer border-b-2 transition ${
                  location.pathname.startsWith("/layanan")
                    ? borderActive
                    : `border-transparent ${borderHover}`
                }`}
              >
                Layanan
              </span>

              <div className="
                absolute left-0 mt-3 w-56
                bg-white text-black rounded-xl shadow-lg border border-slate-200
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                translate-y-2 group-hover:translate-y-0
                transition-all
              ">
                <Link to="/layanan/informasi" className="block px-5 py-3 hover:bg-slate-50">
                  Informasi Publik
                </Link>
                <Link to="/layanan/publik" className="block px-5 py-3 hover:bg-slate-50">
                  Layanan Publik
                </Link>
                <Link to="/layanan/administrasi" className="block px-5 py-3 hover:bg-slate-50">
                  Administrasi
                </Link>
              </div>
            </li>

            <li>
              <Link
                to="/tentang"
                className={`pb-1 border-b-2 transition ${
                  isActive("/tentang")
                    ? borderActive
                    : `border-transparent ${borderHover}`
                }`}
              >
                Tentang
              </Link>
            </li>
          </ul>
        )}

        {/* AUTH BUTTON (DESKTOP) */}
        {!hideMenu && (
          <div className="hidden md:flex gap-3">
            <Link
              to="/register"
              className={`px-5 py-2 rounded-full border text-sm transition ${
                scrolled
                  ? "border-black text-black hover:bg-black/5"
                  : "border-white text-white hover:bg-white/10"
              }`}
            >
              Daftar
            </Link>
            <Link
              to="/login"
              className={`
                px-5 py-2 rounded-full border text-sm font-medium
                transition-all duration-200 active:scale-95
                ${
                  scrolled
                    ? "border-black text-black hover:bg-black/10"
                    : "border-white text-white hover:bg-white/10"
                }
              `}
            >
              Masuk
            </Link>
          </div>
        )}

        {/* HAMBURGER (MOBILE) */}
        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 shrink-0 ${textColor}`}
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* PANEL MENU MOBILE */}
      <div
        className={`
          md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
          bg-white text-black shadow-lg
          ${menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-1 text-sm font-medium">
          {hideMenu ? (
            <Link to="/" className="py-3 border-b border-slate-100">Beranda</Link>
          ) : (
            <>
              <Link to="/" className={`py-3 border-b border-slate-100 ${isActive("/") ? "text-black font-semibold" : ""}`}>
                Beranda
              </Link>

              <div className="py-3 border-b border-slate-100">
                <span className="block mb-2 text-slate-500 text-xs uppercase tracking-wide">Layanan</span>
                <div className="flex flex-col gap-2 pl-2">
                  <Link to="/layanan/informasi" className="py-1">Informasi Publik</Link>
                  <Link to="/layanan/publik" className="py-1">Layanan Publik</Link>
                  <Link to="/layanan/administrasi" className="py-1">Administrasi</Link>
                </div>
              </div>

              <Link to="/tentang" className={`py-3 border-b border-slate-100 ${isActive("/tentang") ? "text-black font-semibold" : ""}`}>
                Tentang
              </Link>

              <div className="flex gap-3 pt-4">
                <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-full border border-slate-300 text-sm">
                  Daftar
                </Link>
                <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-full border border-black text-black text-sm font-medium">
                  Masuk
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}