// src/pages/layanan/publik/kependudukan/DukcapilSmart.jsx
import React, { useState } from "react";
import { ArrowRight, ExternalLink, Copy, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

/**
 * DukcapilSmart page
 * - Mocked lookup: replace mockFetchStatus with real API call when ready.
 */

const STATUS_META = {
  Diproses: { color: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  Selesai: { color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-600" },
  Ditolak: { color: "bg-red-100 text-red-800", dot: "bg-red-600" },
  Unknown: { color: "bg-slate-100 text-slate-800", dot: "bg-slate-400" },
};

// Mock fetch - simulate API latency and possible results.
// Replace with real fetch call to Dukcapil Smart API.
function mockFetchStatus(kk) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // simple pseudo-random deterministic result based on kk digits
      const n = Number(String(kk).replace(/\D/g, "").slice(-2) || 0);
      const map = ["Diproses", "Selesai", "Ditolak", "Diproses", "Selesai"];
      const status = map[n % map.length] || "Unknown";
      resolve({
        status,
        nomorPengajuan: `DK-${String(kk).slice(-6) || "000000"}`,
        lastUpdate: new Date().toISOString(),
        layanan: "Permohonan KTP / KK",
        note:
          status === "Diproses"
            ? "Permohonan sedang diproses oleh petugas. Cek kembali dalam 1-3 hari kerja."
            : status === "Selesai"
            ? "Permohonan selesai. Silakan cek notifikasi untuk instruksi pengambilan atau cetak."
            : "Permohonan ditolak. Periksa syarat berkas dan ajukan ulang.",
      });
    }, 900);
  });
}

export default function DukcapilSmart() {
  const navigate = useNavigate();
  const [kk, setKk] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const validate = (v) => {
    const digits = String(v).replace(/\D/g, "");
    if (!digits) return "Nomor Kartu Keluarga wajib diisi.";
    if (digits.length < 10) return "Nomor KK terlalu pendek (minimal 10 digit).";
    return "";
  };

  // input handler: hanya angka (strip non-digit langsung)
  const onChangeKk = (e) => {
    const raw = e.target.value || "";
    const digits = raw.replace(/\D/g, "");
    setKk(digits);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setResult(null);

    const err = validate(kk);
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    try {
      // replace with actual API call when available
      const res = await mockFetchStatus(kk);
      setResult(res);
    } catch (err) {
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKk("");
    setError("");
    setResult(null);
  };

  const copyKK = async () => {
    try {
      await navigator.clipboard.writeText(kk);
      alert("Nomor KK disalin ke clipboard");
    } catch {
      alert("Gagal menyalin");
    }
  };

  // inline back next to title (sejajar)
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/layanan/publik");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* HERO */}
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

      {/* MAIN */}
      <main className="mx-auto w-full px-4 md:px-6 py-10 -mt-8">
        <div className="bg-white rounded-2xl shadow ring-1 ring-slate-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left: info + form */}
              <div className="lg:col-span-2 space-y-4">
                {/* inline back arrow + title */}
                  <div className="relative w-full mb-4">
                    {/* Panah kiri */}
                    <button
                      onClick={goBack}
                      className="absolute top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-slate-100 transition"
                      aria-label="Kembali"
                      title="Kembali"
                    >
                      <ArrowLeft size={20} className="text-slate-700" />
                    </button>

                    {/* Judul tetap center */}
                    <h2 className="text-lg md:text-md font-semibold text-slate-900 text-center">
                      Pengecekan Status Pengajuan
                    </h2>
                  </div>

                <p className="text-sm text-slate-500 mt-1 text-left mx-auto">
                  Masukkan <strong>Nomor Kartu Keluarga (KK)</strong> untuk melihat status pengajuan terakhir di Dukcapil Smart.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <label className="text-sm text-slate-700">Nomor Kartu Keluarga</label>
                  <div className="flex gap-3">
                    <input
                      value={kk}
                      onChange={onChangeKk}
                      placeholder="Contoh: 317XXXXXXXXXXXX"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="flex-1 rounded-xl px-4 py-3 border ring-0 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white text-sm"
                      aria-label="Nomor Kartu Keluarga"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 font-medium flex items-center gap-2 text-sm transition-transform active:scale-95"
                    >
                      {loading ? "Memeriksa..." : "Cari Status"}
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div>
                      <button type="button" onClick={handleReset} className="underline text-slate-500 text-sm">
                        Reset
                      </button>
                    </div>
                    <div>
                      <a
                        href="https://dukcapilonline.bantulkab.go.id/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-emerald-600 hover:underline text-sm"
                      >
                        Buka Dukcapil Smart <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}
                </form>

                {/* hint / help */}
                <div className="mt-2 text-xs text-slate-500">
                  Jika kamu belum mendapatkan nomor KK, silakan cek dokumen keluarga atau hubungi kantor Dukcapil setempat.
                </div>
              </div>

              {/* Right: result card / placeholder */}
              <div className="lg:col-span-1">
                <div className="rounded-xl border border-slate-100 p-4 bg-white">
                  <h3 className="text-sm font-semibold text-slate-800">Ringkasan</h3>
                  <p className="text-xs text-slate-500 mt-2">
                    Hasil pengecekan akan muncul di sini. Jika kosong, lakukan pencarian dengan nomor KK yang valid.
                  </p>

                  <div className="mt-4">
                    {!result && !loading && (
                      <div className="text-xs text-slate-400">Belum ada hasil — masukkan nomor KK dan tekan "Cari Status".</div>
                    )}

                    {loading && (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-6 bg-slate-100 rounded" />
                        <div className="h-4 bg-slate-100 rounded w-3/4" />
                        <div className="h-10 bg-slate-100 rounded" />
                      </div>
                    )}

                    {result && (
                      <div className="space-y-3">
                        {/* status badge */}
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_META[result.status]?.color || STATUS_META.Unknown.color}`}
                        >
                          <span className={`inline-block w-2 h-2 rounded-full ${STATUS_META[result.status]?.dot || STATUS_META.Unknown.dot}`} />
                          {result.status}
                        </div>

                        <div className="mt-2">
                          <div className="text-sm font-medium text-slate-800">{result.layanan}</div>
                          <div className="text-xs text-slate-500">{new Date(result.lastUpdate).toLocaleString()}</div>
                        </div>

                        <div className="pt-3 border-t">
                          <div className="text-xs text-slate-500">Nomor Pengajuan</div>
                          <div className="text-sm font-mono text-slate-800 mt-1">{result.nomorPengajuan}</div>

                          <div className="mt-3 flex gap-2">
                            <button onClick={copyKK} className="flex-1 rounded-md border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                              Salin KK
                            </button>
                            <button onClick={() => window.print()} className="rounded-md bg-slate-900 text-white px-3 py-2 text-sm">
                              Cetak
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* result full width details */}
            <div className="mt-6">
              {result && (
                <div className="rounded-xl border border-slate-100 bg-white p-6">
                  <h3 className="text-sm font-semibold text-slate-900">Detail Hasil</h3>
                  <p className="text-sm text-slate-600 mt-2">{result.note}</p>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded">
                      <div className="text-xs text-slate-500">Nomor KK</div>
                      <div className="text-sm font-medium mt-1">{kk}</div>
                    </div>

                    <div className="p-3 border rounded">
                      <div className="text-xs text-slate-500">Nomor Pengajuan</div>
                      <div className="text-sm font-medium mt-1">{result.nomorPengajuan}</div>
                    </div>

                    <div className="p-3 border rounded">
                      <div className="text-xs text-slate-500">Terakhir diperbarui</div>
                      <div className="text-sm font-medium mt-1">{new Date(result.lastUpdate).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="https://dukcapilonline.bantulkab.go.id/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
                    >
                      Buka Dukcapil Smart di tab baru <ExternalLink size={14} />
                    </a>

                    <button
                      onClick={() => {
                        // fallback: open modal or details
                        alert("Fungsi detail lokal akan diimplementasikan sesuai API Dukcapil.");
                      }}
                      className="ml-auto rounded-md px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Lihat Instruksi Lengkap
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
