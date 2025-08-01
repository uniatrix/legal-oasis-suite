// Versão simplificada usando apenas Twilio (mais confiável)
interface ClientData {
  nome: string;
  telefone: string;
  horario_preferido: string;
}

// Função para formatar número de telefone brasileiro
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return `55${cleaned}`;
  }
  
  if (cleaned.length === 10) {
    return `55${cleaned.substring(0, 2)}9${cleaned.substring(2)}`;
  }
  
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

// Versão simplificada usando apenas Twilio
export const sendWhatsAppMessage = async (clientData: ClientData): Promise<{ success: boolean; provider?: string; error?: string }> => {
  try {
    const phoneNumber = formatPhoneNumber(clientData.telefone);
    const message = generateWelcomeMessage(clientData);
    
    console.log('📱 Enviando WhatsApp para:', phoneNumber);
    console.log('📝 Mensagem:', message);
    
    // Para desenvolvimento: simular envio bem-sucedido
    if (process.env.NODE_ENV === 'development') {
      console.log('🧪 MODO DESENVOLVIMENTO - Simulando envio de WhatsApp');
      console.log('📱 Para:', phoneNumber);
      console.log('📝 Mensagem:', message);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { 
        success: true, 
        provider: 'Simulação (Desenvolvimento)' 
      };
    }
    
    // Configuração do Twilio
    const TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
    const TWILIO_WHATSAPP_NUMBER = process.env.REACT_APP_TWILIO_WHATSAPP_NUMBER;
    
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
      console.warn('⚠️ Credenciais do Twilio não configuradas, usando modo simulação');
      return { 
        success: true, 
        provider: 'Simulação (Credenciais não configuradas)' 
      };
    }
    
    // Envio real via Twilio
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
      const errorText = await response.text();
      throw new Error(`Twilio API error: ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('✅ Mensagem WhatsApp enviada via Twilio:', result);
    
    return { 
      success: true, 
      provider: 'Twilio WhatsApp API' 
    };
    
  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
};