import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/bantulpedia-iconblack.png";

export default function Navbar() {
  const location = useLocation();
  const hideMenu = ["/login", "/register"].includes(location.pathname);

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const textColor = scrolled ? "text-black" : "text-white";
  const borderActive = scrolled ? "border-black" : "border-white";
  const borderHover = scrolled ? "hover:border-black/40" : "hover:border-white/60";
  const buttonBorder = scrolled ? "border-black text-black" : "border-white text-white";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[60]
        transition-all duration-300
        ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-white/20 backdrop-blur-md"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Bantulpedia" className="h-8" />
        </Link>

        {/* MENU */}
        {!hideMenu && (
          <ul className={`flex items-center gap-8 text-sm font-medium ${textColor}`}>
            <li>
              <Link
                to="/"
                className={`pb-1 border-b-2 transition ${
                  isActive("/") ? "border-black" : "border-transparent hover:border-black/40"
                }`}
              >
                Beranda
              </Link>
            </li>

            <li className="relative group">
              <span className={`pb-1 cursor-pointer border-b-2 transition ${
                location.pathname.startsWith("/layanan")
                  ? borderActive
                  : `border-transparent ${borderHover}`
              }`}>

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
            </li>
          </ul>
        )}

        {/* AUTH BUTTON */}
        {!hideMenu && (
          <div className="flex gap-3">
            <Link
              to="/login"
              className={`px-5 py-2 rounded-full border text-sm transition ${buttonBorder}`}
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className={`px-5 py-2 rounded-full border text-sm transition ${buttonBorder}`}
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
