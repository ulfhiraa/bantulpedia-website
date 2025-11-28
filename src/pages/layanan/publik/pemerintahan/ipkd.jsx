// src/pages/layanan/pemerintahan/Ipkd.jsx
import React, { useMemo, useRef, useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Calendar, ChevronDown, ArrowLeft } from "lucide-react";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function Ipkd() {
  const [kategori, setKategori] = useState("");
  const [tahun, setTahun] = useState("");

  const inputTahunRef = useRef(null);
  const [tahunPopupOpen, setTahunPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0, width: 0 });

  // Options kategori
  const kategoriOptions = [
    { key: "perencanaan", label: "Perencanaan" },
    { key: "keuangan", label: "Keuangan" },
    { key: "pelaporan", label: "Pelaporan" },
  ];

  // Dummy data
  const data = [
    { id: 1, nama: "RKPD Kabupaten Bantul 2025", kategoriKey: "perencanaan", kategoriLabel: "RKPD", tahun: 2025, tanggal: "5 Juli 2024" },
    { id: 2, nama: "APBD Kabupaten Bantul 2024", kategoriKey: "keuangan", kategoriLabel: "APBD", tahun: 2024, tanggal: "10 Maret 2024" },
    { id: 3, nama: "Laporan Keuangan SAKIP 2023", kategoriKey: "pelaporan", kategoriLabel: "SAKIP", tahun: 2023, tanggal: "20 Desember 2023" },
    { id: 4, nama: "Rencana Strategis 2022-2026", kategoriKey: "perencanaan", kategoriLabel: "Rencana Strategis", tahun: 2022, tanggal: "1 Februari 2022" },
    { id: 5, nama: "LPJ Kegiatan Tahun 2025", kategoriKey: "pelaporan", kategoriLabel: "LPJ", tahun: 2025, tanggal: "12 Agustus 2025" },
    { id: 6, nama: "Laporan Realisasi APBD 2024", kategoriKey: "keuangan", kategoriLabel: "Realisasi APBD", tahun: 2024, tanggal: "30 November 2024" },
    { id: 7, nama: "Dokumen Perencanaan KSP 2025", kategoriKey: "perencanaan", kategoriLabel: "Perencanaan Strategis", tahun: 2025, tanggal: "19 Juni 2024" },
    { id: 8, nama: "Evaluasi Kinerja 2023", kategoriKey: "pelaporan", kategoriLabel: "Evaluasi", tahun: 2023, tanggal: "7 September 2023" },
    { id: 9, nama: "Panduan Pengelolaan Keuangan 2022", kategoriKey: "keuangan", kategoriLabel: "Panduan Keuangan", tahun: 2022, tanggal: "2 April 2022" },
    { id: 10, nama: "RKPD Kabupaten Bantul 2024 (Revisi)", kategoriKey: "perencanaan", kategoriLabel: "RKPD (Revisi)", tahun: 2024, tanggal: "15 Juni 2024" },
  ];

  const tahunOptions = useMemo(() => {
    const s = new Set(data.map((d) => d.tahun));
    return Array.from(s).sort((a, b) => b - a);
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((d) => {
      const byKategori = kategori ? d.kategoriKey === kategori : true;
      const byTahun = tahun ? String(d.tahun) === String(tahun) : true;
      return byKategori && byTahun;
    });
  }, [data, kategori, tahun]);

  // open popup posisi berdasarkan input bounding rect
  function openTahunPopup() {
    const el = inputTahunRef.current;
    if (!el) {
      setTahunPopupOpen(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    const gap = 8;
    // position popup slightly below input, but fixed so it is above overlays
    setPopupPos({
      top: rect.bottom + gap,
      left: rect.left,
      width: rect.width,
    });
    setTahunPopupOpen(true);
  }

  function closeTahunPopup() {
    setTahunPopupOpen(false);
  }

  function selectTahun(t) {
    setTahun(String(t));
    closeTahunPopup();
  }

  // close popup when clicking outside
  React.useEffect(() => {
    function onDocClick(e) {
      if (!tahunPopupOpen) return;
      const root = document.getElementById("ipkd-tahun-popup");
      if (!root) return;
      if (root.contains(e.target)) return;
      // also allow clicks on input or calendar button
      const inp = inputTahunRef.current;
      if (inp && inp.contains && inp.contains(e.target)) return;
      closeTahunPopup();
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [tahunPopupOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* optional hero visual top */}
      <div
        className="w-full h-28 md:h-55 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">

          {/* BACK ARROW + TITLE (sejajar) */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Kembali"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-center">Indeks Pengelolaan Keuangan Daerah</h1>
              <div className="text-sm text-gray-500">IPKD</div>
            </div>
          </div>

          {/* FILTER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* KATEGORI */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Kategori</label>
              <div className="relative mt-2">
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm bg-white pr-10 appearance-none"
                >
                  <option value="">Semua Kategori</option>
                  {kategoriOptions.map((k) => (
                    <option key={k.key} value={k.key}>
                      {k.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* TAHUN (input + calendar button yang buka popup) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tahun</label>

              <div className="relative mt-2">
                <input
                  ref={inputTahunRef}
                  id="tahunInput"
                  placeholder="Semua Tahun"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm bg-white pr-12"
                />

                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation(); // avoid wrapper click issues
                    openTahunPopup();
                  }}
                  aria-label="Buka pemilih tahun"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 z-50"
                  style={{ background: "transparent", border: "none" }}
                >
                  <Calendar className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* POPUP: tahunOptions (fixed, z-high) */}
          {tahunPopupOpen && (
            <div
              id="ipkd-tahun-popup"
              role="dialog"
              aria-modal="false"
              className="rounded-md shadow-lg bg-white border"
              style={{
                position: "fixed",
                top: popupPos.top,
                left: popupPos.left,
                width: Math.max(180, popupPos.width),
                zIndex: 9999,
                boxShadow: "0 10px 30px rgba(2,6,23,0.15)",
              }}
            >
              <div className="p-3">
                <div className="text-xs text-gray-600 mb-2">Pilih Tahun</div>
                <div className="grid grid-cols-3 gap-2">
                  {tahunOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => selectTahun(t)}
                      className={`py-2 rounded text-sm ${
                        String(t) === String(tahun) ? "bg-sky-100 text-sky-700" : "bg-gray-50"
                      }`}
                      style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={() => closeTahunPopup()}
                    className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TABLE */}
          <div className="mt-2 overflow-x-auto rounded-xl border border-blue-300">
            <div className="bg-blue-50 px-6 py-3">
              <div className="max-w-full mx-auto">
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-3 font-semibold w-1/2">Nama Dokumen</th>
                      <th className="px-4 py-3 font-semibold w-1/4">Kategori</th>
                      <th className="px-4 py-3 font-semibold w-1/12">Tahun</th>
                      <th className="px-4 py-3 font-semibold w-1/6">Tanggal</th>
                      <th className="px-4 py-3 font-semibold w-20"></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            <div className="bg-white px-6 py-2">
              <div className="max-w-full mx-auto overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                          Tidak ada dokumen untuk filter yang dipilih.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((d) => (
                        <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 align-top w-1/2">{d.nama}</td>
                          <td className="px-4 py-4 align-top w-1/4">{d.kategoriLabel}</td>
                          <td className="px-4 py-4 align-top w-1/12">{d.tahun}</td>
                          <td className="px-4 py-4 align-top w-1/6">{d.tanggal}</td>
                          <td className="px-4 py-4 align-top w-20 text-right">
                            <button className="text-green-600 hover:underline text-sm">Rincian</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
