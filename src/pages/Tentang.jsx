// src/pages/Tentang.jsx
export default function Tentang() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4 text-green-800">
          Tentang Bantulpedia
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bantulpedia adalah portal informasi Kabupaten Bantul yang
          membantu masyarakat mengakses layanan, berita, dan informasi
          penting secara cepat dan terpusat.
        </p>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-green-700">
            Tujuan Bantulpedia
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Memudahkan warga mencari informasi resmi Bantul.</li>
            <li>Menyatukan layanan digital dalam satu platform.</li>
            <li>Mendukung transparansi dan pelayanan publik.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
