// src/pages/layanan/pemerintahan/ReservasiKunjungan.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg";

export default function ReservasiKunjungan() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    nik: "",
    email: "",
    namaInstansi: "",
    alamatInstansi: "",
    namaPimpinan: "",
    jabatanPimpinan: "",
    provinsi: "",
    kota: "",
    tujuanInstansi: "",
    instansiBidang: "",
    tujuan: "",
    deskripsi: "",
    totalPengunjung: "",
    waktuKunjungan: "",
    uploadFile: null,
    uploadFileName: "",
  });

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // daftar field wajib sesuai desain (tandai yang ada * di screenshot)
  const requiredFields = [
    "nama",
    "telepon",
    "nik",
    "email",
    "namaInstansi",
    "alamatInstansi",
    "namaPimpinan",
    "jabatanPimpinan",
    "provinsi",
    "kota",
    "tujuanInstansi",
    "instansiBidang",
    "tujuan",
    "deskripsi",
    "totalPengunjung",
    "waktuKunjungan",
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0] ?? null;
    setForm((s) => ({
      ...s,
      uploadFile: f,
      uploadFileName: f ? f.name : "",
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // cek field kosong
    const empty = requiredFields.find((k) => !form[k] || String(form[k]).trim() === "");
    if (empty) {
      alert("Seluruh data wajib diisi");
      return;
    }
    if (!captchaChecked) {
      alert("Konfirmasi bahwa Anda bukan robot");
      return;
    }

    // front-end only success
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Reservasi berhasil");
      // reset form (simple)
      setForm({
        nama: "",
        telepon: "",
        nik: "",
        email: "",
        namaInstansi: "",
        alamatInstansi: "",
        namaPimpinan: "",
        jabatanPimpinan: "",
        provinsi: "",
        kota: "",
        tujuanInstansi: "",
        instansiBidang: "",
        tujuan: "",
        deskripsi: "",
        totalPengunjung: "",
        waktuKunjungan: "",
        uploadFile: null,
        uploadFileName: "",
      });
      setCaptchaChecked(false);
    }, 700);
  }

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

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Kembali"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base md:text-lg font-semibold">Reservasi Kunjungan</h1>
          </div>

          {/* Card form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border border-transparent text-[13px]"
          >

            <div className="p-5 space-y-6">
              {/* small title */}
              <div className="text-center">
                <h2 className="text-sm font-semibold">Informasi Pribadi PIC</h2>
                <p className="text-xs text-gray-500 mt-1">Tambahkan informasi tentang diri kamu, untuk mempermudah kami menghubungi kamu</p>
              </div>

              {/* row: Nama / Telepon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldSmall label="Nama Lengkap" required>
                  <input
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                  />
                </FieldSmall>

                <FieldSmall label="Nomor Telepon" required>
                  <input
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    placeholder="Nomor Telepon/HP"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                  />
                </FieldSmall>
              </div>

              {/* row: NIK / Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldSmall label="NIK / NIP" required>
                  <input
                    name="nik"
                    value={form.nik}
                    onChange={handleChange}
                    placeholder="NIK / NIP"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                  />
                </FieldSmall>

                <FieldSmall label="Alamat Email" required>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Alamat Email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                  />
                </FieldSmall>
              </div>

              {/* Informasi Instansi */}
              <div>
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold">Informasi Instansi</h3>
                  <p className="text-xs text-gray-500 mt-1">Tambahkan informasi tentang instansi kamu</p>
                </div>

                <div className="space-y-3">
                  <FieldSmall label="Nama Instansi" required>
                    <input
                      name="namaInstansi"
                      value={form.namaInstansi}
                      onChange={handleChange}
                      placeholder="Nama Instansi"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                  </FieldSmall>

                  <FieldSmall label="Alamat Instansi" required>
                    <input
                      name="alamatInstansi"
                      value={form.alamatInstansi}
                      onChange={handleChange}
                      placeholder="Alamat Instansi"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                  </FieldSmall>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldSmall label="Nama Pimpinan Yang Berkunjung" required>
                      <input
                        name="namaPimpinan"
                        value={form.namaPimpinan}
                        onChange={handleChange}
                        placeholder="Nama Pimpinan Yang Berkunjung"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                      />
                    </FieldSmall>
                    <FieldSmall label="Jabatan Pimpinan Yang Berkunjung" required>
                      <input
                        name="jabatanPimpinan"
                        value={form.jabatanPimpinan}
                        onChange={handleChange}
                        placeholder="Jabatan Pimpinan Yang Berkunjung"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                      />
                    </FieldSmall>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldSmall label="Provinsi" required>
                      <input
                        name="provinsi"
                        value={form.provinsi}
                        onChange={handleChange}
                        placeholder="Provinsi"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                      />
                    </FieldSmall>

                    <FieldSmall label="Kota/Kabupaten" required>
                      <input
                        name="kota"
                        value={form.kota}
                        onChange={handleChange}
                        placeholder="Kota/Kabupaten (Opsional)"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                      />
                    </FieldSmall>
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              {/* Maksud dan Tujuan */}
              <div>
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold">Maksud dan tujuan</h3>
                  <p className="text-xs text-gray-500 mt-1">Tambahkan informasi tentang tujuan kamu</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldSmall label="Tujuan Instansi" required>
                    <select
                      name="tujuanInstansi"
                      value={form.tujuanInstansi}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-[13px] placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-sky-300"
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
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-[13px] placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-sky-300"
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
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                  </FieldSmall>

                  <FieldSmall label="Total Pengunjung" required>
                    <input
                      name="totalPengunjung"
                      value={form.totalPengunjung}
                      onChange={handleChange}
                      placeholder="Jumlah Pengunjung"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
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
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 placeholder:text-xs text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                  </FieldSmall>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <FieldSmall label="Waktu Kunjungan" required>
                    <input
                      name="waktuKunjungan"
                      value={form.waktuKunjungan}
                      onChange={handleChange}
                      type="datetime-local"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                  </FieldSmall>

                  <FieldSmall label="Upload File">
                    <div className="border-dashed border-2 border-gray-200 rounded-md p-3 flex items-center justify-between gap-3">
                      <div className="text-xs text-gray-500">
                        <div>Upload a file</div>
                        <div className="text-[11px] text-gray-400">PDF / JPG / PNG (max 10MB)</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-gray-100 px-3 py-1 rounded text-xs">
                          Pilih File
                          <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                        <div className="text-xs text-gray-600">{form.uploadFileName || "Tidak ada file"}</div>
                      </div>
                    </div>
                  </FieldSmall>
                </div>
              </div>

              {/* captcha centered */}
              <div className="flex justify-center mt-4">
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
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="recaptcha" className="h-8" />
                </div>
              </div>

              {/* submit */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm ${loading ? "opacity-70" : ""}`}
                >
                  {loading ? "Mengirim..." : "Kirim"}
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

/* small field wrapper */
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
