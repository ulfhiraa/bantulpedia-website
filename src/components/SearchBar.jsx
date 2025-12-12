import React from 'react'

export default function SearchBar({ onSearch }) {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* <input
        type="text"
        placeholder="Cari Layanan..."
        className="flex-1 py-3 px-4 rounded-full outline-none border border-white/20 bg-white/95 placeholder:text-slate-500 shadow-sm"
        style={{ minWidth: 0 }} // penting agar input flex shrink di split view
      />
      <button
        onClick={() => onSearch && onSearch()}
        className="py-2 px-5 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition whitespace-nowrap"
      >
        Cari
      </button> */}
    </div>
  )
}
