-- Script para remover colunas relacionadas ao WhatsApp
-- Execute este script no seu banco de dados Supabase

-- 1. Remover índice relacionado ao WhatsApp
DROP INDEX IF EXISTS idx_consulta_imoveis_whatsapp;

-- 2. Remover colunas relacionadas ao WhatsApp
ALTER TABLE consulta_imoveis_submissions 
DROP COLUMN IF EXISTS whatsapp_enviado,
DROP COLUMN IF EXISTS whatsapp_enviado_em,
DROP COLUMN IF EXISTS whatsapp_provider;

-- 3. Verificar estrutura da tabela após remoção
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'consulta_imoveis_submissions' 
-- ORDER BY ordinal_position;