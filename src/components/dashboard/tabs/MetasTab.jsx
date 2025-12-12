import React, { useMemo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { formatCurrency } from '../../../lib/format'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function MetasTab({ maquinas, pedidos, metas }) {
  const concluidos = useMemo(() => maquinas.filter(m => m.status === 'CONCLUIDO' || m.status === 'CONCLUIDO (D)'), [maquinas])
  const pecas = useMemo(() => pedidos.filter(p => String(p.tipo||'').includes('Frete Peças') || p.tipo === 'Munck'), [pedidos])

  const porMes = useMemo(() => {
    const acc = {}
    const add = (mes, campo, valor) => {
      if (!acc[mes]) acc[mes] = { mes, real: 0, meta: 0 }
      acc[mes][campo] += valor
    }

    for (const m of concluidos) {
      if (!m.data) continue
      const mes = format(parseISO(m.data), 'MMM/yy', { locale: ptBR })
      add(mes, 'real', (m.proprio||0) + (m.terceiro||0))
    }
    for (const p of pecas) {
      if (!p.data) continue
      const mes = format(parseISO(p.data), 'MMM/yy', { locale: ptBR })
      add(mes, 'real', (p.valor||0))
    }
    for (const mt of metas) {
      if (!mt.mes) continue
      const mes = format(parseISO(mt.mes), 'MMM/yy', { locale: ptBR })
      add(mes, 'meta', (mt.meta_frete||0))
    }

    return Object.values(acc)
  }, [concluidos, pecas, metas])

  return (
    <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
      <div className="font-semibold text-slate-700 mb-2">Real x Meta (mensal)</div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={porMes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Legend />
          <Bar dataKey="real" name="Real" fill="#111827" radius={[6,6,0,0]} />
          <Bar dataKey="meta" name="Meta" fill="#3b82f6" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs text-slate-500 mt-2">
        Se teus dados reais tiverem meta separada por área, a gente ajusta o agrupamento.
      </div>
    </div>
  )
}
