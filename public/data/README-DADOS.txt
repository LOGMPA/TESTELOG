COMO TROCAR PELOS DADOS REAIS (LOGISTICA.2026)
1) Exporte suas abas (MAQ / PEDIDOS / METAS / DOCUMENTOS) pra JSON (ou CSV e converta pra JSON).
2) Substitua estes arquivos:
   - public/data/maquinas.json
   - public/data/pedidos.json
   - public/data/metas.json
   - public/data/documentos.json
3) Campos esperados:
   maquinas: status, data (YYYY-MM-DD), frete, km, proprio, terceiro, filial_custos, equipamento, tipo, transportadora, origem, destino
   pedidos: tipo, filial, data, fornecedor, valor, nota
   metas: mes (YYYY-MM-DD), filial, meta_frete, tipo
   documentos: caminhao, documento, data_validade, status
