// src/pages/layanan/publik/pemerintahan/HubungiKami.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import heroBg from "../../../../assets/pandansimo1.jpg"; // ganti path kalau beda

export default function HubungiKami() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pekerjaan: "",
    subjek: "",
    tujuan: "",
    pesan: "",
  });

  const [fileName, setFileName] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const tujuanOptions = [
    { value: "", label: "Pilih Tujuan" },
    { value: "informasi", label: "Informasi" },
    { value: "pengaduan", label: "Pengaduan" },
    { value: "kerjasama", label: "Kerjasama" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFileName(f.name);
    } else {
      setFileName("");
    }
  };

  const validate = () => {
    const err = {};
    if (!form.nama.trim()) err.nama = "Nama wajib diisi";
    if (!form.email.trim()) err.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Format email tidak valid";
    if (!form.telepon.trim()) err.telepon = "Nomor telepon wajib diisi";
    if (!form.tujuan) err.tujuan = "Pilih tujuan";
    if (!form.pesan.trim()) err.pesan = "Pesan/pertanyaan wajib diisi";
    if (!agree) err.agree = "Silakan centang reCAPTCHA (placeholder)";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }

    // contoh proses pengiriman (ganti dengan API call)
    const payload = {
      ...form,
      file: fileName,
    };
    console.log("Kirim payload:", payload);
    alert("Pesan berhasil dikirim. Terima kasih!");
    // reset form
    setForm({
      nama: "",
      email: "",
      telepon: "",
      pekerjaan: "",
      subjek: "",
      tujuan: "",
      pesan: "",
    });
    setFileName("");
    setAgree(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO / Banner */}
      <header className="relative w-full h-44 md:h-56 lg:h-64">
        <div className="h-40 md:h-75 relative rounded-b-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply" />
              </div>
        {/* <div className="absolute inset-0 bg-black/25" /> */}
        {/* <div className="relative z-10 container mx-auto px-6 py-6">
          <h1 className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-white">Layanan Publik</h1>
        </div> */}
      </header>

      {/* CONTENT */}
      <main className="container mx-auto px-6 md:px-12 lg:px-20 py-8 flex-1 bg-gradient-to-b from-slate-50 to-white relative">
        {/* Back button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute left-6 md:left-12 lg:left-20 top-8 inline-flex items-center justify-center w-9 h-9 text-slate-700 bg-white border border-slate-200 rounded-md shadow-sm hover:bg-slate-50 hover:border-emerald-300 transition-colors z-20"
          aria-label="Kembali ke Layanan Publik"
          title="Kembali ke Layanan Publik"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Card title */}
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-emerald-700">Hubungi Kami</h2>
            <p className="text-sm text-slate-500 mt-2">Kami siap membantu Anda dengan setiap pertanyaan atau masukan</p>
          </div>

          {/* Form card */}
          <div className="bg-white border border-emerald-200 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-6 py-4 border-b border-emerald-200">
              <h3 className="text-sm font-semibold text-emerald-800 text-center">Form Hubungi Kami</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Nama | Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama</label>
                    <input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded border transition-all ${errors.nama ? "border-red-400 bg-red-50" : "border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"} focus:outline-none`}
                      placeholder="Nama lengkap"
                    />
                    {errors.nama && <p className="text-xs text-red-600 mt-1">{errors.nama}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded border transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"} focus:outline-none`}
                      placeholder="example@domain.com"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Telepon (full width) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Telepon</label>
                  <input
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border transition-all ${errors.telepon ? "border-red-400 bg-red-50" : "border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"} focus:outline-none`}
                    placeholder="0812xxxxxxx"
                  />
                  {errors.telepon && <p className="text-xs text-red-600 mt-1">{errors.telepon}</p>}
                </div>

                {/* Row 3: Jenis Pekerjaan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Pekerjaan</label>
                    <select
                      name="pekerjaan"
                      value={form.pekerjaan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded border border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="">Pilih pekerjaan</option>
                      <option value="pelajar">Pelajar</option>
                      <option value="mahasiswa">Mahasiswa</option>
                      <option value="pegawai">Pegawai</option>
                      <option value="wiraswasta">Wiraswasta</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  {form.pekerjaan === "lainnya" ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Pekerjaan Lainnya</label>
                      <input
                        type="text"
                        value={form.pekerjaanLain || ""}
                        onChange={(e) => setForm((s) => ({ ...s, pekerjaanLain: e.target.value }))}
                        className="w-full px-3 py-2 rounded border border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Sebutkan pekerjaan Anda"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Row 3b: Subjek (full width) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subjek</label>
                  <input
                    name="subjek"
                    value={form.subjek}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded border border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Subjek singkat"
                  />
                </div>

                {/* Row 4: Tujuan | Upload KTP */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-start">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tujuan</label>
                    <select
                      name="tujuan"
                      value={form.tujuan}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded border transition-all ${errors.tujuan ? "border-red-400 bg-red-50" : "border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"} focus:outline-none`}
                    >
                      {tujuanOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.tujuan && <p className="text-xs text-red-600 mt-1">{errors.tujuan}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Unggah Data Diri (KTP)</label>
                    <div className="flex items-center gap-3">
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFile}
                        className="text-sm file:bg-emerald-600 file:text-white file:px-3 file:py-1 file:rounded file:border-0 file:cursor-pointer hover:file:bg-emerald-700"
                      />
                      <div className="text-xs text-slate-500">{fileName || "Tidak ada file"}</div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">.pdf, .jpg, .png, .jpeg (maks 5MB)</div>
                  </div>
                </div>

                {/* Row 5: Pesan */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pesan / Pertanyaan</label>
                  <textarea
                    name="pesan"
                    value={form.pesan}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-3 py-2 rounded border transition-all ${errors.pesan ? "border-red-400 bg-red-50" : "border-emerald-200 bg-emerald-50/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"} focus:outline-none resize-none`}
                    placeholder="Tulis pesan atau pertanyaan Anda..."
                  />
                  {errors.pesan && <p className="text-xs text-red-600 mt-1">{errors.pesan}</p>}
                </div>

                <div className="flex items-center justify-center mb-4">
                  <div className="flex flex-col items-center gap-3">
                    {/* placeholder reCAPTCHA box */}
                    <div className="w-36 h-10 border border-emerald-200 rounded flex items-center justify-center text-xs text-slate-600 bg-emerald-50/50 shadow-sm">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600"
                        />
                        <span className="text-xs select-none">Saya bukan robot</span>
                      </label>
                    </div>

                    <div className="text-xs text-slate-500 text-center">Centang untuk verifikasi reCAPTCHA</div>
                  </div>
                </div>
                {errors.agree && <p className="text-xs text-red-600 mb-3">{errors.agree}</p>}

                {/* Submit button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full md:w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transform transition-transform hover:scale-105"
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
