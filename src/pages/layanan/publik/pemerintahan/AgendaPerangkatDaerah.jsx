// src/pages/layanan/pemerintahan/AgendaPerangkatDaerah.jsx
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function AgendaPerangkatDaerah() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const dateRef = useRef(null);
  const navigate = useNavigate();

  // sample data with ISO date field for filtering
  const dataDummy = [
    {
      id: 1,
      jam: "08:30 - 09:30",
      dateLabel: "16–21 November 2025",
      dateISO: "2025-11-16",
      opd: "Rumah Sakit Umum Daerah Panembahan Senopati",
      lokasi: "Lapangan Paseban Bantul",
      kegiatan: "Pemeriksaan Dora… (isi seperti contoh kamu)"
    },
    {
      id: 2,
      jam: "07:00 - 09:00",
      dateLabel: "17–21 November 2025",
      dateISO: "2025-11-17",
      opd: "Badan Perencanaan Pembangunan Daerah",
      lokasi: "Ruang Assessment Center BKPSDM",
      kegiatan: "Profiling ASN dalam rangka mendukung percepatan..."
    },
    // tambah data sesuai kebutuhan
  ];

  // hide native date icon (component-scoped)
  const injectedCSS = `
    input[type="date"]::-webkit-calendar-picker-indicator { display: none !important; }
    input[type="date"] { -webkit-appearance: none; appearance: none; -moz-appearance: textfield; }
    select { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
    input[type="date"]::-ms-clear, input[type="date"]::-ms-expand { display: none; }
  `;

  // open native date picker (showPicker or fallback focus)
  const openDatePicker = (ref) => {
    const el = ref && ref.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch (err) {}
    }
    el.focus();
    try { el.click(); } catch (e) {}
  };

  // filtered data based on search and date
  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return dataDummy.filter((r) => {
      // date filter
      if (date) {
        if (!r.dateISO) return false;
        if (r.dateISO !== date) return false;
      }
      if (!q) return true;
      // match opd / lokasi / kegiatan
      return (
        (r.opd || "").toLowerCase().includes(q) ||
        (r.lokasi || "").toLowerCase().includes(q) ||
        (r.kegiatan || "").toLowerCase().includes(q)
      );
    });
  }, [search, date]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{injectedCSS}</style>
      <Navbar />

      {/* HERO */}
      <header className="relative w-full h-36 md:h-54">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
      </header>

      <main className="mx-auto w-full px-4 md:px-6 mt-10 pb-20">
        
        {/* Back button + Title */}
        <div className="relative mb-6 flex items-center justify-center">
        
        {/* Panah kiri di ujung kiri */}
        <button
            onClick={() => navigate(-1)}
            className="absolute left-0 p-2 rounded-md hover:bg-slate-100 active:scale-95 transition"
        >
            <ArrowLeft size={20} className="text-slate-700" />
        </button>

        {/* Judul tetap center */}
        <h1 className="text-md font-semibold text-slate-900">
            Agenda Perangkat Daerah
        </h1>
        </div>

        {/* blue outline box - centered and md sized */}
        <div className="w-full rounded-xl border-2  p-5 bg-white">
          {/* search + date */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Perangkat Daerah / Lokasi / Kegiatan"
              className="flex-1 rounded-md px-4 py-2 border border-slate-300 text-sm shadow-sm focus:outline-none"
            />

            <div className="relative w-full md:w-56">
              <input
                ref={dateRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md px-4 py-2 pr-10 border border-slate-300 text-sm shadow-sm cursor-pointer focus:outline-none"
              />
              {/* clickable svg button aligned on the same line */}
              <button
                type="button"
                onClick={() => openDatePicker(dateRef)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                aria-label="Buka tanggal"
              >
                <Calendar size={18} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* table - fixed layout for even columns */}
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "16%" }} />
                <col style={{ width: "28%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "34%" }} />
              </colgroup>
              <thead>
                <tr className="text-left text-sm font-semibold border-b border-slate-300">
                  <th className="py-3 pl-2">Jam</th>
                  <th className="py-3">Perangkat Daerah</th>
                  <th className="py-3">Lokasi</th>
                  <th className="py-3 pr-2">Kegiatan</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Tidak ada agenda.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="align-top border-b border-slate-200">
                      {/* jam with dateLabel under it */}
                      <td className="py-4 pl-2 align-top text-sm whitespace-normal break-words">
                        <div className="font-medium">{r.jam}</div>
                        {r.dateLabel && <div className="text-xs text-slate-500 mt-2">{r.dateLabel}</div>}
                      </td>

                      <td className="py-4 text-sm whitespace-normal break-words">{r.opd}</td>

                      <td className="py-4 text-sm whitespace-normal break-words">{r.lokasi}</td>

                      <td className="py-4 pr-2 text-sm whitespace-normal break-words">{r.kegiatan}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
