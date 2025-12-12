import React, { useMemo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatCurrency } from '../../../lib/format'

export default function PecasTab({ pedidos }) {
  const fretes = useMemo(() => pedidos.filter(p => String(p.tipo||'').includes('Frete Peças') || p.tipo === 'Munck'), [pedidos])

  const porTipo = useMemo(() => {
    const acc = {}
    for (const p of fretes) {
      const k = p.tipo || 'Outros'
      if (!acc[k]) acc[k] = { tipo: k, total: 0 }
      acc[k].total += p.valor || 0
    }
    return Object.values(acc).sort((a,b) => b.total - a.total)
  }, [fretes])

  return (
    <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
      <div className="font-semibold text-slate-700 mb-2">Peças: custo por tipo</div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={porTipo}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tipo" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(1)}k`} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Bar dataKey="total" fill="#f59e0b" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
