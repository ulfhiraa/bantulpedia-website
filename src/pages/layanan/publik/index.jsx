// src/pages/layanan/publik/index.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import heroBg from "../../../assets/pandansimo1.jpg";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

// default small icon fallback (jika tidak ada icon spesifik)
const DEFAULT_ICON = "/src/assets/LogoBantulpedia.png";

// helper: make id-safe strings
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// list bahan pokok (Perdagangan -> Info Bahan Pokok)
const BAHAN_POKOK = [
  "Beras - premium",
  "Beras - medium",
  "Beras - bulog",
  "Gula pasir curah",
  "Minyak goreng - sederhana",
  "Minyak goreng - curah",
  "Tepung segitiga biru",
  "Daging sapi - kualitas 1",
  "Daging sapi - kualitas 2",
  "Ayam ras/boiler",
  "Ayam kampung",
  "Telur ayam negeri",
  "Telur ayam kampung",
  "Cabe merah keriting",
  "Cabe merah besar",
  "Cabe rawit merah",
  "Cabe rawit hijau",
  "Bawang merah",
  "Bawang putih (sinco)",
  "Bawang putih (kating)",
  "Bawang bombay",
  "Garam yodium bata",
  "Garam yodium halus",
  "Kedelai impor",
  "Kedelai lokal",
  "Kacang tanah",
  "Kacang hijau",
  "Ikan asin teri",
  "Ikan kembung",
  "Susu kental manis (Bendera)",
  "Susu kental manis (Indomilk)",
  "Susu bubuk setara (Dancow)",
  "Ketela pohon",
  "Jagung pipil",
  "Mie instan (setara Indomie)",
  "Tempe",
  "Tahu",
  "Udang ukuran sedang",
  "Pisang Ambon",
  "Jeruk lokal",
  "Tomat",
  "Kol / kubis",
  "Sawi hijau",
  "Kentang",
];

// layanan & sub-layanan (lengkap seperti inputmu)
const SERVICES = [
  // KEPENDUDUKAN
  {
    id: "kependudukan",
    title: "Kependudukan",
    desc: "Makin gampang urus kependudukan dan permukiman.",
    sub: [
      {
        id: "dukcapil-smart",
        title: "Dukcapil Smart",
        desc: "Layanan digital dokumen kependudukan.",
        route: "/layanan/publik/kependudukan/dukcapil-smart",
        icon: "/src/assets/dukcapil.png",
      },
    ],
  },

  // PENDIDIKAN
  {
    id: "pendidikan",
    title: "Pendidikan",
    desc: "Mengembangkan wawasan, pengetahuan dan keahlian.",
    sub: [
      {
        id: "bantul-pinter",
        title: "Bantul Pinter",
        desc: "Perpustakaan & OPAC — pengecekan status/pencarian buku.",
        url: "https://perpusda.bantulkab.go.id/opac",
        icon: "/src/assets/bantulpinter.png",
      },
      {
        id: "evoss",
        title: "E-Pemilos EVOSS ",
        desc: "Platform e-voting untuk pemilos sekolah di Kabupaten Bantul.",
        url: "https://evoss.bantulkab.go.id/",
        icon: "/src/assets/evoss.png",
      },
      {
        id: "pisa",
        title: "PISA (Pusat Informasi Sahabat Anak)",
        desc: `Layanan literasi ramah anak.`,
        url: "https://pisa.bantulkab.go.id/",
        icon: "/src/assets/pisa.png",
      },
    ],
  },

  // KESEHATAN
  {
    id: "kesehatan",
    title: "Kesehatan",
    desc: "Pelayanan kesehatan publik dan data kesehatan daerah.",
    sub: [
      {
        id: "dashboard-stunting",
        title: "Dashboard Stunting",
        desc: "Grafik & data stunting per kapanewon (profil & tren).",
        route: "/layanan/publik/kesehatan/statusgizi",
        icon: "/src/assets/stunting.png",
      },
      {
        id: "pendaftaran-rsud",
        title: "Pendaftaran Pasien RSUD",
        desc: "Pendaftaran pasien, status pasien, cari dokter, dan info kamar RSUD.",
        route: "/layanan/publik/kesehatan/pendaftaran-RSUD",
        icon: "/src/assets/pasienrsud.png",
      },
      {
        id: "info-bed-rsud",
        title: "Info Bed RSUD",
        desc: "Informasi ketersediaan tempat tidur rumah sakit.",
        url: "https://rsudps.bantulkab.go.id/hal/info-bed",
        icon: "/src/assets/bedrs.png",
      },
    ],
  },

  // PEMERINTAHAN
  {
    id: "pemerintahan",
    title: "Pemerintahan",
    desc: "Kelola manajemen pemerintahan Bantul.",
    sub: [
      {
        id: "agenda-perangkat-daerah",
        title: "Agenda Perangkat Daerah",
        desc: "Seluruh agenda PemDa Bantul (tanggal, jam, perangkat, lokasi).",
        route: "/layanan/publik/pemerintahan/agenda-perangkat-daerah",
        icon: "/src/assets/agenda.png",
      },
      {
        id: "sinoman",
        title: "SINOMAN",
        desc: "Sistem Layanan & Pengetahuan Informatika.",
        url: "https://sinoman.bantulkab.go.id/",
        icon: "/src/assets/sinoman.png",
      },
      {
        id: "csr",
        title: "CSR",
        desc: "Corporate Social Responsibility; info & pengajuan CSR.",
        url: "https://csr.bantulkab.go.id/",
        icon: "/src/assets/csr.png",
      },
      {
        id: "sipd",
        title: "SIPD",
        desc: "Sistem Informasi Pemerintah Daerah (Kemendagri).",
        url: "https://sipd.kemendagri.go.id/landing",
        icon: "/src/assets/sipd.png",
      },
      {
        id: "sirup",
        title: "SIRUP",
        desc: "Sistem RUP - referensi pengadaan publik.",
        url: "https://sirup.lkpp.go.id/sirup/rekap/klpd/D68",
        icon: "/src/assets/sirup.png",
      },
      {
        id: "sapa-asn",
        title: "SAPA ASN",
        desc: "Aplikasi layanan ASN Kabupaten Bantul.",
        url: "https://asn.bantulkab.go.id/",
        icon: "/src/assets/sapaasn.png",
      },
      {
        id: "lpse",
        title: "LPSE (SPSE)",
        desc: "Pengadaan Barang/Jasa secara elektronik (SPSE).",
        url: "https://spse.inaproc.id/bantulkab",
        icon: "/src/assets/lpse.png",
      },
      {
        id: "buku-tamu",
        title: "Buku Tamu",
        desc: "Formulir tamu & pencatatan kunjungan resmi.",
        route: "/layanan/publik/pemerintahan/buku-tamu",
        icon: "/src/assets/bukutamu.png",
      },
      {
        id: "reservasi-kunjungan",
        title: "Reservasi Kunjungan",
        desc: "Reservasi kunjungan instansi / tamu penting.",
        route: "/layanan/publik/pemerintahan/reservasi-kunjungan",
        icon: "/src/assets/reservasi.png",
      },
      {
        id: "ipkd",
        title: "IPKD",
        desc: "Indeks Pengelolaan Keuangan Daerah (dokumen & kategori).",
        route: "/layanan/publik/pemerintahan/ipkd",
        icon: "/src/assets/ipkd.png",
      },
      {
        id: "reservasi-ruangan",
        title: "Reservasi Ruangan",
        desc: "Sistem reservasi ruang rapat (butuh login).",
        icon: "/src/assets/reservasi1.png",
      },
    ],
  },

  // HUKUM
  {
    id: "hukum",
    title: "Hukum",
    desc: "Fondasi hukum untuk Bantul yang maju.",
    sub: [
      {
        id: "jdih-bantul",
        title: "JDIH Bantul",
        desc: "Jaringan Dokumentasi dan Informasi Hukum Bantul.",
        url: "https://jdih.bantulkab.go.id/",
        icon: "/src/assets/jdih.png",
      },
      {
        id: "jdih-dprd",
        title: "JDIH DPRD Bantul",
        desc: "JDIH DPRD — dokumentasi regulasi DPRD.",
        url: "https://jdih-dprd.bantulkab.go.id/",
        icon:"/src/assets/jdih.png",
      },
      {
        id: "info-persidangan",
        title: "Informasi Persidangan PN Bantul",
        desc: "Jadwal sidang & informasi perkara (SIPP PN Bantul).",
        url: "https://sipp.pn-bantul.go.id/",
        icon: "/src/assets/infopekara.png",
      },
    ],
  },

  // PENANAMAN MODAL
  {
    id: "penanamanmodal",
    title: "Penanaman Modal",
    desc: "Layanan budaya & event.",
    sub: [
      {
        id: "oss",
        title: "OSS",
        desc: "Jaringan Dokumentasi dan Informasi Hukum Bantul.",
        url: "https://oss.go.id/id",
        icon: "/src/assets/oss.png",
      },
      {
        id: "lantip",
        title: "Lantip",
        desc: "Jaringan Dokumentasi dan Informasi Hukum Bantul.",
        url: "https://jdih.bantulkab.go.id/",
        icon: "/src/assets/lantip.png",
      },
    ],
  },

  // PAJAK dan RETRIBUSI
  {
    id: "pajakretribusi",
    title: "Pajak dan Retribusi",
    desc: "Informasi layanan pajak daerah dan retribusi publik Kabupaten Bantul.",
    sub: [
      {
        id: "pajakda",
        title: "Pajakda",
        desc: "Layanan pajak daerah online untuk pengecekan, pembayaran, dan validasi tagihan pajak Kabupaten Bantul.",
        url: "https://pajakda.bantulkab.go.id/apps/public/index",
        icon: "/src/assets/pajakda.png",
      },
      {
        id: "tagihan",
        title: "Pengecekan Tagihan Pasar",
        desc: "Pengecekan Tagihan Pasar",
        route: "/layanan/publik/pajakretri/cek-tagihan",
        icon: "/src/assets/cektagihan.png",
      },
      {
        id: "sipentol",
        title: "SiPentol",
        desc: "",
        route: "/layanan/publik/pajakretri/sipenthol",
        icon: "/src/assets/sipentol.png",
      },
      {
        id: "lapakbantul",
        title: "Lapak Bantul",
        desc: "",
        url: "",
        icon: "/src/assets/lapakbantul.png",
      },
      {
        id: "realisasiretribusi",
        title: "Realisasi Retribusi",
        desc: "",
        route: "/layanan/publik/pajakretri/realisasi-retribusi",
        icon: "/src/assets/retribusi.png",
      },
    ],
  },

  // Perdagangan (baru) dengan Info Bahan Pokok
  {
    id: "perdagangan",
    title: "Perdagangan",
    desc: "Informasi pasar, bahan pokok, dan marketplace.",
    sub: [
      {
        id: "info-bahan-pokok",
        title: "Info Bahan Pokok",
        desc: "Pantauan harga & status bahan pokok (klik untuk detail pasar & harga).",
        route: "/layanan/publik/perdagangan/info-bahan-pokok",
        icon: "/src/assets/InfoBahanPokok.png",
        children: BAHAN_POKOK.map((b) => ({
          id: slugify(b),
          title: b,
          desc: "Klik untuk melihat pasar, harga lama/baru, dan status (naik/turun/stabil).",
          url: `/layanan/publik/perdagangan/info-bahan-pokok/${slugify(b)}`,
          icon: "/src/assets/InfoBahanPokok.png",
        })),
      },
      {
        id: "bantul-mapan",
        title: "Bantul Mapan",
        desc: "Sistem Bantul Mapan (informasi ekonomi lokal).",
        url: "https://bantulmapan.bantulkab.go.id/",
        icon: "/src/assets/BantulMapan.png",
      },
      {
        id: "marketplace",
        title: "Marketplace (BOS)",
        desc: "Marketplace lokal & layanan BOS.",
        url: "https://bos.bantulkab.go.id/id",
        icon: "/src/assets/Marketplace.png",
      },
    ],
  },

  {
    id: "pariwisata",
    title: "Pariwisata",
    desc: "Panduan wisata, destinasi & fasilitas umum.",
    sub: [
      {
        id: "jelajah-bantul",
        title: "Jelajah Bantul",
        desc: "Detail lokasi, gmaps, deskripsi singkat dan kategori wisata.",
        route: "/layanan/publik/Pariwisata/jelajah-bantul",
        icon: "/src/assets/JelajahBantul.png",
        children: [
          { id: "destinasi-wisata", title: "Destinasi Wisata", desc: "Desa Wisata, Wisata Buatan, Wisata Alam" },
          { id: "akomodasi", title: "Akomodasi Wisata", desc: "Hotel, Home Stay" },
          { id: "agen-perjalanan", title: "Agen Perjalanan", desc: "Transportasi & paket wisata" },
          { id: "pemandu-wisata", title: "Pemandu Wisata", desc: "Pemandu (bahasa: Prancis, Jepang, Inggris, dll.)" },
          { id: "kuliner", title: "Kuliner", desc: "Kuliner & oleh-oleh" },
          { id: "belanja", title: "Belanja", desc: "UMKM, pasar tradisional & modern" },
          { id: "kerajinan", title: "Kerajinan", desc: "Kerajinan & lokasi (dengan gmaps)" },
          { id: "seni-budaya", title: "Seni Budaya", desc: "Kesenian, upacara adat, warisan budaya" },
          { id: "video-wisata", title: "Video Wisata", desc: "YouTube: Jelajah Bantul", url: "https://www.youtube.com/@jelajahbantul-id" },
          { id: "fasilitas-umum", title: "Fasilitas Umum", desc: "PLN, kantor pemerintah, RS, polisi, SPBU, ATM" },
        ],
      },
    ],
  },

  {
    id: "penanda-keistimewaan",
    title: "Penanda Keistimewaan",
    desc: "Situs & penanda keistimewaan daerah.",
    sub: [
      { id: "makam-kotagede", title: "Makam Kotagede", desc: "Informasi & lokasi", url: "https://makamkotagede.bantulkab.go.id/", icon: "/src/assets/Makam1.png" },
      { id: "makam-imogiri", title: "Makam Imogiri", desc: "Informasi & lokasi", url: "https://makamimogiri.bantulkab.go.id/", icon: "/src/assets/Makam1.png" },
    ],
  },

  {
    id: "kebudayaan",
    title: "Kebudayaan",
    desc: "Situs kebudayaan & event.",
    sub: [{ id: "kebudayaan-site", title: "Kebudayaan Bantul", desc: "Portal kebudayaan", url: "https://kebudayaanbantul.bantulkab.go.id/", icon: "/src/assets/Kebudayaan.png" }]
  },

  {
    id: "sedata-bantul",
    title: "Sedata Bantul",
    desc: "Data & statistik publik.",
    sub: [{ id: "sedata", title: "Sedata", desc: "Portal data Bantul", url: "https://data.bantulkab.go.id/", icon: "/src/assets/Sedata.png" }]    
  },

  {
    id: "gsb-bantul",
    title: "GSB Bantul",
    desc: "GSB Bantul (informasi & layanan).",
    sub: [{ id: "gsb", title: "GSB Bantul", desc: "Portal GSB", url: "https://gsb.bantulkab.go.id/", icon: "/src/assets/GSB.png" }]
  },

  {
    id: "hubungi-kami",
    title: "Hubungi Kami",
    desc: "Kontak & pengaduan.",
    sub: [
      {
        id: "hubungi-guest",
        title: "Hubungi Kami",
        desc: "Form pengaduan (wajib login untuk user penuh).",
        route: "/layanan/publik/HubungiKami/hubungi-kami",
        icon: "/src/assets/HubKami.png",
      },
    ],
  },

  {
    id: "lapor-bantul",
    title: "Lapor Bantul",
    desc: "Layanan pelaporan publik.",
    sub: [{ id: "lapor", title: "Lapor.go.id", desc: "Platform Lapor Nasional", url: "https://www.lapor.go.id/", icon: "/src/assets/LaporBantul1.png" }]
  },
];

export default function PublikIndex() {
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  // buka/tutup accordion
  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    // update hash supaya linkable (tanpa mempush history)
    window.history.replaceState(null, "", `/layanan/publik#${id}`);
  };

  // helper navigate: internal route vs external url
  const handleClick = (item) => {
    if (!item) return;
    if (item.route) {
      navigate(item.route);
      return;
    }
    if (item.url && item.url.trim() !== "" && item.url !== "#") {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.url && item.url.startsWith("/")) {
      navigate(item.url);
    }
  };

  // jump (instant) ke element
  const jumpToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 84; // sesuaikan tinggi navbar
    const top = window.pageYOffset + el.getBoundingClientRect().top - headerOffset;
    window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "auto" });
  };

  // buka berdasarkan hash saat pertama load
  useEffect(() => {
    const raw = (window.location.hash || "").replace("#", "");
    if (!raw) return;
    const found = SERVICES.find((s) => s.id === raw);
    if (found) {
      setOpenId(found.id);
      requestAnimationFrame(() => jumpToId(found.id));
    }
  }, []);

  const isAnyOpen = openId !== null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

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
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 py-12">
        {/* remove visible border (no black line) -> use border-transparent */}
        <div className={`bg-white rounded-xl shadow-xl ${isAnyOpen ? "overflow-visible" : "overflow-hidden"}`}>
          <div className="px-6 py-6 border-b">
            <h2 className="text-lg text-center md:text-md font-semibold text-slate-900">Layanan Publik</h2>
            <p className="text-sm text-center text-slate-500 mt-1">
              Pilih kategori untuk melihat sub-layanan dan akses cepat.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {SERVICES.map((s) => {
              const isOpen = openId === s.id;

              return (
                <section key={s.id} id={s.id} className="bg-white">
                  {/* header bar */}
                  <div className="px-6">
                    <button
                      onClick={() => toggle(s.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between py-4 focus:outline-none"
                    >
                      <div className="text-left">
                        <div className="text-base md:text-lg font-medium text-slate-900">{s.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
                      </div>

                      <ChevronDown
                        size={20}
                        className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* panel */}
                  {isOpen && (
                    <div className="px-6 pb-6 overflow-visible">
                      <div className="pt-4">
                        {/* jika ada sub-layanan: tampilkan grid card */}
                        {s.sub && s.sub.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {s.sub.map((sub) => {
                              // base classes without border (garis hitam dihilangkan)
                              const baseCardClasses =
                                "group flex items-center gap-4 p-4 rounded-lg bg-white transition-transform duration-300";
                              const floatClasses =
                                "transform -translate-y-3 shadow-lg relative z-10 hover:-translate-y-4 hover:shadow-2xl";

                              // clickable internal route
                              if (sub.route) {
                                return (
                                  <div
                                    key={sub.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleClick(sub)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleClick(sub);
                                    }}
                                    className={`${baseCardClasses} ${floatClasses} cursor-pointer`}
                                  >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-md overflow-hidden">
                                      <img
                                        src={sub.icon || DEFAULT_ICON}
                                        alt={sub.title}
                                        className="w-10 h-10 object-contain pointer-events-none"
                                      />
                                    </div>

                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-slate-800">{sub.title}</div>
                                      <div className="text-xs text-slate-500 mt-1">{sub.desc}</div>
                                    </div>
                                  </div>
                                );
                              }

                              // external link
                              return (
                                <a
                                  key={sub.id}
                                  href={sub.url && sub.url.trim() !== "" ? sub.url : "#"}
                                  target={sub.url && sub.url.trim() !== "" ? "_blank" : "_self"}
                                  rel="noreferrer"
                                  className={`${baseCardClasses} ${floatClasses}`}
                                  onClick={(e) => {
                                    if (!sub.url || sub.url.trim() === "" || sub.url === "#") {
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  <div className="w-12 h-12 flex items-center justify-center rounded-md overflow-hidden">
                                    <img
                                      src={sub.icon || DEFAULT_ICON}
                                      alt={sub.title}
                                      className="w-10 h-10 object-contain pointer-events-none"
                                    />
                                  </div>

                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-slate-800">{sub.title}</div>
                                    <div className="text-xs text-slate-500 mt-1">{sub.desc}</div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-sm text-slate-500 italic">Belum ada sub-layanan pada kategori ini.</div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
