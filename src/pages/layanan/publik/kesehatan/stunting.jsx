// src/pages/layanan/kesehatan/StatusGiziPage.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg"; 
import logoKab from "../../../../assets/bantul.png"; 
import { ChevronDown, ArrowDown, ArrowUp, Search, Check, X, ArrowLeft } from "lucide-react";

export default function StatusGiziPage() {
  const navigate = useNavigate();
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("Februari");

  // --- STATE DATA ---
  const [regionType, setRegionType] = useState("Kapanewon");
  
  // --- STATE MULTI-SELECT FILTER ---
  // Default: Pilih semua wilayah di awal
  const [selectedRegions, setSelectedRegions] = useState([]); 
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null); // Untuk menutup dropdown saat klik di luar

  // --- STATE TOGGLE VIEW ---
  const [activeViewTotal, setActiveViewTotal] = useState("total"); 
  const [activeViewGender, setActiveViewGender] = useState("total");
  const [activeProblemMetric, setActiveProblemMetric] = useState("total"); 
  const [selectedProblem, setSelectedProblem] = useState("stunting"); 

  const YEARS = ["2025", "2024", "2023"];
  const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

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

  // List Semua Wilayah untuk Referensi
  const allRegionNames = chartDataRaw.map(d => d.region);

  // Set default selected regions saat mount
  useEffect(() => {
      setSelectedRegions(allRegionNames);
  }, []);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMultiSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  // --- LOGIKA DATA DINAMIS (Masalah Gizi) ---
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

  // --- LOGIKA FILTER CHART 1 & 2 (MULTI SELECT) ---
  const filteredData = useMemo(() => {
      // Filter data berdasarkan array selectedRegions
      return processedData.filter(item => selectedRegions.includes(item.region));
  }, [selectedRegions, processedData]);


  // --- HANDLER MULTI SELECT ---
  const toggleRegion = (regionName) => {
      if (selectedRegions.includes(regionName)) {
          // Hapus jika sudah ada (kecuali tinggal 1, biar grafik ga kosong)
          if (selectedRegions.length > 1) {
              setSelectedRegions(selectedRegions.filter(r => r !== regionName));
          }
      } else {
          // Tambah jika belum ada
          setSelectedRegions([...selectedRegions, regionName]);
      }
  };

  const handleSelectAll = () => {
      if (selectedRegions.length === allRegionNames.length) {
          setSelectedRegions([]); // Unselect All (Opsional: bisa di set min 1)
      } else {
          setSelectedRegions(allRegionNames); // Select All
      }
  };

  // Filter opsi di dropdown berdasarkan search term
  const filteredOptions = allRegionNames.filter(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // --- HITUNG MAX SCALE (Agar Grafik Proporsional) ---
  const calculateMax = (data, key) => Math.ceil(Math.max(...data.map(d => d[key])) * 1.2) || 100;
  
  // Gunakan processedData (semua data) untuk max scale agar skala konsisten, 
  // atau gunakan filteredData jika ingin skala menyesuaikan data yg tampil.
  // Di sini saya gunakan processedData agar barnya tidak "loncat" tingginya saat difilter.
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

  // --- DATA KARTU METRIK ---
  const metrics = [
    {
      key: "stunting", title: "Balita Stunting", total: "3.500", male: "1.946", female: "1.487", prevalence: "8,10%", trend: "down", colorFrom: "from-teal-600", colorTo: "to-teal-800", icon: "📏", definitionTitle: "STUNTING", definition: "Kurang gizi kronis, asupan kurang lama. Angka: [Pendek] + [Sangat Pendek]"
    },
    {
      key: "wasting", title: "Balita Wasting", total: "2.396", male: "1.438", female: "958", prevalence: "5,77%", trend: "up", colorFrom: "from-cyan-600", colorTo: "to-cyan-800", icon: "⚖️", definitionTitle: "WASTING", definition: "Kekurangan gizi akut, berat rendah dibanding tinggi. Angka: [Gizi Kurang] + [Gizi Buruk]"
    },
    {
      key: "underweight", title: "Balita Underweight", total: "4.962", male: "2.764", female: "2.198", prevalence: "11,95%", trend: "down", colorFrom: "from-sky-600", colorTo: "to-sky-800", icon: "🩺", definitionTitle: "UNDERWEIGHT", definition: "Berat badan di bawah rata-rata usia. Angka: [Berat Kurang] + [Sangat Kurang]"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins">
      <Navbar />

      {/* HERO SECTION */}
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

      {/* MAIN CONTAINER - removed negative top margin so hero stays clean */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 mt-8 relative z-20 pb-20">
        
        {/* wrapper: grid 3 kolom untuk menyeimbangkan */}
        <div className="mb-6 flex items-center gap-4">
        {/* Tombol Kembali */}
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-full shadow-sm text-sm text-slate-700"
            aria-label="Kembali"
        >
            <ArrowLeft className="w-4 h-4" />
            {/* <span className="hidden sm:inline">Kembali</span> */}
        </button>

        {/* Judul */}
        <h1 className="text-xl md:text-xl font-semibold text-slate-900 leading-tight">
            Status Gizi Balita Kabupaten Bantul
        </h1>
        </div>

        {/* GLOBAL FILTER */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
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

        {/* HEADER: Hasil Pengukuran */}
        <div className="bg-[#148448]/60 border border-[#148448]/60 rounded-lg py-3 px-4 text-center mb-8 shadow-sm">
          <h2 className="text-white text-lg md:text-xl font-medium">
            Hasil Pengukuran dan Penimbangan Balita
          </h2>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#C4E2D1] rounded-xl p-6 text-center shadow-sm border border-[#148448]/20 flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-black mb-2">48.345</div>
            <div className="text-sm font-medium text-black">Jumlah Balita</div>
          </div>

          <div className="bg-[#C4E2D1] rounded-xl p-6 text-center shadow-sm border border-[#148448]/20 flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-black mb-2">41.518</div>
            <div className="text-sm font-medium text-black px-4">Jumlah Balita yang di ukur & Ditimbang</div>
          </div>

          <div className="bg-[#C4E2D1] rounded-xl p-6 text-center shadow-sm border border-[#148448]/20 flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-black mb-2">86,04%</div>
            <div className="text-sm font-medium text-black px-4">Persentase Balita yang di ukur & Ditimbang</div>
          </div>
        </div>

        {/* HEADER: Besaran Masalah Gizi */}
        <div className="bg-[#148448]/60 border border-[#148448]/60 rounded-lg py-3 px-4 text-center mb-8 shadow-sm">
          <h2 className="text-white text-lg md:text-xl font-medium">Besaran Masalah Gizi pada Balita</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">{metrics.map((m) => (<div key={m.key + "def"} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-start gap-4"><div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0 border border-orange-100">{m.icon}</div><div><h4 className="font-bold text-slate-800 text-base mb-1">{m.definitionTitle}</h4><p className="text-xs text-slate-500 leading-snug">{m.definition}</p></div></div>))}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">{metrics.map((m) => (<div key={m.key} className={`relative overflow-hidden rounded-3xl shadow-lg bg-gradient-to-b ${m.colorFrom} ${m.colorTo} text-white`}><div className="p-6 pb-24 relative z-10 text-center"><h3 className="text-xl font-semibold opacity-100">{m.title}</h3><div className="text-5xl font-extrabold mt-3 tracking-tight">{m.total}</div><div className="text-[10px] font-bold tracking-wider opacity-80 uppercase mt-1">TOTAL BALITA {m.definitionTitle}</div><div className="mt-6 flex gap-3 text-left"><div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 flex-1"><span className="text-xl">👦</span><div><div className="text-[9px] uppercase opacity-90 leading-none mb-0.5">Laki-laki</div><div className="font-bold text-sm leading-tight">{m.male}</div></div></div><div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 flex-1"><span className="text-xl">👧</span><div><div className="text-[9px] uppercase opacity-90 leading-none mb-0.5">Perempuan</div><div className="font-bold text-sm leading-tight">{m.female}</div></div></div></div></div><div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg text-slate-800 flex items-center justify-between"><div><div className="text-xs font-bold text-slate-400 uppercase">Prevalensi:</div><div className={`text-3xl font-extrabold ${m.key === 'stunting' ? 'text-teal-600' : m.key === 'wasting' ? 'text-cyan-600' : 'text-sky-600'}`}>{m.prevalence}</div></div><div className="flex items-center gap-2 text-right"><div className="flex flex-col items-end"><div className={`w-6 h-6 rounded-full flex items-center justify-center text-white mb-1 ${m.trend === 'down' ? 'bg-teal-500' : 'bg-rose-500'}`}>{m.trend === 'down' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}</div></div><div className="text-[10px] text-slate-500 leading-tight w-16">{m.trend === 'down' ? 'Menurun' : 'Naik'} dari Tahun Lalu</div></div></div></div>))}</div>

        {/* --- SECTION HEADER: STATISTIK BALITA WILAYAH (DENGAN MULTI-SELECT DROPDOWN) --- */}
        <div className="mb-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Statistik Balita Wilayah</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Dropdown Tipe Wilayah */}
            <div className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 shadow-sm flex items-center min-w-[220px] relative">
                <span className="text-sm text-slate-600 mr-2">Wilayah:</span>
                <select 
                    value={regionType}
                    onChange={(e) => setRegionType(e.target.value)}
                    className="flex-1 bg-transparent font-medium text-slate-800 outline-none appearance-none cursor-pointer pr-6"
                >
                    <option value="Kapanewon">Kapanewon</option>
                    <option value="Puskesmas">Puskesmas</option>
                    <option value="Kalurahan">Kalurahan</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* CUSTOM MULTI-SELECT DROPDOWN */}
            <div className="relative min-w-[220px]" ref={dropdownRef}>
                <button 
                    onClick={() => setIsMultiSelectOpen(!isMultiSelectOpen)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 shadow-sm flex items-center justify-between hover:border-teal-500 transition-colors"
                >
                    <span className="text-sm text-slate-700 font-medium truncate max-w-[180px]">
                        {selectedRegions.length === allRegionNames.length 
                            ? "Semua Wilayah" 
                            : selectedRegions.length > 0 
                                ? `${selectedRegions.length} Wilayah Terpilih` 
                                : "Pilih Wilayah"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isMultiSelectOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Content */}
                {isMultiSelectOpen && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-80 overflow-hidden flex flex-col">
                        {/* Search Input */}
                        <div className="p-3 border-b border-slate-100 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text" 
                                placeholder="Ketik untuk menelusuri..." 
                                className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* List Items */}
                        <div className="overflow-y-auto flex-1 p-2">
                            {/* Option: Select All (Hanya muncul jika tidak sedang search atau search kosong) */}
                            {searchTerm === "" && (
                                <div 
                                    onClick={handleSelectAll}
                                    className="flex items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                                >
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${selectedRegions.length === allRegionNames.length ? "bg-teal-600 border-teal-600" : "border-slate-300"}`}>
                                        {selectedRegions.length === allRegionNames.length && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">Pilih Semua</span>
                                </div>
                            )}

                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((region, idx) => {
                                    const isSelected = selectedRegions.includes(region);
                                    return (
                                        <div 
                                            key={idx}
                                            onClick={() => toggleRegion(region)}
                                            className="flex items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${isSelected ? "bg-teal-600 border-teal-600" : "border-slate-300"}`}>
                                                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className="text-sm text-slate-700">{regionType} {region}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-4 text-xs text-slate-400">Tidak ditemukan</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* GRAFIK 1: JUMLAH BALITA (MENGGUNAKAN FILTERED DATA) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                    {activeViewTotal === 'total' ? 'Jumlah Balita menurut Kapanewon' : 'Jumlah Balita diukur & ditimbang menurut Kapanewon'}
                </h3>
                <div className="bg-slate-100 p-1.5 rounded-xl flex text-xs md:text-sm font-medium relative">
                    <button onClick={() => setActiveViewTotal('total')} className={`px-5 py-2.5 rounded-lg transition-all duration-200 relative z-10 ${activeViewTotal === 'total' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Jumlah Balita</button>
                    <button onClick={() => setActiveViewTotal('measured')} className={`px-5 py-2.5 rounded-lg transition-all duration-200 relative z-10 ${activeViewTotal === 'measured' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Jumlah di ukur & ditimbang</button>
                </div>
            </div>
            <div className="p-8 overflow-x-auto bg-white">
                <div className="min-w-[800px] h-[450px] relative flex flex-col justify-end pt-10 pb-20">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-20 pt-10">
                        {[100, 75, 50, 25, 0].map((val, idx) => (
                            <div key={idx} className="w-full border-b border-slate-200 border-dashed relative">
                                <span className="absolute -top-3 -left-8 text-xs font-semibold text-slate-400 w-6 text-right">{Math.round(currentMaxTotal * (val/100))}</span>
                            </div>
                        ))}
                    </div>
                    {/* Render Filtered Data */}
                    <div className={`flex items-end h-full z-10 pl-2 pr-2 pb-1 ${filteredData.length < 6 ? 'justify-start gap-12' : 'justify-between'}`}>
                        {filteredData.map((item, index) => {
                            const dataValue = activeViewTotal === 'total' ? item.total : item.measured;
                            const height = (dataValue / currentMaxTotal) * 100;
                            return (
                                <div key={index} className="flex flex-col items-center justify-end h-full w-full group relative px-1 max-w-[80px]">
                                    <div className="flex flex-col items-center justify-end w-full h-full relative">
                                        <div className="absolute w-full text-center transition-all duration-500" style={{ bottom: `${height}%`, marginBottom: '6px' }}>
                                            <span className="text-[10px] md:text-xs font-bold text-[#1e5b7e]">{dataValue}</span>
                                        </div>
                                        <div className="w-6 md:w-12 rounded-t-sm transition-all duration-500 ease-out hover:opacity-90" style={{ height: `${height}%`, backgroundColor: '#1e5b7e' }}></div>
                                    </div>
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 translate-y-full w-4 flex justify-center">
                                         <div className="text-[10px] md:text-xs text-slate-600 font-medium whitespace-nowrap origin-top-left -rotate-45 mt-2 ml-1">{item.region}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div className="h-32 w-full"></div>  */}
            </div>
        </div>

        {/* GRAFIK 2: GENDER BALITA (MENGGUNAKAN FILTERED DATA) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                    Jumlah Balita Berdasarkan Jenis Kelamin
                </h3>
                <div className="bg-slate-100 p-1.5 rounded-xl flex text-xs md:text-sm font-medium relative">
                    <button onClick={() => setActiveViewGender('total')} className={`px-5 py-2.5 rounded-lg transition-all duration-200 relative z-10 ${activeViewGender === 'total' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Jumlah Balita</button>
                    <button onClick={() => setActiveViewGender('measured')} className={`px-5 py-2.5 rounded-lg transition-all duration-200 relative z-10 ${activeViewGender === 'measured' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Jumlah di ukur & ditimbang</button>
                </div>
            </div>
            <div className="p-8 overflow-x-auto bg-white">
                <div className="min-w-[800px] h-[450px] relative flex flex-col justify-end pt-10 pb-20">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-20 pt-10">
                        {[100, 75, 50, 25, 0].map((val, idx) => (
                            <div key={idx} className="w-full border-b border-slate-200 border-dashed relative">
                                <span className="absolute -top-3 -left-8 text-xs font-semibold text-slate-400 w-6 text-right">{Math.round(currentMaxGender * (val/100))}</span>
                            </div>
                        ))}
                    </div>
                    <div className={`flex items-end h-full z-10 pl-2 pr-2 pb-1 ${filteredData.length < 6 ? 'justify-start gap-12' : 'justify-between'}`}>
                        {filteredData.map((item, index) => {
                            const dataMale = activeViewGender === 'total' ? item.male : item.measuredMale;
                            const dataFemale = activeViewGender === 'total' ? item.female : item.measuredFemale;
                            const hMale = (dataMale / currentMaxGender) * 100;
                            const hFemale = (dataFemale / currentMaxGender) * 100;

                            return (
                                <div key={index} className="flex flex-col items-center justify-end h-full w-full group relative px-1 max-w-[80px]">
                                    <div className="flex gap-1 items-end justify-center w-full h-full relative">
                                        <div className="flex flex-col items-center justify-end h-full w-1/2 relative">
                                            <span className="absolute text-[9px] font-bold text-blue-600 mb-1 transition-all duration-500" style={{ bottom: `${hMale}%` }}>{dataMale}</span>
                                            <div className="w-full rounded-t-sm bg-blue-500 transition-all duration-500 hover:bg-blue-600" style={{ height: `${hMale}%` }}></div>
                                        </div>
                                        <div className="flex flex-col items-center justify-end h-full w-1/2 relative">
                                            <span className="absolute text-[9px] font-bold text-pink-500 mb-1 transition-all duration-500" style={{ bottom: `${hFemale}%` }}>{dataFemale}</span>
                                            <div className="w-full rounded-t-sm bg-pink-500 transition-all duration-500 hover:bg-pink-600" style={{ height: `${hFemale}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 translate-y-full w-4 flex justify-center">
                                         <div className="text-[10px] md:text-xs text-slate-600 font-medium whitespace-nowrap origin-top-left -rotate-45 mt-2 ml-1">{item.region}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div className="h-32 w-full"></div> */}
                <div className="border-t border-slate-100 pt-4 flex justify-end gap-6 text-xs md:text-sm text-slate-600">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-sm"></div><span className="font-medium">Laki-laki (L)</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-pink-500 rounded-sm"></div><span className="font-medium">Perempuan (P)</span></div>
                </div>
            </div>
        </div>

        {/* --- HEADER: STATISTIK MASALAH GIZI BALITA --- */}
        <div className="mb-6 mt-16 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Statistik Masalah Gizi Balita</h2>
            <div className="w-full md:w-auto relative">
                <div className="flex items-center bg-white border border-slate-300 rounded-lg px-4 py-2.5 shadow-sm min-w-[280px] hover:border-teal-500 transition-colors focus-within:ring-2 focus-within:ring-teal-200">
                    <span className="text-sm text-slate-600 mr-2 whitespace-nowrap font-medium">Masalah Gizi Balita :</span>
                    <div className="relative flex-1">
                        <select 
                            value={selectedProblem}
                            onChange={(e) => setSelectedProblem(e.target.value)}
                            className="w-full bg-transparent font-bold text-slate-800 outline-none appearance-none cursor-pointer pr-6 py-1"
                        >
                            <option value="stunting">Stunting</option>
                            <option value="wasting">Wasting</option>
                            <option value="underweight">Underweight</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>

        {/* GRAFIK 3: MASALAH GIZI (PROCESSED DATA - SEMUA WILAYAH) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 capitalize">
                    {activeProblemMetric === 'prev' 
                        ? `Prevalensi Balita dengan Masalah Gizi (${selectedProblem}) (%)`
                        : `Jumlah Balita ${selectedProblem} menurut Kapanewon`
                    }
                </h3>
                <div className="bg-slate-100 p-1.5 rounded-xl flex text-xs md:text-sm font-medium relative">
                    <button onClick={() => setActiveProblemMetric('total')} className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${activeProblemMetric === 'total' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Total Kasus</button>
                    <button onClick={() => setActiveProblemMetric('prev')} className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${activeProblemMetric === 'prev' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Prevalensi (%)</button>
                    <button onClick={() => setActiveProblemMetric('gender')} className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${activeProblemMetric === 'gender' ? 'text-slate-800 bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}>Gender (L/P)</button>
                </div>
            </div>

            <div className="p-8 overflow-x-auto bg-white">
                <div className="min-w-[800px] h-[450px] relative flex flex-col justify-end pt-10 pb-20">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-20 pt-10">
                        {[100, 75, 50, 25, 0].map((val, idx) => (
                            <div key={idx} className="w-full border-b border-slate-200 border-dashed relative">
                                <span className="absolute -top-3 -left-8 text-xs font-semibold text-slate-400 w-6 text-right">{Math.round(currentMaxProblem * (val/100))}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-end h-full z-10 pl-2 pr-2 pb-1">
                        {processedData.map((item, index) => {
                            if (activeProblemMetric === 'gender') {
                                const hMale = (item.male / currentMaxProblem) * 100;
                                const hFemale = (item.female / currentMaxProblem) * 100;
                                return (
                                    <div key={index} className="flex flex-col items-center justify-end h-full w-full group relative px-1">
                                        <div className="flex gap-1 items-end justify-center w-full h-full relative">
                                            <div className="flex flex-col items-center justify-end h-full w-1/2 relative">
                                                <span className="absolute text-[9px] font-bold text-blue-600 mb-1" style={{ bottom: `${hMale}%` }}>{item.male}</span>
                                                <div className="w-full rounded-t-sm bg-blue-500 transition-all duration-500" style={{ height: `${hMale}%` }}></div>
                                            </div>
                                            <div className="flex flex-col items-center justify-end h-full w-1/2 relative">
                                                <span className="absolute text-[9px] font-bold text-pink-500 mb-1" style={{ bottom: `${hFemale}%` }}>{item.female}</span>
                                                <div className="w-full rounded-t-sm bg-pink-500 transition-all duration-500" style={{ height: `${hFemale}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 translate-y-full w-4 flex justify-center">
                                            <div className="text-[10px] md:text-xs text-slate-600 font-medium whitespace-nowrap origin-top-left -rotate-45 mt-2 ml-1">{item.region}</div>
                                        </div>
                                    </div>
                                );
                            } else {
                                const val = activeProblemMetric === 'prev' ? item.prev : item.total;
                                const height = (val / currentMaxProblem) * 100;
                                const barColor = activeProblemMetric === 'prev' ? '#0e7490' : '#1e5b7e';
                                return (
                                    <div key={index} className="flex flex-col items-center justify-end h-full w-full group relative px-1">
                                        <div className="flex flex-col items-center justify-end w-full h-full relative">
                                            <div className="absolute w-full text-center" style={{ bottom: `${height}%`, marginBottom: '6px' }}>
                                                <span className="text-[10px] md:text-xs font-bold" style={{ color: barColor }}>{val}</span>
                                            </div>
                                            <div className="w-6 md:w-12 rounded-t-sm transition-all duration-500 ease-out hover:opacity-90" style={{ height: `${height}%`, backgroundColor: barColor }}></div>
                                        </div>
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 translate-y-full w-4 flex justify-center">
                                             <div className="text-[10px] md:text-xs text-slate-600 font-medium whitespace-nowrap origin-top-left -rotate-45 mt-2 ml-1">{item.region}</div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                {/* <div className="h-32 w-full"></div>  */}
                
                {activeProblemMetric === 'gender' && (
                    <div className="border-t border-slate-100 pt-4 flex justify-end gap-6 text-xs md:text-sm text-slate-600">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-sm"></div><span className="font-medium">Laki-laki (L)</span></div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-pink-500 rounded-sm"></div><span className="font-medium">Perempuan (P)</span></div>
                    </div>
                )}
            </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}