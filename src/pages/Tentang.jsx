import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBg from "../assets/pandansimo1.jpg";
import logo from "../assets/phones.png";

import {
  Layers,
  MousePointerClick,
  Users,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function TentangKami() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ================= HERO – CLEAN & ELEGANT ================= */}
      <section className="relative h-[52vh] md:h-[58vh] flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl text-white">
              <h1 className="text-4xl md:text-5xl font-semibold mb-5">
                Tentang Kami
              </h1>

              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                <strong>Bantulpedia</strong> adalah platform digital resmi
                Pemerintah Daerah yang menghadirkan layanan publik,
                informasi daerah, serta kanal interaksi masyarakat
                dalam satu ekosistem terpadu dan mudah diakses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT (TIDAK DIUBAH) ================= */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-20 space-y-24">

          {/* ================= PLATFORM HIGHLIGHT ================= */}
          <section>
            <div className="bg-white rounded-3xl shadow-sm p-12 md:p-16">
              <div className="grid md:grid-cols-2 gap-14 items-center">

                {/* TEXT */}
                <div>
                  <span className="inline-block mb-4 px-4 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold">
                    Platform Digital Terpadu
                  </span>

                  <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-800">
                    Satu Platform untuk <br />
                    Beragam Layanan Publik
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Bantulpedia dirancang untuk memudahkan masyarakat
                    dalam mengakses layanan publik, informasi daerah,
                    serta kebutuhan administratif melalui satu pintu
                    layanan yang terintegrasi.
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Akses layanan publik dalam satu platform",
                      "Informasi daerah yang akurat dan terkini",
                      "Pelayanan cepat, transparan, dan efisien",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5" />
                        <span className="text-gray-700 text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* IMAGE */}
                <div className="relative flex justify-center">
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-cyan-50 rounded-full blur-3xl" />
                  <div className="relative bg-gray-50 rounded-2xl p-6 shadow">
                    <img
                      src={logo}
                      alt="Tampilan Aplikasi Bantulpedia"
                      className="w-64 md:w-72"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ================= PURPOSE ================= */}
          <section>
            <h2 className="text-2xl font-bold mb-12 text-center text-gray-800">
              Tujuan Pengembangan
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Layers,
                  title: "Layanan Terpadu",
                  desc: "Menyatukan berbagai layanan publik lintas OPD dalam satu platform digital.",
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  icon: MousePointerClick,
                  title: "Akses Mudah",
                  desc: "Memberikan kemudahan akses layanan dan informasi kapan saja dan di mana saja.",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  icon: Users,
                  title: "Berbasis Kebutuhan Warga",
                  desc: "Dikembangkan berdasarkan kebutuhan nyata masyarakat dan kondisi daerah.",
                  color: "from-emerald-500 to-emerald-600",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= CORE VALUES ================= */}
          <section>
            <h2 className="text-2xl font-bold mb-10 text-gray-800">
              Nilai Utama
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                ["Terintegrasi", "Menghubungkan layanan lintas OPD dalam satu sistem terpadu.", "border-cyan-500"],
                ["Inovatif", "Terus berkembang mengikuti kemajuan teknologi digital.", "border-indigo-500"],
                ["Transparan", "Informasi yang jelas, terbuka, dan dapat dipercaya.", "border-emerald-500"],
                ["Berorientasi Warga", "Fokus pada manfaat nyata bagi masyarakat.", "border-amber-500"],
              ].map(([title, desc, color], i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${color}`}
                >
                  <h3 className="font-semibold mb-2 text-gray-800">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= COMMITMENT ================= */}
          <section>
            <div className="bg-gradient-to-br from-gray-100 to-white rounded-3xl p-14 text-center shadow-sm">
              <div className="w-16 h-1 bg-cyan-500 mx-auto mb-6 rounded-full" />

              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-cyan-50 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-cyan-600" />
              </div>

              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Komitmen Kami
              </h2>

              <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
                Kami berkomitmen untuk terus mengembangkan Bantulpedia
                sebagai bagian dari transformasi digital daerah guna
                mendukung tata kelola pemerintahan yang baik, pelayanan
                publik yang inklusif, serta peningkatan kualitas hidup
                masyarakat secara berkelanjutan.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
