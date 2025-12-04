// src/components/Footer.jsx
import React from "react";
import logo from "../assets/LogoBantulpedia.png";          // logo Bantulpedia
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
    <footer className="bg-[#041D0F] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* grid: pastikan semua kolom align ke atas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: flex-col supaya konten mulai dari atas */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* 1) Logo + Title (single row) */}
            {/* NOTE: items-start agar judul kiri mulai dari atas (sejajar dengan heading kanan) */}
            <div className="flex items-start gap-3 mt-4">
              {/* logo box */}
              <div className="w-38 h-16 rounded-lg flex items-center justify-center p-2 shrink-0">
                <img src={logo} alt="Bantulpedia" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Description & social */}
            <div className="pl-12">
              <p className="text-slate-200 max-w-lg leading-relaxed">
                Satu portal untuk akses semua informasi. Simple dan cepat.
              </p>

              <div className="mt-18">
                <h4 className="text-sm font-bold text-slate-100 mb-7 pl-36">
                  Ikuti Kami
                </h4>

                <div className="flex items-center gap-4">
                  <a href="https://www.bantulkab.go.id/" aria-label="Website" className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/30 transition">
                    <img src={icWeb} alt="web" className="w-12 h-12 object-contain" />
                  </a>

                  <a href="https://www.facebook.com/pemkabbantul/" aria-label="Facebook" className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/30 transition">
                    <img src={icFb} alt="facebook" className="w-12 h-12 object-contain" />
                  </a>

                  <a href="https://www.tiktok.com/@pemkabbantul" aria-label="TikTok" className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/30 transition">
                    <img src={icTiktok} alt="tiktok" className="w-10 h-12 object-contain" />
                  </a>

                  <a href="https://x.com/pemkabbantul" aria-label="X" className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/30 transition">
                    <img src={icX} alt="x" className="w-10 h-12 object-contain" />
                  </a>

                  <a href="https://www.instagram.com/pemkabbantul/" aria-label="Instagram" className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/30 transition">
                    <img src={icIg} alt="instagram" className="w-9 h-12 object-contain" />
                  </a>

                  <a href="https://www.youtube.com/c/BantulTV" aria-label="YouTube" className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 hover:bg-white/30 transition">
                    <img src={icYt} alt="youtube" className="w-12 h-12 object-contain" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact (juga flex-col supaya heading muncul di paling atas) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="font-bold text-white mb-5 mt-10">Kontak</h3>

            <div className="space-y-6 text-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center shrink-0">
                  <img src={icPin} alt="alamat" className="w-12 h-12 object-contain" />
                </div>
                <p className="leading-tight">
                  JL. Robert Wolter, Monginsidi, Kurahan, Bantul, <br />
                  Daerah Istimewa Yogyakarta 55711
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center shrink-0">
                  <img src={icPhone} alt="telepon" className="w-9 h-12 object-contain" />
                </div>
                <p>(0274) 367509</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center shrink-0">
                  <img src={icMail} alt="email" className="w-12 h-12 object-contain" />
                </div>
                <p>diskominfo@bantulkab.go.id</p>
              </div>
            </div>
          </div>

        </div>

        {/* bottom separator & copyright */}
        <div className="mt-10 border-t border-white/6 pt-6">
          <div className="max-w-7xl mx-auto text-sm text-slate-300 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} BantulPedia. All rights reserved.</div>
            <div className="text-slate-400">Dikelola oleh Diskominfo Kabupaten Bantul</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
