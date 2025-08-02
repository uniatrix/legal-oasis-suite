import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nrzftrxvlmtdlgyjyypz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemZ0cnh2bG10ZGxneWp5eXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODExNTUsImV4cCI6MjA2MzY1NzE1NX0.e25wq1v-w438dAFe7Zjwu5HRz4xW3sL8MftnZEvnfgI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ConsultaImoveisSubmission {
  id?: number
  created_at?: string
  nome: string
  email: string
  telefone: string
  tipo_imovel: string
  situacao_imovel: string
  horario_preferido: string
  descricao_problema: string
  arquivado?: boolean
  arquivado_em?: string
}