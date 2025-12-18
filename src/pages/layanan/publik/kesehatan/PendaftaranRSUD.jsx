// src/pages/layanan/publik/kesehatan/PendaftaranRSUD.jsx
import React, { useState, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import { useNavigate } from "react-router-dom";

export default function PendaftaranRSUD() {
  const navigate = useNavigate();
  const rowStyle = "grid grid-cols-12 gap-4 items-center";
  const labelStyle = "col-span-12 md:col-span-3 text-sm text-slate-700";
  const inputWrap = "col-span-12 md:col-span-9";

  // form state
  const [rm, setRm] = useState("");
  const [rmError, setRmError] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [klinik, setKlinik] = useState("");
  const [tglPeriksa, setTglPeriksa] = useState("");
  const [dokter, setDokter] = useState("");
  const [pembayaran, setPembayaran] = useState("");

  // refs to date inputs
  const tglLahirRef = useRef(null);
  const tglPeriksaRef = useRef(null);

  // inject css (component-scoped)
  const injectedCSS = `
    /* hide native calendar icon (Chrome, Edge, Safari) */
    input[type="date"]::-webkit-calendar-picker-indicator { display: none !important; }
    /* make date input appear like text field */
    input[type="date"] { -webkit-appearance: none; appearance: none; -moz-appearance: textfield; }
    /* hide native arrow for select */
    select { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
    /* hide ms clear/expand */
    input[type="date"]::-ms-clear, input[type="date"]::-ms-expand { display: none; }
  `;

  // helper to open native date picker (use showPicker if available)
  const openDatePicker = (ref) => {
    const el = ref && ref.current;
    if (!el) return;
    // modern browsers support showPicker()
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch (err) {
        // ignore and fallback
      }
    }
    // fallback: focus input (on many browsers focus will open picker)
    el.focus();
    // also dispatch a click (some browsers may require)
    try {
      el.click();
    } catch (err) {
      // ignore
    }
  };

  // handle RM input: only digits allowed + show immediate warning if non-digit typed
  const onChangeRm = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setRmError("Hanya dapat diisi angka");
      // remove non-digits immediately
      const onlyDigits = value.replace(/\D/g, "");
      setRm(onlyDigits);
      // auto-hide error
      setTimeout(() => setRmError(""), 1500);
      return;
    }
    setRm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rm || rm.trim() === "") {
      alert("Masukkan Nomor Rekam Medis (angka).");
      return;
    }
    alert("Pendaftaran berhasil ✓");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{injectedCSS}</style>

      <Navbar />

      {/* banner  */}
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

      {/* tabs (back button aligned left, tabs centered) */}
      <div className="w-full relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/layanan/publik");
          }}
          className="absolute left-4 md:left-6 lg:left-8 top-6 
                    inline-flex items-center justify-center
                    w-9 h-9 text-slate-700 bg-white
                    border border-slate-200 rounded-md shadow-sm
                    hover:bg-slate-50
                    z-[70]"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-center py-6">
            <div className="flex items-center space-x-8">
              <a
                href="/layanan/publik/kesehatan/pendaftaran-rsud"
                className="px-6 py-2.5 rounded-lg bg-emerald-100 text-sm shadow-md min-w-[160px] text-center"
              >
                Pendaftaran Pasien
              </a>

              <a
                href="/layanan/publik/kesehatan/status-pasien"
                className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm min-w-[160px] text-center"
              >
                Status Pasien
              </a>

              <a
                href="https://rsudps.bantulkab.go.id/hal/info-bed"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm min-w-[160px] text-center"
              >
                Info Kamar / Bed RS
              </a>

              <a
                href="/layanan/publik/kesehatan/cari-dokter"
                className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm min-w-[160px] text-center"
              >
                Cari Dokter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* main rounded container */}
      <main className="max-w-6xl w-full mx-auto px-6 pb-20">
        <div className="bg-white rounded-xl shadow-none border border-transparent mt-1 overflow-visible">
          {/* panel */}
          <div className="p-6">
            <div className=" rounded-lg bg-white border border-transparent">
              <div className="bg-[#f2f4f7] rounded-md px-6 py-4">
                <form onSubmit={handleSubmit}>
                  {/* Data Pasien box */}
                  <div className="rounded-md bg-slate-50 p-6 mb-6">
                    <div className="text-center mb-3">
                      <strong className="text-sm text-slate-800">Data Pasien</strong>
                    </div>

                    {/* Nomor Rekam Medis */}
                    <div className={rowStyle}>
                      <label className={labelStyle}>Nomor Rekam Medis</label>
                      <div className={inputWrap}>
                        <input
                          inputMode="numeric"
                          value={rm}
                          onChange={onChangeRm}
                          placeholder="Masukkan nomor rekam medis"
                          className="w-full rounded-md bg-white px-4 py-2 text-sm border border-transparent focus:outline-none"
                          aria-label="Nomor Rekam Medis"
                        />
                        {rmError && <div className="text-red-500 text-xs mt-1">{rmError}</div>}
                      </div>
                    </div>

                    <div className="w-full my-3" style={{ borderTop: "1px solid #e6e6e6" }} />

                    {/* Tanggal Lahir - custom clickable icon aligned */}
                    <div className={rowStyle}>
                      <label className={labelStyle}>Tanggal Lahir</label>
                      <div className={inputWrap}>
                        <div className="relative">
                          <input
                            ref={tglLahirRef}
                            type="date"
                            value={tglLahir}
                            onChange={(e) => setTglLahir(e.target.value)}
                            className="w-full rounded-md bg-white px-4 py-2 text-sm border border-transparent focus:outline-none pr-10"
                          />
                          {/* clickable svg: onClick -> open native date picker */}
                          <button
                            type="button"
                            onClick={() => openDatePicker(tglLahirRef)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                            aria-label="Buka pemilih tanggal"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="3" y="5" width="18" height="16" rx="2" stroke="#475569" strokeWidth="1.2" fill="white"/>
                              <path d="M16 3V7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>
                              <path d="M8 3V7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>
                              <path d="M3 11H21" stroke="#e2e8f0" strokeWidth="1"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* large divider */}
                  <div className="my-6 border-t border-slate-200" />

                  {/* Data Periksa RSUD */}
                  <div className="rounded-md bg-slate-50 p-6">
                    <div className="text-center mb-2">
                      <strong className="text-sm text-slate-800">Data Periksa RSUD</strong>
                      <div className="text-xs text-slate-500 mt-2">
                        Pendaftaran Online Hanya Untuk Pasien Yang Sudah Terdaftar Di RSUD Panembahan Senopati Bantul
                      </div>
                    </div>

                    <div className="mt-4">
                      {/* Klinik */}
                      <div className={rowStyle}>
                        <label className={labelStyle}>Klinik</label>
                        <div className={inputWrap}>
                          <div className="relative">
                            <select
                              value={klinik}
                              onChange={(e) => setKlinik(e.target.value)}
                              className="w-full rounded-md bg-white px-4 py-2 text-sm border border-transparent focus:outline-none appearance-none pr-10"
                            >
                              <option value="">Pilih Klinik</option>
                              <option value="anak">Klinik Anak</option>
                              <option value="dalam">Klinik Penyakit Dalam</option>
                            </select>

                            {/* custom chevron */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full my-3" style={{ borderTop: "1px solid #e6e6e6" }} />

                      {/* Tanggal Periksa */}
                      <div className={rowStyle}>
                        <label className={labelStyle}>Tanggal Periksa</label>
                        <div className={inputWrap}>
                          <div className="relative">
                            <input
                              ref={tglPeriksaRef}
                              type="date"
                              value={tglPeriksa}
                              onChange={(e) => setTglPeriksa(e.target.value)}
                              className="w-full rounded-md bg-white px-4 py-2 text-sm border border-transparent focus:outline-none pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => openDatePicker(tglPeriksaRef)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                              aria-label="Buka pemilih tanggal"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="5" width="18" height="16" rx="2" stroke="#475569" strokeWidth="1.2" fill="white"/>
                                <path d="M16 3V7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>
                                <path d="M8 3V7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>
                                <path d="M3 11H21" stroke="#e2e8f0" strokeWidth="1"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full my-3" style={{ borderTop: "1px solid #e6e6e6" }} />

                      {/* Dokter */}
                      <div className={rowStyle}>
                        <label className={labelStyle}>Dokter</label>
                        <div className={inputWrap}>
                          <div className="relative">
                            <select
                              value={dokter}
                              onChange={(e) => setDokter(e.target.value)}
                              className="w-full rounded-md bg-white px-4 py-2 text-sm border border-transparent focus:outline-none appearance-none pr-10"
                            >
                              <option value="">Pilih Dokter</option>
                              <option>dr. Namjoon, Sp.A</option>
                              <option>dr. Jimin, Sp.PD</option>
                            </select>

                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full my-3" style={{ borderTop: "1px solid #e6e6e6" }} />

                      {/* Pembayaran */}
                      <div className={rowStyle}>
                        <label className={labelStyle}>Pembayaran</label>
                        <div className={inputWrap}>
                          <div className="relative">
                            <select
                              value={pembayaran}
                              onChange={(e) => setPembayaran(e.target.value)}
                              className="w-full rounded-md bg-white px-4 py-2 text-sm border border-transparent focus:outline-none appearance-none pr-10"
                            >
                              <option value="">Pilih Pembayaran</option>
                              <option value="bpjs">BPJS</option>
                              <option value="umum">Umum</option>
                            </select>

                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* buttons */}
                      <div className="mt-6 flex items-center gap-4">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow-md transform transition-transform duration-120 ease-out active:scale-95"
                          style={{ minWidth: 90 }}
                        >
                          Daftar
                        </button>

                        <button
                          type="button"
                          className="px-4 py-2 rounded-md bg-white-600 text-black text-sm font-medium shadow-md transform transition-transform duration-120 ease-out active:scale-95"
                          onClick={() => {
                            // reset fields
                            setRm("");
                            setRmError("");
                            setTglLahir("");
                            setKlinik("");
                            setTglPeriksa("");
                            setDokter("");
                            setPembayaran("");
                          }}
                        >
                          Reset
                        </button>
                      </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
