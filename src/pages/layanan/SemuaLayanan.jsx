// src/pages/layanan/SemuaLayanan.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowLeft } from "lucide-react";

// icons
// Informasi Publik
import pengumumanIcon from "../../assets/Pengumuman.png";
import beritaIcon from "../../assets/Berita.png";
import cctvIcon from "../../assets/cctv.png";
import wifiIcon from "../../assets/Wi-Fi.png";
import fotoIcon from "../../assets/GaleriFoto.png";
import videoIcon from "../../assets/GaleriVideo.png";
import eventsIcon from "../../assets/Events.png";
import ilmIcon from "../../assets/ILM.png";

// Layanan Publik
import dukcapilIcon from "../../assets/dukcapil.png";
import bantulPinterIcon from "../../assets/bantulpinter.png";
import evossIcon from "../../assets/evoss.png";
import pisaIcon from "../../assets/pisa.png";
import stuntingIcon from "../../assets/stunting.png";
import rsudIcon from "../../assets/pasienrsud.png";
import bedIcon from "../../assets/bedrs.png";
import agendaIcon from "../../assets/agenda.png";
import sinomanIcon from "../../assets/sinoman.png";
import csrIcon from "../../assets/csr.png";
import sipdIcon from "../../assets/sipd.png";
import sirupIcon from "../../assets/sirup.png";
import asnIcon from "../../assets/sapaasn.png";
import lpseIcon from "../../assets/lpse.png";
import tamuIcon from "../../assets/bukutamu.png";
import reservasiIcon from "../../assets/reservasi.png";
import reservasi1Icon from "../../assets/reservasi1.png";
import ipkdIcon from "../../assets/ipkd.png";
import infosidangIcon from "../../assets/infopekara.png";
import jdihIcon from "../../assets/jdih.png";
import ossIcon from "../../assets/oss.png";
import lantipIcon from "../../assets/lantip.png";
import pajakdaIcon from "../../assets/pajakda.png";
import tagihanIcon from "../../assets/cektagihan.png";
import sipentholIcon from "../../assets/sipentol.png";
import lapakIcon from "../../assets/lapakbantul.png";
import retriIcon from "../../assets/retribusi.png";
import bahanIcon from "../../assets/InfoBahanPokok.png";
import mapanIcon from "../../assets/BantulMapan.png";
import marketIcon from "../../assets/Marketplace.png";
import wisataIcon from "../../assets/JelajahBantul.png";
import makamIcon from "../../assets/Makam1.png";
import budayaIcon from "../../assets/Kebudayaan.png";
import sedataIcon from "../../assets/Sedata.png";
import gsbIcon from "../../assets/GSB.png";
import hubungiIcon from "../../assets/HubKami.png";
import laporIcon from "../../assets/LaporBantul1.png";

// Admin Pemerintahan
import surbanIcon from "../../assets/surban.png";
import presensiIcon from "../../assets/presensi.png";
import ekinerjaIcon from "../../assets/ekinerja.png";

import bgAtas from "../../assets/bg-bantul-atas.jpg";
import bgBawah from "../../assets/bg-bantul-bawah.jpg";

// ========== DATA ==========
const categoryData = [
  {
    id: "informasi-publik",
    title: "Informasi Publik",
    items: [
      { title: "Pengumuman", icon: pengumumanIcon, route: "/layanan/informasi/pengumuman" },
      { title: "Berita", icon: beritaIcon, route: "/layanan/informasi/berita" },
      { title: "CCTV", icon: cctvIcon, route: "/layanan/informasi/cctv" },
      { title: "Titik Wifi", icon: wifiIcon, route: "/layanan/informasi/wifi" },
      { title: "Galeri Foto", icon: fotoIcon, route: "/layanan/informasi/galeri-foto" },
      { title: "Galeri Video", icon: videoIcon, route: "/layanan/informasi/galeri-video" },
      { title: "Bantul Events", icon: eventsIcon, route: "/layanan/informasi/events" },
      { title: "ILM", icon: ilmIcon, route: "/layanan/informasi/ilm" },
    ],
  },

  {
    id: "layanan-publik",
    title: "Layanan Publik",
    items: [
      { title: "Dukcapil Smart", icon: dukcapilIcon, route: "/layanan/publik/kependudukan/dukcapil-smart" },

      { title: "Bantul Pinter", icon: bantulPinterIcon, url: "https://perpusda.bantulkab.go.id/opac" },
      { title: "EVOSS", icon: evossIcon, url: "https://evoss.bantulkab.go.id/" },
      { title: "PISA", icon: pisaIcon, url: "https://pisa.bantulkab.go.id/" },

      { title: "Dashboard Stunting", icon: stuntingIcon, route: "/layanan/publik/kesehatan/statusgizi" },
      { title: "Pendaftaran RSUD", icon: rsudIcon, route: "/layanan/publik/kesehatan/pendaftaran-RSUD" },
      { title: "Info Bed RS", icon: bedIcon, url: "https://rsudps.bantulkab.go.id/hal/info-bed" },

      { title: "Agenda Perangkat Daerah", icon: agendaIcon, route: "/layanan/publik/pemerintahan/agenda-perangkat-daerah" },
      { title: "SINOMAN", icon: sinomanIcon, url: "https://sinoman.bantulkab.go.id/" },
      { title: "CSR", icon: csrIcon, url: "https://csr.bantulkab.go.id/" },
      { title: "SIPD", icon: sipdIcon, url: "https://sipd.kemendagri.go.id/landing" },
      { title: "SIRUP", icon: sirupIcon, url: "https://sirup.lkpp.go.id/sirup/rekap/klpd/D68" },
      { title: "SAPA ASN", icon: asnIcon, url: "https://asn.bantulkab.go.id/" },
      { title: "LPSE", icon: lpseIcon, url: "https://spse.inaproc.id/bantulkab" },
      { title: "Reservasi Kunjungan", icon: reservasiIcon, route: "/layanan/publik/pemerintahan/reservasi-kunjungan" },
      { title: "Buku Tamu", icon: tamuIcon, route: "/layanan/publik/pemerintahan/buku-tamu" },
      { title: "Reservasi Ruangan", icon: reservasi1Icon, route: "#" },
      { title: "IPKD", icon: ipkdIcon, route: "/layanan/publik/pemerintahan/ipkd" },

      { title: "JDIH Bantul", icon: jdihIcon, url: "https://jdih.bantulkab.go.id/" },
      { title: "JDIH DPRD", icon: jdihIcon, url: "https://jdih-dprd.bantulkab.go.id/" },
      { title: "SIPP-PN Bantul", icon: infosidangIcon, url: "https://sipp.pn-bantul.go.id/" },

      { title: "OSS", icon: ossIcon, url: "https://oss.go.id/id" },
      { title: "Lantip", icon: lantipIcon, url: "https://jdih.bantulkab.go.id/" },

      { title: "PAJAKDA", icon: pajakdaIcon, url: "https://pajakda.bantulkab.go.id/apps/public/index" },
      { title: "Pengecekan Tagihan", icon: tagihanIcon, route: "/layanan/publik/pajakretri/cek-tagihan" },
      { title: "SiPenthol", icon: sipentholIcon, route: "/layanan/publik/pajakretri/sipenthol" },
      { title: "Lapak Bantul", icon: lapakIcon, url: "https://play.google.com/store/apps/details?id=com.lapakbantul&hl=id" },
      { title: "Jelajah Bantul", icon: wisataIcon, route: "/layanan/publik/Pariwisata/jelajah-bantul" },

      { title: "Realisasi Retribusi", icon: retriIcon, route: "/layanan/publik/pajakretri/realisasi-retribusi" },

      { title: "Info Bahan Pokok", icon: bahanIcon, route: "/layanan/publik/perdagangan/info-bahan-pokok" },
      { title: "Bantul Mapan", icon: mapanIcon, url: "https://bantulmapan.bantulkab.go.id/" },
      { title: "Marketplace", icon: marketIcon, url: "https://bos.bantulkab.go.id/id" },

      { title: "Makam Kotagede", icon: makamIcon, url: "https://makamkotagede.bantulkab.go.id/" },
      { title: "Makam Imogiri", icon: makamIcon, url: "https://makamimogiri.bantulkab.go.id/" },

      { title: "Kebudayaan", icon: budayaIcon, url: "https://kebudayaanbantul.bantulkab.go.id/" },
      { title: "SEDATA", icon: sedataIcon, url: "https://data.bantulkab.go.id/" },
      { title: "GSB Bantul", icon: gsbIcon, url: "https://gsb.bantulkab.go.id/" },
      { title: "Hubungi Kami", icon: hubungiIcon, route: "/layanan/publik/HubungiKami/hubungi-kami" },
      { title: "Lapor Bantul", icon: laporIcon, url: "https://www.lapor.go.id/" },
    ],
  },

  {
    id: "administrasi-pemerintahan",
    title: "Administrasi Pemerintahan",
    items: [
      { title: "SURBAN", icon: surbanIcon, url: "https://esurat.bantulkab.go.id/login" },
      { title: "Presensi Bantul", icon: presensiIcon, url: "https://play.google.com/store/apps/details?id=dmi.presensibantul&hl=id&pli=1" },
      { title: "eKinerja", icon: ekinerjaIcon, url: "https://kinerja.bkn.go.id/" },
    ],
  },
];

// ========== COMPONENT ==========
export default function SemuaLayanan() {
  const navigate = useNavigate();

  const renderItem = (item) => {
    const Wrapper = item.url ? "a" : Link;
    const props = item.url
      ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
      : { to: item.route ?? "#" };

    return (
      <Wrapper
        {...props}
        className="group flex flex-col items-center gap-2 p-4 rounded-xl
        bg-white/35 backdrop-blur-xl border border-white/40 shadow-lg
        hover:bg-white/45 hover:scale-[1.05] transition text-center text-white w-full max-w-[170px]"
      >
        <div className="w-16 h-16 flex items-center justify-center">
          <img src={item.icon} alt={item.title} className="w-18 h-13 object-contain" />
        </div>

        <p className="text-sm font-medium group-hover:text-sky-200">
          {item.title}
        </p>
      </Wrapper>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* MAIN PAKAI BACKGROUND 2 FOTO */}
      <main className="flex-1">
        {/* wrapper khusus background */}
        <div className="relative">
          {/* layer background: 2 foto digabung */}
          <div
            className="absolute inset-0 -z-20 brightness-120"
            style={{
              backgroundImage: `url(${bgAtas}), url(${bgBawah})`,
              backgroundSize: "100% 50%, 100% 50%",      // atas 1/2, bawah 1/2
              backgroundPosition: "top center, bottom center",
              backgroundRepeat: "no-repeat, no-repeat",
            }}
          />

          {/* overlay gelap supaya ikon/tulisan kebaca */}
          <div className="absolute inset-0 -z-10 bg-black/80" />

          {/* isi konten layanan */}
          <div className="relative max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="relative mb-10 flex items-center justify-center">
              <button
                onClick={() => navigate(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-white"
              >
                <ArrowLeft size={22} />
              </button>

              <h1 className="text-3xl font-semibold text-white">
                Semua Layanan
              </h1>
            </div>

            {/* Category section */}
            <div className="space-y-12">
              {categoryData.map((cat) => {
                const total = cat.items.length;

                return (
                  <section key={cat.id}>
                    <h2 className="text-2xl font-semibold mb-6 text-center text-white drop-shadow-md">
                      {cat.title}
                    </h2>

                    {cat.id === "informasi-publik" && (
                      <div className="flex flex-col items-center gap-8">
                        <div className="grid grid-cols-5 gap-7">
                          {cat.items.slice(0, 5).map(renderItem)}
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                          {cat.items.slice(5).map(renderItem)}
                        </div>
                      </div>
                    )}

                    {cat.id === "layanan-publik" && (
                      <div className="flex flex-col items-center gap-10">
                        <div className="grid grid-cols-6 gap-7">
                          {cat.items.slice(0, total - 3).map(renderItem)}
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                          {cat.items.slice(total - 3).map(renderItem)}
                        </div>
                      </div>
                    )}

                    {cat.id === "administrasi-pemerintahan" && (
                      <div className="grid grid-cols-3 gap-10 mx-auto w-max">
                        {cat.items.map(renderItem)}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </main>


      {/* Footer TIDAK IKUT BLUR / OVERLAY */}
      <Footer />
    </div>
  );
}
