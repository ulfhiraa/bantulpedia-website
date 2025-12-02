// src/pages/layanan/pemerintahan/SipentolCheck.jsx
import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ChevronLeft, Search, RefreshCw } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

const CATEGORIES = ["Info Kuota", "Info Tagihan", "Cek Kendaraan"];

export default function SipentolCheck() {
  const [date, setDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]); // default Info Kuota
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [extraInput, setExtraInput] = useState(""); // kode tagihan atau plat
  const [error, setError] = useState("");
  const ddRef = useRef(null);
  const dateRef = useRef(null);

  // hide native date icon to avoid double icon
  const injectedCSS = `
    input[type="date"]::-webkit-calendar-picker-indicator { display: none !important; }
    input[type="date"] { -webkit-appearance: none; appearance: none; -moz-appearance: textfield; }
    input[type="date"]::-ms-clear, input[type="date"]::-ms-expand { display: none; }
  `;

  useEffect(() => {
    const onDoc = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDropdownOpen(false);
    };
    window.addEventListener("mousedown", onDoc);
    return () => window.removeEventListener("mousedown", onDoc);
  }, []);

  // keep date when user switches category (so returning to Info Kuota keeps selection)
  useEffect(() => {
    setError("");
    setResultMessage(null);
    // clear only extraInput when switching
    setExtraInput("");
  }, [category]);

  const openDatePicker = () => {
    const el = dateRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try { el.showPicker(); return; } catch {}
    }
    el.focus();
    try { el.click(); } catch {}
  };

  // validation depending on category
  const validateForm = () => {
    if (category === "Info Kuota") {
      if (!date) return "Silakan pilih tanggal untuk cek kuota.";
    } else if (category === "Info Tagihan") {
      const v = (extraInput || "").trim();
      if (!v) return "Masukkan kode tagihan.";
      if (!/^[0-9A-Za-z\/\-\s]{4,}$/.test(v)) return "Format kode tidak valid.";
    } else if (category === "Cek Kendaraan") {
      const v = (extraInput || "").trim();
      if (!v) return "Masukkan plat nomor kendaraan.";
      if (!/^[A-Za-z]{1,4}\s?\d{1,4}([A-Za-z]{1,3})?$/.test(v)) return "Format plat nomor kemungkinan tidak valid.";
    }
    return null;
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setError("");
    setResultMessage(null);

    const verr = validateForm();
    if (verr) {
      setError(verr);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (category === "Info Kuota") {
        setResultMessage({ type: "success", text: `Kuota untuk tanggal ${date} tersedia. (contoh)` });
      } else if (category === "Info Tagihan") {
        setResultMessage({ type: "success", text: `Hasil Info Tagihan untuk kode "${extraInput.trim()}": Tagihan Rp 250.000 (contoh).` });
      } else {
        setResultMessage({ type: "success", text: `Cek Kendaraan: Plat "${extraInput.trim().toUpperCase()}" terdaftar. (contoh)` });
      }
    }, 800);
  };

  const handleReset = () => {
    setDate("");
    setCategory(CATEGORIES[0]);
    setExtraInput("");
    setResultMessage(null);
    setError("");
    setLoading(false);
  };

  const panelTitle = () => {
    if (category === "Info Tagihan") return "Pengecekan Tagihan";
    if (category === "Cek Kendaraan") return "Cek Kendaraan";
    return "Pengecekan Kuota Pelayanan Sipentol";
  };

  const leftLabel = () => {
    if (category === "Info Kuota") return "Pilih Tanggal";
    if (category === "Info Tagihan") return "Masukkan Kode";
    if (category === "Cek Kendaraan") return "Masukkan Plat Nomor";
    return "";
  };

  const middlePlaceholder = () => {
    if (category === "Info Kuota") return "dd/mm/yyyy";
    if (category === "Info Tagihan") return "xxxxx/xxx/xx/xx/xxxx";
    if (category === "Cek Kendaraan") return "AB 1234 CD";
    return "";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{injectedCSS}</style>
      <Navbar />

      {/* banner */}
      <div
        className="h-40 md:h-56 bg-cover bg-center rounded-b-lg"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <main className="container mx-auto px-6 lg:px-24 py-10">
        {/* back button outside the card */}
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
        
        <div className="rounded-lg border border-slate-200 p-6">
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-4">{panelTitle()}</h2>

          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
            <form onSubmit={handleSearch}>
              {/* single row: left label (3) | middle input (5) | right dropdown (4) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* left label */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700">{leftLabel()}</label>
                </div>

                {/* middle input: date or text */}
                <div className="md:col-span-5">
                  {category === "Info Kuota" ? (
                    <div className="relative">
                      <input
                        ref={dateRef}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-12 border border-slate-200 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
                        placeholder={middlePlaceholder()}
                        aria-label="Pilih tanggal"
                      />
                      <button
                        type="button"
                        onClick={openDatePicker}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                        aria-label="Buka pemilih tanggal"
                      >
                        <Calendar size={18} className="text-slate-600" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={extraInput}
                      onChange={(e) => setExtraInput(e.target.value)}
                      placeholder={middlePlaceholder()}
                      className="w-full h-12 border border-slate-200 rounded-full px-4 text-sm focus:outline-none"
                      aria-label={leftLabel()}
                    />
                  )}
                </div>

                {/* right dropdown */}
                <div className="md:col-span-4 flex items-center justify-end" ref={ddRef}>
                  <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium text-slate-700 mb-0 text-right"></label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((s) => !s)}
                        className="w-full h-12 text-left bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm inline-flex items-center justify-between gap-3"
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                      >
                        <span className="text-sm text-slate-800">{category}</span>
                        <ChevronDown size={18} className="text-slate-500" />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                          {CATEGORIES.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                setCategory(c);
                                setDropdownOpen(false);
                                setError("");
                              }}
                              className={`w-full text-left px-4 py-2 text-sm ${c === category ? "bg-emerald-50 text-emerald-700 font-medium" : "text-slate-700 hover:bg-slate-50"}`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 my-6" />

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
                >
                  <Search size={16} />
                  {category === "Info Kuota" ? "Cari Kuota" : category === "Info Tagihan" ? "Cek Tagihan" : "Cek Kendaraan"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-md hover:bg-slate-50 transition"
                >
                  <RefreshCw size={16} />
                  Reset
                </button>

                <div className="flex-1" />
                {/* <div className="text-sm text-slate-500">Pilih kategori untuk tipe informasi</div> */}
              </div>

              {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

              <div className="mt-6">
                {loading && (
                  <div className="p-4 border border-slate-200 rounded bg-white text-slate-600">Mencari...</div>
                )}

                {!loading && resultMessage && resultMessage.type === "success" && (
                  <div className="p-4 border border-slate-200 rounded bg-emerald-50 text-emerald-800">
                    {resultMessage.text}
                  </div>
                )}

                {!loading && resultMessage && resultMessage.type === "error" && (
                  <div className="p-4 border border-slate-200 rounded bg-red-50 text-red-700">
                    {resultMessage.text}
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
