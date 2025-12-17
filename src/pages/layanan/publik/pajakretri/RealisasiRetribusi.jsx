// src/pages/layanan/pajakretri/RealisasiRetribusi.jsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
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

/* ================= FORMAT ================= */
function formatIDR(value) {
  if (value == null || isNaN(value)) return "-";
  return "Rp " + Math.round(value).toLocaleString("id-ID");
}

// untuk Y-Axis (biar tidak kepotong)
function formatIDRShort(value) {
  if (value >= 1_000_000_000)
    return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
  if (value >= 1_000_000)
    return `Rp ${(value / 1_000_000).toFixed(1)} jt`;
  if (value >= 1_000)
    return `Rp ${(value / 1_000).toFixed(0)} rb`;
  return `Rp ${value}`;
}

/* ================= WAKTU ================= */
const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Jan","Feb","Mar","Apr","Mei","Jun",
  "Jul","Agu","Sep","Okt","Nov","Des"
];

function genHarian(base) {
  const DAYS_ORDERED = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  return DAYS_ORDERED.map((day) => ({
    label: day,
    value: Math.round(base * (0.6 + Math.random() * 1.4)),
  }));
}


function genBulanan(base) {
  return MONTHS.map((m) => ({
    label: m,
    value: Math.round(base * (0.6 + Math.random() * 1.4)),
  }));
}

function genTahunan(base) {
  const year = new Date().getFullYear();
  return [year - 2, year - 1, year].map((y) => ({
    label: y.toString(),
    value: Math.round(base * (0.6 + Math.random() * 1.4)),
  }));
}

/* ================= TOOLTIP ================= */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white shadow-lg rounded-md p-3 text-sm border">
      <div className="text-slate-500 mb-1">{label}</div>
      <div className="font-semibold text-emerald-600">
        {formatIDR(payload[0].value)}
      </div>
    </div>
  );
}

/* ================= WARNA ICON ================= */
const COLOR_STYLES = {
  emerald: {
    activeBg: "bg-emerald-100",
    activeText: "text-emerald-600",
    idleBg: "bg-emerald-50",
    idleText: "text-emerald-500",
  },
  rose: {
    activeBg: "bg-rose-100",
    activeText: "text-rose-600",
    idleBg: "bg-rose-50",
    idleText: "text-rose-500",
  },
  indigo: {
    activeBg: "bg-indigo-100",
    activeText: "text-indigo-600",
    idleBg: "bg-indigo-50",
    idleText: "text-indigo-500",
  },
  sky: {
    activeBg: "bg-sky-100",
    activeText: "text-sky-600",
    idleBg: "bg-sky-50",
    idleText: "text-sky-500",
  },
};

/* ================= COMPONENT ================= */
export default function RealisasiRetribusi() {
  const categories = [
    {
      key: "PASAR",
      label: "Retribusi Pasar",
      icon: Store,
      color: "emerald",
    },
    {
      key: "PERSAMPAHAN",
      label: "Retribusi Sampah",
      icon: Trash2,
      color: "rose",
    },
    {
      key: "LAB",
      label: "Retribusi Laboratorium",
      icon: FlaskConical,
      color: "indigo",
    },
    {
      key: "UJIAIR",
      label: "Retribusi Pengujian Air",
      icon: Droplets,
      color: "sky",
    },
  ];

  const [activeTab, setActiveTab] = useState("PASAR");
  const [granularity, setGranularity] = useState("Harian");

  const baseByTab = {
    PASAR: 8_000_000,
    PERSAMPAHAN: 2_000_000,
    LAB: 3_000_000,
    UJIAIR: 1_000_000,
  };

  const data = useMemo(() => {
    const base = baseByTab[activeTab];
    if (granularity === "Harian") return genHarian(base);
    if (granularity === "Bulanan") return genBulanan(base * 10);
    return genTahunan(base * 50);
  }, [activeTab, granularity]);

  const total = data.reduce((s, d) => s + d.value, 0);
  const avg = Math.round(total / data.length);

  const activeCategory = categories.find((c) => c.key === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      <main className="container mx-auto px-6 py-10">
        {/* BACK */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-md border"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        {/* PILIH KATEGORI (ICON BERWARNA) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {categories.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            const style = COLOR_STYLES[item.color];

            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`rounded-2xl bg-white p-6 text-center transition
                  ${
                    active
                      ? "border-2 border-emerald-500 shadow-lg"
                      : "border border-slate-200 hover:shadow-md"
                  }`}
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full
                    ${active ? style.activeBg : style.idleBg}
                    ${active ? style.activeText : style.idleText}
                  `}
                >
                  <Icon size={30} strokeWidth={2.2} />
                </div>

                <div
                  className={`text-sm font-semibold ${
                    active ? "text-slate-800" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* CHART */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                {activeCategory.label}
              </h3>
              <p className="text-sm text-slate-500">
                Performa — {granularity}
              </p>
            </div>

            <div className="flex gap-2">
              {["Harian", "Bulanan", "Tahunan"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGranularity(g)}
                  className={`px-4 py-2 rounded-md text-sm
                    ${
                      granularity === g
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">Total</div>
              <div className="font-semibold">{formatIDR(total)}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">Rata-rata</div>
              <div className="font-semibold text-emerald-600">
                {formatIDR(avg)}
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid stroke="#eee" vertical={false} />
                <XAxis dataKey="label" />
                <YAxis
                  tickFormatter={formatIDRShort}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area dataKey="value" fill="#d1fae5" stroke="none" />
                <Line
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
