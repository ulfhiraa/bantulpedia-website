// src/pages/layanan/pajakretri/CekTagihan.jsx
import React, { useState } from "react";
import { Search, RefreshCw, ArrowLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

/**
 * NOTE:
 * - Untuk mengganti emoji dengan asset SVG/PNG: ubah `icon` pada ITEMS menjadi <img src={...} />
 */

const ITEMS = [
  { key: "pasar", label: "Tagihan Pasar", icon: "🏪" },
  { key: "rusunawa", label: "Tagihan Rusunawa", icon: "🏠" },
  { key: "sampah", label: "Tagihan Sampah", icon: "🗑️" },
  { key: "lab", label: "Tagihan Lab", icon: "🧪" },
  { key: "air", label: "Tagihan Pengujian Air", icon: "💧" },
  { key: "kios", label: "Tagihan Kios Terminal", icon: "🚌" },
  { key: "limbah", label: "Tagihan Limbah", icon: "♻️" },
];

export default function CekTagihan() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [idPelanggan, setIdPelanggan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Label input dinamis berdasarkan pilihan kategori
  const inputLabel = selectedOption ? `Masukkan ID ${selectedOption.label}` : "Masukkan ID Pelanggan";
  const inputPlaceholder = selectedOption ? `Contoh: xxxx/${selectedOption.key}/01/2025` : "xxxxx/xxx/xx/xx/xxxx";

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!idPelanggan.trim()) {
      setError(`${inputLabel} terlebih dahulu.`);
      return;
    }

    if (!/^[0-9A-Za-z\/\-]+$/.test(idPelanggan.trim())) {
      setError("Format ID tidak valid.");
      return;
    }

    if (!selectedOption) {
      setError("Pilih jenis tagihan terlebih dahulu.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        id: idPelanggan,
        name: "Bpk/Ibu Contoh",
        period: "2025-11",
        amount: 125000,
        status: "Belum Lunas",
        category: selectedOption.label,
      });
    }, 800);
  };

  const handleReset = () => {
    setIdPelanggan("");
    setError("");
    setResult(null);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-white">
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

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition flex items-center"
              aria-label="Kembali"
            >
              <ArrowLeft size={18} />
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-emerald-700 text-center">
              Pengecekan Tagihan
            </h3>
            <p className="text-sm text-slate-500 mt-1 text-center">
              Makin gampang urus kependudukan dan permukiman
            </p>
          </div>

          <div style={{ width: 40 }} />
        </div>

        {/* CARD BESAR */}
        <div
          className="rounded-2xl border border-slate-200 mt-6"
          style={{ backgroundColor: "#eef8f2" }}
        >
          <div className="px-8 py-10">
            <form onSubmit={handleSearch}>
              {/* INPUT ROW (full width) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-12">
                  <label className="block text-sm text-slate-800 mb-3">
                    {inputLabel}
                  </label>
                  <input
                    type="text"
                    value={idPelanggan}
                    onChange={(e) => setIdPelanggan(e.target.value)}
                    placeholder={inputPlaceholder}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>

              {/* separator */}
              <div className="mt-6 border-t border-slate-300" />

              {/* ICON CATEGORIES - CENTERED, each card fills its grid cell */}
              <div className="mt-8 text-center">
                <h4 className="text-lg font-medium text-slate-800 mb-6">Melayani Tagihan</h4>

                {/*
                  Grid:
                  - mobile: 2 kolom
                  - small/tablet: 4 kolom
                  - desktop: 7 kolom (sesuaikan jika perlu)
                  Setiap tombol dibuat full-width/height dari cell sehingga memenuhi card.
                */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 px-4">
                  {ITEMS.map((it) => {
                    const isActive = selectedOption?.key === it.key;
                    return (
                      <button
                        key={it.key}
                        type="button"
                        onClick={() => { setSelectedOption(it); setError(""); }}
                        className={`w-full h-full flex flex-col items-center justify-center gap-3 p-4 rounded-lg transition transform focus:outline-none focus:ring-2 focus:ring-emerald-200
                          ${isActive ? "bg-emerald-50 border border-emerald-200 shadow-sm" : "bg-white border border-transparent hover:border-slate-100"}
                        `}
                        aria-pressed={isActive}
                      >
                        {/* icon circle */}
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isActive ? "bg-emerald-100" : "bg-white"} shadow-sm`}>
                          <span className="text-2xl">{it.icon}</span>
                        </div>

                        {/* label */}
                        <div className="text-sm text-slate-700">{it.label.replace("Tagihan ", "")}</div>
                      </button>
                    );
                  })}
                </div>

                {/* current selection */}
                <div className="mt-5 text-sm text-slate-600">
                  {selectedOption ? (
                    <span>
                      <span className="font-medium text-slate-800">Terpilih:</span>{" "}
                      {selectedOption.label}
                    </span>
                  ) : (
                    <span className="italic text-slate-400">Silakan pilih kategori tagihan</span>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-300" />

              {/* ACTION BUTTONS */}
              <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-stretch justify-center sm:justify-start gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2"
                >
                  <Search size={16} /> Cari
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Reset
                </button>

                {error && <span className="text-red-600 text-sm">{error}</span>}
              </div>

              {/* RESULTS */}
              <div className="mt-6">
                {loading && (
                  <div className="p-4 border border-slate-200 bg-white rounded text-center text-slate-600">
                    Memeriksa tagihan...
                  </div>
                )}

                {!loading && result && (
                  <div className="p-4 border border-slate-200 bg-white rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500">ID Pelanggan</p>
                        <p className="font-semibold">{result.id}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Nama</p>
                        <p>{result.name}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Periode</p>
                        <p>{result.period}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Jumlah</p>
                        <p className="font-bold text-emerald-700">
                          Rp {result.amount.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Kategori</p>
                        <p>{result.category}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Status</p>
                        <p>{result.status}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && result === null && (
                  <div className="p-4 border border-dashed border-slate-300 text-center text-slate-400 rounded">
                    Hasil akan muncul di sini setelah melakukan pencarian.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
