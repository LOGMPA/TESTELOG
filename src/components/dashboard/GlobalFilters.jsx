import React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function GlobalFilters({ dateRange, setDateRange, selectedFilial, setSelectedFilial, filiais }) {
  const toISO = (d) => format(d, 'yyyy-MM-dd')
  const fromISO = (s) => new Date(s + 'T00:00:00')

  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="text-sm font-semibold text-slate-700">Filtros</div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-600">De</div>
          <input
            type="date"
            value={toISO(dateRange.from)}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: fromISO(e.target.value) }))}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white"
          />
          <div className="text-sm text-slate-600">até</div>
          <input
            type="date"
            value={toISO(dateRange.to)}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: fromISO(e.target.value) }))}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white"
          />
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-600">Filial</div>
          <select
            value={selectedFilial}
            onChange={(e) => setSelectedFilial(e.target.value)}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white"
          >
            <option value="all">Todas</option>
            {filiais.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-500 hidden md:block">
          Período atual: {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} → {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
        </div>
      </div>
    </div>
  )
}
