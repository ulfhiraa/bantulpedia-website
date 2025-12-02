// src/pages/layanan/pajakretri/RealisasiRetribusi.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
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
import { ChevronLeft } from "lucide-react";

/* Format angka ke Rupiah */
function formatIDR(value) {
  if (value == null || isNaN(value)) return "-";
  const v = Math.round(value);
  return "Rp " + v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* Helper generate data (mock) */
function genDaily(days = 30, base = 2000000) {
  const arr = [];
  const baseDate = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - i);
    const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    const spikes = [6, 16, 28];
    const mul = spikes.includes(i) ? (4 + Math.random() * 2) : (0.65 + Math.random() * 0.85);
    arr.push({ label, value: Math.round(base * mul), iso: d.toISOString().slice(0, 10) });
  }
  return arr;
}
function genMonthly(months = 12, base = 40000000) {
  const arr = [];
  const baseDate = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth() - i, 1);
    const label = d.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
    const mul = 0.7 + Math.random() * 1.4;
    arr.push({ label, value: Math.round(base * mul), iso: d.toISOString().slice(0, 10) });
  }
  return arr;
}
function genYearly(years = 5, base = 800000000) {
  const arr = [];
  const baseYear = new Date().getFullYear();
  for (let i = years - 1; i >= 0; i--) {
    const y = baseYear - i;
    const label = String(y);
    const mul = 0.7 + Math.random() * 1.4;
    arr.push({ label, value: Math.round(base * mul), iso: `${y}-01-01` });
  }
  return arr;
}

/* --- Custom Tooltip (modern card style) --- */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="shadow-lg rounded-md bg-white p-3 border border-slate-100 text-sm">
      <div className="text-xs text-slate-400 mb-1">Periode</div>
      <div className="font-semibold text-slate-900 mb-2">{label}</div>
      <div className="text-xs text-slate-400">Nilai</div>
      <div className="text-emerald-700 font-semibold">{formatIDR(data.value)}</div>
    </div>
  );
}

export default function RealisasiRetribusi() {
  const tabs = ["PERSAMPAHAN", "PASAR", "LAB", "UJIAIR"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [granularity, setGranularity] = useState("Harian");

  const [showDownload, setShowDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const chartWrapperRef = useRef(null);

  const baseByTab = {
    PERSAMPAHAN: { daily: 2000000, monthly: 40000000, yearly: 480000000 },
    PASAR: { daily: 8000000, monthly: 240000000, yearly: 3000000000 },
    LAB: { daily: 3000000, monthly: 90000000, yearly: 1100000000 },
    UJIAIR: { daily: 1000000, monthly: 30000000, yearly: 350000000 },
  };

  const data = useMemo(() => {
    const base = baseByTab[activeTab] || baseByTab.PERSAMPAHAN;
    if (granularity === "Harian") return genDaily(30, base.daily);
    if (granularity === "Bulanan") return genMonthly(12, base.monthly);
    return genYearly(5, base.yearly);
  }, [activeTab, granularity]);

  const total = useMemo(() => (data ? data.reduce((s, d) => s + (d.value || 0), 0) : 0), [data]);
  const avg = useMemo(() => (data && data.length ? Math.round(total / data.length) : 0), [total, data]);

  const yTickFormatter = (v) => formatIDR(v);

  /* ----------------- DOWNLOAD HELPERS (fixed) ----------------- */

  const findChartSVG = () => {
    if (!chartWrapperRef.current) return null;
    // Recharts renders nested SVGs; pick the first visible svg
    const svgs = chartWrapperRef.current.querySelectorAll("svg");
    if (!svgs || svgs.length === 0) return null;
    // pick the last svg (chart svg usually is the innermost)
    return svgs[svgs.length - 1];
  };

  const serializeSVGWithTitle = (svgElement, titleText) => {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const XLINK_NS = "http://www.w3.org/1999/xlink";
    const headerHeight = 46;

    const clone = svgElement.cloneNode(true);

    if (!clone.getAttribute("xmlns")) clone.setAttribute("xmlns", SVG_NS);
    if (!clone.getAttribute("xmlns:xlink")) clone.setAttribute("xmlns:xlink", XLINK_NS);

    // try to get computed size; fallback to defaults
    const bbox = svgElement.getBoundingClientRect();
    let width = Math.round(bbox.width || parseFloat(svgElement.getAttribute("width")) || 1200);
    let height = Math.round(bbox.height || parseFloat(svgElement.getAttribute("height")) || 600);

    // guard minimal sizes
    if (width < 100) width = 1200;
    if (height < 80) height = 600;

    // ensure numeric viewBox exists
    clone.setAttribute("width", width);
    clone.setAttribute("height", height + headerHeight);
    clone.setAttribute("viewBox", `0 0 ${width} ${height + headerHeight}`);

    // prepend white header rectangle + title
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", String(width));
    rect.setAttribute("height", String(headerHeight));
    rect.setAttribute("fill", "#ffffff");
    rect.setAttribute("opacity", "0.98");

    const text = document.createElementNS(SVG_NS, "text");
    text.setAttribute("x", String(width / 2));
    text.setAttribute("y", String(Math.round(headerHeight / 2 + 6)));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-family", "Segoe UI, Roboto, Helvetica, Arial, sans-serif");
    text.setAttribute("fill", "#0f172a");
    text.setAttribute("font-weight", "700");
    text.textContent = titleText;

    const g = document.createElementNS(SVG_NS, "g");
    g.appendChild(rect);
    g.appendChild(text);
    clone.insertBefore(g, clone.firstChild);

    return new XMLSerializer().serializeToString(clone);
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const handleDownloadSVG = async () => {
    try {
      setShowDownload(false);
      setDownloading(true);

      const svg = findChartSVG();
      if (!svg) throw new Error("SVG grafik tidak ditemukan.");
      const title = `${activeTab} — ${granularity} • ${new Date().toLocaleString()}`;
      const svgString = serializeSVGWithTitle(svg, title);
      const filename = `realisasi-${activeTab.toLowerCase()}-${granularity.toLowerCase()}.svg`;
      downloadFile(svgString, filename, "image/svg+xml;charset=utf-8");
    } catch (err) {
      console.error(err);
      alert("Gagal men-download SVG: " + (err.message || err));
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPNG = async () => {
    try {
      setShowDownload(false);
      setDownloading(true);

      const svg = findChartSVG();
      if (!svg) throw new Error("SVG grafik tidak ditemukan.");
      const title = `${activeTab} — ${granularity} • ${new Date().toLocaleString()}`;
      const svgString = serializeSVGWithTitle(svg, title);

      // create blob + url
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          // use devicePixelRatio for crispness
          const ratio = window.devicePixelRatio || 1;
          const width = img.naturalWidth || img.width || 1200;
          const height = img.naturalHeight || img.height || 700;
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(width * ratio);
          canvas.height = Math.round(height * ratio);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          const ctx = canvas.getContext("2d");
          if (ratio !== 1) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

          // white background
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blobImg) => {
            if (!blobImg) {
              alert("Gagal membuat PNG dari canvas.");
              setDownloading(false);
              return;
            }
            const filename = `realisasi-${activeTab.toLowerCase()}-${granularity.toLowerCase()}.png`;
            const url2 = URL.createObjectURL(blobImg);
            const a = document.createElement("a");
            a.href = url2;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url2), 500);
            setDownloading(false);
          }, "image/png", 0.95);
        } catch (err) {
          console.error(err);
          alert("Gagal mengkonversi ke PNG.");
          setDownloading(false);
        } finally {
          URL.revokeObjectURL(url);
        }
      };

      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        setDownloading(false);
        console.error("img error", e);
        alert("Gagal memuat SVG untuk konversi PNG.");
      };

      img.src = url;
    } catch (err) {
      console.error(err);
      alert("Gagal membuat PNG: " + (err.message || err));
      setDownloading(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!chartWrapperRef.current) return;
      const menu = chartWrapperRef.current.querySelector(".download-menu");
      if (menu && !menu.contains(e.target)) {
        setShowDownload(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div
        className="h-40 md:h-56 bg-cover bg-center rounded-b-lg"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <main className="container mx-auto px-6 lg:px-12 py-10">
        {/* back button outside the card */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
            Kembali
          </button>
        </div>

        <div className="mb-6">
          <div className="rounded-xl bg-white shadow-sm p-2">
            <div className="flex gap-4">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 py-4 rounded-md text-sm font-semibold tracking-wide transition
                    ${activeTab === t ? "bg-white text-slate-900 shadow-inner border-b-4 border-indigo-500" : "text-slate-500"}
                  `}
                >
                  <div className="uppercase">{t}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4 mb-4 flex-col md:flex-row">
            <div>
              <h3 className="text-lg font-semibold">Realisasi Pajak & Retribusi</h3>
              <div className="text-sm text-slate-500">Performa — {granularity}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-3 mr-3">
                <div className="bg-gradient-to-br from-white to-slate-50 p-3 rounded-lg shadow-sm border border-slate-100 min-w-[120px]">
                  <div className="text-xs text-slate-400">Total</div>
                  <div className="font-semibold text-slate-900">{formatIDR(total)}</div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 p-3 rounded-lg shadow-sm border border-slate-100 min-w-[120px]">
                  <div className="text-xs text-slate-400">Rata-rata</div>
                  <div className="font-semibold text-emerald-700">{formatIDR(avg)}</div>
                </div>
              </div>

              <div className="flex gap-2 bg-slate-50 rounded-md p-1">
                {["Harian", "Bulanan", "Tahunan"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGranularity(g)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${granularity === g ? "bg-white text-slate-900 shadow" : "text-slate-600"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="relative download-menu">
                <button
                  onClick={() => setShowDownload((s) => !s)}
                  disabled={downloading}
                  className="px-3 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 disabled:opacity-60 ml-3"
                >
                  ⬇ Download
                </button>

                {showDownload && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                    <button onClick={handleDownloadPNG} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100">Download PNG</button>
                    <button onClick={handleDownloadSVG} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 border-t">Download SVG</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-[460px] mt-4" ref={chartWrapperRef}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 24, left: 12, bottom: granularity === "Harian" ? 70 : 36 }}
              >
                <CartesianGrid stroke="#f1f5f9" vertical={false} />

                <defs>
                  <linearGradient id="gradLine" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.03} />
                  </linearGradient>

                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0369a1" floodOpacity="0.08" />
                  </filter>
                </defs>

                <XAxis
                  dataKey="label"
                  angle={granularity === "Harian" ? -45 : 0}
                  textAnchor={granularity === "Harian" ? "end" : "middle"}
                  interval={0}
                  height={granularity === "Harian" ? 60 : 40}
                  tick={{ fontSize: 12, fill: "#475569" }}
                />

                <YAxis
                  tickFormatter={yTickFormatter}
                  tick={{ fontSize: 12, fill: "#475569" }}
                  width={110}
                />

                <Tooltip content={<CustomTooltip />} />

                <Legend verticalAlign="top" align="right" height={36} />

                <Area isAnimationActive={true} type="monotone" dataKey="value" stroke="none" fill="url(#gradLine)" />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#shadow)"
                  isAnimationActive={true}
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
