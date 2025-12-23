// src/pages/layanan/pemerintahan/SipentolCheck.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  Search,
  RefreshCw,
  Package,
  CreditCard,
  Car,
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

/* ================= KATEGORI SIPENTOL ================= */
const CATEGORIES = [
  { key: "Info Kuota", label: "Info Kuota", icon: Package, color: "sky" },
  { key: "Info Tagihan", label: "Info Tagihan", icon: CreditCard, color: "violet" },
  { key: "Cek Kendaraan", label: "Cek Kendaraan", icon: Car, color: "amber" },
];

/* ================= WARNA AMAN TAILWIND ================= */
const COLOR_STYLES = {
  sky: {
    bg: "bg-sky-100",
    bgActive: "bg-sky-200",
    text: "text-sky-600",
    ring: "ring-sky-400",
  },
  violet: {
    bg: "bg-violet-100",
    bgActive: "bg-violet-200",
    text: "text-violet-600",
    ring: "ring-violet-400",
  },
  amber: {
    bg: "bg-amber-100",
    bgActive: "bg-amber-200",
    text: "text-amber-600",
    ring: "ring-amber-400",
  },
};

export default function SipentolCheck() {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [extraInput, setExtraInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [error, setError] = useState("");

  const dateRef = useRef(null);

  useEffect(() => {
    setError("");
    setResultMessage(null);
    setDate("");
    setExtraInput("");
  }, [category]);

  /* ================= LABEL DINAMIS ================= */
  const inputLabel = () => {
    if (category === "Info Kuota") return "Pilih Tanggal";
    if (category === "Info Tagihan") return "Masukkan Kode";
    if (category === "Cek Kendaraan")
      return "Masukkan Plat Nomor Kendaraan";
    return "Masukkan ID Pelanggan";
  };

  const openDatePicker = () => {
    if (dateRef.current?.showPicker) dateRef.current.showPicker();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setResultMessage(null);

    if (!category) return setError("Silakan pilih kategori layanan.");
    if (category === "Info Kuota" && !date)
      return setError("Silakan pilih tanggal.");
    if (category !== "Info Kuota" && !extraInput.trim())
      return setError("Masukkan data yang diperlukan.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResultMessage({
        type: "success",
        text: `Hasil SIPENTOL untuk "${category}" berhasil ditampilkan (contoh).`,
      });
    }, 900);
  };

  const handleReset = () => {
    setCategory("");
    setDate("");
    setExtraInput("");
    setResultMessage(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* HERO */}
      <div className="h-40 md:h-60 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
      </div>

      <main className="container mx-auto px-6 lg:px-24 py-10">
        {/* ================= HEADER (SEJAJAR) ================= */}
        <div className="relative flex items-center justify-center mb-8">
          {/* BACK BUTTON */}
          <button
            onClick={() => window.history.back()}
            className="absolute left-0 inline-flex items-center gap-2
                       text-sm bg-white border px-3 py-1.5 rounded-md
                       hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
          </button>

          {/* TITLE */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-emerald-700">
              Pengecekan Layanan SIPENTOL
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Makin gampang layanan publikmu dengan SIPENTOL!
            </p>
          </div>
        </div>

        {/* ================= CARD UTAMA ================= */}
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-8">
          {/* INPUT */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {inputLabel()}
            </label>

            {category === "Info Kuota" ? (
              <div className="relative">
                <input
                  ref={dateRef}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-12 rounded-lg border px-4 pr-10"
                />
                <button
                  type="button"
                  onClick={openDatePicker}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Calendar size={18} />
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={extraInput}
                onChange={(e) => setExtraInput(e.target.value)}
                className="w-full h-12 rounded-lg border px-4"
                disabled={!category}
              />
            )}
          </div>

          <div className="border-t my-8" />

          {/* KATEGORI */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
            {CATEGORIES.map((item) => {
              const Icon = item.icon;
              const active = category === item.key;
              const color = COLOR_STYLES[item.color];

              return (
                <button
                  key={item.key}
                  onClick={() => setCategory(item.key)}
                  className={`rounded-xl p-6 text-center transition-all
                    ${
                      active
                        ? `${color.bgActive} ring-2 ${color.ring} shadow-lg`
                        : `bg-white border border-slate-200 hover:${color.bg}`
                    }`}
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full
                      ${active ? color.bg : "bg-slate-100"}`}
                  >
                    <Icon size={26} className={color.text} />
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center text-sm text-slate-400 italic">
            Silakan pilih kategori layanan SIPENTOL
          </p>

          <div className="border-t my-8" />

          {/* ACTION */}
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-md hover:bg-emerald-700"
            >
              <Search size={16} />
              Cari
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-white border px-6 py-2.5 rounded-md hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>

          {/* HASIL */}
          <div className="mt-8">
            {loading && <div className="p-4 border rounded">Mencari...</div>}

            {!loading && !resultMessage && (
              <div className="p-4 border border-dashed rounded text-center text-slate-400">
                Hasil akan muncul di sini setelah melakukan pencarian.
              </div>
            )}

            {resultMessage && (
              <div className="p-4 border rounded bg-emerald-100 text-emerald-800">
                {resultMessage.text}
              </div>
            )}

            {error && <div className="mt-4 text-red-600">{error}</div>}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
