# Chatbot com Gemini AI para Seabra & Moura Santos Advogados

Este documento descreve a implementação e uso do chatbot com inteligência artificial para o site do escritório Seabra & Moura Santos Advogados.

## Visão Geral

O chatbot implementado utiliza a API do Google Gemini AI para fornecer respostas inteligentes aos visitantes do site, ajudando-os com informações sobre golpes do PIX, serviços do escritório, e facilitando o agendamento de consultas.

## Funcionalidades

- Interface amigável com popup no canto inferior esquerdo da tela
- Respostas em português baseadas nas informações do escritório
- Capacidade de responder perguntas sobre golpes do PIX, recuperação de valores e serviços jurídicos
- Indicação de contato direto para dúvidas mais complexas

## Arquivos Principais

- `src/components/Chatbot.tsx`: Componente React que implementa a interface do chatbot
- `public/law-info.md`: Arquivo Markdown com todas as informações em português sobre o escritório, serviços e FAQs
- `src/App.tsx`: Integração do chatbot na aplicação principal

## Configuração da API Gemini

O chatbot utiliza a API do Google Gemini AI. A chave da API está configurada como:

```
AIzaSyBQNIGPns-a1k3fJYz6jXNOEaMmePjJY48
```

### Dependências

- Node.js e npm (ou yarn)
- Pacote `@google/generative-ai`: Instalado via npm

## Como Usar

1. **Instalação da dependência**:
   ```bash
   npm install @google/generative-ai
   ```

2. **Adicionar o componente Chatbot ao seu App.tsx**:
   ```tsx
   import Chatbot from "./components/Chatbot";
   
   // Dentro do seu componente App:
   return (
     <>
       {/* Outros componentes da aplicação */}
       <Chatbot />
     </>
   );
   ```

3. **Garantir que o arquivo law-info.md está na pasta public**:
   Este arquivo contém todas as informações que o chatbot utiliza para responder às perguntas.

## Personalização

### Modificando as Informações

Para atualizar as informações disponíveis para o chatbot, edite o arquivo `public/law-info.md` com as novas informações desejadas.

### Ajustando o Estilo

O componente Chatbot utiliza classes Tailwind CSS para estilização. Você pode modificar o estilo editando as classes no arquivo `src/components/Chatbot.tsx`.

### Alterando a Mensagem Inicial

A mensagem inicial do chatbot pode ser modificada no useEffect do componente Chatbot:

```tsx
setMessages([
  {
    role: "bot",
    content: "Sua mensagem inicial personalizada aqui",
    timestamp: new Date()
  }
]);
```

## Segurança e Privacidade

- A chave da API do Gemini deve ser tratada como informação sensível
- Em ambiente de produção, considere utilizar variáveis de ambiente para armazenar a chave
- Nenhuma informação pessoal dos usuários é armazenada pelo chatbot

## Limitações

- O chatbot responde com base apenas nas informações fornecidas no arquivo law-info.md
- Para consultas muito específicas ou técnicas, o chatbot indicará que o usuário entre em contato diretamente com o escritório

## Suporte

Para quaisquer problemas ou dúvidas relacionadas ao chatbot, entre em contato com a equipe de desenvolvimento. 