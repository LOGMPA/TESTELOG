import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-[1100px] mx-auto p-6">
      <div className="bg-white/80 border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Casa</h1>
        <p className="text-slate-600 mt-2">
          Isso aqui é a versão “dá pra subir no GitHub sem Base44” do teu painel.
          Ele lê dados de <span className="font-mono">/public/data/*.json</span>.
        </p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Link to="/painel" className="p-4 rounded-2xl border border-slate-200 bg-white hover:shadow transition">
            <div className="text-lg font-semibold text-slate-900">Painel</div>
            <div className="text-sm text-slate-500">Gráficos e resumos</div>
          </Link>
          <Link to="/importar" className="p-4 rounded-2xl border border-slate-200 bg-white hover:shadow transition">
            <div className="text-lg font-semibold text-slate-900">Dados</div>
            <div className="text-sm text-slate-500">Trocar/validar JSON</div>
          </Link>
          <Link to="/custos" className="p-4 rounded-2xl border border-slate-200 bg-white hover:shadow transition">
            <div className="text-lg font-semibold text-slate-900">Custos (guard)</div>
            <div className="text-sm text-slate-500">Com senha boba</div>
          </Link>
        </div>

        <div className="mt-6 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Como rodar local:</p>
          <pre className="mt-2 p-3 rounded-xl bg-slate-900 text-slate-50 overflow-auto text-xs">
{`npm i
npm run dev`}
          </pre>
          <p className="mt-4 font-semibold text-slate-900">Como publicar no GitHub Pages:</p>
          <ol className="list-decimal ml-5 mt-2 space-y-1">
            <li>Suba o conteúdo do zip num repositório.</li>
            <li>Rode <span className="font-mono">npm i</span> e <span className="font-mono">npm run build</span>.</li>
            <li>Ative Pages apontando pra branch/pasta do build (ou use GitHub Actions se quiser).</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
