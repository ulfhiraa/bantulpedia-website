// src/components/Footer.jsx
import React from "react";
import logo from "../assets/bantulpedia-iconblack.png";

import icWeb from "../assets/globe.png";
import icFb from "../assets/facebook.png";
import icTiktok from "../assets/tiktok.png";
import icX from "../assets/x.png";
import icIg from "../assets/instagram.png";
import icYt from "../assets/youtube.png";

import icPin from "../assets/icon-pin.png";
import icPhone from "../assets/icon-phone.png";
import icMail from "../assets/icon-mail.png";

export default function Footer() {
  return (
    <footer className="bg-[#041D0F]/45 text-black">
      {/* container diperkecil */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* grid lebih rapat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col gap-3">

            {/* Logo */}
            <div className="flex items-start gap-3">
              <div className="w-32 h-12 flex items-center">
                <img
                  src={logo}
                  alt="Bantulpedia"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Deskripsi & Sosial */}
            <div className="pl-9">
              <p className=" max-w-md text-sm leading-snug text-black">
                Satu portal untuk akses semua informasi. Simple dan cepat.
              </p>

              <div className="mt-12 space-y-3">
                <h4 className="text-sm font-semibold text-black">
                  Ikuti Kami
                </h4>

                <div className="flex items-center gap-3">
                  {[
                    { href: "https://www.bantulkab.go.id/", icon: icWeb, alt: "web" },
                    { href: "https://www.facebook.com/pemkabbantul/", icon: icFb, alt: "facebook" },
                    { href: "https://www.tiktok.com/@pemkabbantul", icon: icTiktok, alt: "tiktok" },
                    { href: "https://x.com/pemkabbantul", icon: icX, alt: "x" },
                    { href: "https://www.instagram.com/pemkabbantul/", icon: icIg, alt: "instagram" },
                    { href: "https://www.youtube.com/c/BantulTV", icon: icYt, alt: "youtube" },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      aria-label={item.alt}
                      className="w-9 h-9 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition"
                    >
                      <img
                        src={item.icon}
                        alt={item.alt}
                        className="w-8 h-9 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <h3 className="font-semibold text-black mb-3 mt-2">
              Kontak
            </h3>

            <div className="space-y-4 text-slate-300 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                  <img src={icPin} alt="alamat" className="w-9 h-7 object-contain" />
                </div>
                <p className="leading-snug text-black">
                  JL. Robert Wolter Monginsidi, Bantul, <br />
                  Daerah Istimewa Yogyakarta 55711
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                  <img src={icPhone} alt="telepon" className="w-9 h-6 object-contain" />
                </div>
                <p className="text-black">(0274) 367509</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                  <img src={icMail} alt="email" className="w-12 h-10 object-contain" />
                </div>
                <p className="text-black">diskominfo@bantulkab.go.id</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="text-black">© {new Date().getFullYear()} BantulPedia. All rights reserved.</div>
            <div className="text-black">Dikelola oleh Diskominfo Kabupaten Bantul</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
