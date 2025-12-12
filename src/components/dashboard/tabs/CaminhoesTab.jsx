import React, { useMemo } from 'react'
import { formatCurrency } from '../../../lib/format'
import { parseISO, differenceInDays } from 'date-fns'

export default function CaminhoesTab({ maquinas, documentos }) {
  const concluidos = useMemo(() => maquinas.filter(m => m.status === 'CONCLUIDO' || m.status === 'CONCLUIDO (D)'), [maquinas])

  const totalProprio = useMemo(() => concluidos.reduce((a,m) => a + (m.proprio||0), 0), [concluidos])
  const kmProprio = useMemo(() => concluidos.filter(m => (m.proprio||0) > 0).reduce((a,m) => a + (m.km||0), 0), [concluidos])
  const custoKm = kmProprio > 0 ? totalProprio / kmProprio : 0

  const docs = useMemo(() => {
    const today = new Date()
    return (documentos || []).map(d => {
      const venc = d.data_validade ? parseISO(d.data_validade) : null
      const dias = venc ? differenceInDays(venc, today) : null
      return { ...d, dias }
    }).sort((a,b) => (a.dias ?? 99999) - (b.dias ?? 99999))
  }, [documentos])

  return (
    <div className="space-y-6">
      <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
        <div className="font-semibold text-slate-700 mb-2">Frota própria (proxy)</div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 text-white">
            <div className="text-xs text-slate-300">Custo próprio (máquinas)</div>
            <div className="text-2xl font-extrabold">{formatCurrency(totalProprio)}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <div className="text-xs text-slate-500">KM próprio</div>
            <div className="text-2xl font-extrabold text-slate-900">{kmProprio.toLocaleString('pt-BR')}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <div className="text-xs text-slate-500">Custo médio / km</div>
            <div className="text-2xl font-extrabold text-slate-900">R$ {custoKm.toFixed(2)}</div>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-3">
          Isso fica perfeito quando você colocar os custos reais da frota (combustível, manutenção, pneus, pedágio etc.).
        </div>
      </div>

      <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
        <div className="font-semibold text-slate-700 mb-2">Documentos e vencimentos</div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2 pr-4">Caminhão</th>
                <th className="py-2 pr-4">Documento</th>
                <th className="py-2 pr-4">Validade</th>
                <th className="py-2 pr-4">Dias</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={i} className="border-t border-slate-200">
                  <td className="py-2 pr-4 font-medium text-slate-900">{d.caminhao}</td>
                  <td className="py-2 pr-4">{d.documento}</td>
                  <td className="py-2 pr-4">{d.data_validade}</td>
                  <td className="py-2 pr-4">{d.dias ?? '-'}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      (d.dias ?? 99999) <= 30 ? 'bg-red-100 text-red-700'
                      : (d.dias ?? 99999) <= 60 ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {d.status || 'OK'}
                    </span>
                  </td>
                </tr>
              ))}
              {docs.length === 0 ? (
                <tr><td className="py-3 text-slate-500" colSpan="5">Sem documentos no JSON.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
