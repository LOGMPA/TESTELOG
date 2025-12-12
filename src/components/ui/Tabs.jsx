import React, { useState } from 'react'

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs?.[0]?.key)

  const current = tabs.find(t => t.key === active) || tabs[0]

  return (
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur border border-slate-200/60 p-1 rounded-2xl mb-6 flex flex-wrap gap-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              active === t.key ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  )
}
