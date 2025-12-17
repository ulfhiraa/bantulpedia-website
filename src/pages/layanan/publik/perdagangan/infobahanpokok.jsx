// src/pages/layanan/perdagangan/InfoBahanPokok.jsx
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

/**
 * Halaman Info Bahan Pokok
 * Simpan di: src/pages/layanan/perdagangan/InfoBahanPokok.jsx
 *
 * Styling: tailwind (mengikuti style proyek)
 */

const CATEGORIES = [
  "Bahan Pokok Utama",
  "Protein Hewani",
  "Kacang & Olahan",
  "Minyak & Gula",
  "Sayur & Bumbu Dapur",
  "Buah-Buahan",
];

const PRODUCTS_BY_CATEGORY = {
  "Bahan Pokok Utama": [
    { id: "beras-premium", title: "Beras Premium", unit: "kg", image: "/images/beras.png", priceNew: 13000, priceOld: 11000, status: "Naik" },
    { id: "beras-medium", title: "Beras Medium", unit: "kg", image: "/images/beras.png", priceNew: 10000, priceOld: 11000, status: "Turun" },
    { id: "jagung-kering", title: "Jagung Pipil Kering", unit: "kg", image: "/images/jagung.png", priceNew: 13000, priceOld: 11000, status: "Naik" },
    { id: "gula-pasir", title: "Gula Pasir", unit: "kg", image: "/images/gula.png", priceNew: 15000, priceOld: 14000, status: "Naik" },
    { id: "minyak-goreng", title: "Minyak Goreng", unit: "L", image: "/images/minyak.png", priceNew: 32000, priceOld: 30000, status: "Naik" },
    { id: "ketela-pohon", title: "Ketela / Singkong", unit: "kg", image: "/images/ketela.png", priceNew: 8000, priceOld: 9000, status: "Turun" },
  ],
  "Protein Hewani": [
    { id: "daging-sapi-kg", title: "Daging Sapi Kualitas", unit: "kg", image: "/images/daging-sapi.png", priceNew: 130000, priceOld: 110000, status: "Naik" },
    { id: "daging-sapi-iri", title: "Daging Sapi Iris", unit: "kg", image: "/images/daging-sapi.png", priceNew: 100000, priceOld: 110000, status: "Turun" },
    { id: "ayam-broiler", title: "Ayam Broiler (Potong)", unit: "kg", image: "/images/ayam.png", priceNew: 90000, priceOld: 110000, status: "Turun" },
    { id: "ayam-kampung", title: "Ayam Kampung (Utuh)", unit: "ekor", image: "/images/ayam-kampung.png", priceNew: 130000, priceOld: 110000, status: "Naik" },
    { id: "telur-ayam", title: "Telur Ayam Negeri", unit: "kg", image: "/images/telur.png", priceNew: 30000, priceOld: 30000, status: "Stabil" },
    { id: "ikan-tongkol", title: "Ikan Tongkol (Segar)", unit: "kg", image: "/images/ikan.png", priceNew: 60000, priceOld: 55000, status: "Naik" },
    { id: "udang", title: "Udang Lokal (Kupas)", unit: "kg", image: "/images/udang.png", priceNew: 90000, priceOld: 85000, status: "Naik" },
  ],
  // kosongkan atau tambahkan data untuk kategori lain bila perlu
  "Kacang & Olahan": [
    { id: "kedelai-impor", title: "Kacang Kedelai (Impor)", unit: "kg", image: "/images/kedelai-impor.png", priceNew: 12000, priceOld: 11000, status: "Naik" },
    { id: "kedelai-lokal", title: "Kacang Kedelai (Lokal)", unit: "kg", image: "/images/kedelai-lokal.png", priceNew: 10000, priceOld: 11000, status: "Turun" },
    { id: "kacang-hijau", title: "Kacang Hijau", unit: "kg", image: "/images/kacang-hijau.png", priceNew: 9000, priceOld: 10000, status: "Turun" },
    { id: "kacang-tanah", title: "Kacang Tanah", unit: "kg", image: "/images/kacang-tanah.png", priceNew: 13000, priceOld: 11000, status: "Naik" },
    { id: "kacang-mete", title: "Kacang Mete", unit: "kg", image: "/images/kacang-mete.png", priceNew: 120000, priceOld: 115000, status: "Naik" },
    { id: "kacang-kemasan", title: "Kacang Olahan (Pack)", unit: "pack", image: "/images/kacang-kemasan.png", priceNew: 25000, priceOld: 24000, status: "Stabil" },
  ],
  "Minyak & Gula": [
    { id: "gula-pasir-curah", title: "Gula Pasir Curah", unit: "kg", image: "/images/gula-pasir.png", priceNew: 13000, priceOld: 11000, status: "Naik" },
    { id: "gula-pasir-refined", title: "Gula Pasir (Refined)", unit: "kg", image: "/images/gula-refined.png", priceNew: 15000, priceOld: 14000, status: "Stabil" },
    { id: "minyak-goreng-sachet", title: "Minyak Goreng (Sachet)", unit: "pcs", image: "/images/minyak-sachet.png", priceNew: 2500, priceOld: 2400, status: "Naik" },
    { id: "minyak-goreng-botol", title: "Minyak Goreng Kemasan Premium", unit: "L", image: "/images/minyak-botol.png", priceNew: 32000, priceOld: 30000, status: "Naik" },
    { id: "minyak-goreng-curah", title: "Minyak Goreng Curah", unit: "L", image: "/images/minyak-curah.png", priceNew: 30000, priceOld: 29000, status: "Turun" },
    { id: "margarin", title: "Margarin / Mentega Olahan", unit: "kg", image: "/images/margarin.png", priceNew: 45000, priceOld: 43000, status: "Stabil" },
  ],
  "Sayur & Bumbu Dapur": [
    { id: "cabe-rawit-merah", title: "Cabe Rawit Merah", unit: "kg", image: "/images/cabe-rawit-merah.png", priceNew: 30000, priceOld: 28000, status: "Naik" },
    { id: "cabe-merah-besar", title: "Cabe Merah Besar", unit: "kg", image: "/images/cabe-merah-besar.png", priceNew: 25000, priceOld: 24000, status: "Turun" },
    { id: "cabe-rawit-hijau", title: "Cabe Rawit Hijau", unit: "kg", image: "/images/cabe-rawit-hijau.png", priceNew: 27000, priceOld: 26000, status: "Naik" },
    { id: "tomat", title: "Tomat", unit: "kg", image: "/images/tomat.png", priceNew: 12000, priceOld: 11000, status: "Stabil" },
    { id: "bawang-merah", title: "Bawang Merah", unit: "kg", image: "/images/bawang-merah.png", priceNew: 22000, priceOld: 21000, status: "Naik" },
    { id: "bawang-putih", title: "Bawang Putih", unit: "kg", image: "/images/bawang-putih.png", priceNew: 28000, priceOld: 27000, status: "Naik" },
    { id: "kentang", title: "Kentang", unit: "kg", image: "/images/kentang.png", priceNew: 15000, priceOld: 14000, status: "Turun" },
    { id: "wortel", title: "Wortel", unit: "kg", image: "/images/wortel.png", priceNew: 14000, priceOld: 13000, status: "Stabil" },
    { id: "kangkung", title: "Kangkung", unit: "ikat", image: "/images/kangkung.png", priceNew: 5000, priceOld: 4500, status: "Turun" },
    { id: "terong", title: "Terong", unit: "kg", image: "/images/terong.png", priceNew: 10000, priceOld: 9500, status: "Stabil" },
  ],
  "Buah-Buahan": [
    { id: "pisang-ambon", title: "Pisang Ambon", unit: "kg", image: "/images/pisang-ambon.png", priceNew: 13000, priceOld: 11000, status: "Naik" },
    { id: "jeruk-lokal", title: "Jeruk Lokal", unit: "kg", image: "/images/jeruk-lokal.png", priceNew: 10000, priceOld: 11000, status: "Turun" },
    { id: "apel-gala", title: "Apel Gala", unit: "kg", image: "/images/apel-gala.png", priceNew: 25000, priceOld: 24000, status: "Stabil" },
    { id: "mangga-arum", title: "Mangga Arum Manis", unit: "kg", image: "/images/mangga-arum.png", priceNew: 22000, priceOld: 20000, status: "Naik" },
    { id: "pisang-uli", title: "Pisang Uli", unit: "kg", image: "/images/pisang-uli.png", priceNew: 15000, priceOld: 14000, status: "Turun" },
    { id: "nanas", title: "Nanas", unit: "buah", image: "/images/nanas.png", priceNew: 18000, priceOld: 17000, status: "Stabil" },
    { id: "anggur", title: "Anggur Lokal", unit: "kg", image: "/images/anggur.png", priceNew: 60000, priceOld: 58000, status: "Naik" },
    { id: "stroberi", title: "Stroberi", unit: "pack", image: "/images/stroberi.png", priceNew: 35000, priceOld: 34000, status: "Stabil" },
  ],
};

function formatIDR(n) {
  if (n == null) return "-";
  return "Rp " + Number(n).toLocaleString("id-ID");
}

export default function InfoBahanPokok() {
  // default langsung ke "Protein Hewani"
  const [selectedCategory, setSelectedCategory] = useState("Protein Hewani");
  const [searchQuery, setSearchQuery] = useState("");

  // ambil list sesuai kategori yang aktif, lalu filter berdasarkan pencarian
  const productsForCategory = PRODUCTS_BY_CATEGORY[selectedCategory] || [];
  const filtered = productsForCategory.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
      
      <main className="container mx-auto px-6 lg:px-12 py-10">
        {/* back button above title */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
            Kembali
          </button>
        </div>

        

        {/* Header / Title */}
        {/* <div className="text-left mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">Kategori</h2>
          <p className="text-sm text-slate-600 mt-1">Harga Bahan Pokok: Beras, Jagung, Telur, dll.</p>
        </div> */}

        {/* Category pills */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-transform duration-150
                  ${selectedCategory === c
                    ? "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 shadow-lg -translate-y-0.5"
                    : "bg-white border border-slate-200 text-slate-700 hover:shadow-sm hover:-translate-y-0.5"}
                `}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* divider gaya desain */}
        <hr className="border-t border-slate-200 my-6" />

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Card with location/search pill and table-like list */}
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {/* top small centered location/search pill */}
          <div className="p-4 border-b border-slate-100">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                readOnly
                value="Pasar Niten — Glondong, Trirenggo, Kasihan, Bantul Regency..."
                className="w-full max-w-4xl mx-auto text-center bg-white border border-slate-200 rounded-full px-6 py-3 text-sm text-slate-600 shadow-sm"
              />
            </div>
          </div>

          {/* header row (right-side column labels) */}
          <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 hidden sm:block">
            <div className="flex items-center">
              <div className="flex-1" />
              <div className="w-72 flex items-center justify-between text-sm text-slate-500 font-medium">
                <div className="text-right w-28">Harga Baru</div>
                <div className="text-right w-28">Harga Lama</div>
                <div className="text-right w-20">Status</div>
              </div>
            </div>
          </div>

          {/* list rows — batasi tinggi agar muncul scrollbar (menampilkan ~7 item) */}
          <div className="p-4 space-y-3 max-h-[520px] overflow-y-auto pr-2">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`border border-slate-100 rounded-lg p-4 flex items-center gap-4 transition-shadow duration-150
                  ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:shadow-md`}
              >
                {/* image */}
                <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-50 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-2xl">🥖</div>
                  )}
                </div>

                {/* main info */}
                <div className="flex-1 min-w-0">
                  <div className="truncate">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">Pasar Bantul • {item.unit}</div>
                  </div>
                </div>

                {/* right columns: prices + status */}
                <div className="w-72 flex items-center justify-between text-sm">
                  <div className="text-right w-28">
                    <div className="text-slate-900 font-semibold">{formatIDR(item.priceNew)}</div>
                  </div>
                  <div className="text-right w-28">
                    <div className="text-slate-400 line-through">{formatIDR(item.priceOld)}</div>
                  </div>
                  <div className="text-right w-20">
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center text-slate-400 py-8">Tidak ada data untuk pencarian ini.</div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Naik: { bg: "bg-red-50", text: "text-red-700", colorFrom: "#FCA5A5", colorTo: "#DC2626", label: "Naik" },
    Turun: { bg: "bg-emerald-50", text: "text-emerald-800", colorFrom: "#BBF7D0", colorTo: "#16a34a", label: "Turun" },
    Stabil: { bg: "bg-sky-50", text: "text-sky-700", colorFrom: "#BFDBFE", colorTo: "#0ea5e9", label: "Stabil" },
  };
  const st = map[status] || map["Stabil"];
  const gid = `g-${status}`.replace(/\s+/g, "");

  const polylines = {
    Naik: "2,9 6,6 10,8 14,5 18,7",
    Turun: "2,5 6,8 10,6 14,10 18,8",
    Stabil: "2,7 6,7 10,7 14,7 18,7",
  };

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap" aria-hidden={false}>
      <span className="flex-none inline-flex items-center justify-center w-8 h-6">
        <svg width="28" height="14" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
          <defs>
            <linearGradient id={gid} x1="0" x2="1">
              <stop offset="0%" stopColor={st.colorFrom} />
              <stop offset="100%" stopColor={st.colorTo} />
            </linearGradient>
          </defs>

          <path d={`M2 11 L${polylines[status] || polylines["Stabil"]} L18 11 Z`} fill={`url(#${gid})`} fillOpacity="0.08" />
          <polyline
            points={polylines[status] || polylines["Stabil"]}
            stroke={`url(#${gid})`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>

      <span className={`inline-flex items-center gap-2 ${st.bg} ${st.text} px-2 py-0.5 rounded-full text-xs font-medium shadow-sm`} style={{ alignItems: "center", minWidth: 0 }}>
        <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: st.colorTo }} aria-hidden />
        <span className="font-semibold truncate">{st.label}</span>
      </span>
    </span>
  );
}
