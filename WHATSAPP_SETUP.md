# 📱 Configuração WhatsApp API

Este sistema suporta 3 provedores de WhatsApp API. Escolha o que melhor se adequa às suas necessidades:

## 🚀 OPÇÃO 1: Evolution API (RECOMENDADA)

**Vantagens:** Gratuita, Open Source, fácil de configurar
**Desvantagens:** Requer servidor próprio

### Instalação:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/EvolutionAPI/evolution-api.git
   cd evolution-api
   ```

2. **Configure o Docker:**

   ```bash
   docker-compose up -d
   ```

3. **Acesse:** `http://localhost:8080`

4. **Configure no .env:**
   ```env
   REACT_APP_EVOLUTION_API_URL=http://localhost:8080
   REACT_APP_EVOLUTION_API_KEY=sua-api-key
   REACT_APP_EVOLUTION_INSTANCE=sua-instancia
   ```

### Criando uma instância:

```bash
curl -X POST http://localhost:8080/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: sua-api-key" \
  -d '{
    "instanceName": "seabra-moura",
    "token": "seu-token",
    "qrcode": true
  }'
```

---

## 💰 OPÇÃO 2: Twilio WhatsApp API

**Vantagens:** Confiável, suporte oficial
**Desvantagens:** Pago, requer aprovação do WhatsApp

### Configuração:

1. **Crie conta:** https://www.twilio.com/
2. **Configure WhatsApp:** Console → Messaging → WhatsApp
3. **Obtenha credenciais:**

   - Account SID
   - Auth Token
   - WhatsApp Number

4. **Configure no .env:**
   ```env
   REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxx
   REACT_APP_TWILIO_AUTH_TOKEN=xxxxx
   REACT_APP_TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

---

## 🏢 OPÇÃO 3: Meta WhatsApp Business API

**Vantagens:** Oficial do WhatsApp, recursos avançados
**Desvantagens:** Complexa, requer aprovação

### Configuração:

1. **Crie app:** https://developers.facebook.com/
2. **Configure WhatsApp Business:** Adicione produto WhatsApp
3. **Obtenha credenciais:**

   - Access Token
   - Phone Number ID

4. **Configure no .env:**
   ```env
   REACT_APP_META_ACCESS_TOKEN=EAAxxxxx
   REACT_APP_META_PHONE_NUMBER_ID=123456789
   ```

---

## 🔧 Configuração do Sistema

### 1. Execute o SQL no Supabase:

```sql
-- Adicionar colunas de controle do WhatsApp
ALTER TABLE consulta_imoveis_submissions
ADD COLUMN IF NOT EXISTS whatsapp_enviado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS whatsapp_enviado_em TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS whatsapp_provider TEXT;
```

### 2. Configure as variáveis de ambiente:

Copie `.env.example` para `.env` e configure suas credenciais.

### 3. Teste o sistema:

1. Acesse `/admin/imoveis`
2. Clique no botão verde do WhatsApp
3. Verifique os logs no console

---

## 📝 Mensagem Enviada

O sistema envia automaticamente esta mensagem:

```
Olá [NOME]! 👋

Recebemos sua solicitação de consultoria imobiliária gratuita.

✅ Confirmação de Agendamento
📞 Um de nossos advogados especializados entrará em contato via WhatsApp no horário: [HORÁRIO]

🏢 Seabra & Moura Santos Advogados
Especialistas em Direito Imobiliário

Aguarde nosso contato em breve!

Esta é uma mensagem automática. Em caso de urgência, entre em contato conosco.
```

---

## 🐛 Troubleshooting

### Erro: "Nenhum provedor configurado"

- Verifique se as variáveis de ambiente estão corretas
- Confirme se o serviço está rodando (Evolution API)

### Erro: "Número inválido"

- O sistema formata automaticamente números brasileiros
- Aceita: (11) 99999-9999 ou 11999999999

### Erro: "Unauthorized"

- Verifique API keys e tokens
- Confirme se a instância está ativa (Evolution API)

---

## 💡 Dicas

1. **Para desenvolvimento:** Use Evolution API (gratuita)
2. **Para produção:** Use Twilio ou Meta (mais confiáveis)
3. **Backup:** Configure múltiplos provedores
4. **Monitoramento:** Verifique logs no console do navegador

---

## 📞 Suporte

Se precisar de ajuda com a configuração, consulte:

- Evolution API: https://github.com/EvolutionAPI/evolution-api
- Twilio: https://www.twilio.com/docs/whatsapp
- Meta: https://developers.facebook.com/docs/whatsapp
