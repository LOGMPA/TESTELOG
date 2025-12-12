import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ImportarDados from './pages/ImportarDados.jsx'
import Custos from './pages/Custos.jsx'

const TopNav = () => {
  const link = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg text-sm font-medium transition ${
          isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-white'
        }`
      }
    >
      {label}
    </NavLink>
  )

  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white grid place-items-center font-black">L</div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900">Painel Logística 2026</div>
            <div className="text-xs text-slate-500">GitHub-friendly (porque a vida já é difícil)</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/70 border border-slate-200 rounded-xl p-1">
          {link('/', 'Casa')}
          {link('/painel', 'Painel')}
          {link('/importar', 'Dados')}
          {link('/custos', 'Custos (guard)')}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/painel" element={<Dashboard />} />
        <Route path="/importar" element={<ImportarDados />} />
        <Route path="/custos" element={<Custos />} />
      </Routes>
    </div>
  )
}
