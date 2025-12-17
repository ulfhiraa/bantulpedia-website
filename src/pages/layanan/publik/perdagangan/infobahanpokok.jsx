// src/pages/layanan/perdagangan/InfoBahanPokok.jsx
import React, { useEffect, useState, useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import { getInfoBahanPokok } from "../../../../api/layanan/publik/infobahanpokok";

/* ===================== HELPER ===================== */
function normalizeKey(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatIDR(n) {
  if (n == null) return "-";
  return "Rp " + Number(n).toLocaleString("id-ID");
}

/* ===================== CONSTANTS ===================== */
const CATEGORIES = [
  "Bahan Pokok Utama",
  "Protein Hewani",
  "Kacang & Olahan",
  "Minyak & Gula",
  "Sayur & Bumbu Dapur",
  "Buah-Buahan",
];

const PRODUCT_ICONS = {
  [normalizeKey("Beras Premium")]: "🍚",
  [normalizeKey("Beras Medium")]: "🍚",
  [normalizeKey("Gula Pasir Curah")]: "🍬",
  [normalizeKey("Garam Yodium Bata")]: "🧂",
  [normalizeKey("Minyak Goreng Kemasan Premium")]: "🛢️",
  [normalizeKey("Mie Instan Rebus Setara Indomie")]: "🍜",
  [normalizeKey("Daging Sapi Kualitas 1")]: "🥩",
  [normalizeKey("Ayam Ras/Boiler")]: "🍗",
  [normalizeKey("Telur Ayam Negeri")]: "🥚",
  [normalizeKey("Cabe Merah Keriting")]: "🌶️",
  [normalizeKey("Bawang Merah")]: "🧅",
  [normalizeKey("Susu Kental Manis Bendera")]: "🥛",
  [normalizeKey("Kacang Tanah")]: "🥜",
  [normalizeKey("Ikan Kembung")]: "🐟",
  [normalizeKey("Tomat")]: "🍅",
  [normalizeKey("Kentang")]: "🥔",
  [normalizeKey("Pisang Ambon")]: "🍌",
};

const DEFAULT_ICON = "🛒";

const MARKETS = [
  { id: "niten", name: "Pasar Niten", description: "Pasar Niten — Bantul" },
  { id: "bantul", name: "Pasar Bantul", description: "Pasar Bantul — Bantul" },
  { id: "imogiri", name: "Pasar Imogiri", description: "Pasar Imogiri — Bantul" },
  { id: "piyungan", name: "Pasar Piyungan", description: "Pasar Piyungan — Bantul" },
  { id: "pijenan", name: "Pasar Pijenan", description: "Pasar Pijenan — Bantul" },
];

/* ===================== COMPONENT ===================== */
export default function InfoBahanPokok() {
  const [selectedCategory, setSelectedCategory] = useState("Protein Hewani");
  const [selectedMarket, setSelectedMarket] = useState("niten");
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const json = await getInfoBahanPokok();
        if (!Array.isArray(json)) throw new Error("Format data tidak valid");
        setData(json);
      } catch (err) {
        setError(err.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const currentMarket = MARKETS.find((m) => m.id === selectedMarket);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return data.filter((item) => {
      if (item.marketId !== selectedMarket) return false;
      if (item.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        item.productName?.toLowerCase().includes(q) ||
        item.productId?.toLowerCase().includes(q)
      );
    });
  }, [data, selectedMarket, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* HERO */}
      <div className="h-40 md:h-60 relative overflow-hidden rounded-b-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
      </div>

      <main className="container mx-auto px-6 lg:px-12 py-10">
        {/* BACK */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm bg-white border px-3 py-1.5 rounded-md mb-6"
        >
          <ChevronLeft size={16} />
          Kembali
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-bold text-emerald-700">
          Informasi Harga Bahan Pokok
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Data harga harian pasar rakyat Kabupaten Bantul
        </p>

        {/* MARKET */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm">Pilih Pasar:</span>
          <select
            className="border rounded-md px-3 py-2"
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

        <input
          readOnly
          value={currentMarket?.description || ""}
          className="w-full text-center mt-4 bg-white border rounded-full px-6 py-3 text-sm"
        />

        {/* CATEGORY */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === c
                  ? "bg-emerald-100 text-emerald-800 shadow"
                  : "bg-white border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <input
          className="w-full mt-6 px-4 py-2 border rounded-lg"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {loading && <p className="text-center text-slate-400">Memuat data…</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading &&
            !error &&
            filteredProducts.map((item) => (
              <div
                key={item.productId}
                className="bg-white border rounded-lg p-4 flex items-center gap-4"
              >
                <div className="text-2xl w-12 h-12 flex items-center justify-center bg-slate-50 rounded">
                  {PRODUCT_ICONS[normalizeKey(item.productName)] || DEFAULT_ICON}
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{item.productName}</div>
                  <div className="text-xs text-slate-500">
                    {item.marketName} • {item.unit || "kg"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-slate-900">
                    {formatIDR(item.priceNew)}
                  </div>
                  <div className="text-xs text-slate-400 line-through">
                    {formatIDR(item.priceOld)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
