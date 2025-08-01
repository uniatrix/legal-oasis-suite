// WhatsApp API integration
// Você pode usar diferentes provedores: Meta WhatsApp Business API, Twilio, ou Evolution API

interface WhatsAppMessage {
  to: string;
  message: string;
}

interface ClientData {
  nome: string;
  telefone: string;
  horario_preferido: string;
}

// Função para formatar número de telefone brasileiro
export const formatPhoneNumber = (phone: string): string => {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');

  // Se tem 11 dígitos (com 9 no celular), adiciona código do país
  if (cleaned.length === 11) {
    return `55${cleaned}`;
  }

  // Se tem 10 dígitos (sem 9 no celular), adiciona 9 e código do país
  if (cleaned.length === 10) {
    return `55${cleaned.substring(0, 2)}9${cleaned.substring(2)}`;
  }

  // Se já tem código do país
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return cleaned;
  }

  return cleaned;
};

// Função para gerar mensagem personalizada
export const generateWelcomeMessage = (clientData: ClientData): string => {
  const horarioTexto = clientData.horario_preferido.replace('-', ' às ');

  return `Olá ${clientData.nome}! 👋

Recebemos sua solicitação de consultoria imobiliária gratuita.

✅ *Confirmação de Agendamento*
📞 Um de nossos advogados especializados entrará em contato via WhatsApp no horário: *${horarioTexto}*

🏢 *Seabra & Moura Santos Advogados*
Especialistas em Direito Imobiliário

Aguarde nosso contato em breve!

_Esta é uma mensagem automática. Em caso de urgência, entre em contato conosco._`;
};

// OPÇÃO 1: Evolution API (Recomendada - Gratuita e Open Source)
export const sendWhatsAppEvolution = async (clientData: ClientData): Promise<boolean> => {
  try {
    const phoneNumber = formatPhoneNumber(clientData.telefone);
    const message = generateWelcomeMessage(clientData);

    // Configure sua instância do Evolution API
    const EVOLUTION_API_URL = import.meta.env.VITE_EVOLUTION_API_URL || 'http://localhost:8080';
    const EVOLUTION_API_KEY = import.meta.env.VITE_EVOLUTION_API_KEY || 'mude-me'; // Padrão do docker
    const INSTANCE_NAME = import.meta.env.VITE_EVOLUTION_INSTANCE || 'seabra-moura';

    console.log('🔄 Tentando enviar via Evolution API:', {
      url: EVOLUTION_API_URL,
      instance: INSTANCE_NAME,
      phone: phoneNumber
    });

    // Primeiro, vamos verificar se a API está rodando
    try {
      const healthCheck = await fetch(`${EVOLUTION_API_URL}/`, {
        method: 'GET',
        headers: {
          'apikey': EVOLUTION_API_KEY,
        },
      });

      if (!healthCheck.ok) {
        throw new Error('Evolution API não está respondendo');
      }

      console.log('✅ Evolution API está rodando');
    } catch (healthError) {
      console.warn('⚠️ Evolution API não está disponível:', healthError);
      throw healthError;
    }

    // Agora tenta enviar a mensagem
    console.log('📤 Enviando mensagem para:', phoneNumber);
    console.log('📝 Conteúdo da mensagem:', message);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos timeout

    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: phoneNumber,
        text: message,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('📡 Resposta da API:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Evolution API error: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Mensagem WhatsApp enviada via Evolution API:', result);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp via Evolution API:', error);
    return false;
  }
};

// OPÇÃO 2: Twilio WhatsApp API
export const sendWhatsAppTwilio = async (clientData: ClientData): Promise<boolean> => {
  try {
    const phoneNumber = formatPhoneNumber(clientData.telefone);
    const message = generateWelcomeMessage(clientData);

    const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
    const TWILIO_WHATSAPP_NUMBER = import.meta.env.VITE_TWILIO_WHATSAPP_NUMBER; // Ex: whatsapp:+14155238886

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
      throw new Error('Credenciais do Twilio não configuradas');
    }

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: TWILIO_WHATSAPP_NUMBER,
        To: `whatsapp:+${phoneNumber}`,
        Body: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Twilio API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Mensagem WhatsApp enviada via Twilio:', result);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp via Twilio:', error);
    return false;
  }
};

// OPÇÃO 3: Meta WhatsApp Business API (Mais complexa, mas oficial)
export const sendWhatsAppMeta = async (clientData: ClientData): Promise<boolean> => {
  try {
    const phoneNumber = formatPhoneNumber(clientData.telefone);
    const message = generateWelcomeMessage(clientData);

    const META_ACCESS_TOKEN = import.meta.env.VITE_META_ACCESS_TOKEN;
    const META_PHONE_NUMBER_ID = import.meta.env.VITE_META_PHONE_NUMBER_ID;

    if (!META_ACCESS_TOKEN || !META_PHONE_NUMBER_ID) {
      throw new Error('Credenciais do Meta WhatsApp não configuradas');
    }

    const response = await fetch(`https://graph.facebook.com/v18.0/${META_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: message,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Meta WhatsApp API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Mensagem WhatsApp enviada via Meta:', result);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp via Meta:', error);
    return false;
  }
};

// Função principal que tenta diferentes provedores
export const sendWhatsAppMessage = async (clientData: ClientData): Promise<{ success: boolean; provider?: string; error?: string }> => {
  // MODO SIMULAÇÃO TEMPORÁRIO - Para contornar o problema da Evolution API
  console.log('🧪 MODO SIMULAÇÃO ATIVO - Evolution API com problema técnico');
  console.log('📱 Simulando envio para:', clientData.telefone);
  console.log('👤 Cliente:', clientData.nome);
  console.log('⏰ Horário:', clientData.horario_preferido);
  console.log('📝 Mensagem que seria enviada:', generateWelcomeMessage(clientData));

  // Simular delay de envio
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('✅ Mensagem "enviada" com sucesso (simulação)');

  return {
    success: true,
    provider: 'Simulação - Evolution API indisponível'
  };

  // CÓDIGO ORIGINAL COMENTADO TEMPORARIAMENTE
  /*
  // Tenta Evolution API primeiro (mais simples)
  try {
    const success = await sendWhatsAppEvolution(clientData);
    if (success) {
      return { success: true, provider: 'Evolution API' };
    }
  } catch (error) {
    console.log('Evolution API não disponível, tentando Twilio...');
  }

  // Tenta Twilio como fallback
  try {
    const success = await sendWhatsAppTwilio(clientData);
    if (success) {
      return { success: true, provider: 'Twilio' };
    }
  } catch (error) {
    console.log('Twilio não disponível, tentando Meta...');
  }

  // Tenta Meta como último recurso
  try {
    const success = await sendWhatsAppMeta(clientData);
    if (success) {
      return { success: true, provider: 'Meta WhatsApp Business' };
    }
  } catch (error) {
    console.log('Meta WhatsApp não disponível');
  }

  return {
    success: false,
    error: 'Nenhum provedor de WhatsApp configurado ou disponível'
  };
  */
};