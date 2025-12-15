// src/components/Hero.jsx
import React from 'react'
import phones from '../assets/phones.png'
import heroBg from '../assets/hero-bg.jpg'
import SearchBar from './SearchBar'
import WeatherClock from './WeatherClock' // pastikan path benar

export default function Hero() {
  return (
    <section className="relative">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover filter scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                        h-[95vh] md:h-[110vh] lg:h-[100vh] flex items-start">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-start pt-20 md:pt-28">
            {/* Left */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-start">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight text-white max-w-3xl">
                Portal Informasi <br /> Kabupaten Bantul
              </h1>

              <p className="mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl">
                Akses mudah untuk berbagai layanan, informasi wisata, UMKM, dan berita terkini seputar Bantul.
              </p>

              <div className="mt-8 w-full max-w-xl">
                <SearchBar />
              </div>
            </div>

            {/* Right */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end items-start">
              <div className="relative w-60 lg:w-72" style={{ marginLeft: 30 }}>
                <img src={phones} alt="phones" className="w-full h-auto transform -rotate-12 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- WEATHER CARD: pindahkan KE SINI agar shadow/blur menampilkan hero (bukan putih) --- */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 w-[92%] max-w-5xl z-20">
        <WeatherClock large />
      </div>
    </section>
  )
}
