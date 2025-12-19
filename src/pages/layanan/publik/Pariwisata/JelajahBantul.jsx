import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

import { getJelajahBantul } from "../../../../api/layanan/publik/jelajahBantul";

/* PLACEHOLDER & ICON */
const PLACEHOLDER_IMG =
  "https://placehold.co/600x400?text=Bantul+Wisata";

const CATEGORY_ICON = {
  "Desa Wisata": "🏡",
  "Wisata Buatan": "🎡",
  "Wisata Alam": "🌄",
  "Hotel": "🏨",
  "Home Stay": "🛏️",
  "Transportasi Wisata": "🚌",
  "Paket Wisata": "🧳",
  "Travel Agen": "✈️",
  "Pemandu Lokal": "🧑‍💼",
  "Kuliner": "🍽️",
  "Oleh-oleh": "🛍️",
  "UMKM": "🏪",
  "Pasar Tradisional": "🧺",
  "Pasar Modern": "🏬",
  "Kerajinan": "🧶",
  "Kesenian": "🎭",
  "Upacara Adat": "🪔",
  "Warisan Budaya": "🏛️",
  "Video Wisata": "🎬",
  "PLN": "⚡",
  "Kantor Pemerintahan": "🏢",
  "Rumah Sakit": "🏥",
  "Kantor Polisi": "🚓",
  "Tempat Ibadah": "🕌",
  "SPBU": "⛽",
  "ATM": "🏧",
};

  /* COMPONENT */
export default function JelajahBantulPage() {
  const navigate = useNavigate();

  /* SIDEBAR CATEGORY */
  const categories = [
    {
      id: "destinasi",
      title: "Destinasi Wisata",
      items: ["Desa Wisata", "Wisata Buatan", "Wisata Alam"],
    },
    {
      id: "akomodasi",
      title: "Akomodasi Wisata",
      items: ["Hotel", "Home Stay"],
    },
    {
      id: "agen",
      title: "Agen Perjalanan",
      items: ["Transportasi Wisata", "Paket Wisata", "Travel Agen"],
    },
    {
      id: "pemandu",
      title: "Pemandu Wisata",
      items: ["Pemandu Lokal"],
    },
    {
      id: "kuliner",
      title: "Kuliner",
      items: ["Kuliner", "Oleh-oleh"],
    },
    {
      id: "belanja",
      title: "Belanja",
      items: ["UMKM", "Pasar Tradisional", "Pasar Modern"],
    },
    { id: "kerajinan", title: "Kerajinan", items: ["Kerajinan"] },
    {
      id: "seni",
      title: "Seni Budaya",
      items: ["Kesenian", "Upacara Adat", "Warisan Budaya"],
    },
    { id: "video", title: "Video Wisata", items: ["Video Wisata"] },
    {
      id: "fasilitas",
      title: "Fasilitas Umum",
      items: [
        "PLN",
        "Kantor Pemerintahan",
        "Rumah Sakit",
        "Kantor Polisi",
        "Tempat Ibadah",
        "SPBU",
        "ATM",
      ],
    },
  ];

  /*  STATE */
  const [openCategory, setOpenCategory] = useState("destinasi");
  const [activeFilter, setActiveFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("Semua Wisata");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FILTER & SORT LOGIC (FIXED) */
  useEffect(() => {
    let result = [...cards];

    // FILTER SIDEBAR
    if (activeFilter) {
      result = result.filter((c) => c.category === activeFilter);
    }

    // SEARCH
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    // SORT
    if (sortOption === "Terpopuler") {
      result.sort((a, b) => b.visitors - a.visitors);
    }

    if (sortOption === "Terbaru") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    setFilteredCards(result);
  }, [search, sortOption, activeFilter, cards]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getJelajahBantul();
      setCards(data);
      setFilteredCards(data);
      setLoading(false);
    };

    loadData();
  }, []);

  /*  RENDER */
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* HERO */}
      <div className="h-40 md:h-60 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <main className="w-full px-10 py-10 flex gap-8 flex-1 items-start">
        {/* SIDEBAR */}
        <aside className="w-80">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4" />
          
          </button>

          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-emerald-700 font-semibold mb-4 text-lg">
              Jelajah Bantul
            </h3>

            {categories.map((c) => (
              <div key={c.id}>
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === c.id ? null : c.id)
                  }
                  className="w-full flex justify-between px-2 py-3 rounded hover:bg-emerald-50"
                >
                  <span className="font-semibold">{c.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition ${
                      openCategory === c.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openCategory === c.id && (
                  <div className="ml-4 space-y-2">
                    {c.items.map((it) => (
                      <button
                        key={it}
                        onClick={() => setActiveFilter(it)}
                        className={`block w-full text-left px-3 py-2 rounded ${
                          activeFilter === it
                            ? "bg-emerald-100 text-emerald-800 font-semibold"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {it}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <section className="flex-1">
          <div className="flex justify-between mb-4">
            <input
              className="border px-3 py-2 rounded w-1/2"
              placeholder="Cari..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border px-3 py-2 rounded"
              value={sortOption}
              onChange={(e) => {
                const val = e.target.value;
                setSortOption(val);
                if (val === "Semua Wisata") {
                  setActiveFilter("");
                }
              }}
            >
              <option>Semua Wisata</option>
              <option>Terpopuler</option>
              <option>Terbaru</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="relative rounded-xl shadow hover:shadow-lg overflow-hidden bg-white"
              >
                <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded shadow text-lg">
                  {CATEGORY_ICON[card.category] || "📍"}
                </div>

                <img
                  src={card.img}
                  alt={card.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-gray-500">
                    {card.location} • {card.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
