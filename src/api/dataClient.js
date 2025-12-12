async function getJson(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Falha ao carregar ${path}: ${res.status}`)
  return res.json()
}

export const dataClient = {
  maquinas: () => getJson('./data/maquinas.json'),
  pedidos: () => getJson('./data/pedidos.json'),
  metas: () => getJson('./data/metas.json'),
  documentos: () => getJson('./data/documentos.json'),
}
