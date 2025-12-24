// src/pages/layanan/pemerintahan/BukuTamu.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function BukuTamu() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    email: "",
    pekerjaan: "",
    asalInstansi: "",
    provinsi: "",
    kota: "",
    tujuanInstansi: "",
    instansiBidang: "",
    tujuan: "",
    totalPengunjung: "",
    deskripsi: "",
  });

  const [kepuasan, setKepuasan] = useState(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  // fields yang wajib di UI-mu (sama seperti desain kiri)
  const requiredFields = [
    "nama",
    "telepon",
    "pekerjaan",
    "asalInstansi",
    "provinsi",
    "kota",
    "tujuanInstansi",
    "instansiBidang",
    "tujuan",
    "deskripsi",
    "totalPengunjung",
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // cek empty
    const empty = requiredFields.find((f) => !form[f] || String(form[f]).trim() === "");
    if (empty) {
      alert("Seluruh data wajib diisi");
      return;
    }

    if (!kepuasan) {
      alert("Pilih tingkat kepuasan");
      return;
    }

    if (!captchaChecked) {
      alert("Konfirmasi bahwa Anda bukan robot");
      return;
    }

    // semua ok (frontend-only)
    alert("Berhasil mengirim data");

    // reset form
    setForm({
      nama: "",
      telepon: "",
      email: "",
      pekerjaan: "",
      asalInstansi: "",
      provinsi: "",
      kota: "",
      tujuanInstansi: "",
      instansiBidang: "",
      tujuan: "",
      totalPengunjung: "",
      deskripsi: "",
    });
    setKepuasan(null);
    setCaptchaChecked(false);
  }

  const smileOptions = [
    { id: 1, label: "Sangat Tidak Puas", emoji: "😡", bg: "bg-red-100" },
    { id: 2, label: "Tidak Puas", emoji: "😟", bg: "bg-orange-100" },
    { id: 3, label: "Cukup", emoji: "😐", bg: "bg-yellow-100" },
    { id: 4, label: "Puas", emoji: "🙂", bg: "bg-green-100" },
    { id: 5, label: "Sangat Puas", emoji: "😁", bg: "bg-emerald-100" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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

      <main className="flex-1">
        <div className="max-w-5xl w-full mx-auto px-4 py-8">

          {/* header with back arrow */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-md border p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Kembali"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base md:text-lg font-semibold">Buku Tamu</h1>
          </div>

          {/* card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-transparent">

            <div className="p-6 space-y-6">
              {/* Title small centered */}
              <div className="text-center">
                <h2 className="text-sm font-semibold">Informasi Tamu</h2>
                <p className="text-xs text-gray-500 mt-1">Tambahkan informasi tentang tamu.</p>
              </div>

              {/* Informasi Tamu fields (2-col) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldSmall label="Nama Lengkap" required>
                  <input
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </FieldSmall>

                <FieldSmall label="Nomor Telepon" required>
                  <input
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    placeholder="Nomor Telepon/HP"
                    className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </FieldSmall>

                <FieldSmall label="Alamat Email">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Alamat Email"
                    className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </FieldSmall>

                <FieldSmall label="Jenis Pekerjaan" required>
                  <select
                    name="pekerjaan"
                    value={form.pekerjaan}
                    onChange={handleChange}
                    className="w-full text-xs rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  >
                    <option value="">Pilih Pekerjaan</option>
                    <option value="pegawai">Pegawai</option>
                    <option value="swasta">Swasta</option>
                    <option value="mahasiswa">Mahasiswa</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </FieldSmall>
              </div>

              {/* Divider thin */}
              <hr className="border-t border-gray-200" />

              {/* Informasi Instansi */}
              <div>
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold">Informasi Instansi</h3>
                  <p className="text-xs text-gray-500 mt-1">Tambahkan informasi tentang instansi kamu.</p>
                </div>

                <div className="space-y-4">
                  <FieldSmall label="Asal Instansi" required>
                    <input
                      name="asalInstansi"
                      value={form.asalInstansi}
                      onChange={handleChange}
                      placeholder="Nama Instansi"
                      className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </FieldSmall>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldSmall label="Provinsi" required>
                      <input
                        name="provinsi"
                        value={form.provinsi}
                        onChange={handleChange}
                        placeholder="Provinsi"
                        className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                      />
                    </FieldSmall>

                    <FieldSmall label="Kota/Kabupaten" required>
                      <input
                        name="kota"
                        value={form.kota}
                        onChange={handleChange}
                        placeholder="Kota/Kabupaten (Opsional)"
                        className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                      />
                    </FieldSmall>
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              {/* Maksud dan Tujuan */}
              <div>
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold">Maksud dan Tujuan</h3>
                  <p className="text-xs text-gray-500 mt-1">Tambahkan informasi tentang tujuan kamu.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldSmall label="Tujuan Instansi" required>
                    <select
                      name="tujuanInstansi"
                      value={form.tujuanInstansi}
                      onChange={handleChange}
                      className="w-full text-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    >
                      <option value="">Cari Instansi</option>
                      <option value="dinasA">Dinas A</option>
                      <option value="dinasB">Dinas B</option>
                    </select>
                  </FieldSmall>

                  <FieldSmall label="Instansi Bidang" required>
                    <select
                      name="instansiBidang"
                      value={form.instansiBidang}
                      onChange={handleChange}
                      className="w-full text-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    >
                      <option value="">Instansi Bidang</option>
                      <option value="bidang1">Bidang 1</option>
                      <option value="bidang2">Bidang 2</option>
                    </select>
                  </FieldSmall>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <FieldSmall label="Tujuan" required>
                    <input
                      name="tujuan"
                      value={form.tujuan}
                      onChange={handleChange}
                      placeholder="Tujuan"
                      className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </FieldSmall>

                  <FieldSmall label="Total Pengunjung" required>
                    <input
                      name="totalPengunjung"
                      value={form.totalPengunjung}
                      onChange={handleChange}
                      placeholder="Jumlah Pengunjung"
                      className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </FieldSmall>
                </div>

                <div className="mt-3">
                  <FieldSmall label="Deskripsi" required>
                    <textarea
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      placeholder="Tuliskan informasi tambahan terkait tujuan kedatangan Anda..."
                      rows={4}
                      className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </FieldSmall>
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              {/* Kepuasan */}
              <div>
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold">Tingkat Kepuasan</h3>
                </div>

                <div className="flex justify-between items-center gap-3 px-2 md:px-10">
                  {smileOptions.map((s) => (
                    <div key={s.id} className="flex flex-col items-center text-center">
                      <button
                        type="button"
                        onClick={() => setKepuasan(s.id)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                          kepuasan === s.id ? "ring-2 ring-sky-400" : ""
                        } ${s.bg}`}
                        aria-label={s.label}
                      >
                        <span>{s.emoji}</span>
                      </button>
                      <div className="text-xs text-gray-600 mt-2">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* captcha centered */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-4 w-full md:w-2/3 justify-center">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={captchaChecked}
                      onChange={(e) => setCaptchaChecked(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Saya bukan robot</span>
                  </label>

                  <img
                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                    alt="recaptcha"
                    className="h-8"
                  />
                </div>
              </div>

              {/* submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm"
                >
                  Kirim
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- small field wrapper component for consistent tiny labels ---------- */
function FieldSmall({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
