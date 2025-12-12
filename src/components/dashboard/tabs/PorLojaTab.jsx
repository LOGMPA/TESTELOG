import React, { useMemo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { formatCurrency } from '../../../lib/format'

export default function PorLojaTab({ maquinas, pedidos }) {
  const concluidos = useMemo(() => maquinas.filter(m => m.status === 'CONCLUIDO' || m.status === 'CONCLUIDO (D)'), [maquinas])
  const pecas = useMemo(() => pedidos.filter(p => String(p.tipo||'').includes('Frete Peças') || p.tipo === 'Munck'), [pedidos])

  const data = useMemo(() => {
    const s = new Set([
      ...concluidos.map(m => m.filial_custos).filter(Boolean),
      ...pecas.map(p => p.filial).filter(Boolean),
    ])
    return Array.from(s).map(f => {
      const maquinasTotal = concluidos.filter(m => m.filial_custos === f).reduce((a,m) => a + (m.proprio||0) + (m.terceiro||0), 0)
      const pecasTotal = pecas.filter(p => p.filial === f).reduce((a,p) => a + (p.valor||0), 0)
      return { filial: f, maquinas: maquinasTotal, pecas: pecasTotal, total: maquinasTotal + pecasTotal }
    }).sort((a,b) => b.total - a.total)
  }, [concluidos, pecas])

  return (
    <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
      <div className="font-semibold text-slate-700 mb-2">Frete por filial (Máquinas x Peças)</div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="filial" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Legend />
          <Bar dataKey="maquinas" name="Máquinas" stackId="a" fill="#10b981" />
          <Bar dataKey="pecas" name="Peças" stackId="a" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
