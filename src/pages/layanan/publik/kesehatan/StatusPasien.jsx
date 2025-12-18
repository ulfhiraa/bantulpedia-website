// src/pages/layanan/publik/kesehatan/StatusPasien.jsx
import React, { useState, useRef } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function StatusPasien() {
  const navigate = useNavigate();
  const rowStyle = "grid grid-cols-12 gap-4 items-center";
  const labelStyle = "col-span-12 md:col-span-3 text-sm text-slate-700";
  const inputWrap = "col-span-12 md:col-span-9";

  // state
  const [rm, setRm] = useState("");
  const [rmError, setRmError] = useState("");
  const [tglLahir, setTglLahir] = useState("");

  // handle RM input: only digits allowed
  const onChangeRm = (e) => {
    const value = e.target.value;
    // if non-digit present -> show error & strip
    if (/[^0-9]/.test(value)) {
      setRmError("Hanya dapat diisi angka");
      const onlyDigits = value.replace(/\D/g, "");
      setRm(onlyDigits);
      setTimeout(() => setRmError(""), 1500);
      return;
    }
    setRm(value);
  };

  // Periksa status handler
  const handlePeriksa = (e) => {
    e.preventDefault();
    if (!rm || rm.trim() === "") {
      alert("Silakan masukkan Nomor Rekam Medis (angka).");
      return;
    }
    // placeholder: di sini nanti bisa dipanggil API untuk cek status
    alert(`Status pasien (RM: ${rm}) ditemukan — contoh: Terdaftar / Rawat Jalan.`);
  };

  // Reset handler
  const handleReset = () => {
    setRm("");
    setRmError("");
    setTglLahir("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
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

      {/* BACK BUTTON + TABS: button diposisikan absolut di paling kiri, tabs tetap di dalam container terpusat */}
      <div className="w-full relative">
        <button
          type="button"
          onClick={() => navigate("/layanan/publik")}
          className="absolute left-4 md:left-6 lg:left-8 top-6 inline-flex items-center justify-center w-9 h-9 text-slate-700 bg-white border border-slate-200 rounded-md shadow-sm hover:bg-slate-50 z-20"
          aria-label="Kembali ke Layanan Publik"
          title="Kembali ke Layanan Publik"
        >
          <ChevronLeft size={16} />
        </button>

        {/* TABS (pills centered, lebih jarak antar tombol) */}
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center space-x-8 py-6">
            <NavLink
              to="/layanan/publik/kesehatan/pendaftaran-rsud"
              className={({ isActive }) =>
                isActive
                  ? "px-6 py-2.5 rounded-lg bg-emerald-100 text-sm shadow-md text-slate-800 min-w-[160px] text-center"
                  : "px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm text-slate-700 min-w-[160px] text-center"
              }
            >
              Pendaftaran Pasien
            </NavLink>

            <NavLink
              to="/layanan/publik/kesehatan/status-pasien"
              className={({ isActive }) =>
                isActive
                  ? "px-6 py-2.5 rounded-lg bg-emerald-100 text-sm shadow-md text-slate-800 min-w-[160px] text-center"
                  : "px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm text-slate-700 min-w-[160px] text-center"
              }
            >
              Status Pasien
            </NavLink>

            <a
              href="https://rsudps.bantulkab.go.id/hal/info-bed"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm text-slate-700 min-w-[160px] text-center"
            >
              Info Kamar / Bed RS
            </a>

            <NavLink
              to="/layanan/publik/kesehatan/cari-dokter"
              className={({ isActive }) =>
                isActive
                  ? "px-6 py-2.5 rounded-lg bg-emerald-100 text-sm shadow-md text-slate-800 min-w-[160px] text-center"
                  : "px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm text-slate-700 min-w-[160px] text-center"
              }
            >
              Cari Dokter
            </NavLink>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pb-16">
        <div className="bg-white rounded-xl shadow-none border border-transparent overflow-visible">
          {/* header */}
          <div className="border-t border-slate-200" />

          {/* card */}
          <div className="p-6">
            <div className="bg-[#f2f4f7] rounded-md p-6 shadow-sm mx-auto">
              <h2 className="text-center text-sm font-bold text-slate-800">Data Pasien</h2>

              <form className="mt-6" onSubmit={handlePeriksa}>
                <div className="space-y-4">
                  {/* Nomor Rekam Medis */}
                  <div className={rowStyle}>
                    <label className={labelStyle}>Nomor Rekam Medis</label>
                    <div className={inputWrap}>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={rm}
                        onChange={onChangeRm}
                        placeholder="Masukkan nomor rekam medis"
                        className="w-full rounded-md bg-white px-3 py-2 text-sm border border-transparent shadow-sm focus:outline-none"
                        aria-label="Nomor Rekam Medis"
                      />
                      {rmError && <div className="text-red-500 text-xs mt-1">{rmError}</div>}
                    </div>
                  </div>

                  {/* Tanggal Lahir */}
                  <div className={rowStyle}>
                    <label className={labelStyle}>Tanggal Lahir</label>
                    <div className={inputWrap}>
                      <input
                        type="date"
                        value={tglLahir}
                        onChange={(e) => setTglLahir(e.target.value)}
                        className="w-full rounded-md bg-white px-3 py-2 text-sm border border-transparent shadow-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Buttons (smaller) */}
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow-sm transform transition-transform duration-120 ease-out active:scale-95"
                    >
                      Periksa Status Pasien
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 rounded-md bg-slate-100 text-slate-800 text-sm font-medium shadow-sm transform transition-transform duration-120 ease-out active:scale-95"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
