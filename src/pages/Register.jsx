// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroBg from "../assets/pandansimo1.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email wajib diisi";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) e.email = "Format email tidak valid";
    }
    if (!password) e.password = "Password wajib diisi";
    else if (password.length < 6) e.password = "Password minimal 6 karakter";

    if (!confirm) e.confirm = "Konfirmasi password wajib diisi";
    else if (password !== confirm) e.confirm = "Password tidak cocok";

    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 900);
  };

  return (
    <div className="relative min-h-screen h-screen overflow-hidden flex flex-col">
      {/* NAVBAR */}
      <div className="z-[9999]">
        <Navbar />
      </div>

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-110 z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-none z-0" />

      {/* FORM CONTAINER */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-4 pt-20">
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white">Register</h2>
            </div>

            <form className="mt-6" onSubmit={handleSubmit} noValidate>
              {errors.submit && (
                <div className="mb-3 text-sm text-red-300 text-center">
                  {errors.submit}
                </div>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full rounded-md px-4 py-3 mb-3 bg-white/90 focus:outline-none ${
                  errors.email ? "ring-2 ring-red-400" : ""
                }`}
              />
              {errors.email && (
                <div className="text-xs text-red-300 mb-2">{errors.email}</div>
              )}

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full rounded-md px-4 py-3 mb-3 bg-white/90 focus:outline-none ${
                  errors.email ? "ring-2 ring-red-400" : ""
                }`}
              />
              {errors.password && (
                <div className="text-xs text-red-300 mb-2">
                  {errors.password}
                </div>
              )}

              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Konfirmasi Password"
                className={`w-full rounded-md px-4 py-3 mb-3 bg-white/90 focus:outline-none ${
                  errors.email ? "ring-2 ring-red-400" : ""
                }`}
              />
              {errors.confirm && (
                <div className="text-xs text-red-300 mb-2">{errors.confirm}</div>
              )}

              <button
                type="submit"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Mendaftarkan..." : "Register"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-white/80">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-emerald-300 font-medium hover:underline"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
