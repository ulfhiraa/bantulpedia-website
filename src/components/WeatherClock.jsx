// src/components/WeatherClock.jsx
import React, { useEffect, useState } from 'react'

export default function WeatherClock({ large = false }) {
  const [time, setTime] = useState(new Date())
  const [weather] = useState({ temp: 27, desc: 'Mendung', wind: 7 })

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const containerClass = large
    ? 'w-full bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-wrap justify-between gap-4 items-center border border-white/20 shadow-xl'
    : 'max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-wrap justify-between gap-4 items-center border border-white/20 shadow'

  const itemClass = large ? 'flex-1 min-w-[160px] text-center' : 'flex-1 min-w-[120px] text-center'

  const labelClass = large ? 'text-sm text-white/80' : 'text-sm text-slate-700'
  const valueClass = large ? 'text-2xl font-bold text-white' : 'text-lg font-semibold text-slate-800'

  return (
    <div className={containerClass}>
      <div className={itemClass}>
        <div className={labelClass}>Waktu</div>
        <div className={valueClass}>{time.toLocaleTimeString()}</div>
      </div>

      <div className={itemClass}>
        <div className={labelClass}>Suhu</div>
        <div className={valueClass}>{weather.temp}°C</div>
      </div>

      <div className={itemClass}>
        <div className={labelClass}>Kondisi</div>
        <div className={valueClass}>{weather.desc}</div>
      </div>

      {/* <div className={itemClass}>
        <div className={labelClass}>Angin</div>
        <div className={valueClass}>{weather.wind} m/s</div>
      </div> */}
    </div>
  )
}
