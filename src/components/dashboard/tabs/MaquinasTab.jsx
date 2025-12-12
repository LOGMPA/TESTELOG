import React, { useMemo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts'
import { formatCurrency } from '../../../lib/format'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899']

export default function MaquinasTab({ maquinas }) {
  const concluidos = useMemo(() => maquinas.filter(m => m.status === 'CONCLUIDO' || m.status === 'CONCLUIDO (D)'), [maquinas])

  const evolucaoData = useMemo(() => {
    const acc = {}
    for (const m of concluidos) {
      if (!m.data) continue
      const mes = format(parseISO(m.data), 'MMM/yy', { locale: ptBR })
      if (!acc[mes]) acc[mes] = { mes, proprio: 0, terceiro: 0, total: 0 }
      acc[mes].proprio += m.proprio || 0
      acc[mes].terceiro += m.terceiro || 0
      acc[mes].total += (m.proprio || 0) + (m.terceiro || 0)
    }
    return Object.values(acc)
  }, [concluidos])

  const porEquipamento = useMemo(() => {
    const acc = {}
    for (const m of concluidos) {
      const k = m.equipamento || 'Outros'
      if (!acc[k]) acc[k] = { equipamento: k, total: 0 }
      acc[k].total += (m.proprio || 0) + (m.terceiro || 0)
    }
    return Object.values(acc).sort((a,b) => b.total - a.total)
  }, [concluidos])

  const porArea = useMemo(() => {
    const acc = {}
    for (const m of concluidos) {
      let grupo = 'Outros'
      if (m.tipo === 'Máquina Nova') grupo = 'Vendas'
      else if (m.tipo === 'Máquina Usada' || m.tipo === 'Serviços') grupo = 'Usados/Serviços'
      else if (m.tipo === 'Demonstração') grupo = 'Demonstração'
      if (!acc[grupo]) acc[grupo] = { name: grupo, value: 0 }
      acc[grupo].value += (m.proprio || 0) + (m.terceiro || 0)
    }
    return Object.values(acc)
  }, [concluidos])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
          <div className="font-semibold text-slate-700 mb-2">Evolução mensal (Próprio x Terceiro)</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={evolucaoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="proprio" name="Próprio" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="terceiro" name="Terceiro" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
          <div className="font-semibold text-slate-700 mb-2">Frete por tipo de máquina</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={porEquipamento} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="equipamento" tick={{ fontSize: 11 }} width={110} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="total" fill="#8b5cf6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
          <div className="font-semibold text-slate-700 mb-2">Frete por área de operação</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={porArea} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}
                label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}>
                {porArea.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
          <div className="font-semibold text-slate-700 mb-2">Total mensal (linha)</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={evolucaoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Line type="monotone" dataKey="total" stroke="#111827" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
