import React from 'react'
import { formatCurrency } from '../../lib/format'

const Card = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
    <div className="text-sm text-slate-500 font-medium">{title}</div>
    <div className="text-2xl font-bold text-slate-800 mt-1">{value}</div>
    {subtitle ? <div className="text-xs text-slate-400 mt-1">{subtitle}</div> : null}
  </div>
)

export default function SummaryCards({ maquinas, pedidos, metas }) {
  const totalMaquinas = maquinas.reduce((acc, m) => acc + (m.proprio || 0) + (m.terceiro || 0), 0)
  const totalPecas = pedidos
    .filter(p => String(p.tipo || '').includes('Frete Peças') || p.tipo === 'Munck')
    .reduce((acc, p) => acc + (p.valor || 0), 0)
  const totalGeral = totalMaquinas + totalPecas

  const totalMeta = metas.reduce((acc, m) => acc + (m.meta_frete || 0), 0)
  const atingimento = totalMeta > 0 ? (totalGeral / totalMeta) * 100 : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card title="Frete Total" value={formatCurrency(totalGeral)} subtitle="Máquinas + Peças" />
      <Card title="Frete Máquinas" value={formatCurrency(totalMaquinas)} subtitle={`${maquinas.length} operações`} />
      <Card title="Frete Peças" value={formatCurrency(totalPecas)} subtitle="Motoboy + Transportadora + Munck" />
      <Card title="Atingimento Meta" value={`${atingimento.toFixed(1)}%`} subtitle={`Meta: ${formatCurrency(totalMeta)}`} />
    </div>
  )
}
