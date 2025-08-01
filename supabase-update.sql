-- Execute este SQL no painel do Supabase (SQL Editor)

-- 1. Adicionar colunas para arquivamento
ALTER TABLE consulta_imoveis_submissions 
ADD COLUMN arquivado BOOLEAN DEFAULT FALSE,
ADD COLUMN arquivado_em TIMESTAMP WITH TIME ZONE;

-- 2. Atualizar registros existentes
UPDATE consulta_imoveis_submissions 
SET arquivado = FALSE 
WHERE arquivado IS NULL;

-- 3. Criar índice para performance
CREATE INDEX idx_consulta_imoveis_arquivado 
ON consulta_imoveis_submissions(arquivado);

-- 4. Verificar e atualizar políticas RLS para permitir exclusões
-- Primeiro, remover políticas existentes se houver conflito
DROP POLICY IF EXISTS "Allow public deletes" ON consulta_imoveis_submissions;
DROP POLICY IF EXISTS "Allow public updates" ON consulta_imoveis_submissions;

-- Criar política para permitir exclusões
CREATE POLICY "Allow public deletes" ON consulta_imoveis_submissions
  FOR DELETE USING (true);

-- Criar política para permitir updates (para arquivamento)
CREATE POLICY "Allow public updates" ON consulta_imoveis_submissions
  FOR UPDATE USING (true);