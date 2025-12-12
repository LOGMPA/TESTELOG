import { useEffect, useMemo, useState } from "react";

/**
 * Guard tosco (e eficiente) pra esconder a aba "Custos" no GitHub.
 * Isso NÃO é segurança real. É só "não deixa fácil".
 */
const STORAGE_KEY = "custos_autorizado";

export function useCustosAuth() {
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    setAutorizado(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const validarSenha = (senha) => {
    // Troca aqui a senha. Simples. Direto. Sem drama.
    const ok = senha === "MACPONTA2026";
    if (ok) {
      localStorage.setItem(STORAGE_KEY, "1");
      setAutorizado(true);
    }
    return ok;
  };

  const sair = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAutorizado(false);
  };

  return useMemo(() => ({ autorizado, validarSenha, sair }), [autorizado]);
}
