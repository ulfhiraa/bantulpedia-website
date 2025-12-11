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

  // normalisasi item
  const canonicalize = (raw) => {
    const it = raw || {};

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

    const summary = safeString(
      it.summary ||
        it.ringkasan ||
        it.keterangan ||
        it.deskripsi ||
        it.content ||
        it.desc ||
        ""
    );

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
      ...it,
      title,
      date,
      summary,
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

    if (!items || items.length === 0) {
      return (
        <div className="border rounded-lg p-4 text-slate-500">
          Tidak ada data untuk kategori <strong>{selectedMenu}</strong>.
        </div>
      );
    }

    // CCTV GRID
    if (selectedMenu === "CCTV") {
      return (
        <div id="cctv" className="max-h-[59vh] overflow-y-auto pr-2">
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
        <div id="event" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => openModal(it)}
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
        <div id="galerivideo" className="max-h-[60vh] overflow-y-auto pr-2">
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
                      {it.date && <p className="text-[11px] text-slate-500 mt-1">{it.date}</p>}
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
        <div id="ilm" className="max-h-[57vh] overflow-y-auto pr-2">
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
                      {it.date && <span>{it.date}</span>}
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
      const [headline, second, third, ...others] = items;

      return (
        <div id="berita" className="space-y-6 max-h-[63vh] overflow-y-auto pr-2">
          {/* ====== HERO ATAS ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Kiri: headline besar */}
            {headline && (
              <button
                onClick={() => openModal(headline)}
                className="group relative rounded-2xl overflow-hidden border shadow-md md:col-span-2"
              >
                {headline.image && (
                  <img
                    src={headline.image}
                    alt={headline.title}
                    className="w-full h-60 md:h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                )}

                {/* overlay gelap + teks putih */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                  <h2 className="text-base md:text-xl font-semibold text-white drop-shadow-md mb-2 line-clamp-2">
                    {headline.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-100">
                    {headline.date && <span>{headline.date}</span>}
                    <span>Humas Bantul</span>
                    {/* kalau punya view count, bisa ditaruh di sini */}
                  </div>
                </div>
              </button>
            )}

            {/* Kanan: 2 berita lain, vertikal */}
            <div className="flex flex-col gap-4 md:col-span-1">
              {[second, third].map(
                (it, idx) =>
                  it && (
                    <button
                      key={idx}
                      onClick={() => openModal(it)}
                      className="group relative rounded-2xl overflow-hidden border shadow-sm flex-1 min-h-[110px]"
                    >
                      {it.image && (
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <h3 className="text-xs font-semibold text-white line-clamp-2 mb-1">
                          {it.title}
                        </h3>
                        {it.date && (
                          <p className="text-[10px] text-slate-100">
                            {it.date}
                          </p>
                        )}
                      </div>
                    </button>
                  )
              )}
            </div>
          </div>

          {/* ====== SIARAN PERS LAINNYA ====== */}
          {others.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm">Siaran Pers</h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {others.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => openModal(it)}
                    className="group rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
                  >
                    {it.image && (
                      <div className="w-full h-24 md:h-28 overflow-hidden">
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}

                    {/* box bawah transparan keputihan */}
                    <div className="p-3 bg-white/70 backdrop-blur-sm">
                      <h5 className="font-semibold text-xs text-slate-800 line-clamp-2">
                        {it.title}
                      </h5>
                      {it.date && (
                        <p className="text-[10px] text-slate-500 mt-1">
                          {it.date}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
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
        <div id="wifi" className="max-h-[62.5vh] overflow-y-auto pr-2 space-y-5">
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
    if (selectedMenu === "Galeri Foto") {
      return (
        <div id="galerifoto" className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {items.map((it,i)=>(
              <button
                key={i}
                onClick={()=>openModal(it)}
                className="group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden border shadow-sm">
                  <img src={it.image} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <p className="text-[11px] mt-1 text-slate-600 text-center">{it.date}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // DEFAULT: list
    return (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {items.map((it, i) => {
          const showImage = selectedMenu !== "Pengumuman" && it.image;

          return (
            <button
              key={i}
              onClick={() => openModal(it)}
              className="w-full text-left border rounded-lg p-4 bg-white shadow-sm flex gap-4 hover:shadow-md transition"
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
                {(it.date || it.tanggal) && (
                  <p className="text-[11px] text-slate-400 mb-1">
                    {it.date || it.tanggal}
                  </p>
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
        if (e.key === "Escape") {
          handleClose();
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
    }, [open]);

    if (!open || !item) return null;

    const yt = extractYoutubeId(item.youtube || item.raw?.youtube_url || item.youtube_url);
    const embedUrl = yt
      ? `https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&rel=0&playsinline=1`
      : null;

    const isPengumuman = selectedMenu === "Pengumuman";
    const isBerita = selectedMenu === "Berita";
    const isWifi = selectedMenu === "Titik Wifi";
    const isGaleriFoto = selectedMenu === "Galeri Foto";

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
        className={`fixed inset-0 z-50 flex justify-center ${
          isFullscreen ? "items-stretch" : "items-start"
        }`}
        style={isFullscreen ? undefined : { paddingTop: 84 }}
      >
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

        <div
          id="informasi-modal-wrapper"
          className={`relative z-60 ${
            isFullscreen
              ? "w-full h-full mx-0"
              : "w-full mx-4 sm:mx-6 md:mx-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl"
          }`}
          style={{
            maxHeight: isFullscreen ? "100vh" : "calc(100vh - 8rem)",
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
            style={{ height: "100%" }}
          >
            {/* HEADER */}
            <div className="relative px-4 py-3 border-b flex items-center">
              <h3 className="font-semibold text-lg truncate pr-20">
                {item.title}
              </h3>
              <div className="absolute right-3 top-2 flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  title="Fullscreen"
                  className="px-2 py-1 rounded hover:bg-slate-100"
                  aria-label="Fullscreen"
                >
                  ⤢
                </button>
                <button
                  onClick={handleClose}
                  aria-label="Tutup"
                  className="text-xl font-bold px-2"
                  style={{ lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* BODY */}
            <div
              className="p-4 overflow-y-auto"
              style={{
                maxHeight: isFullscreen
                  ? "calc(100vh - 10rem)"
                  : "calc(100vh - 14rem)",
              }}
            >
              {/* MEDIA SECTION */}
              {showMedia && (
                <>
                  {isWifi && mapSrc && (
                    <div className="w-full rounded-xl overflow-hidden border mb-4">
                      <div className="aspect-video w-full">
                        <iframe
                          src={mapSrc}
                          title={item.title}
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  )}

                  {!isWifi && embedUrl && (
                    <div
                      id="informasi-modal-player"
                      className="w-full bg-black rounded overflow-hidden mb-4"
                    >
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
                  )}

                  {!isWifi && !embedUrl && item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full object-contain rounded mb-4 ${
                        isBerita || isGaleriFoto ? "max-h-[60vh]" : "max-h-[60vh]"
                      }`}
                    />
                  )}
                </>
              )}

              {/* TEXT SECTION */}
              {isBerita ? (
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 flex flex-wrap gap-3">
                    {item.date && <span>{item.date}</span>}
                    {item.lokasi && <span>{item.lokasi}</span>}
                  </div>
                  {item.summary && (
                    <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-line">
                      {item.summary}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  {item.lokasi && (
                    <p className="text-sm text-slate-600">{item.lokasi}</p>
                  )}
                  {item.date && (
                    <p className="text-xs text-slate-400">{item.date}</p>
                  )}
                  {item.summary && (
                    <p className="text-sm text-slate-700 mt-2 whitespace-pre-line">
                      {item.summary}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 px-4 py-3 border-t">
              <button
                onClick={handleClose}
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
          // jump window instantly (no smooth)
          // compute absolute top: current scroll + element top relative to viewport - header offset (if any)
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
      <Navbar />

      {/* banner dengan overlay hijau */}
            <div className="h-40 md:h-60 relative rounded-b-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
              />
              <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply" />
            </div>

      <main className="max-w-7xl mx-auto px-6 py-16 -mt-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        <aside className="md:col-span-1 bg-white rounded-xl border shadow-sm p-5 h-fit">
          <h3 className="font-bold text-slate-900 mb-3 text-sm">
            {selectedMenu || "Pengumuman"}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {descriptions[selectedMenu]}
          </p>

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
            <h3 className="font-semibold text-slate-800 mb-4">
              {selectedMenu || "Semua Informasi"}
            </h3>
            {renderContent()}
          </div>
        </section>
      </main>

      <Footer />

      <Modal open={modalOpen} item={modalItem} onClose={closeModal} />
    </div>
  );
}
