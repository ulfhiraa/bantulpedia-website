// src/pages/layanan/perdagangan/InfoBahanPokok.jsx
import React, { useEffect, useState, useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import { getInfoBahanPokok } from "../../../../api/layanan/publik/infobahanpokok";

const CATEGORIES = [
  "Bahan Pokok Utama",
  "Protein Hewani",
  "Kacang & Olahan",
  "Minyak & Gula",
  "Sayur & Bumbu Dapur",
  "Buah-Buahan",
];

const PRODUCT_ICONS = {
  // BAHAN POKOK / BERAS
  [normalizeKey("Beras Premium")]: "🍚",
  [normalizeKey("Beras Medium")]: "🍚",
  [normalizeKey("Beras Bulog")]: "🍚",

  // GULA & GARAPO
  [normalizeKey("Gula Pasir Curah")]: "🍬",
  [normalizeKey("Garam Yodium Bata")]: "🧂",
  [normalizeKey("Garam Yodium Halus")]: "🧂",

  // MINYAK GORENG
  [normalizeKey("Minyak Goreng Kemasan Premium")]: "🛢️",
  [normalizeKey("Minyak goreng sederhana/minyakkita")]: "🛢️",
  [normalizeKey("Minyak goreng curah")]: "🛢️",

  // TEPUNG / MIE
  [normalizeKey("Terigu Segitiga Biru")]: "🥖",
  [normalizeKey("Mie Instan Rebus Setara Indomie")]: "🍜",

  // DAGING SAPI & AYAM
  [normalizeKey("Daging Sapi Kualitas 1")]: "🥩",
  [normalizeKey("Daging Sapi Kualitas 2")]: "🥩",
  [normalizeKey("Ayam Ras/Boiler")]: "🍗",
  [normalizeKey("Daging Ayam Kampung")]: "🐓",

  // TELUR
  [normalizeKey("Telur Ayam Negeri")]: "🥚",
  [normalizeKey("Telur Ayam Kampung")]: "🥚",

  // CABAI
  [normalizeKey("Cabe Merah Keriting")]: "🌶️",
  [normalizeKey("Cabe Merah Besar")]: "🌶️",
  [normalizeKey("Cabe Rawit Merah")]: "🌶️",
  [normalizeKey("Cabe Rawit Hijau")]: "🌶️",

  // BAWANG
  [normalizeKey("Bawang Merah")]: "🧅",
  [normalizeKey("Bawang Putih Honan (Sinco)")]: "🧄",
  [normalizeKey("Bawang Putih Kating")]: "🧄",
  [normalizeKey("Bawang Bombay")]: "🧅",

  // SUSU & OLAHAN
  [normalizeKey("Susu bubuk Setara Dancow Rasa Vanila")]: "🥛",
  [normalizeKey("Susu Kental Manis Bendera")]: "🥛",
  [normalizeKey("Susu Kental Manis Indomilk")]: "🥛",

  // KACANG-KACANGAN
  [normalizeKey("kacang kedelai Impor")]: "🫘",
  [normalizeKey("Kacang Kedelai Lokal")]: "🫘",
  [normalizeKey("Kacang Tanah")]: "🥜",
  [normalizeKey("Kacang Hijau")]: "🫘",

  // IKAN & HASIL LAUT
  [normalizeKey("Ikan Asin Teri")]: "🐟",
  [normalizeKey("Ikan Kembung")]: "🐠",
  [normalizeKey("Udang ukuran sedang")]: "🦐",

  // UMBI & BIJI
  [normalizeKey("Ketela Pohon")]: "🍠",
  [normalizeKey("Jagung Pipil Kering")]: "🌽",

  // SAYURAN
  [normalizeKey("Tomat")]: "🍅",
  [normalizeKey("Kol/Kobis")]: "🥬",
  [normalizeKey("Sawi Hijau")]: "🥬",
  [normalizeKey("Kentang")]: "🥔",
  
  // PROTEIN NABATI
  [normalizeKey("Tempe")]: "🍱",
  [normalizeKey("Tahu mentah putih")]: "🧈",

  // BUAH
  [normalizeKey("Pisang Ambon")]: "🍌",
  [normalizeKey("Jeruk lokal")]: "🍊",
};

// Fallback jika nama tidak ditemukan
const DEFAULT_ICON = "🛒";

// daftar pasar (ID harus sama dengan marketId di JSON)
const MARKETS = [
  {
    id: "niten",
    name: "Pasar Niten",
    description: "Pasar Niten — Glondong, Trirenggo, Kasihan, Bantul Regency",
  },
  {
    id: "bantul",
    name: "Pasar Bantul",
    description: "Pasar Bantul — Bantul Regency",
  },
  {
    id: "imogiri",
    name: "Pasar Imogiri",
    description: "Pasar Imogiri — Imogiri, Bantul Regency",
  },
  {
    id: "piyungan",
    name: "Pasar Piyungan",
    description: "Pasar Piyungan — Piyungan, Bantul Regency",
  },
  {
    id: "pijenan",
    name: "Pasar Pijenan",
    description: "Pasar Pijenan — Pijenan, Bantul Regency",
  },
];

function formatIDR(n) {
  if (n == null) return "-";
  return "Rp " + Number(n).toLocaleString("id-ID");
}

function normalizeKey(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")  // semua selain huruf/angka jadi "_"
    .replace(/^_+|_+$/g, "");     // hapus "_" di awal/akhir
}

export default function InfoBahanPokok() {
  const [selectedCategory, setSelectedCategory] = useState("Protein Hewani");
  const [selectedMarket, setSelectedMarket] = useState("niten");
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState([]); // semua data dari API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        // ambil data dari API (via axios helper)
        const json = await getInfoBahanPokok();

        if (!Array.isArray(json)) {
          throw new Error("Format data tidak sesuai (harus berupa array)");
        }

        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ambil market object untuk teks lokasi
  const currentMarket = MARKETS.find((m) => m.id === selectedMarket);

  // filter data sesuai marketplace + kategori + pencarian
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return data.filter((item) => {
      if (item.marketId !== selectedMarket) return false;
      if (item.category !== selectedCategory) return false;

      if (!q) return true;

      const name = (item.productName || "").toLowerCase();
      const id = (item.productId || "").toLowerCase();

      return name.includes(q) || id.includes(q);
    });
  }, [data, selectedMarket, selectedCategory, searchQuery]);

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

      <main className="mx-auto py-10 px-4">
        {/* back button
        <div className="mb-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
            Kembali
          </button>
        </div> */}

        {/* HEADER + BACK + PILIH PASAR */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* KIRI: BACK + TITLE */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="
                inline-flex items-center justify-center
                w-9 h-9
                rounded-md
                border border-slate-200
                bg-white
                text-slate-700
                hover:bg-slate-50
                flex-shrink-0
              "
              aria-label="Kembali"
            >
              <ChevronLeft size={18} />
            </button>

            <div>
              <h2 className="text-md md:text-xl font-bold text-emerald-700">
                Informasi Harga Bahan Pokok
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Data harga harian berdasarkan pasar rakyat di Kabupaten Bantul.
              </p>
            </div>
          </div>

          {/* KANAN: PILIH PASAR */}
          <div className="flex gap-2 items-center">
            <span className="text-sm text-slate-600">Pilih Pasar:</span>
            <select
              className="text-sm border border-slate-200 rounded-md px-3 py-2 bg-white shadow-sm"
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
            >
              {MARKETS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
 
         <div className="p-4 border-b border-slate-100">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              readOnly                
              value={
                currentMarket
                  ? currentMarket.description
                  : "Pilih pasar terlebih dahulu"
              }
              className="w-full max-w-4xl mx-auto text-center bg-white border border-slate-200 rounded-full px-6 py-3 text-sm text-slate-600 shadow-sm"
            />
          </div>          
        </div>
        
        {/* divider */}
        <hr className="border-t border-slate-200 my-6" />

        {/* Card utama */}
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Category pills */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-transform duration-150
                  ${
                    selectedCategory === c
                      ? "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 shadow-lg -translate-y-0.5"
                      : "bg-white border border-slate-200 text-slate-700 hover:shadow-sm hover:-translate-y-0.5"
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        
        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-400 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

          {/* header row (desktop) */}
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

          {/* content */}
          <div className="p-4 space-y-3 max-h-[520px] overflow-y-auto pr-2">
            {loading && (
              <div className="text-center text-slate-400 py-8 text-sm">
                Memuat data harga bahan pokok...
              </div>
            )}

            {!loading && error && (
              <div className="text-center text-red-500 py-8 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center text-slate-400 py-8">
                Tidak ada data untuk kombinasi pencarian ini.
              </div>
            )}

            {!loading &&
              !error &&
              filteredProducts.map((item, idx) => (
                <div
                  key={`${item.marketId}-${item.productId}`}
                  className={`border border-slate-100 rounded-lg p-4 flex items-center gap-4 transition-shadow duration-150
                    ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:shadow-md`}
                >
                  {/* icon produk */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-50 flex items-center justify-center">
                    <div className="text-2xl">
                      {PRODUCT_ICONS[normalizeKey(item.productName)] || DEFAULT_ICON}
                    </div>
                  </div>

                  {/* main info */}
                  <div className="flex-1 min-w-0">
                    <div className="truncate">
                      <div className="text-sm font-semibold text-slate-900">
                        {item.productName}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {item.marketName} • {item.unit || "kg"}
                      </div>
                    </div>
                  </div>

                  {/* right columns */}
                  <div className="w-72 flex items-center justify-between text-sm">
                    <div className="text-right w-28">
                      <div className="text-slate-900 font-semibold">
                        {formatIDR(item.priceNew)}
                      </div>
                    </div>
                    <div className="text-right w-28">
                      <div className="text-slate-400 line-through">
                        {formatIDR(item.priceOld)}
                      </div>
                    </div>
                    <div className="text-right w-20">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Naik: {
      bg: "bg-red-50",
      text: "text-red-700",
      colorFrom: "#FCA5A5",
      colorTo: "#DC2626",
      label: "Naik",
    },
    Turun: {
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      colorFrom: "#BBF7D0",
      colorTo: "#16a34a",
      label: "Turun",
    },
    Stabil: {
      bg: "bg-sky-100",
      text: "text-sky-700",
      colorFrom: "#4791ecff",
      colorTo: "#0779b6ff",
      label: "Stabil",
    },
  };
  const st = map[status] || map["Stabil"];
  const gid = `g-${status}`.replace(/\s+/g, "");

  const polylines = {
    Naik: "2,9 6,6 10,8 14,5 18,7",
    Turun: "2,5 6,8 10,6 14,10 18,8",
    Stabil: "2,6 6,6 10,6 14,6 18,6",
  };

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="flex-none inline-flex items-center justify-center w-8 h-6">
        <svg
          width="28"
          height="14"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          focusable="false"
        >
          <defs>
            <linearGradient id={gid} x1="0" x2="1">
              <stop offset="0%" stopColor={st.colorFrom} />
              <stop offset="80%" stopColor={st.colorTo} />
            </linearGradient>
          </defs>

          <polyline
            points={polylines[status] || polylines["Stabil"]}
            stroke={st.colorTo}
            strokeWidth={status === "Stabil" ? "1.6" : "1.25"}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>

      <span
        className={`inline-flex items-center gap-2 ${st.bg} ${st.text} px-2 py-0.5 rounded-full text-xs font-medium shadow-sm`}
        style={{ alignItems: "center", minWidth: 0 }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: st.colorTo }}
        />
        <span className="font-semibold truncate">{st.label}</span>
      </span>
    </span>
  );
}