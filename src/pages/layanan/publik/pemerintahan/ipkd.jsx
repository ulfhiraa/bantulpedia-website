// src/pages/layanan/pemerintahan/Ipkd.jsx
import React, { useMemo, useRef, useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Calendar, ChevronDown, ArrowLeft } from "lucide-react";
import heroBg from "../../../../assets/pandansimo1.jpg";

// 🔗 API IPKD (Apidog)
import { getIPKD } from "../../../../api/layanan/publik/ipkd";

export default function Ipkd() {
  const [kategori, setKategori] = useState("");
  const [tahun, setTahun] = useState("");

  const inputTahunRef = useRef(null);
  const [tahunPopupOpen, setTahunPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0, width: 0 });

  // data dari API
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Options kategori
  const kategoriOptions = [
    { key: "perencanaan", label: "Perencanaan" },
    { key: "keuangan", label: "Keuangan" },
    { key: "pelaporan", label: "Pelaporan" },
  ];

  // 🔄 ambil data dari Apidog sekali saat komponen mount
  React.useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getIPKD();
        if (ignore) return;

        // mapping JSON API -> struktur yang dipakai tabel
        const mapped = (data || []).map((item, idx) => {
          const katText = (item.kategori || "").toLowerCase();

          let kategoriKey = "";
          if (
            katText.includes("rencana kerja") ||
            katText.includes("rkp") ||
            katText.includes("rpjmd") ||
            katText.includes("perencana")
          ) {
            kategoriKey = "perencanaan";
          } else if (
            katText.includes("keuangan") ||
            katText.includes("lhp") ||
            katText.includes("laporan keuangan")
          ) {
            kategoriKey = "keuangan";
          } else if (
            katText.includes("lppd") ||
            katText.includes("pelaporan") ||
            katText.includes("laporan penyelenggaraan")
          ) {
            kategoriKey = "pelaporan";
          }

          return {
            id: idx + 1,
            nama: item.nama_dokumen,
            kategoriKey,
            kategoriLabel: item.kategori,
            tahun: item.tahun,
            tanggal: item.tanggal,
            fileUrl: item.url,
          };
        });

        setRows(mapped);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data IPKD. Silakan coba lagi.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  // opsi tahun berdasarkan data API
  const tahunOptions = useMemo(() => {
    const s = new Set(rows.map((d) => d.tahun));
    return Array.from(s).sort((a, b) => b - a);
  }, [rows]);

  // filter berdasarkan kategori & tahun
  const filtered = useMemo(() => {
    return rows.filter((d) => {
      const byKategori = kategori ? d.kategoriKey === kategori : true;
      const byTahun = tahun ? String(d.tahun) === String(tahun) : true;
      return byKategori && byTahun;
    });
  }, [rows, kategori, tahun]);

  // open popup posisi berdasarkan input bounding rect
  function openTahunPopup() {
    const el = inputTahunRef.current;
    if (!el) {
      setTahunPopupOpen(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    const gap = 8;
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
      const inp = inputTahunRef.current;
      if (inp && inp.contains && inp.contains(e.target)) return;
      closeTahunPopup();
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [tahunPopupOpen]);

  // buka file PDF
  function openFile(url) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

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
              <h1 className="text-lg font-semibold text-center">
                Indeks Pengelolaan Keuangan Daerah
              </h1>
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

              <div className="flex items-center gap-2 mt-2">
                {/* Input + icon calendar */}
                <div className="relative flex-1">
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
                      ev.stopPropagation();
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
                        String(t) === String(tahun)
                          ? "bg-sky-100 text-sky-700"
                          : "bg-gray-50"
                      }`}
                      style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Reset & Tutup */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setTahun("")}
                    className="text-sm px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={closeTahunPopup}
                    className="text-sm text-gray-600 px-3 py-1 rounded border hover:bg-gray-100"
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
                      <th className="px-4 py-3 font-semibold w-1/2">
                        Nama Dokumen
                      </th>
                      <th className="px-4 py-3 font-semibold w-1/4">
                        Kategori
                      </th>
                      <th className="px-4 py-3 font-semibold w-1/12">
                        Tahun
                      </th>
                      <th className="px-4 py-3 font-semibold w-1/6">
                        Tanggal
                      </th>
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
                    {loading ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          Memuat data IPKD...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-red-500"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          Tidak ada dokumen untuk filter yang dipilih.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((d) => (
                        <tr
                          key={d.id}
                          className="border-t border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-4 py-4 align-top w-1/2">
                            {d.nama}
                          </td>
                          <td className="px-4 py-4 align-top w-1/4">
                            {d.kategoriLabel}
                          </td>
                          <td className="px-4 py-4 align-top w-1/12">
                            {d.tahun}
                          </td>
                          <td className="px-4 py-4 align-top w-1/6">
                            {d.tanggal}
                          </td>
                          <td className="px-4 py-4 align-top w-20 text-right">
                            <button
                              onClick={() => openFile(d.fileUrl)}
                              className="text-green-600 hover:underline text-sm disabled:text-gray-400"
                              disabled={!d.fileUrl}
                            >
                              Rincian
                            </button>
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
