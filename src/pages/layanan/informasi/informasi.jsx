// src/pages/layanan/informasi/informasi.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import heroBg from "../../../assets/pandansimo1.jpg";
import { useNavigate } from "react-router-dom";

// API
import { getPengumuman } from "../../../api/layanan/informasi/pengumuman.js";
import { getWifi } from "../../../api/layanan/informasi/wifi.js";
import { getCctv } from "../../../api/layanan/informasi/cctv.js";
import { getEvent } from "../../../api/layanan/informasi/event.js";
import { getILM } from "../../../api/layanan/informasi/ILM.js";
import { getBerita } from "../../../api/layanan/informasi/berita.js";
import { getGaleriFoto } from "../../../api/layanan/informasi/galerifoto.js";
import { getGaleriVideo } from "../../../api/layanan/informasi/galerivideo.js";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// ikon marker wifi (biar gak error path)
const wifiIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function InformasiIndex() {

  const [selectedMenu, setSelectedMenu] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const [galleryIndex, setGalleryIndex] = useState(0);

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
    Berita: "Siaran pers dan berita resmi Pemerintah Kabupaten Bantul.",
    CCTV: "Monitoring CCTV wilayah utama.",
    "Titik Wifi": "Daftar titik wifi publik di Kabupaten Bantul — lokasi & status.",
    "Galeri Foto": "Kumpulan foto kegiatan resmi.",
    "Galeri Video": "Kumpulan video dokumentasi.",
    ILM: "Iklan layanan masyarakat.",
    "Event Bantul": "Jadwal event resmi Kabupaten Bantul.",
  };

  const btnBase =
    "w-full min-h-[48px] rounded-lg px-4 py-2 flex items-center justify-between text-sm transition border";

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
      return d.features.map((f) =>
        f && f.properties ? { ...f.properties, _geometry: f.geometry } : f
      );
    }
    if (d.type === "Feature" && d.properties) return [{ ...d.properties, _geometry: d.geometry }];
    if (typeof d === "object") return [d];
    return [];
  };

const formatDateDMY = (value) => {
  if (!value) return "";

  const d = new Date(value);

  // kalau date invalid, tampilkan apa adanya
  if (isNaN(d.getTime())) return value;

  const bulanID = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sept",
    "Okt",
    "Nov",
    "Des",
  ];

    const day = d.getDate();
    const month = bulanID[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  };

  // normalisasi item
  const canonicalize = (raw) => {
    const it = raw || {};

    const id =
    it.id ??
    it.ID ??
    it.berita_id ??
    it.raw?.id ??
    null;

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

    const date = safeString(
      it.date ||
        it.tanggal ||
        it.tanggal_mulai ||
        it.tanggal_selesai ||
        it.created_at ||
        it.tgl ||
        ""
    );

    const lokasi = safeString(
      it.lokasi || it.lokasi_detail || it.lokasi_full || it.desa || it.alamat || ""
    );

    const excerpt = safeString(
      it.ringkasan ||
      it.summary ||
      it.keterangan ||
      it.deskripsi ||
      ""
    );

    const content = safeString(
      it.isi ||
      it.content ||
      ""
    );

    // fallback universal (buat list, kartu, dll)
    const summary = content || excerpt;

    let image = safeString(
      it.image ||
        it.poster ||
        it.image_url ||
        it.foto ||
        it.foto_url ||
        it.file_foto ||
        it.file ||
        it.path_file ||
        it.thumbnail ||
        it.thumb ||
        it.gambar ||
        it.url ||
        it.link ||
        it.media ||
        it.path ||
        ""
    );

    const youtubeUrl = it.youtube_url || it.video_url || it.youtube || it.rawYoutube || "";
    const yt = extractYoutubeId(youtubeUrl);
    if (yt) {
      image = `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
    }

    // koordinat untuk wifi (kalau ada)
    const lat =
      it.lat ||
      it.latitude ||
      it.y ||
      it.koordinat_lat ||
      it.lat_wifi ||
      (it.geom && it.geom.lat);

    const lng =
      it.lng ||
      it.longitude ||
      it.x ||
      it.koordinat_lng ||
      it.lng_wifi ||
      (it.geom && it.geom.lng);

    return {
      id, 
      ...it,
      title,
      date,

      excerpt,   // ✅ khusus ringkasan
      content,   // ✅ isi lengkap
      summary,   // ✅ fallback global (AMAN)

      lokasi,
      image,
      youtube: youtubeUrl,
      lat,
      lng,
      raw: it,
    };

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

  const openModal = (item) => {
    // ✅ kalau galeri foto, simpan index
    if (selectedMenu === "Galeri Foto" && typeof item.__index === "number") {
      setGalleryIndex(item.__index);
    }

    setModalItem(item);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalItem(null);
    document.body.style.overflow = "";
  };

  // =================== RENDER LIST KONTEN =====================
  const renderContent = () => {
    if (!selectedMenu) {
      return (
        <div id="pengumuman" className="border rounded-lg p-10 min-h-[10rem] text-center text-slate-500">
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

    if (!items || items.length   === 0) {
      return (
        <div className="border rounded-lg p-4 text-slate-500">
          Tidak ada data untuk kategori <strong>{selectedMenu}</strong>.
        </div>
      );
    }

    // CCTV GRID
    if (selectedMenu === "CCTV") {
      return (
        <div id="cctv" className="h-full overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => openModal(it)}
                className="
                  group 
                  rounded-xl 
                  overflow-hidden 
                  shadow-sm 
                  hover:shadow-xl 
                  hover:-translate-y-1 
                  transition-all 
                  duration-300
                "
              >
                <div className="relative aspect-[16/9] w-full">
                  {/* gambar */}
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />

                  {/* teks tanpa background */}
                  <div className="absolute left-3 right-3 bottom-3">
                    <p
                      className="
                        text-sm               /* UBAH FONT SIZE DI SINI: text-xs / text-sm / text-base */
                        font-semibold         /* UBAH KETEBALAN: font-medium / font-semibold / font-bold */
                        text-slate-50 
                        drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]
                        opacity-90 
                        group-hover:opacity-100
                      "
                    >
                      {it.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // EVENT BANTUL: grid poster
    if (selectedMenu === "Event Bantul") {
      return (
        <div id="event" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-y-auto pr-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => navigate(`/layanan/informasi/event/${it.id}`)}
              className="group rounded-2xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition text-left"
            >
              <div className="w-full aspect-[3/4] overflow-hidden">
                {it.image && (
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                )}
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-slate-800 text-sm line-clamp-2">
                  {it.title}
                </h4>
              </div>
            </button>
          ))}
        </div>
      );
    }
    
    // GALERI VIDEO
    if (selectedMenu === "Galeri Video") {
      return (
        <div id="galerivideo" className="h-full overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="border rounded-lg p-4 text-slate-500">
              Tidak ada video untuk kategori <strong>{selectedMenu}</strong>.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it, i) => {
                const yt = extractYoutubeId(it.youtube || it.raw?.youtube_url || it.video_url || it.link);
                const thumb = yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : it.image || it.thumbnail || "";

                return (
                  <button
                    key={i}
                    onClick={() => openModal(it)}
                    className="group text-left rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
                  >
                    <div className="w-full aspect-video overflow-hidden bg-slate-100">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={it.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                          Video tidak tersedia
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h4 className="font-semibold text-xs text-slate-800 line-clamp-2">
                        {it.title}
                      </h4>
                      {it.date && (
                        <p className="text-[11px] text-slate-500 mt-1">
                          {formatDateDMY(it.date)}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // ILM 
    if (selectedMenu === "ILM") {
      return (
        <div id="ilm" className="h-full overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="border rounded-lg p-4 text-slate-500">
              Tidak ada data untuk <strong>{selectedMenu}</strong>.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it, i) => (
                <button
                  key={i}
                  onClick={() => openModal(it)}
                  className="w-full text-left flex items-start gap-4 p-4 rounded-lg border border-slate-300 hover:shadow-md transition"
                >
                  {/* thumbnail kiri */}
                  <div className="w-36 h-20 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* konten kanan */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-800 leading-snug mb-1">
                      {it.title}
                    </h4>

                    <div className="flex items-center gap-3 text-[12px] text-slate-400 mb-2">
                      {it.date && (
                        <span>{formatDateDMY(it.date)}</span>
                      )}
                      <span>•</span>
                      <span>Iklan Layanan Masyarakat</span>
                    </div>

                    {it.summary ? (
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {it.summary}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-600 opacity-60">
                        {it.lokasi || "—"}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // BERITA: headline + grid siaran pers
    if (selectedMenu === "Berita") {
      const beritaTerkini = items[0]
      const beritaTerpopuler = items.slice(1, 5)
      const beritaUtama = items.slice(4, 8)
      const beritaPers = items.slice(8)

      return (
        <div className="space-y-10">

          {/* ================= BERITA TERKINI ================= */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* KIRI: BERITA TERKINI (HERO) */}
            {beritaTerkini && (
              <button
                onClick={() => navigate(`/layanan/informasi/berita/${beritaTerkini.id}`)}
                className="md:col-span-3 relative overflow-hidden rounded-lg group"
              >
                <img
                  src={beritaTerkini.image}
                  alt={beritaTerkini.title}
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* SILUET */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-4 left-4 right-4  right-16 text-left space-y-1">
                  {/* ITEM LABEL */}
                  <span className="text-[10px] uppercase tracking-wide text-white/80">
                    Berita Terkini
                  </span>

                  {/* TITLE */}
                  <h2 className="text-xs md:text-base font-light leading-[1.25] tracking-tight text-white line-clamp-2">
                    {beritaTerkini.title}
                  </h2>

                  {/* DATE */}
                  {beritaTerkini.date && (
                    <p className="text-[11px] text-white/70">
                      {formatDateDMY(beritaTerkini.date)}
                    </p>
                  )}
                </div>
              </button>
            )}

            {/* KANAN: TERPOPULER */}
            <div className="space-y-5">
              <h2 className="font-semibold text-sm mb-2">Berita Terpopuler</h2>

              {beritaTerpopuler.slice(0, 4).map((it, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/layanan/informasi/berita/${it.id}`)}
                  className="flex gap-3 items-center text-left group"
                >
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-xs leading-snug line-clamp-2">
                      {it.title}
                    </p>
                    {it.date && (
                      <p className="text-[11px] text-slate-500">
                        {formatDateDMY(it.date)}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>


          {/* ================= BERITA UTAMA ================= */}
          {beritaUtama.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-3">Berita Utama</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {beritaUtama.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/layanan/informasi/berita/${it.id}`)}
                    className="relative overflow-hidden rounded-lg group text-left"
                  >
                    {/* IMAGE */}
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-full h-32 md:h-36 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />

                    {/* SILUET */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* CONTENT */}
                    <div className="absolute bottom-2 left-2 right-2 space-y-0.5">
                      <p className="text-[12px] font-light leading-[1.25] tracking-tight text-white line-clamp-2">
                        {it.title}
                      </p>

                      {it.date && (
                        <span className="text-[10px] text-white/70">
                          {formatDateDMY(it.date)}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* ================= BERITA PERS ================= */}
          {beritaPers.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-3">Berita Pers</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {beritaPers.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/layanan/informasi/berita/${it.id}`)}
                    className="rounded-lg overflow-hidden border shadow-sm text-left"
                  >
                    <div className="relative overflow-hidden rounded-lg group">
                      {/* IMAGE */}
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-32 md:h-36 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />

                      {/* SILUET GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* CONTENT */}
                      <div className="absolute bottom-3 left-3 right-3 space-y-1">

                        {/* TITLE */}
                        <h3 className="
                          text-[12px]
                          font-light
                          leading-[1.25]
                          tracking-tight
                          text-white
                          line-clamp-2
                        ">
                          {it.title}
                        </h3>

                        {/* DATE */}
                        {it.date && (
                          <p className="text-[10px] text-white/70">
                            {formatDateDMY(it.date)}
                          </p>
                        )}
                      </div>
                    </div>

                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }


    // TITIK WIFI
    if (selectedMenu === "Titik Wifi") {
      const wifiWithCoords = items.filter((it) => it.lat && it.lng);

      // pusat peta (rata-rata koordinat, fallback ke Bantul)
      let centerLat = -7.9;
      let centerLng = 110.33;

      if (wifiWithCoords.length) {
        centerLat =
          wifiWithCoords.reduce((sum, it) => sum + Number(it.lat), 0) /
          wifiWithCoords.length;
        centerLng =
          wifiWithCoords.reduce((sum, it) => sum + Number(it.lng), 0) /
          wifiWithCoords.length;
      }

      return (
        <div id="wifi" className="h-full overflow-y-auto pr-2 space-y-5">
          {/* PETA BESAR SEMUA TITIK WIFI */}
          <div className="rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="p-4 border-b">
              <h4 className="font-semibold text-sm text-slate-800">
                Peta Sebaran Titik Wifi Publik
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Klik marker untuk melihat nama lokasi wifi.
              </p>
            </div>
            <div className="h-64 w-full">
              <MapContainer
                center={[centerLat, centerLng]}
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {wifiWithCoords.map((it, i) => (
                  <Marker
                    key={i}
                    position={[Number(it.lat), Number(it.lng)]}
                    icon={wifiIcon}
                  >
                    <Popup>
                      <div className="text-xs">
                        <strong>{it.title}</strong>
                        {it.lokasi && <div>{it.lokasi}</div>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* KARTU PER TITIK WIFI – UKURAN SEDANG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((it, i) => {
              const hasCoord = it.lat && it.lng;
              const src = hasCoord
                ? `https://www.google.com/maps?q=${it.lat},${it.lng}&hl=id&z=17&output=embed`
                : "";

              return (
                <button
                  key={i}
                  onClick={() => openModal(it)}
                  className="bg-white rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden text-left"
                >
                  <div className="w-full h-32">
                    {src ? (
                      <iframe
                        src={src}
                        title={it.title}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[11px] text-slate-500">
                        Lokasi tidak tersedia
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                      {it.title}
                    </p>
                    {it.lokasi && (
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {it.lokasi}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // GALERI FOTO: grid jejer + tanggal di bawah
    // GALERI FOTO: GRID 4 KOLOM
    if (selectedMenu === "Galeri Foto") {
      return (
        <div
          id="galerifoto"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => openModal({ ...it, __index: i })}
              className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition bg-white text-left"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                />
                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* DATE */}
                {it.date && (
                  <span
                    className="
                      absolute bottom-2 right-2
                      text-[11px]
                      text-white/90
                      font-medium
                      px-2 py-0.5
                      rounded-md
                      bg-black/40
                      backdrop-blur
                    "
                  >
                    {formatDateDMY(it.date)}
                  </span>
                )}

              </div>

              {/* <div className="p-2">
                {it.date && (
                  <p className="text-[11px] text-slate-500 text-center">
                    {formatDateDMY(it.date)}
                  </p>
                )}
              </div> */}
            </button>
          ))}
        </div>
      );
    }


    // DEFAULT: list
    return (
      <div className="space-y-4 h-full overflow-y-auto pr-2">
        {items.map((it, i) => {
          const showImage = selectedMenu !== "Pengumuman" && it.image;

          return (
            <button
              key={i}
              onClick={() => openModal(it)}
              className="w-full text-left border border-slate-200 rounded-lg p-4 bg-white shadow-md flex gap-4 hover:shadow-md transition"
            >
              {showImage && (
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-32 h-20 object-cover rounded-md flex-shrink-0 hidden sm:block"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 text-sm mb-1">
                  {it.title}
                </h4>
                {it.date && (
                  <span className="text-xs text-slate-400 block mb-1">
                    {formatDateDMY(it.date)}
                  </span>
                )}
                {it.lokasi && (
                  <p className="text-xs text-slate-500 mb-1">{it.lokasi}</p>
                )}
                {it.summary && (
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {it.summary}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // ===================== MODAL ==========================
  const Modal = ({ open, item, onClose }) => {
  const isGaleriFoto = selectedMenu === "Galeri Foto";
  const galleryItems = isGaleriFoto ? items : [];
  const currentImage = isGaleriFoto ? galleryItems[galleryIndex] : item;

    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const handleClose = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
      onClose();
    };
    

    useEffect(() => {
      if (!open) return;

      const onKey = (e) => {
        // tutup modal
        if (e.key === "Escape") {
          handleClose();
        }

        // ⬅️ foto sebelumnya
        if (
          selectedMenu === "Galeri Foto" &&
          e.key === "ArrowLeft" &&
          galleryIndex > 0
        ) {
          setGalleryIndex((i) => i - 1);
        }

        // ➡️ foto berikutnya
        if (
          selectedMenu === "Galeri Foto" &&
          e.key === "ArrowRight" &&
          galleryIndex < galleryItems.length - 1
        ) {
          setGalleryIndex((i) => i + 1);
        }
      };

      const onFsChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      window.addEventListener("keydown", onKey);
      document.addEventListener("fullscreenchange", onFsChange);

      return () => {
        window.removeEventListener("keydown", onKey);
        document.removeEventListener("fullscreenchange", onFsChange);
      };
    }, [open, galleryIndex, galleryItems.length]);

    if (!open || !item) return null;

    const yt = extractYoutubeId(item.youtube || item.raw?.youtube_url || item.youtube_url);
    const embedUrl = yt
      ? `https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&rel=0&playsinline=1`
      : null;

    const isPengumuman = selectedMenu === "Pengumuman";
    const isTextWithExcerpt = selectedMenu === "Berita" || selectedMenu === "Pengumuman";
    const isWifi = selectedMenu === "Titik Wifi";

    // maps untuk wifi
    let mapSrc = "";
    if (isWifi && item) {
      const lat =
        item.lat ||
        item.latitude ||
        item.y ||
        item.koordinat_lat ||
        item.lat_wifi;
      const lng =
        item.lng ||
        item.longitude ||
        item.x ||
        item.koordinat_lng ||
        item.lng_wifi;
      if (lat && lng) {
        mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=id&z=17&output=embed`;
      } else if (item.maps_url || item.link_maps) {
        mapSrc = item.maps_url || item.link_maps;
      }
    }

    const showMedia =
      !isPengumuman &&
      (isWifi ? !!mapSrc : !!embedUrl || !!item.image);

    const toggleFullscreen = () => {
      const el = document.getElementById("informasi-modal-wrapper");
      if (!el) return;

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        if (el.requestFullscreen) {
          el.requestFullscreen().catch(() => {});
        }
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-stretch justify-center"
        style={isFullscreen ? undefined : { paddingTop: 20, paddingBottom: 20, paddingLeft: 160, paddingRight: 160 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={handleClose} />
          <div
            id="informasi-modal-wrapper"
            className="relative z-60 w-full h-full"
            style={{
              maxHeight: isFullscreen ? "100vh" : "calc(100vh - 6rem)",
            }}
          >

          <div
            className="
              bg-white/95
              backdrop-blur-xl
              rounded-[28px]
              shadow-[0_40px_120px_-20px_rgba(0,0,0,0.55)]
              border border-white/40
              overflow-hidden
              flex flex-col
            "
            style={{ height: "100%" }}
          >
            
            {/* HEADER */}
            {!isGaleriFoto && (
              <div className="relative px-5 py-4 border-b border-slate-200/70 flex items-center">
                <h3 className="text-xl font-semibold tracking-tight leading-tight pr-24">
                  {item.title}
                </h3>

                <div className="absolute right-3 top-2 flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                    className="px-2 py-1 rounded hover:bg-slate-100"
                  >
                    ⤢
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* BODY */}
            {isGaleriFoto ? (
              /* ================= GALERI FOTO (FULL, NO SPACE) ================= */
              <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden p-8">

                {/* BACKGROUND BLUR */}
                <div
                  className="absolute inset-0 bg-center bg-cover blur-2xl scale-110"
                  style={{ backgroundImage: `url(${currentImage?.image})` }}
                />
                <div className="absolute inset-0 bg-black/60" />

                {/* IMAGE */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src={currentImage?.image}
                    alt={currentImage?.title}
                    className="max-w-full max-h-full object-contain select-none"
                    draggable={false}
                  />
                </div>

                {/* NAV LEFT */}
                {galleryIndex > 0 && (
                  <button
                    onClick={() => setGalleryIndex((i) => i - 1)}
                    className="
                      absolute left-4 top-1/2 -translate-y-1/2
                      z-20
                      w-12 h-12
                      rounded-full
                      bg-black/50
                      text-white
                      text-3xl
                      flex items-center justify-center
                      hover:bg-black/70
                      transition
                    "
                    aria-label="Sebelumnya"
                  >
                    ‹
                  </button>
                )}

                {/* NAV RIGHT */}
                {galleryIndex < galleryItems.length - 1 && (
                  <button
                    onClick={() => setGalleryIndex((i) => i + 1)}
                    className="
                      absolute right-4 top-1/2 -translate-y-1/2
                      z-20
                      w-12 h-12
                      rounded-full
                      bg-black/50
                      text-white
                      text-3xl
                      flex items-center justify-center
                      hover:bg-black/70
                      transition
                    "
                    aria-label="Berikutnya"
                  >
                    ›
                  </button>
                )}
              </div>
            ) : (
              /* ================= KONTEN NORMAL (MEDIA + TEXT) ================= */
              <div
                className="flex-1 overflow-y-auto p-6 space-y-6"
                style={{
                  maxHeight: isFullscreen
                    ? "calc(100vh - 10rem)"
                    : "calc(100vh - 14rem)",
                }}
              >

                {/* ===== MEDIA SECTION ===== */}
                {showMedia && (
                  <>
                    {/* WIFI MAP */}
                    {isWifi && mapSrc && (
                      <div className="w-full rounded-xl overflow-hidden border">
                        <iframe
                          src={mapSrc}
                          title={item.title}
                          className="w-full aspect-video border-0"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* YOUTUBE */}
                    {!isWifi && embedUrl && (
                      <div className="w-full max-h-[55vh] aspect-video rounded-xl overflow-hidden bg-black">
                        <iframe
                          title={item.title}
                          src={embedUrl}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                    )}

                    {/* IMAGE */}
                    {!isWifi && !embedUrl && item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full max-h-[50vh] object-contain rounded-xl"
                      />
                    )}
                  </>
                )}

                {/* ===== TEXT ===== */}
                <div className="space-y-5">
                  <div className="text-xs text-slate-500 flex gap-3">
                    {item.date && <span>{formatDateDMY(item.date)}</span>}
                    {item.lokasi && <span>{item.lokasi}</span>}
                  </div>

                  {item.excerpt && (
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                  )}

                  {item.content && (
                    <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-line">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CLOSE BUTTON */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 text-white text-2xl opacity-80 hover:opacity-100"
            >
              ✕
            </button>

            {/* FULLSCREEN */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-14 z-30 text-white text-xl opacity-80 hover:opacity-100"
            >
              ⤢
            </button>


            {/* FOOTER */}
            {/* <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-200/70 bg-slate-50/60"></div> */}
          </div>
        </div>
      </div>
    );
  };

  // AUTO OPEN MENU BERDASARKAN HASH URL (IMMEDIATE JUMP — NO ANIMATION)
  useEffect(() => {
    const rawHash = window.location.hash?.replace("#", "").toLowerCase();
    if (!rawHash) return;

    const mapHash = {
      pengumuman: "Pengumuman",
      berita: "Berita",
      cctv: "CCTV",
      wifi: "Titik Wifi",
      galerifoto: "Galeri Foto",
      galerivideo: "Galeri Video",
      ilm: "ILM",
      event: "Event Bantul",
    };

    const menu = mapHash[rawHash];
    if (!menu) return;

    // 1) pilih menunya dulu
    setSelectedMenu(menu);

    // helper: cari ancestor yang bisa discroll (overflow: auto/scroll)
    const findScrollParent = (el) => {
      if (!el) return null;
      let node = el.parentElement;
      while (node) {
        const style = getComputedStyle(node);
        const overflowY = style.overflowY;
        if (overflowY === "auto" || overflowY === "scroll") return node;
        node = node.parentElement;
      }
      return document.documentElement;
    };

    // 2) retry loop sampai element muncul (maks 60 frame ~ 1s)
    let attempts = 0;
    const maxAttempts = 60;

    const tryScroll = () => {
      attempts++;
      const target = document.getElementById(rawHash);

      if (target) {
        const scrollParent = findScrollParent(target);

        if (scrollParent === document.documentElement || scrollParent === document.body) {
          const headerOffset = 0; // ubah kalau navbar fixed punya tinggi (mis. 80)
          const top = window.pageYOffset + target.getBoundingClientRect().top - headerOffset;
          window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "auto" });
        } else {
          // jump the scrollable parent instantly (no smooth)
          const parentRect = scrollParent.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const offsetTop = targetRect.top - parentRect.top + scrollParent.scrollTop;
          const padding = 12; // sedikit jarak agar tidak mentok
          scrollParent.scrollTop = Math.max(0, Math.round(offsetTop - padding));
        }

        return;
      }

      if (attempts < maxAttempts) {
        // coba lagi di next frame
        requestAnimationFrame(tryScroll);
      } else {
        // fallback: langsung top
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    requestAnimationFrame(tryScroll);
  }, []);

  // ====================== PAGE WRAPPER ======================
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!modalOpen && <Navbar />}
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

          <main className="max-w-7xl mx-auto px-6 py-16 -mt-8 grid grid-cols-1 md:grid-cols-5 gap-8 items-start overflow-visible">
          
          <aside className="md:col-span-1 bg-white rounded-xl border shadow-sm p-5 sticky top-20 self-start">
          
          <h3 className="font-bold text-slate-900 mb-3 text-sm">
            {selectedMenu || "Pengumuman"}
          </h3>

          <p className="text-xs text-slate-500 mb-4">
            {descriptions[selectedMenu]}
          </p>

          <div className="space-y-3">
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
              </button>
            ))}
          </div>
        </aside>

       <section className="md:col-span-4 h-full">
        <div className="bg-white rounded-xl shadow-sm h-full flex flex-col p-6">
          <h3 className="font-semibold mb-4">{selectedMenu}</h3>

          {/* INI SATU-SATUNYA YANG BOLEH SCROLL */}
          <div className="flex-1 overflow-y-auto pr-2">
            {renderContent()}
          </div>
        </div>
      </section>

      </main>

      <Footer />

      <Modal open={modalOpen} item={modalItem} onClose={closeModal} />
    </div>
  );
}
