// src/pages/layanan/pajakretri/RealisasiRetribusi.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from "recharts";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import {
  ChevronLeft,
  Store,
  Trash2,
  FlaskConical,
  Droplets,
} from "lucide-react";

import { getRealisasiRetri } from "../../../../api/layanan/publik/realisasi-retri";

/* ================= UTIL ================= */
const formatIDR = (v) =>
  "Rp " + Math.round(v || 0).toLocaleString("id-ID");

const formatIDRShort = (v) => {
  if (v >= 1e9) return `Rp ${(v / 1e9).toFixed(1)} M`;
  if (v >= 1e6) return `Rp ${(v / 1e6).toFixed(1)} jt`;
  if (v >= 1e3) return `Rp ${(v / 1e3).toFixed(0)} rb`;
  return `Rp ${v}`;
};

/* ================= MAP ================= */
const tabKategoriMap = {
  PASAR: "Retribusi Pasar",
  PERSAMPAHAN: "Persampahan",
  LAB: "Laboratorium",
  UJIAIR: "Uji Air",
};

/* ================= WARNA ================= */
const COLOR_STYLES = {
  emerald: ["bg-emerald-100", "text-emerald-600"],
  rose: ["bg-rose-100", "text-rose-600"],
  indigo: ["bg-indigo-100", "text-indigo-600"],
  sky: ["bg-sky-100", "text-sky-600"],
};

export default function RealisasiRetribusi() {
  const categories = [
    { key: "PASAR", label: "Retribusi Pasar", icon: Store, color: "emerald" },
    { key: "PERSAMPAHAN", label: "Retribusi Sampah", icon: Trash2, color: "rose" },
    { key: "LAB", label: "Laboratorium", icon: FlaskConical, color: "indigo" },
    { key: "UJIAIR", label: "Uji Air", icon: Droplets, color: "sky" },
  ];

  const [activeTab, setActiveTab] = useState("PASAR");
  const [granularity, setGranularity] = useState("Harian");
  const [rawData, setRawData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errorData, setErrorData] = useState("");

  const chartWrapperRef = useRef(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const res = await getRealisasiRetri();
        setRawData(Array.isArray(res) ? res : []);
      } catch {
        setErrorData("Gagal memuat data.");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  /* ================= DATA ================= */
  const data = useMemo(() => {
    const item = rawData.find(
      (r) => r.kategori === tabKategoriMap[activeTab]
    );
    if (!item) return [];

    if (granularity === "Harian")
      return (item.harian || []).map((d) => ({
        label: new Date(d.tanggal).toLocaleDateString("id-ID", {
          weekday: "short",
        }),
        value: d.jumlah,
      }));

    if (granularity === "Bulanan")
      return (item.bulanan || []).map((d) => ({
        label: d.bulan,
        value: d.jumlah,
      }));

    return (item.tahunan || []).map((d) => ({
      label: String(d.tahun),
      value: d.jumlah,
    }));
  }, [rawData, activeTab, granularity]);

  const total = data.reduce((s, d) => s + d.value, 0);
  const avg = data.length ? Math.round(total / data.length) : 0;

  const activeCategory = categories.find((c) => c.key === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* HERO */}
      <div className="h-48 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-emerald-900/60" />
      </div>

      <main className="container mx-auto px-6 py-10">
        <button
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 bg-white border px-4 py-2 rounded"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        {/* KATEGORI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {categories.map((c) => {
            const Icon = c.icon;
            const [bg, text] = COLOR_STYLES[c.color];
            const active = c.key === activeTab;

            return (
              <button
                key={c.key}
                onClick={() => setActiveTab(c.key)}
                className={`rounded-xl p-6 bg-white border transition ${
                  active ? "ring-2 ring-emerald-500 shadow" : "hover:shadow"
                }`}
              >
                <div
                  className={`mx-auto mb-3 h-14 w-14 flex items-center justify-center rounded-full ${bg} ${text}`}
                >
                  <Icon size={28} />
                </div>
                <div className="text-sm font-semibold">{c.label}</div>
              </button>
            );
          })}
        </div>

        {/* CHART */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {activeCategory.label} — {granularity}
          </h3>

          <div className="flex gap-2 mb-4">
            {["Harian", "Bulanan", "Tahunan"].map((g) => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={`px-3 py-2 rounded ${
                  granularity === g
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" vertical={false} />
              <XAxis dataKey="label" />
              <YAxis tickFormatter={formatIDRShort} width={90} />
              <Tooltip formatter={formatIDR} />
              <Legend />
              <Area dataKey="value" fill="#d1fae5" stroke="none" />
              <Line dataKey="value" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          {loadingData && (
            <div className="mt-4 text-sm text-slate-500">Memuat data…</div>
          )}
          {errorData && (
            <div className="mt-4 text-sm text-red-500">{errorData}</div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
