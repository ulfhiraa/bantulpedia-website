// src/pages/layanan/kesehatan/StatusGiziPage.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";
import logoKab from "../../../../assets/bantul.png";
import { ChevronDown, ArrowDown, ArrowUp, Search, Check, ArrowLeft } from "lucide-react";

export default function StatusGiziPage() {
  const navigate = useNavigate();
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("Februari");

  // --- STATE DATA ---
  const [regionType, setRegionType] = useState("Kapanewon");

  // --- STATE MULTI-SELECT FILTER ---
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // --- STATE TOGGLE VIEW ---
  const [activeViewTotal, setActiveViewTotal] = useState("total");
  const [activeViewGender, setActiveViewGender] = useState("total");
  const [activeProblemMetric, setActiveProblemMetric] = useState("total");
  const [selectedProblem, setSelectedProblem] = useState("stunting");

  const YEARS = ["2025", "2024", "2023"];
  const MONTHS = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  // --- DATA CHART MENTAH ---
  const chartDataRaw = [
    { region: "Srandakan", total: 185, male: 151, female: 34, prev: 15.25 },
    { region: "Sanden", total: 98, male: 54, female: 44, prev: 8.70 },
    { region: "Kretek", total: 125, male: 68, female: 57, prev: 10.36 },
    { region: "Pundong", total: 206, male: 123, female: 83, prev: 12.68 },
    { region: "Bambanglipuro", total: 112, male: 59, female: 53, prev: 6.80 },
    { region: "Pandak", total: 189, male: 95, female: 94, prev: 8.02 },
    { region: "Pajangan", total: 215, male: 125, female: 90, prev: 10.63 },
    { region: "Bantul", total: 226, male: 121, female: 105, prev: 8.58 },
    { region: "Jetis", total: 294, male: 160, female: 134, prev: 10.91 },
    { region: "Imogiri", total: 384, male: 204, female: 180, prev: 13.52 },
    { region: "Dlingo", total: 92, male: 62, female: 30, prev: 5.13 },
    { region: "Banguntapan", total: 284, male: 158, female: 126, prev: 5.06 },
    { region: "Pleret", total: 139, male: 70, female: 69, prev: 9.40 },
    { region: "Piyungan", total: 204, male: 119, female: 85, prev: 7.87 },
    { region: "Sewon", total: 271, male: 143, female: 128, prev: 6.88 },
    { region: "Kasihan", total: 256, male: 157, female: 99, prev: 5.74 },
    { region: "Sedayu", total: 157, male: 87, female: 70, prev: 6.89 },
  ];

  const allRegionNames = chartDataRaw.map(d => d.region);

  useEffect(() => {
    setSelectedRegions(allRegionNames);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMultiSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const processedData = useMemo(() => {
    return chartDataRaw.map(d => {
      let factor = 1;
      if (selectedProblem === "wasting") factor = 0.6;
      if (selectedProblem === "underweight") factor = 1.2;

      const adjTotal = Math.floor(d.total * factor);
      const adjMale = Math.floor(d.male * factor);
      const adjFemale = Math.floor(d.female * factor);
      const adjPrev = parseFloat((d.prev * (factor === 1 ? 1 : factor === 0.6 ? 0.8 : 1.1)).toFixed(2));

      return {
        ...d,
        total: adjTotal,
        male: adjMale,
        female: adjFemale,
        prev: adjPrev,
        measured: Math.floor(adjTotal * 0.95),
        measuredMale: Math.floor(adjMale * 0.95),
        measuredFemale: Math.floor(adjFemale * 0.95)
      };
    });
  }, [selectedProblem]);

  const filteredData = useMemo(() => {
    return processedData.filter(item => selectedRegions.includes(item.region));
  }, [selectedRegions, processedData]);

  const toggleRegion = (regionName) => {
    if (selectedRegions.includes(regionName)) {
      if (selectedRegions.length > 1) {
        setSelectedRegions(selectedRegions.filter(r => r !== regionName));
      }
    } else {
      setSelectedRegions([...selectedRegions, regionName]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRegions.length === allRegionNames.length) {
      setSelectedRegions([]);
    } else {
      setSelectedRegions(allRegionNames);
    }
  };

  const filteredOptions = allRegionNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateMax = (data, key) => Math.ceil(Math.max(...data.map(d => d[key])) * 1.2) || 100;
  const maxTotal = calculateMax(processedData, 'total');
  const maxMeasured = calculateMax(processedData, 'measured');
  const maxGenderTotal = Math.ceil(Math.max(...processedData.map(d => Math.max(d.male, d.female))) * 1.2) || 100;
  const maxGenderMeasured = Math.ceil(Math.max(...processedData.map(d => Math.max(d.measuredMale, d.measuredFemale))) * 1.2) || 100;
  const maxProblemPrev = calculateMax(processedData, 'prev');

  const currentMaxTotal = activeViewTotal === 'total' ? maxTotal : maxMeasured;
  const currentMaxGender = activeViewGender === 'total' ? maxGenderTotal : maxGenderMeasured;

  let currentMaxProblem = maxTotal;
  if (activeProblemMetric === 'prev') currentMaxProblem = maxProblemPrev;
  if (activeProblemMetric === 'gender') currentMaxProblem = maxGenderTotal;

  const metrics = [
    {
      key: "stunting", title: "Balita Stunting", total: "3.433", male: "1.946", female: "1.487", prevalence: "8,10%", trend: "down", colorFrom: "from-teal-600", colorTo: "to-teal-800", icon: "📏", definitionTitle: "STUNTING", definition: "Kurang gizi kronis, asupan kurang lama. Angka: [Pendek] + [Sangat Pendek]"
    },
    {
      key: "wasting", title: "Balita Wasting", total: "2.396", male: "1.438", female: "958", prevalence: "5,77%", trend: "up", colorFrom: "from-cyan-600", colorTo: "to-cyan-800", icon: "⚖️", definitionTitle: "WASTING", definition: "Kekurangan gizi akut, berat rendah dibanding tinggi. Angka: [Gizi Kurang] + [Gizi Buruk]"
    },
    {
      key: "underweight", title: "Balita Underweight", total: "4.962", male: "2.764", female: "2.198", prevalence: "11,95%", trend: "down", colorFrom: "from-sky-600", colorTo: "to-sky-800", icon: "🩺", definitionTitle: "UNDERWEIGHT", definition: "Berat badan di bawah rata-rata usia. Angka: [Berat Kurang] + [Sangat Kurang]"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION - image only (no text overlay) */}
      <div className="relative h-64 md:h-72 lg:h-70 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-black/25" /> {/* slight darkening if needed */}
      </div>

      {/* MAIN CONTAINER - note: removed negative top margin so hero isn't overlapped */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 mt-8 relative z-20 pb-20">

        {/* wrapper: grid 3 kolom untuk menyeimbangkan */}
        <div className="mb-6 grid grid-cols-3 items-center gap-4">
        {/* kolom kiri: tombol */}
        <div className="flex justify-start">
            <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-full shadow-sm text-sm text-slate-700"
            aria-label="Kembali"
            >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
            </button>
        </div>

        {/* kolom tengah: judul */}
        <div className="flex justify-center">
            <h1 className="text-xl md:text-xl lg:text-xl font-semibold text-slate-800 leading-tight">
            Status Gizi Balita Kabupaten Bantul
            </h1>
        </div>

        {/* kolom kanan: kosong (penyeimbang) */}
        <div></div>
        </div>


        {/* GLOBAL FILTER */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-300 p-4 md:p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="w-1/2 md:w-48">
              <label className="text-xs font-semibold text-slate-500 mb-1 block pl-1">Tahun</label>
              <div className="relative">
                <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full appearance-none bg-white border border-slate-300 text-slate-700 rounded-full px-4 py-2 pr-8 focus:ring-2 focus:ring-teal-500 outline-none">
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div className="w-1/2 md:w-48">
              <label className="text-xs font-semibold text-slate-500 mb-1 block pl-1">Bulan</label>
              <div className="relative">
                <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full appearance-none bg-white border border-slate-300 text-slate-700 rounded-full px-4 py-2 pr-8 focus:ring-2 focus:ring-teal-500 outline-none">
                  {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0"><img src={logoKab} alt="Bantul" className="w-12 h-12 object-contain" /></div>
        </div>

        {/* rest of the content remains unchanged... */}
        {/* --- SUMMARY CARDS --- */}
        <div className="bg-emerald-100/80 border border-emerald-200 rounded-lg py-3 px-4 text-center mb-8 shadow-sm">
          <h2 className="text-emerald-800 text-lg md:text-xl font-medium">Hasil Pengukuran dan Penimbangan Balita</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-teal-100 rounded-xl p-6 text-center shadow-sm border border-teal-200 flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-slate-800 mb-2">48.345</div>
            <div className="text-sm font-medium text-slate-600">Jumlah Balita</div>
          </div>
          <div className="bg-teal-100 rounded-xl p-6 text-center shadow-sm border border-teal-200 flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-slate-800 mb-2">41.518</div>
            <div className="text-sm font-medium text-slate-600 px-4">Jumlah Balita yang di ukur & Ditimbang</div>
          </div>
          <div className="bg-teal-100 rounded-xl p-6 text-center shadow-sm border border-teal-200 flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-slate-800 mb-2">86,04%</div>
            <div className="text-sm font-medium text-slate-600 px-4">Persentase Balita yang di ukur & Ditimbang</div>
          </div>
        </div>

        {/* ... lanjutkan semua bagian halaman seperti sebelumnya (metrics, grafik, dsb) */}
        {/* Untuk menjaga jawaban ringkas saya tidak mengulangi seluruh konten yang tidak berubah. */}
        {/* Jika ingin, saya bisa kirim file lengkap dengan semua bagian yang tetap sama — tapi inti perubahan ada di atas: hero tanpa overlay, title besar di bawah hero, back button di bawah title. */}

      </div>

      <Footer />
    </div>
  );
}
 