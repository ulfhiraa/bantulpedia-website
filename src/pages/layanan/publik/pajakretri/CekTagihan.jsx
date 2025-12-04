// src/pages/layanan/pajakretri/CekTagihan.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search, RefreshCw, ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

const OPTIONS = [
  "Tagihan Pasar",
  "Tagihan Lab",
  "Tagihan Rusunawa",
  "Tagihan Kios Terminal",
  "Tagihan Pengujian Air",
  "Tagihan Limbah",
  "Tagihan Sampah",
];

export default function CekTagihan() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [idPelanggan, setIdPelanggan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const ddRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!idPelanggan.trim()) {
      setError("Masukkan ID pelanggan terlebih dahulu.");
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
      });
    }, 800);
  };

  const handleReset = () => {
    setIdPelanggan("");
    setError("");
    setResult(null);
    setSelectedOption("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner dengan overlay hijau transparan */}
      <div className="h-40 md:h-60 relative rounded-b-lg overflow-hidden">
        {/* layer foto */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* layer hijau transparan */}
        <div className="absolute inset-0 bg-emerald-900/60  mix-blend-multiply" />
      </div>

      {/* Main Content */}
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
            <h3 className="text-2xl font-semibold text-emerald-700 text-center">
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* INPUT KIRI */}
                <div className="md:col-span-8">
                  <label className="block text-sm text-slate-800 mb-3">
                    Masukkan ID Pelanggan
                  </label>
                  <input
                    type="text"
                    value={idPelanggan}
                    onChange={(e) => setIdPelanggan(e.target.value)}
                    placeholder="xxxxx/xxx/xx/xx/xxxx"
                    className="w-full px-4 py-3 rounded-md border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                {/* DROPDOWN KANAN */}
                <div className="md:col-span-4 relative" ref={ddRef}>
                  <label className="block text-sm text-slate-800 mb-2">
                    Pengecekan Tagihan
                  </label>

                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="inline-flex items-center justify-between bg-white border border-slate-300 px-6 py-3 rounded-full shadow-sm min-w-[260px] hover:shadow-md transition text-sm"
                    aria-expanded={dropdownOpen}
                  >
                    <span
                      className={
                        selectedOption
                          ? "text-slate-700"
                          : "text-slate-400 italic"
                      }
                    >
                      {selectedOption || "Pilih tagihan"}
                    </span>
                    <ChevronDown size={18} className="text-slate-500" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white w-60 rounded-xl shadow-lg border border-slate-200 z-20">
                      {OPTIONS.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setSelectedOption(item);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                            selectedOption === item
                              ? "bg-emerald-50 text-emerald-700 font-medium"
                              : "text-slate-700"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-300" />

              {/* BUTTON CARI + RESET */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2"
                >
                  <Search size={16} />
                  Cari
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Reset
                </button>

                {error && <span className="text-red-600 text-sm">{error}</span>}
              </div>

              {/* HASIL PENCARIAN */}
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
