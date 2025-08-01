-- Execute estes comandos UM POR VEZ no SQL Editor do Supabase

-- PASSO 1: Adicionar coluna arquivado
ALTER TABLE consulta_imoveis_submissions 
ADD COLUMN arquivado BOOLEAN DEFAULT FALSE;

-- PASSO 2: Adicionar coluna arquivado_em
ALTER TABLE consulta_imoveis_submissions 
ADD COLUMN arquivado_em TIMESTAMP WITH TIME ZONE;

-- PASSO 3: Atualizar registros existentes
UPDATE consulta_imoveis_submissions 
SET arquivado = FALSE 
WHERE arquivado IS NULL;

-- PASSO 4: Criar índice
CREATE INDEX idx_consulta_imoveis_arquivado 
ON consulta_imoveis_submissions(arquivado);

-- PASSO 5: Remover política de delete existente (se houver)
DROP POLICY IF EXISTS "Allow public deletes" ON consulta_imoveis_submissions;

-- PASSO 6: Criar nova política de delete
CREATE POLICY "Allow public deletes" ON consulta_imoveis_submissions
FOR DELETE USING (true);

-- PASSO 7: Remover política de update existente (se houver)
DROP POLICY IF EXISTS "Allow public updates" ON consulta_imoveis_submissions;

-- PASSO 8: Criar nova política de update
CREATE POLICY "Allow public updates" ON consulta_imoveis_submissions
FOR UPDATE USING (true);

-- PASSO 9: Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'consulta_imoveis_submissions';