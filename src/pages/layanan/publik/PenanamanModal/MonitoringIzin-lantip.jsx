// src/pages/layanan/publik/PenanamanModal/MonitoringIzinLantip.jsx
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function MonitoringIzinLantip() {
  const [activeTab, setActiveTab] = useState("monitoring");
  const [resi, setResi] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

    const SYARAT_IZIN_LIST = [
    "Izin Mendirikan Rumah Sakit",
    "Izin Operasional Rumah Sakit (Milik Daerah)",
    "Izin Praktik Ahli Teknologi Laboratorium Medik",
    "Izin Praktik Ahli Teknis Elektromedis",
    "Izin Praktik Terapis Gigi Dan Mulut",
    "Izin Praktik Penata Anestesi",
    "Izin Praktik Refraksionis Optisien",
    "Izin Praktik Perekam Medis",
    "Izin Praktik Tenaga Kesehatan Lingkungan",
    "Izin Praktik Fisikawan Medis",
    "Izin Praktik Teknisi Pelayanan Darah",
    "Izin Praktik Akupunktur Terapis (SIPAT)",
    "Izin Praktik Perawat",
    "Izin Praktik Epidemiologi Kesehatan",
    "Izin Praktik Tenaga Promosi Kesehatan dan Ilmu Perilaku",
    "Izin Praktik Bidan",
    "Izin Praktik Fisioterapis",
    "Izin Praktik Okupasi Terapis",
    "Izin Praktik Psikologi Klinis",
    "Izin Praktik Terapis Wicara",
    "Izin Mendirikan Bangunan (IMB) Gedung",
    "Izin Praktik Tenaga Gizi",
    "Izin Praktik Ortotis Prostetis",
    "Izin Penyelenggaraan Reklame / Media Informasi",
    "Izin Mendirikan Bangunan (IMB) Bukan Gedung",
    "Izin Operasional Puskesmas",
    "Surat Keterangan Penelitian",
    "Izin Praktik Penyuluh Kesehatan Masyarakat",
    "Izin Praktik Apoteker (SIPA)",
    "Izin Penggunaan dan Pemanfaatan Tanah (IPPT)",
    "Izin Praktik Tenaga Teknis Kefarmasian (SIPTTK)",
    "Surat Terdaftar Penyehat Tradisional (STPT)",
    "Surat Izin Praktik (SIP) Dokter",
    "Tanda Pendaftaran Lembaga Kesejahteraan Sosial",
    "Surat Izin Praktik (SIP) Dokter Hewan",
    "Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) Untuk Kegiatan Non Berusaha",
    "Izin Praktik Radiografer",
    "Izin Pengumpulan Uang atau Barang",
    "Izin Persetujuan Bangunan Gedung (PBG)",
    "Izin Satuan Pendidikan",
    "Izin Satuan Pendidikan Anak Usia Dini (PAUD)",
    "Tata Letak Reklame Dan Media Informasi",
    "Surat Izin Paramedik Pelayanan Kesehatan Hewan",
    "Izin Pemanfaatan Jalan Kabupaten",
    "Rekomendasi Penggunaan Ruang Pengawasan Jalan",
    "Rekomendasi Pergeseran Saluran Irigasi (Uji Coba)",
    "Keterangan Rencana Kabupaten",
    "Persetujuan Dokumen Evaluasi Lingkungan Hidup",
    "Persetujuan Dokumen Pengelolaan Lingkungan Hidup",
    "Surat Keputusan Kelayakan Lingkungan Hidup",
    "Persetujuan Pernyataan Kesanggupan Pengelolaan Lingkungan Hidup",
    ];

    const [searchIzin, setSearchIzin] = useState("");

  // regex contoh format LANTIP
  const RESI_REGEX = /^[A-Z0-9]{5}\/[A-Z0-9]{3}\/[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i;

  const handleCari = () => {
    if (!resi.trim()) {
      setError("Nomor resi wajib diisi.");
      setResult(null);
      return;
    }

    if (!RESI_REGEX.test(resi)) {
      setError("Format nomor resi tidak sesuai. Contoh: XXXXX/XXX/XX/XX/XXXX");
      setResult(null);
      return;
    }

    setError("");

    // MOCK RESULT (nanti ganti API)
    setResult({
      status: "Dalam Proses Verifikasi",
      pemohon: "Budi Santoso",
      izin: "Izin Usaha Mikro",
      tanggal: "12 Agustus 2024",
    });
  };

  const handleReset = () => {
    setResi("");
    setError("");
    setResult(null);
  };

  const tabClass = (active) =>
    `px-6 py-2.5 rounded-xl text-sm min-w-[160px] border transition-all
     ${
       active
         ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm"
         : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
     }`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
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

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

          {/* HEADER */}
          <div className="relative mb-8">
            {/* BACK */}
            <button
              onClick={() => window.history.back()}
              className="absolute left-0 top-1 w-9 h-9 rounded-md border border-slate-200
                bg-white text-slate-700 hover:bg-slate-50"
              aria-label="Kembali"
            >
              <ChevronLeft size={18} className="mx-auto" />
            </button>

            {/* TITLE */}
            <div className="text-center">
              <h1 className="text-lg md:text-xl font-semibold text-emerald-700">
                Layanan Terpadu Investasi & Perizinan (LANTIP)
              </h1>
              <p className="text-xs md:text-xs text-slate-600 mt-1 max-w-2xl mx-auto">
                Mempermudah proses perizinan dan investasi secara online, mencakup pendaftaran hingga izin terbit.
              </p>
            </div>
          </div>

          {/* TAB */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("monitoring")}
                className={tabClass(activeTab === "monitoring")}
              >
                Monitoring Izin
              </button>
              <button
                onClick={() => setActiveTab("syarat")}
                className={tabClass(activeTab === "syarat")}
              >
                Syarat Izin
              </button>
            </div>
          </div>

          {/* PANEL */}
          <div className="bg-slate-50 rounded-xl p-8">

            {/* === MONITORING === */}
            {activeTab === "monitoring" && (
              <>
                <p className="text-left text-sm md:text-base font-medium text-slate-800">
                  Masukkan nomor resi
                </p>

                <div className="mt-6 max-w-6xl mx-auto">
                  <div className="flex gap-3">
                    <input
                      value={resi}
                      onChange={(e) => setResi(e.target.value.toUpperCase())}
                      placeholder="XXXXX/XXX/XX/XX/XXXX"
                      className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2
                        text-sm placeholder:text-slate-400
                        focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />

                    <button
                      onClick={handleCari}
                      className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm
                        hover:bg-emerald-700 active:scale-95 transition"
                    >
                      Cari
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700
                        hover:bg-slate-100 transition"
                    >
                      Reset
                    </button>
                  </div>

                  {/* ERROR */}
                  {error && (
                    <p className="mt-3 text-xs text-red-600">{error}</p>
                  )}

                  {/* RESULT */}
                  {result && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-slate-600">Status:</span>{" "}
                        <span className="text-emerald-700 font-semibold">{result.status}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-slate-600">Pemohon:</span>{" "}
                        {result.pemohon}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-slate-600">Jenis Izin:</span>{" "}
                        {result.izin}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-slate-600">Tanggal Pengajuan:</span>{" "}
                        {result.tanggal}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* === SYARAT IZIN === */}
            {activeTab === "syarat" && (
            <>
                {/* <p className="text-center text-sm md:text-base font-semibold text-slate-800">
                Daftar Persyaratan Layanan Perizinan LANTIP
                </p> */}

                {/* SEARCH */}
                <div className="mt-6 max-w-xl mx-auto">
                <input
                    value={searchIzin}
                    onChange={(e) => setSearchIzin(e.target.value)}
                    placeholder="Cari jenis izin…"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2
                    text-sm placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                </div>

                {/* LIST */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SYARAT_IZIN_LIST
                    .filter((item) =>
                    item.toLowerCase().includes(searchIzin.toLowerCase())
                    )
                    .map((item, idx) => (
                    <div
                        key={idx}
                        className="group bg-white rounded-xl border border-slate-200
                        p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                        <p className="text-sm text-slate-800 font-medium group-hover:text-emerald-700">
                        {item}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                        Klik untuk melihat detail persyaratan
                        </p>
                    </div>
                    ))}

                {SYARAT_IZIN_LIST.filter((item) =>
                    item.toLowerCase().includes(searchIzin.toLowerCase())
                ).length === 0 && (
                    <div className="col-span-full text-center text-sm text-slate-500">
                    Tidak ditemukan jenis izin yang sesuai.
                    </div>
                )}
                </div>
            </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
