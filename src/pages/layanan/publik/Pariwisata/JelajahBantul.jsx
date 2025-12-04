import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function JelajahBantulPage() {
  const categories = [
    {
      id: "destinasi",
      title: "Destinasi Wisata",
      items: ["Desa Wisata", "Wisata Budaya", "Wisata Alam"],
    },
    {
      id: "akomodasi",
      title: "Akomodasi Wisata",
      items: ["Hotel", "Home Stay"], 
    },
    { id: "agen",
        title: "Agen Perjalanan",
        items: ["Transportasi Wisata", "Paket Wisata", "Travel Agen"] 
    },
    { id: "pemandu",
        title: "Pemandu Wisata", 
        items: ["Pemandu Lokal"]
    },
    { id: "kuliner",
        title: "Kuliner",
        items: ["Kuliner", "Oleh-oleh"]
    },
    { id: "belanja",
        title: "Belanja",
        items: ["UMKM", "Pasar Tradisional", "Pasar Modern"]
    },
    { id: "kerajinan",
        title: "Kerajinan",
        items: ["Kerajinan"]
    },
    { id: "seni",
        title: "Seni Budaya",
        items: ["Kesenian", "Upacara Adat", "Warisan Budaya"] 
    },
    { id: "video",
        title: "Video Wisata",
        items: ["Video Wisata"]
    },
    { id: "fasilitas",
        title: "Fasilitas Umum",
        items: ["PLN", "Kantor Pemerintahan", "Rumah Sakit", "Kantor Polisi", "Tempat Ibadah", "SPBU", "ATM"]
    },
  ];

  const cards = Array.from({ length: 16 }).map((_, i) => ({
    id: i + 1,
    title: `Nama Tempat ${i + 1}`,
    location: ["Kecamatan", "Desa"][i % 2],
    img: `/images/sample${(i % 6) + 1}.jpg`, // put sample images in public/images/
    visitors: Math.floor(Math.random() * 500) + 20,
  }));

  const [openCategory, setOpenCategory] = useState("destinasi");
  const [activeFilter, setActiveFilter] = useState("Desa Wisata");

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <div className="h-40 md:h-60 relative rounded-b-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
              />
              <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply" />
            </div>
      

      {/* MAIN: sidebar + panel kanan */}
      <main className="w-full px-10 py-10 flex gap-8 flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-80 h-fit sticky top-6 self-start">
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-emerald-700 font-semibold mb-5 text-lg">
              Jelajah Bantul
            </h3>

            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.id} className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenCategory(openCategory === c.id ? null : c.id)
                    }
                    className="w-full flex items-center justify-between gap-3 px-2 py-3 rounded-md transition-all hover:bg-emerald-50"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800">
                        {c.title}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        Lihat pilihan terkait {c.title.toLowerCase()}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openCategory === c.id ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <hr className="border-t border-gray-200 my-2" />

                  {/* semua kategori, termasuk Akomodasi, pakai desain yang sama */}
                  {openCategory === c.id && (
                    <div className="mt-2 ml-2 space-y-2">
                      {c.items.map((it) => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setActiveFilter(it)}
                          className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition-colors ${
                            activeFilter === it
                              ? "bg-emerald-100 text-emerald-800 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                                activeFilter === it
                                  ? "bg-emerald-700 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {it.charAt(0)}
                            </div>
                            <div className="text-sm">{it}</div>
                          </div>
                          <div className="text-xs text-gray-400">›</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-5">
              Pilih kategori untuk menampilkan hasil yang relevan. Klik judul
              kategori untuk buka/tutup.
            </p>
          </div>
        </aside>

        {/* PANEL KANAN: yang bisa discroll */}
        <section className="flex-1 h-full overflow-y-auto pr-2">
          <div className="bg-white rounded-lg p-6 shadow-inner border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Hasil: <span className="text-emerald-600">{activeFilter}</span>
              </h2>
              <div className="flex items-center gap-3">
                <input
                  className="border rounded px-3 py-1"
                  placeholder="Cari tempat..."
                />
                <select className="border rounded px-3 py-1">
                  <option>Terpopuler</option>
                  <option>Terbaru</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <article
                  key={card.id}
                  className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all bg-white cursor-pointer"
                >
                  {/* image */}
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.currentTarget.src = "/images/placeholder.jpg")
                      }
                    />

                    {/* top-right badge */}
                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-0.5 rounded-full text-xs font-semibold shadow">
                      {Math.floor(card.visitors / 10)}k
                    </div>

                    {/* bottom gradient & title */}
                    <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <h3 className="text-white font-semibold text-sm drop-shadow-md">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-200 mt-1">
                        {card.location} • {card.visitors} pengunjung
                      </p>
                    </div>
                  </div>

                  {/* card body */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                        {card.title
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {card.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {card.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <button className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full hover:bg-emerald-700 transition">
                        Detail
                      </button>
                      <div className="text-xs text-gray-500 mt-2">Open</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 border rounded-md">
                Muat lebih banyak
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
