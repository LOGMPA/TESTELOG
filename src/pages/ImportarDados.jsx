import React from 'react'

export default function ImportarDados() {
  return (
    <div className="max-w-[1100px] mx-auto p-6">
      <div className="bg-white/80 border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Dados</h1>
        <p className="text-slate-600 mt-2">
          Aqui não tem “importar pro banco” (porque no GitHub Pages não existe backend).
          O painel lê JSON direto de <span className="font-mono">public/data</span>.
        </p>

        <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-slate-50 text-sm overflow-auto">
          <div className="font-semibold mb-2">Arquivos:</div>
          <ul className="list-disc ml-5 space-y-1">
            <li><span className="font-mono">public/data/maquinas.json</span></li>
            <li><span className="font-mono">public/data/pedidos.json</span></li>
            <li><span className="font-mono">public/data/metas.json</span></li>
            <li><span className="font-mono">public/data/documentos.json</span></li>
          </ul>
        </div>

        <div className="mt-6 text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Jeito mais fácil de alimentar isso:</p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Exporta as abas do Excel pra CSV.</li>
            <li>Converte CSV → JSON (qualquer conversor online ou script).</li>
            <li>Substitui os arquivos em <span className="font-mono">public/data</span>.</li>
          </ol>
          <p className="text-slate-500 text-xs">
            Se quiser, dá pra eu te mandar um script que converte CSV pra JSON com os campos certinhos.
          </p>
        </div>
      </div>
    </div>
  )
}
