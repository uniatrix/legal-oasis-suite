-- Script para remover a coluna situacao_imovel da tabela consulta_imoveis_submissions
-- Execute este script no seu banco de dados Supabase

-- 1. Primeiro, vamos verificar se a coluna existe
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'consulta_imoveis_submissions' 
-- AND column_name = 'situacao_imovel';

-- 2. Remover a coluna situacao_imovel se ela existir
ALTER TABLE consulta_imoveis_submissions 
DROP COLUMN IF EXISTS situacao_imovel;

-- 3. Verificar a estrutura final da tabela
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'consulta_imoveis_submissions' 
ORDER BY ordinal_position;

-- 4. Atualizar a tabela de abandoned_leads_imoveis também (se existir)
ALTER TABLE abandoned_leads_imoveis 
DROP COLUMN IF EXISTS situacaoimovel;

-- Estrutura final esperada:
-- id (bigint, primary key)
-- created_at (timestamp with time zone)
-- nome (text)
-- email (text)
-- telefone (text)
-- tipo_imovel (text)
-- horario_preferido (text)
-- descricao_problema (text)
-- arquivado (boolean) - se foi adicionado anteriormente
-- arquivado_em (timestamp with time zone) - se foi adicionado anteriormente