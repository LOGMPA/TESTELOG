import React, { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useCustosAuth } from "../../hooks/useCustosAuth.jsx";

export default function CustosGuard({ children }) {
  const { autorizado, validarSenha } = useCustosAuth();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  if (autorizado) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = validarSenha(senha);
    if (!ok) setErro("Senha errada. E não, chorar não ajuda.");
    else setErro("");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="w-full max-w-md bg-white/90 border border-slate-200 rounded-2xl shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white grid place-items-center">
            <LockKeyhole className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">Área de Custos</div>
            <div className="text-sm text-slate-500">Proteção nível: "não é pra mexer".</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erro ? <div className="text-sm text-red-600">{erro}</div> : null}
          <button
            className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
            type="submit"
          >
            Entrar
          </button>
          <div className="text-xs text-slate-500">
            Dica: a senha padrão no código é <span className="font-mono">MACPONTA2026</span> (troca depois).
          </div>
        </form>
      </div>
    </div>
  );
}
