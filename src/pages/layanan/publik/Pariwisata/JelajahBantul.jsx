import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function JelajahBantulPage() {
  const categories = [
    {
      id: "destinasi",
      title: "Destinasi Wisata",
      items: ["Desa Wisata", "Wisata Buatan", "Wisata Alam"],
    },
    {
      id: "akomodasi",
      title: "Akomodasi Wisata",
      items: ["Hotel", "Home Stay"],
    },
    {
      id: "agen",
      title: "Agen Perjalanan",
      items: ["Transportasi Wisata", "Paket Wisata", "Travel Agen"],
    },
    {
      id: "pemandu",
      title: "Pemandu Wisata",
      items: ["Pemandu Lokal"],
    },
    {
      id: "kuliner",
      title: "Kuliner",
      items: ["Kuliner", "Oleh-oleh"],
    },
    {
      id: "belanja",
      title: "Belanja",
      items: ["UMKM", "Pasar Tradisional", "Pasar Modern"],
    },
    { id: "kerajinan", title: "Kerajinan", items: ["Kerajinan"] },
    {
      id: "seni",
      title: "Seni Budaya",
      items: ["Kesenian", "Upacara Adat", "Warisan Budaya"],
    },
    { id: "video", title: "Video Wisata", items: ["Video Wisata"] },
    {
      id: "fasilitas",
      title: "Fasilitas Umum",
      items: [
        "PLN",
        "Kantor Pemerintahan",
        "Rumah Sakit",
        "Kantor Polisi",
        "Tempat Ibadah",
        "SPBU",
        "ATM",
      ],
    },
  ];

  // -------------------------
  // DATA DUMMY (eksplisit)
  // -------------------------
  const initialCards = [
    { id: 1, title: "Desa Wisata Ngremo", location: "Kecamatan Pajangan", category: "Desa Wisata", img: "/images/sample1.jpg", visitors: 420, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20 },
    { id: 2, title: "Air Terjun Sermo", location: "Kecamatan Dlingo", category: "Wisata Alam", img: "/images/sample2.jpg", visitors: 312, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18 },
    { id: 3, title: "Pusat Kuliner Bantul", location: "Kecamatan Bantul", category: "Kuliner", img: "/images/sample3.jpg", visitors: 890, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 16 },
    { id: 4, title: "Homestay Lestari", location: "Desa Wisata Wukirsari", category: "Home Stay", img: "/images/sample4.jpg", visitors: 134, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14 },
    { id: 5, title: "Paket Wisata Jelajah Kulon", location: "Kecamatan Kretek", category: "Paket Wisata", img: "/images/sample5.jpg", visitors: 256, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13 },
    { id: 6, title: "Museum Budaya Bantul", location: "Kecamatan Banguntapan", category: "Wisata Budaya", img: "/images/sample6.jpg", visitors: 190, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12 },
    { id: 7, title: "Pasar Tradisional Sidoharjo", location: "Kecamatan Srandakan", category: "Pasar Tradisional", img: "/images/sample1.jpg", visitors: 78, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11 },
    { id: 8, title: "UMKM Kreasi Maju", location: "Kecamatan Pleret", category: "UMKM", img: "/images/sample2.jpg", visitors: 54, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10 },
    { id: 9, title: "Pemandu Lokal Karno", location: "Kecamatan Pandak", category: "Pemandu Lokal", img: "/images/sample3.jpg", visitors: 22, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9 },
    { id: 10, title: "Kesenian Rakyat Bantul", location: "Kecamatan Sewon", category: "Kesenian", img: "/images/sample4.jpg", visitors: 301, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8 },
    { id: 11, title: "Hotel Permata", location: "Kecamatan Bantul", category: "Hotel", img: "/images/sample5.jpg", visitors: 412, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7 },
    { id: 12, title: "Oleh-oleh Tradisional", location: "Kecamatan Jetis", category: "Oleh-oleh", img: "/images/sample6.jpg", visitors: 156, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6 },
    { id: 13, title: "Travel Agen Sigap", location: "Kecamatan Pundong", category: "Travel Agen", img: "/images/sample1.jpg", visitors: 87, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5 },
    { id: 14, title: "SPBU Bantul Timur", location: "Kecamatan Banguntapan", category: "SPBU", img: "/images/sample2.jpg", visitors: 45, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4 },
    { id: 15, title: "Rumah Sakit Sehat", location: "Kecamatan Piyungan", category: "Rumah Sakit", img: "/images/sample3.jpg", visitors: 230, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3 },
    { id: 16, title: "Kerajinan Anyaman", location: "Kecamatan Kretek", category: "Kerajinan", img: "/images/sample4.jpg", visitors: 97, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2 },
    { id: 17, title: "Video Promosi Bantul", location: "Kecamatan Sewon", category: "Video Wisata", img: "/images/sample5.jpg", visitors: 14, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1 },
    { id: 18, title: "Tempat Ibadah Agung", location: "Kecamatan Pandak", category: "Tempat Ibadah", img: "/images/sample6.jpg", visitors: 76, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1 },
    { id: 19, title: "Kantor Polisi Sentral", location: "Kecamatan Bantul", category: "Kantor Polisi", img: "/images/sample1.jpg", visitors: 60, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1 },
    { id: 20, title: "PLN Layanan Bantul", location: "Kecamatan Jetis", category: "PLN", img: "/images/sample2.jpg", visitors: 12, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1 },
  ];

  // -------------------------
  // STATE
  // -------------------------
  const [openCategory, setOpenCategory] = useState("destinasi");
  // ubah default jadi kosong agar semua item tampil
  const [activeFilter, setActiveFilter] = useState("");

  // search + sorting states
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("Terpopuler");
  const [filteredCards, setFilteredCards] = useState(initialCards);

  // effect: hitung ulang filteredCards saat search, sortOption, atau activeFilter berubah
  useEffect(() => {
    let result = [...initialCards];

    // 1) filter berdasarkan kategori aktif (sidebar)
    // hanya lakukan filter kalau activeFilter tidak kosong
    if (activeFilter && activeFilter.trim() !== "") {
      result = result.filter((c) =>
        c.category.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    // 2) filter berdasarkan search (cari di title, location, dan category)
    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    // 3) sorting
    if (sortOption === "Terpopuler") {
      result.sort((a, b) => b.visitors - a.visitors);
    } else if (sortOption === "Terbaru") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    setFilteredCards(result);
  }, [search, sortOption, activeFilter]);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />

      {/* Banner – clear image with deep tone */}
      <div className="h-40 md:h-60 relative overflow-hidden ">
        {/* Background image (jernih) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Deep dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Subtle color tone (optional, for depth) */}
        <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
      </div>

      <main className="w-full px-10 py-10 flex gap-8 flex-1 overflow-hidden items-start">
        <aside className="w-80 h-fit sticky top-0 self-start">
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-emerald-700 font-semibold mb-5 text-lg">Jelajah Bantul</h3>

            {/* TOMBOL TAMPILKAN SEMUA */}
            {/* <div className="mb-4">
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeFilter === "" ? "bg-emerald-100 text-emerald-800 font-semibold" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter("")}
              >
                Tampilkan Semua
              </button>
            </div> */}

            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.id} className="pt-1">
                  <button
                    type="button"
                    onClick={() => setOpenCategory(openCategory === c.id ? null : c.id)}
                    className="w-full flex items-center justify-between gap-3 px-2 py-3 rounded-md transition-all hover:bg-emerald-50"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800">{c.title}</span>
                      <span className="text-xs text-gray-400 mt-1">Lihat pilihan terkait {c.title.toLowerCase()}</span>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${openCategory === c.id ? "rotate-180" : "rotate-0"}`} />
                  </button>

                  <hr className="border-t border-gray-200 my-2" />

                  {openCategory === c.id && (
                    <div className="mt-2 ml-2 space-y-2">
                      {c.items.map((it) => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setActiveFilter(prev => (prev === it ? "" : it))} // toggle: klik lagi hapus filter
                          className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition-colors ${
                            activeFilter === it ? "bg-emerald-100 text-emerald-800 font-semibold" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${activeFilter === it ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-600"}`}>{it.charAt(0)}</div>
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
              Pilih kategori untuk menampilkan hasil yang relevan. Klik judul kategori untuk buka/tutup. Klik lagi pada pilihan untuk membatalkan filter.
            </p>
          </div>
        </aside>

        <section className="flex-1 h-full overflow-y-auto pr-2">
          <div className="bg-white rounded-lg p-6 shadow-inner border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {/* Hasil: <span className="text-emerald-600">{activeFilter || "Semua"}</span>
                <span className="text-sm text-gray-500 ml-2">({filteredCards.length} hasil)</span> */}
              </h2>

              <div className="flex items-center gap-3">
                <input className="border rounded px-3 py-1" placeholder="Cari tempat, lokasi, atau kategori..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <select className="border rounded px-3 py-1" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option>Terpopuler</option>
                  <option>Terbaru</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500">Tidak ada hasil yang sesuai.</div>
              ) : (
                filteredCards.map((card) => (
                  <article key={card.id} className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all bg-white cursor-pointer">
                    <div className="h-48 bg-gray-200 relative">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} />
                      <div className="absolute top-3 right-3 bg-white/90 px-3 py-0.5 rounded-full text-xs font-semibold shadow">{Math.floor(card.visitors / 10)}k</div>
                      <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                        <h3 className="text-white font-semibold text-sm drop-shadow-md">{card.title}</h3>
                        <p className="text-xs text-gray-200 mt-1">{card.location} • {card.visitors} pengunjung • <span className="italic">{card.category}</span></p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                          {card.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{card.title}</div>
                          <div className="text-xs text-gray-400">{card.location}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 border rounded-md" onClick={() => alert("Muat lebih banyak - simulasi. Sambungkan ke API untuk paginasi nyata.")}>
                Muat lebih banyak
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
