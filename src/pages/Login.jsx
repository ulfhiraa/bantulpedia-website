// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroBg from "../assets/pandansimo1.jpg";
import googleIcon from "../assets/globe.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email wajib diisi";
    if (!password) e.password = "Password wajib diisi";
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
      navigate("/");
    }, 900);
  };

  const handleGoogleLogin = () => {
    alert("Google Login belum dikonfigurasikan :)");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      
      {/* NAVBAR */}
      <div className="z-50 relative">
        <Navbar />
      </div>

      {/* BACKGROUND */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-none" />

        {/* CARD LOGIN */}
        <div className="relative z-30 flex items-center justify-center h-full px-4 pt-10">

          <div className="w-full max-w-sm">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">

              <div className="flex flex-col items-center gap-2 mb-4">
                <h2 className="text-2xl font-extrabold text-white">Log in</h2>
              </div>

              {/* ERROR GLOBAL */}
              {errors.submit && (
                <p className="text-sm text-red-300 text-center mb-3">
                  {errors.submit}
                </p>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-3">

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-md px-4 py-3 bg-white/90 focus:outline-none ${
                      errors.email ? "ring-2 ring-red-400" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-md px-4 py-3 bg-white/90 focus:outline-none ${
                      errors.password ? "ring-2 ring-red-400" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-300 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* BUTTON LOGIN */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 disabled:opacity-70 transition"
                >
                  {loading ? "Memproses..." : "Login"}
                </button>
              </form>

              {/* OR */}
              <div className="flex items-center gap-3 my-5">
                <div className="h-px bg-white/30 flex-1" />
                <span className="text-white/80 text-sm">atau</span>
                <div className="h-px bg-white/30 flex-1" />
              </div>

              {/* GOOGLE LOGIN */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white/90 hover:bg-white text-slate-800 font-medium rounded-full py-2.5 flex items-center justify-center gap-3 transition"
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                Masuk dengan Google
              </button>

              {/* LINK REGISTER */}
              <div className="mt-5 text-center text-sm text-white/80">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-emerald-300 hover:underline font-medium"
                >
                  Daftar
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
