// src/pages/layanan/informasi/informasi.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import heroBg from "../../../assets/pandansimo1.jpg";
import { ChevronDown } from "lucide-react";

// API
import { getPengumuman } from "../../../api/layanan/informasi/pengumuman.js";
import { getWifi } from "../../../api/layanan/informasi/wifi.js";
import { getCctv } from "../../../api/layanan/informasi/cctv.js";
import { getEvent } from "../../../api/layanan/informasi/event.js";
import { getILM } from "../../../api/layanan/informasi/ILM.js";
import { getBerita } from "../../../api/layanan/informasi/berita.js";
import { getGaleriFoto } from "../../../api/layanan/informasi/galerifoto.js";
import { getGaleriVideo } from "../../../api/layanan/informasi/galerivideo.js";

export default function InformasiIndex() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const menuItems = [
    "Pengumuman",
    "Berita",
    "CCTV",
    "Titik Wifi",
    "Galeri Foto",
    "Galeri Video",
    "ILM",
    "Event Bantul",
  ];

  const descriptions = {
    "": "Pilih salah satu kategori di kiri untuk melihat konten.",
    Pengumuman: "Dari Bantul untuk Bantul: Pengumuman Terbaru",
    Berita: "Belum ada endpoint Berita — akan tampil pesan jika diklik.",
    CCTV: "Monitoring CCTV wilayah utama.",
    "Titik Wifi": "Daftar titik wifi publik di Kabupaten Bantul — lokasi & status.",
    "Galeri Foto": "Kumpulan foto kegiatan resmi.",
    "Galeri Video": "Kumpulan video dokumentasi.",
    ILM: "Iklan layanan masyarakat.",
    "Event Bantul": "Jadwal event resmi Kabupaten Bantul.",
  };

  const btnBase =
    "w-full min-h-[48px] rounded-lg px-4 py-2 flex items-center justify-between text-sm transition border";

  // helpers
  const safeString = (v) => {
    try {
      if (v === null || v === undefined) return "";
      return String(v);
    } catch {
      return "";
    }
  };

  const extractYoutubeId = (url) => {
    if (!url || typeof url !== "string") return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
      /v=([A-Za-z0-9_-]{6,})/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m && m[1]) return m[1];
    }
    return null;
  };

  const arrayFromApi = (res) => {
    if (Array.isArray(res)) {
      if (res.length > 0 && res[0] && Array.isArray(res[0].data)) return res[0].data;
      const first = res[0];
      if (first && (first.nama || first.judul || first.id || first.name)) return res;
      const combined = res.flatMap((el) => (el && Array.isArray(el.data) ? el.data : []));
      if (combined.length) return combined;
      return res;
    }

    const d = res && typeof res === "object" && res.data !== undefined ? res.data : res;
    if (!d) return [];
    if (Array.isArray(d)) {
      if (d.length > 0 && d[0] && Array.isArray(d[0].data)) return d[0].data;
      return d;
    }
    if (d.data && Array.isArray(d.data)) return d.data;
    if (d.items && Array.isArray(d.items)) return d.items;
    if (d.features && Array.isArray(d.features)) return d.features;
    if (d.type === "FeatureCollection" && Array.isArray(d.features)) {
      return d.features.map((f) => (f && f.properties ? { ...f.properties, _geometry: f.geometry } : f));
    }
    if (d.type === "Feature" && d.properties) return [{ ...d.properties, _geometry: d.geometry }];
    if (typeof d === "object") return [d];
    return [];
  };

  // Ganti fungsi canonicalize / normalizeItem kamu dengan ini
  const canonicalize = (raw) => {
    const it = raw || {};

    // Title: prioritas judul / nama / label / lokasi singkat
    const title =
      (it.title && String(it.title).trim() && String(it.title).trim() !== "Untitled"
        ? String(it.title).trim()
        : null) ||
      (it.judul && String(it.judul).trim()) ||
      (it.nama && String(it.nama).trim()) ||
      (it.name && String(it.name).trim()) ||
      (it.label && String(it.label).trim()) ||
      (it.nama_lokasi && String(it.nama_lokasi).trim()) ||
      "Untitled";

    // Date
    const date = safeString(it.date || it.tanggal || it.tanggal_mulai || it.tanggal_selesai || it.created_at || "");

    // Location (simpan LOKASI terpisah, jangan dijadikan summary)
    const lokasi = safeString(it.lokasi || it.lokasi_detail || it.lokasi_full || it.desa || "");

    // Summary: hanya dari sumber ringkasan / deskripsi / keterangan, TIDAK dari lokasi
    const summary = safeString(
      it.summary ||
      it.ringkasan ||
      it.keterangan ||
      it.deskripsi ||
      it.content ||
      it.desc ||
      ""
    );

    // Image / thumbnail
    let image = safeString(
      it.image ||
      it.image_url ||
      it.foto ||
      it.foto_url ||
      it.file_foto ||      // ← tambahan umum
      it.file ||           // ← tambahan umum
      it.path_file ||      // ← tambahan umum
      it.thumbnail ||
      it.thumb ||
      it.gambar ||
      it.url ||
      it.link ||
      it.media ||
      it.path ||
      ""
    );

    // youtube thumbnail helper (untuk CCTV)
    const youtubeUrl = it.youtube_url || it.video_url || it.youtube || it.rawYoutube || "";
    const yt = extractYoutubeId(youtubeUrl);
    if (yt) {
      image = `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
    }
    return { ...it, title, date, summary, lokasi, image, youtube: youtubeUrl, raw: it };
  };

  // fetcher
  useEffect(() => {
    let canceled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        switch (selectedMenu) {
          case "Pengumuman":
            res = await getPengumuman();
            break;
          case "Titik Wifi":
            res = await getWifi();
            break;
          case "CCTV":
            res = await getCctv();
            break;
          case "Event Bantul":
            res = await getEvent();
            break;
          case "ILM":
            res = await getILM();
            break;
          case "Berita":
            res = await getBerita();
            break;
          case "Galeri Foto":
            res = await getGaleriFoto();
            break;
          case "Galeri Video":
            res = await getGaleriVideo();
            break;
          default:
            res = [];
        }

        console.log("[Informasi] RAW API RESULT for", selectedMenu, res);

        const arr = arrayFromApi(res);
        console.log("[Informasi] extracted arr (sample):", arr && arr.length ? arr.slice(0, 3) : arr);

        const ready = (arr || []).map((a) => canonicalize(a));
        if (!canceled) setItems(ready);
      } catch (err) {
        console.error("[Informasi] fetch error", err);
        if (!canceled) setError(err?.message || "Gagal memuat data");
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, [selectedMenu]);

  // modal handlers
  const openModal = (item) => {
    setModalItem(item);
    setModalOpen(true);
    // lock scroll
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalItem(null);
    document.body.style.overflow = "";
  };

  // render content
  const renderContent = () => {
    if (!selectedMenu) {
      return (
        <div className="border rounded-lg p-8 min-h-[18rem] text-center text-slate-500">
          <h3 className="text-lg font-semibold mb-2">Pilih Kategori Informasi</h3>
          <p className="text-sm">Pilih menu di sebelah kiri untuk mulai melihat konten.</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-slate-100 animate-pulse h-24" />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="border rounded-lg p-6 text-red-600">Gagal memuat data: {error}</div>;
    }

    if (!items || items.length === 0) {
      return (
        <div className="border rounded-lg p-4 text-slate-500">
          Tidak ada data untuk kategori <strong>{selectedMenu}</strong>.
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {items.map((it, i) => (
          // make the whole card clickable
          <button
            key={i}
            onClick={() => openModal(it)}
            className="w-full text-left border rounded-lg p-4 bg-white shadow-sm flex gap-4 hover:shadow-md transition"
          >
            {it.image ? (
              <img src={it.image} alt={it.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0 hidden sm:block" />
            ) : null}
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 text-sm mb-1">{it.title}</h4>
              {it.lokasi && <p className="text-xs text-slate-500 mb-2">{it.lokasi}</p>}
              {it.summary && <p className="text-xs text-slate-600 line-clamp-3">{it.summary}</p>}
            </div>
          </button>
        ))}
      </div>
    );
  };

 // Modal JSX (replace existing Modal implementation)
    const Modal = ({ open, item, onClose }) => {
    // keyboard handler (Esc)
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => {
        if (e.key === "Escape") {
          if (document.fullscreenElement) document.exitFullscreen().catch(()=>{});
          onClose();
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !item) return null;

    const yt = extractYoutubeId(item.youtube || item.raw?.youtube_url || item.youtube_url);
    const embedUrl = yt ? `https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&rel=0&playsinline=1` : null;

    const toggleFullscreen = () => {
      const el = document.getElementById("informasi-modal-wrapper");
      if (!el) return;
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(()=>{});
      } else {
        if (el.requestFullscreen) el.requestFullscreen().catch(()=>{});
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center"
        style={{ paddingTop: 84 /* sesuaikan jarak dari navbar */ }}
      >
        {/* overlay: klik untuk tutup */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => { if (document.fullscreenElement) document.exitFullscreen().catch(()=>{}); onClose(); }}
        />

        {/* wrapper (responsive) */}
        <div
          id="informasi-modal-wrapper"
          className="relative z-60 w-full mx-4 sm:mx-6 md:mx-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ maxHeight: "100%" }}>
            {/* header */}
            <div className="relative px-4 py-3 border-b">
              <h3 className="font-semibold text-lg truncate">{item.title}</h3>

              {/* close + fullscreen: posisi absolute sehingga selalu terlihat */}
              <div style={{ position: "absolute", right: 12, top: 8 }} className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  title="Fullscreen"
                  className="px-2 py-1 rounded hover:bg-slate-100"
                  aria-label="Fullscreen"
                >
                  ⤢
                </button>

                <button
                  onClick={() => { if (document.fullscreenElement) document.exitFullscreen().catch(()=>{}); onClose(); }}
                  aria-label="Tutup"
                  className="text-xl font-bold px-2"
                  style={{ lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* body: scrollable, batasi tinggi agar footer selalu muncul */}
            <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 14rem)" }}>
              {embedUrl ? (
                <div id="informasi-modal-player" className="w-full bg-black rounded overflow-hidden" style={{ maxHeight: "60vh" }}>
                  <div className="w-full h-full aspect-video">
                    <iframe
                      title={item.title}
                      src={embedUrl}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              ) : item.image ? (
                <img src={item.image} alt={item.title} className="w-full max-h-[60vh] object-contain rounded" />
              ) : null}

              <div className="mt-3">
                {item.lokasi && <p className="text-sm text-slate-600 mb-2">{item.lokasi}</p>}
                {item.summary && <p className="text-sm text-slate-700">{item.summary}</p>}
              </div>
            </div>

            {/* footer: tombol Tutup */}
            <div className="flex justify-end gap-2 px-4 py-3 border-t">
              <button
                onClick={() => { if (document.fullscreenElement) document.exitFullscreen().catch(()=>{}); onClose(); }}
                className="px-4 py-2 rounded border"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <header className="relative w-full h-40 md:h-56 lg:h-64">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          <div className="bg-white px-10 py-2 rounded-xl shadow-md border font-semibold text-sm">Informasi Publik</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 -mt-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        <aside className="md:col-span-1 bg-white rounded-xl border shadow-sm p-5 h-fit">
          <h3 className="font-bold text-slate-900 mb-3 text-sm">{selectedMenu || "Pengumuman"}</h3>
          <p className="text-xs text-slate-500 mb-4">{descriptions[selectedMenu]}</p>

          <div className="space-y-3 max-h-[56vh] overflow-y-auto pr-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedMenu(item)}
                className={`${btnBase} ${
                  selectedMenu === item
                    ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span>{item}</span>
                <ChevronDown size={16} className="text-slate-500" />
              </button>
            ))}
          </div>
        </aside>

        <section className="md:col-span-4">
          <div className="bg-white border rounded-xl shadow-sm p-5 md:p-7">
            <h3 className="font-semibold text-slate-800 mb-4">{selectedMenu || "Semua Informasi"}</h3>
            {renderContent()}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      <Modal open={modalOpen} item={modalItem} onClose={closeModal} />
    </div>
  );
}
