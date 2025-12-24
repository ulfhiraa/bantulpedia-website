import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getEvent } from "../../../api/layanan/informasi/event";
import heroBg from "../../../assets/pandansimo1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await getEvent();

        const found = items.find(
          (it) => String(it.id) === String(id)
        );

        if (!found) {
          setEvent(null);
          return;
        }

        setEvent(found);
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Memuat event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500">Event tidak ditemukan</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-emerald-600 text-white text-sm"
        >
          Kembali
        </button>
      </div>
    );
  }

  const title = event.judul;
  const lokasi = event.lokasi;
  const image = event.poster;
  const body = event.deskripsi;

  return (
    <div className="min-h-screen bg-white">

    <Navbar />

    {/* HERO BG */}
    <div
    className="
        relative
        h-[100px] md:h-[150px]   /* ⬅️ ATUR PANJANG HERO DI SINI */
        overflow-hidden
    "
    >
    <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 bg-black/65" />

    </div>

    {/* HEADER */}
    <section className="max-w-4xl mx-auto px-6 pt-8 pb-4 relative">
        {/* BACK */}
        {/* <button
            onClick={() => navigate(-1)}
            className="
            absolute left-6 top-8
            w-9 h-9
            flex items-center justify-center
            rounded-full
            text-slate-600
            hover:bg-slate-100
            hover:text-slate-900
            transition
            "
            aria-label="Kembali"
        >
            <FontAwesomeIcon icon={faArrowLeftLong} className="text-lg" />
        </button> */}

        {/* TITLE */}
        <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            {title}
            </h1>

            {lokasi && (
            <p className="mt-2 text-sm text-slate-500">
                {lokasi}
            </p>
            )}
        </div>
    </section>
    
    {/* Garis tipis */}
    <div className="max-w-4xl mx-auto px-6">
        <hr className="border-t border-slate-400" />
    </div>

      {/* POSTER */}
      {image && (
        <section className="flex justify-center mt-6">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-[70vh] rounded-xl shadow-md"
          />
        </section>
      )}

      {/* DESKRIPSI */}
      {body && (
        <section className="max-w-4xl mx-auto px-6 mt-10 pb-16">
          <article className="text-slate-700 leading-relaxed space-y-5 text-[15px]">
            {body.split("\n").filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </section>
      )}

      <Footer />
    </div>
  );
}
