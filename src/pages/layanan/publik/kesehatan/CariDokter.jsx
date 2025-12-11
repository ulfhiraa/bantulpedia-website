// src/pages/layanan/publik/kesehatan/CariDokter.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function CariDokter() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const mock = [
    { id: 1, name: "dr. Namjoon, Sp.A", poli: "Klinik Anak" },
    { id: 2, name: "dr. Jimin, Sp.PD", poli: "Penyakit Dalam" },
  ];
  const results = query.trim() ? mock.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.poli.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* banner dengan overlay hijau */}
      <div className="h-40 md:h-60 relative rounded-b-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply" />
      </div>

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

        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-center py-6">
            <div className="flex items-center space-x-8">
              <a
                href="/layanan/publik/kesehatan/pendaftaran-rsud"
                className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-sm shadow-sm min-w-[160px] text-center"
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
                className="px-6 py-2.5 rounded-lg bg-emerald-100 text-sm shadow-md min-w-[160px] text-center"
              >
                Cari Dokter
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pb-16">
        <div className="bg-white rounded-xl shadow-sm overflow-visible">
          <div className="p-6">
            <div className="bg-[#f2f4f7] rounded-md p-6 mx-auto">
              <div className="text-center">
                <p className="text-sm text-slate-800 font-bold">Cari dokter berdasarkan nama atau poli</p>
              </div>

                <div className="mt-6 flex gap-3">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari nama dokter / poli"
                    className="flex-1 rounded-md border border-transparent bg-white px-4 py-2 shadow-sm
                            text-sm placeholder:text-slate-400 placeholder:text-sm"
                />
                
                <button
                    onClick={() => {}}
                    className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow-sm
                            transform transition-transform duration-120 ease-out active:scale-95"
                >
                    Cari
                </button>
                </div>

              <div className="mt-6 space-y-3">
                {results.length === 0 && query.trim() !== "" && <div className="text-sm text-slate-500">Tidak ditemukan.</div>}
                {results.map(r => (
                  <div key={r.id} className="p-4 bg-white rounded-md shadow-sm border border-transparent flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{r.name}</div>
                      <div className="text-xs text-slate-500">{r.poli}</div>
                    </div>
                    <div>
                      <button className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm">Lihat</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
