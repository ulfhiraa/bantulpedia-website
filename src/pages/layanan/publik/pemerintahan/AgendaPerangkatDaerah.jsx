// src/pages/layanan/pemerintahan/AgendaPerangkatDaerah.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";

import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

// API
import { getagendaOPD } from "../../../../api/layanan/publik/agendaOPD";

export default function AgendaPerangkatDaerah() {
  const navigate = useNavigate();
  const dateRef = useRef(null);

  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= STYLE FIX (DATE INPUT) =================
  const injectedCSS = `
    input[type="date"]::-webkit-calendar-picker-indicator { display: none !important; }
    input[type="date"] { -webkit-appearance: none; appearance: none; -moz-appearance: textfield; }
    input[type="date"]::-ms-clear,
    input[type="date"]::-ms-expand { display: none; }
  `;

  const openDatePicker = () => {
    const el = dateRef.current;
    if (!el) return;

    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch {}
    }

    el.focus();
    el.click();
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchAgenda = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getagendaOPD();

        const formatted = data.map((item) => ({
          id: item.id,
          jam: `${item.jam_mulai} - ${item.jam_selesai}`,
          opd: item.perangkat_daerah,
          lokasi: item.lokasi,
          kegiatan: item.kegiatan,
          dateISO: item.tanggal_mulai,
          dateLabel: `${item.tanggal_mulai} → ${item.tanggal_selesai}`,
        }));

        setRows(formatted);
      } catch {
        setError("Gagal memuat data agenda.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  // ================= FILTER =================
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((r) => {
      if (date && r.dateISO !== date) return false;
      if (!q) return true;

      return (
        (r.opd || "").toLowerCase().includes(q) ||
        (r.lokasi || "").toLowerCase().includes(q) ||
        (r.kegiatan || "").toLowerCase().includes(q)
      );
    });
  }, [rows, search, date]);

  // ================= RENDER =================
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{injectedCSS}</style>
      <Navbar />

      {/* Banner */}
      <div className="relative h-40 md:h-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
      </div>

      <main className="mx-auto w-full px-4 md:px-6 mt-10 pb-20">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-slate-100 active:scale-95 transition"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} className="text-slate-700" />
          </button>

          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Agenda Perangkat Daerah
          </h1>
        </div>

        {/* Content Box */}
        <div className="w-full rounded-xl border-2 p-5 bg-white">
          {/* Filter */}
          <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
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
              <button
                type="button"
                onClick={openDatePicker}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                aria-label="Pilih tanggal"
              >
                <Calendar size={18} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "16%" }} />
                <col style={{ width: "28%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "34%" }} />
              </colgroup>

              <thead>
                <tr className="border-b border-slate-300 text-left text-sm font-semibold">
                  <th className="py-3 pl-2">Jam</th>
                  <th className="py-3">Perangkat Daerah</th>
                  <th className="py-3">Lokasi</th>
                  <th className="py-3 pr-2">Kegiatan</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-slate-500">
                      Memuat data agenda...
                    </td>
                  </tr>
                )}

                {!loading && error && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-red-500">
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Tidak ada agenda.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  filtered.map((r) => (
                    <tr key={r.id} className="border-b border-slate-200 align-top">
                      <td className="py-4 pl-2 text-sm">
                        <div className="font-medium">{r.jam}</div>
                        {r.dateLabel && (
                          <div className="mt-2 text-xs text-slate-500">
                            {r.dateLabel}
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-sm">{r.opd}</td>
                      <td className="py-4 text-sm">{r.lokasi}</td>
                      <td className="py-4 pr-2 text-sm">{r.kegiatan}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
