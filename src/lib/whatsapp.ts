// WhatsApp API integration - Versão limpa sem Evolution API
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

// Twilio WhatsApp API
export const sendWhatsAppTwilio = async (clientData: ClientData): Promise<boolean> => {
    try {
        const phoneNumber = formatPhoneNumber(clientData.telefone);
        const message = generateWelcomeMessage(clientData);

        const TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
        const TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
        const TWILIO_WHATSAPP_NUMBER = process.env.REACT_APP_TWILIO_WHATSAPP_NUMBER;

        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
            throw new Error('Credenciais do Twilio não configuradas');
        }

        console.log('📱 Enviando via Twilio para:', phoneNumber);

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
        return true;
    } catch (error) {
        console.error('❌ Erro ao enviar WhatsApp via Twilio:', error);
        return false;
    }
};

// Meta WhatsApp Business API
export const sendWhatsAppMeta = async (clientData: ClientData): Promise<boolean> => {
    try {
        const phoneNumber = formatPhoneNumber(clientData.telefone);
        const message = generateWelcomeMessage(clientData);

        const META_ACCESS_TOKEN = process.env.REACT_APP_META_ACCESS_TOKEN;
        const META_PHONE_NUMBER_ID = process.env.REACT_APP_META_PHONE_NUMBER_ID;

        if (!META_ACCESS_TOKEN || !META_PHONE_NUMBER_ID) {
            throw new Error('Credenciais do Meta WhatsApp não configuradas');
        }

        console.log('📱 Enviando via Meta para:', phoneNumber);

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
            const errorText = await response.text();
            throw new Error(`Meta WhatsApp API error: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Mensagem WhatsApp enviada via Meta:', result);
        return true;
    } catch (error) {
        console.error('❌ Erro ao enviar WhatsApp via Meta:', error);
        return false;
    }
};

// Função principal - Tenta Twilio primeiro, depois Meta, depois simulação
export const sendWhatsAppMessage = async (clientData: ClientData): Promise<{ success: boolean; provider?: string; error?: string }> => {
    console.log('📱 Iniciando envio de WhatsApp para:', clientData.nome, clientData.telefone);

    // Tenta Twilio primeiro (mais confiável)
    try {
        const success = await sendWhatsAppTwilio(clientData);
        if (success) {
            return { success: true, provider: 'Twilio WhatsApp API' };
        }
    } catch (error) {
        console.log('⚠️ Twilio não disponível:', error instanceof Error ? error.message : 'Erro desconhecido');
    }

    // Tenta Meta como segunda opção
    try {
        const success = await sendWhatsAppMeta(clientData);
        if (success) {
            return { success: true, provider: 'Meta WhatsApp Business API' };
        }
    } catch (error) {
        console.log('⚠️ Meta não disponível:', error instanceof Error ? error.message : 'Erro desconhecido');
    }

    // Modo simulação como último recurso
    console.log('🧪 MODO SIMULAÇÃO - Nenhuma API configurada');
    console.log('📱 Simulando envio para:', clientData.telefone);
    console.log('👤 Cliente:', clientData.nome);
    console.log('⏰ Horário:', clientData.horario_preferido);
    console.log('📝 Mensagem que seria enviada:', generateWelcomeMessage(clientData));

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('✅ Mensagem "enviada" com sucesso (simulação)');

    return {
        success: true,
        provider: 'Simulação - Configure Twilio ou Meta para envio real'
    };
};