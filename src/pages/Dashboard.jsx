import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { dataClient } from '../api/dataClient'
import GlobalFilters from '../components/dashboard/GlobalFilters'
import SummaryCards from '../components/dashboard/SummaryCards'
import Tabs from '../components/ui/Tabs'

import MaquinasTab from '../components/dashboard/tabs/MaquinasTab'
import PecasTab from '../components/dashboard/tabs/PecasTab'
import PorLojaTab from '../components/dashboard/tabs/PorLojaTab'
import MetasTab from '../components/dashboard/tabs/MetasTab'
import RankingTab from '../components/dashboard/tabs/RankingTab'
import CaminhoesTab from '../components/dashboard/tabs/CaminhoesTab'

export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 9, 1),
    to: new Date(2026, 9, 31),
  })
  const [selectedFilial, setSelectedFilial] = useState('all')

  const { data: maquinas = [], isLoading: l1, error: e1 } = useQuery({ queryKey: ['maquinas'], queryFn: dataClient.maquinas })
  const { data: pedidos = [], isLoading: l2, error: e2 } = useQuery({ queryKey: ['pedidos'], queryFn: dataClient.pedidos })
  const { data: metas = [], isLoading: l3, error: e3 } = useQuery({ queryKey: ['metas'], queryFn: dataClient.metas })
  const { data: documentos = [], isLoading: l4, error: e4 } = useQuery({ queryKey: ['documentos'], queryFn: dataClient.documentos })

  const isLoading = l1 || l2 || l3 || l4
  const error = e1 || e2 || e3 || e4

  const filiais = useMemo(() => {
    const s = new Set([
      ...maquinas.map(m => m.filial_custos).filter(Boolean),
      ...pedidos.map(p => p.filial).filter(Boolean),
      ...metas.map(m => m.filial).filter(Boolean),
    ])
    return Array.from(s).sort()
  }, [maquinas, pedidos, metas])

  const filteredMaquinas = useMemo(() => {
    return maquinas.filter(m => {
      if (!m.data) return false
      const d = parseISO(m.data)
      const inRange = isWithinInterval(d, { start: startOfDay(dateRange.from), end: endOfDay(dateRange.to) })
      const filialMatch = selectedFilial === 'all' || m.filial_custos === selectedFilial
      return inRange && filialMatch
    })
  }, [maquinas, dateRange, selectedFilial])

  const filteredPedidos = useMemo(() => {
    return pedidos.filter(p => {
      if (!p.data) return false
      const d = parseISO(p.data)
      const inRange = isWithinInterval(d, { start: startOfDay(dateRange.from), end: endOfDay(dateRange.to) })
      const filialMatch = selectedFilial === 'all' || p.filial === selectedFilial
      return inRange && filialMatch
    })
  }, [pedidos, dateRange, selectedFilial])

  const filteredMetas = useMemo(() => {
    return metas.filter(m => {
      if (!m.mes) return false
      const d = parseISO(m.mes)
      const inRange = isWithinInterval(d, { start: startOfDay(dateRange.from), end: endOfDay(dateRange.to) })
      const filialMatch = selectedFilial === 'all' || m.filial === selectedFilial
      return inRange && filialMatch
    })
  }, [metas, dateRange, selectedFilial])

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-slate-900 animate-spin" />
          <p className="text-slate-600 font-medium">Carregando dados...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-[1100px] mx-auto p-6">
        <div className="bg-white border border-red-200 rounded-2xl p-6">
          <div className="text-lg font-bold text-red-700">Erro carregando dados</div>
          <div className="text-sm text-slate-600 mt-2">
            {String(error.message || error)}
          </div>
          <div className="text-xs text-slate-500 mt-3">
            Confere se os JSONs existem em <span className="font-mono">public/data</span>.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Painel de Análise de Fretes</h1>
          <p className="text-slate-500 mt-1">Máquinas, peças e caminhões.</p>
        </div>

        <GlobalFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedFilial={selectedFilial}
          setSelectedFilial={setSelectedFilial}
          filiais={filiais}
        />

        <SummaryCards maquinas={filteredMaquinas} pedidos={filteredPedidos} metas={filteredMetas} />

        <Tabs
          tabs={[
            { key: 'maquinas', label: 'Máquinas', content: <MaquinasTab maquinas={filteredMaquinas} pedidos={filteredPedidos} /> },
            { key: 'pecas', label: 'Peças', content: <PecasTab pedidos={filteredPedidos} /> },
            { key: 'lojas', label: 'Por loja', content: <PorLojaTab maquinas={filteredMaquinas} pedidos={filteredPedidos} /> },
            { key: 'metas', label: 'Metas', content: <MetasTab maquinas={filteredMaquinas} pedidos={filteredPedidos} metas={filteredMetas} /> },
            { key: 'ranking', label: 'Ranking', content: <RankingTab maquinas={filteredMaquinas} pedidos={filteredPedidos} /> },
            { key: 'caminhoes', label: 'Caminhões', content: <CaminhoesTab maquinas={filteredMaquinas} documentos={documentos} /> },
          ]}
        />
      </div>
    </div>
  )
}
