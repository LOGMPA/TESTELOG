import React, { useMemo } from 'react'
import { formatCurrency } from '../../../lib/format'

export default function RankingTab({ maquinas, pedidos }) {
  const concluidos = useMemo(() => maquinas.filter(m => m.status === 'CONCLUIDO' || m.status === 'CONCLUIDO (D)'), [maquinas])
  const fretePecas = useMemo(() => pedidos.filter(p => String(p.tipo||'').includes('Frete Peças') || p.tipo === 'Munck'), [pedidos])

  const rankingFiliais = useMemo(() => {
    const s = new Set([...concluidos.map(m => m.filial_custos), ...fretePecas.map(p => p.filial)])
    const arr = Array.from(s).filter(Boolean).map(filial => {
      const m = concluidos.filter(x => x.filial_custos === filial).reduce((a,x) => a + (x.proprio||0) + (x.terceiro||0), 0)
      const p = fretePecas.filter(x => x.filial === filial).reduce((a,x) => a + (x.valor||0), 0)
      return { filial, maquinas: m, pecas: p, total: m+p }
    }).sort((a,b) => b.total - a.total)
    return arr
  }, [concluidos, fretePecas])

  const max = rankingFiliais[0]?.total || 1

  return (
    <div className="bg-white/80 rounded-2xl border border-slate-200/60 p-4">
      <div className="font-semibold text-slate-700 mb-4">Ranking de filiais por custo total</div>

      <div className="space-y-3">
        {rankingFiliais.map((r, i) => (
          <div key={r.filial} className="p-4 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900">{i+1}. {r.filial}</div>
                <div className="text-xs text-slate-500">
                  Máquinas: {formatCurrency(r.maquinas)} • Peças: {formatCurrency(r.pecas)}
                </div>
              </div>
              <div className="font-extrabold text-slate-900">{formatCurrency(r.total)}</div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-slate-900" style={{ width: `${(r.total/max)*100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
