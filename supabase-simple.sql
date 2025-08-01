-- VERSÃO SIMPLES - Execute tudo de uma vez

-- 1. Adicionar colunas de arquivamento
ALTER TABLE consulta_imoveis_submissions 
ADD COLUMN IF NOT EXISTS arquivado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS arquivado_em TIMESTAMP WITH TIME ZONE;

-- 2. Adicionar colunas de controle do WhatsApp
ALTER TABLE consulta_imoveis_submissions 
ADD COLUMN IF NOT EXISTS whatsapp_enviado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS whatsapp_enviado_em TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS whatsapp_provider TEXT;

-- 3. Atualizar registros existentes
UPDATE consulta_imoveis_submissions 
SET arquivado = FALSE, whatsapp_enviado = FALSE
WHERE arquivado IS NULL OR whatsapp_enviado IS NULL;

-- 4. Criar índices
CREATE INDEX IF NOT EXISTS idx_consulta_imoveis_arquivado 
ON consulta_imoveis_submissions(arquivado);

CREATE INDEX IF NOT EXISTS idx_consulta_imoveis_whatsapp 
ON consulta_imoveis_submissions(whatsapp_enviado);

-- 5. Desabilitar RLS temporariamente para teste (CUIDADO: só para desenvolvimento)
ALTER TABLE consulta_imoveis_submissions DISABLE ROW LEVEL SECURITY;

-- OU se preferir manter RLS habilitado, execute estes comandos:
-- ALTER TABLE consulta_imoveis_submissions ENABLE ROW LEVEL SECURITY;
-- 
-- DROP POLICY IF EXISTS "Allow public deletes" ON consulta_imoveis_submissions;
-- CREATE POLICY "Allow public deletes" ON consulta_imoveis_submissions FOR DELETE USING (true);
-- 
-- DROP POLICY IF EXISTS "Allow public updates" ON consulta_imoveis_submissions;  
-- CREATE POLICY "Allow public updates" ON consulta_imoveis_submissions FOR UPDATE USING (true);