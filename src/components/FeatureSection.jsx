import React, { useState, useEffect, useRef } from 'react'

function useInView(ref, options = { threshold: 0.18 }) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setInView(true)
        })
      },
      options
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, options])
  return inView
}

export default function FeatureSection() {
  const ref = useRef(null)
  const inView = useInView(ref)

  // Data fitur — ganti path image sesuai file di src/assets
  const features = [
    {
      id: 'lapor',
      icon: '📸',
      title: 'Lapor Bantul',
      excerpt: 'Laporkan masalah publik seperti jalan rusak, drainase, dan lain-lain secara mudah melalui aplikasi.',
      image: '/src/assets/feature-lapor.jpg',
      linkText: 'Laporkan sekarang →'
    },
    {
      id: 'berita',
      icon: '📰',
      title: 'Berita',
      excerpt: 'Dapatkan berita terkini seputar Bantul: kegiatan pemerintah, event, dan pengumuman penting.',
      image: '/src/assets/feature-berita.jpg',
      linkText: 'Baca berita →'
    },
    {
      id: 'event',
      icon: '🎫',
      title: 'Event',
      excerpt: 'Info event terdekat, pendaftaran, dan agenda kegiatan publik di Bantul.',
      image: '/src/assets/feature-event.jpg',
      linkText: 'Lihat event →'
    },
    {
      id: 'wisata',
      icon: '🏖️',
      title: 'Wisata',
      excerpt: 'Panduan wisata, rekomendasi kuliner, dan destinasi menarik di Bantul untuk liburanmu.',
      image: '/src/assets/feature-wisata.jpg',
      linkText: 'Jelajahi wisata →'
    },
    {
      id: 'cctv',
      icon: '📹',
      title: 'CCTV',
      excerpt: 'Tonton feed CCTV publik (jika tersedia) untuk memantau situasi jalanan / tempat umum.',
      image: '/src/assets/feature-cctv.jpg',
      linkText: 'Lihat CCTV →'
    },
  ]

  // Default: tidak ada fitur aktif (null)
  const [active, setActive] = useState(null)

  // Default preview image (HP mockup) — taruh file default.png di src/assets/
  const defaultPreview = '/src/assets/default.png'

  // Aktif item berdasarkan index; jika active === null gunakan defaultPreview
  const activeItem = active !== null ? features[active] : null

  function toggle(i) {
    // jika klik item yang sama -> tutup (null), klik item lain -> buka
    setActive(prev => (prev === i ? null : i))
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-600">Bantulpedia</h2>
          <p className="text-sm text-slate-600 mt-2">Fitur favorit yang bikin hidup makin update</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LIST */}
          <div className={`lg:col-span-7 space-y-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {features.map((f, i) => {
              const isOpen = active === i
              return (
                <div key={f.id} className="bg-white rounded-lg">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left px-4 py-4 flex items-center gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-lg flex-shrink-0">
                      {f.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-medium text-slate-800">{f.title}</div>
                        <div className="text-slate-400">{isOpen ? '∧' : '∨'}</div>
                      </div>
                      {/* excerpt hanya tampil saat open */}
                      {isOpen && (
                        <p className="mt-2 text-sm text-slate-600">{f.excerpt}</p>
                      )}
                    </div>
                  </button>

                  <div className="border-b border-slate-200" />
                </div>
              )
            })}
          </div>

          {/* PREVIEW CARD */}
          <div className={`lg:col-span-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sticky top-28">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden">
                  {/* jika activeItem ada pakai gambar fitur, kalau tidak pakai defaultPreview */}
                  <img
                    src={activeItem ? activeItem.image : defaultPreview}
                    alt={activeItem ? activeItem.title : 'Preview'}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {activeItem ? activeItem.title : 'Aplikasi Bantulpedia'}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    {activeItem ? activeItem.excerpt : 'Lihat berbagai fitur utama Bantulpedia melalui preview ini. Klik fitur di kiri untuk melihat detail.'}
                  </p>

                  <div className="mt-4">
                    <a href="#" className="text-emerald-600 text-sm font-medium">
                      {activeItem ? activeItem.linkText : 'Pelajari selengkapnya →'}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* fallback untuk mobile: ringkasan di bawah */}
            <div className="block lg:hidden mt-6">
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-base font-semibold">{activeItem ? activeItem.title : 'Aplikasi Bantulpedia'}</h3>
                <p className="text-sm text-slate-600 mt-2">{activeItem ? activeItem.excerpt : 'Lihat berbagai fitur utama Bantulpedia melalui preview ini.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
