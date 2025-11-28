// src/pages/layanan/publik/kesehatan/StatusPasien.jsx
import React, { useState, useRef } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import { NavLink } from "react-router-dom";

export default function StatusPasien() {
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

      {/* HERO */}
      <header className="relative w-full h-44 md:h-56 lg:h-64">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
      </header>

      {/* TABS */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex gap-15 items-center py-6">
          <NavLink
            to="/layanan/publik/kesehatan/pendaftaran-rsud"
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-sm shadow-sm"
          >
            Pendaftaran Pasien
          </NavLink>

          <NavLink
            to="/layanan/publik/kesehatan/status-pasien"
            className="px-4 py-2 rounded-md bg-emerald-100 text-sm shadow-sm text-slate-800"
          >
            Status Pasien
          </NavLink>

          <a
            href="https://rsudps.bantulkab.go.id/hal/info-bed"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-sm shadow-sm"
          >
            Info Kamar / Bed RS
          </a>

          <NavLink
            to="/layanan/publik/kesehatan/cari-dokter"
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-sm shadow-sm"
          >
            Cari Dokter
          </NavLink>
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
