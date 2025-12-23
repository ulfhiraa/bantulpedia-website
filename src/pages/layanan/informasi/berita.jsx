import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// API
import { getBerita } from "../../../api/layanan/informasi/berita";

export default function BeritaDetail() {
  const { id } = useParams(); // ID ASLI
  const navigate = useNavigate();

  const [berita, setBerita] = useState(null);
  const [terkait, setTerkait] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const items = await getBerita();

        if (!Array.isArray(items)) {
          setBerita(null);
          return;
        }

        // 🔥 CARI BERDASARKAN ID (BENAR)
        const current = items.find(
          (b) => String(b.id) === String(id)
        );

        if (!current) {
          setBerita(null);
          return;
        }

        setBerita(current);
        setTerkait(
          items.filter((b) => b.id !== current.id).slice(0, 5)
        );
      } catch (err) {
        console.error("Gagal memuat berita:", err);
        setBerita(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Memuat berita...
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!berita) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500">Berita tidak ditemukan</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm"
        >
          Kembali
        </button>
      </div>
    );
  }

  /* ================= NORMALISASI DATA ================= */
  const title = berita.judul;
  const date = berita.tanggal;
  const image = berita.foto_url;
  const body = berita.deskripsi || "";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="relative h-[320px] md:h-[420px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-end">
            <div className="pb-8 max-w-4xl">
              <h1 className="
                text-white
                text-3xl md:text-5xl
                font-semibold
                leading-tight
                tracking-tight
              ">
                {title}
              </h1>

              <p className="mt-3 text-sm text-white/80">
                {date}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ===== ARTICLE ===== */}
        <article className="
          md:col-span-3
          space-y-6
          text-slate-700
          leading-relaxed
          text-[16px]
        ">
          {body
            .split("\n")
            .filter(Boolean)
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </article>

        {/* ===== SIDEBAR ===== */}
        <aside className="space-y-6">
          <h3 className="font-semibold text-sm">Saran Berita Terkait</h3>

          <div className="space-y-4">
            {terkait.map((b) => (
              <button
                key={b.id}
                onClick={() =>
                  navigate(`/layanan/informasi/berita/${b.id}`)
                }
                className="flex gap-3 text-left group"
              >
                <img
                  src={b.foto_url}
                  alt={b.judul}
                  className="w-20 h-14 object-cover rounded-md flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-medium leading-snug group-hover:underline">
                    {b.judul}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    {b.tanggal}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
