import React, { useEffect, useRef, useState } from "react";
import phone from "../assets/phone.png";      // ganti sesuai filemu
import ctaBg from "../assets/pandansimo.jpg";         // ganti sesuai filemu
import playIcon from "../assets/playstore.png"; // ikon play store
import appleIcon from "../assets/appstore.png";   // ikon app store

export default function CTASection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* background image + green overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover filter blur-sm scale-105"
          style={{ backgroundImage: `url(${ctaBg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-emerald-800/80 mix-blend-multiply" aria-hidden />
      </div>

      {/* content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* LEFT: teks + tombol */}
          <div className="lg:col-span-7 text-white">
            <h3 className="text-white text-2xl md:text-3xl font-bold">
              Punya Pertanyaan atau Masukan? 
            </h3>

            <p className="max-w-lg mt-4 text-md text-white/90">
              Kami siap melayani Anda.
            </p>

            {/* Hubungi Kami - Putih */}
            <div className="mt-6">
              <button
                className="inline-block bg-white text-emerald-700 px-5 py-2 rounded-md shadow-sm hover:shadow-md transition font-medium"
                onClick={() => window.location.href = "#contact"}
              >
                Hubungi Kami
              </button>
            </div>

            {/* Main heading */}
            <div className="mt-15">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold leading-tight">
                Cari <span className="text-yellow-300">Informasi Bantul?</span>
                <br />
                Semua ada di <span className="text-yellow-300">Bantulpedia</span>
              </h2>

              <p className="max-w-lg mt-4 text-sm text-white/90">
                Satu portal untuk akses semua informasi. Simple dan cepat.
              </p>

              {/* Store buttons as real buttons */}
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                {/* Play Store button */}
                <a
                  href="https://play.google.com/store/apps/details?id=id.go.bantulkab.bantulpedia&hl=en"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm"
                  aria-label="Download on Google Play"
                >
                  {/* small play SVG icon */}
                  <img src={playIcon} alt="Play Store" className="w-6 h-6 object-contain" />
                  <span className="font-medium">Play Store</span>
                </a>

                {/* App Store button */}
                <a
                  href="https://apps.apple.com/us/app/bantulpedia/id1579902635"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm"
                  aria-label="Download on the App Store"
                >
                  {/* simple apple svg */}
                  <img src={appleIcon} alt="App Store" className="w-6 h-6 object-contain" />
                  <span className="font-medium">App Store</span>
                </a>
              </div>

            </div>
          </div>

          {/* RIGHT: phone mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-64 sm:w-72 md:w-80 lg:w-96 transform transition-transform duration-700" style={{ perspective: 1000 }}>
              <img
                src={phone}
                alt="Mockup aplikasi Bantulpedia"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* optional bottom slanted shape */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-6 fill-current text-emerald-800/95">
          <path d="M0 0 L100 0 L100 10 L0 6 Z" />
        </svg>
      </div>
    </section>
  );
}