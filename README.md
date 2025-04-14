# Legal Oasis Suite

<img src="public/logo.png" alt="Seabra & Moura Santos Advogados" width="200"/>

Um site profissional para o escritório de advocacia Seabra & Moura Santos, especializado em recuperação de valores de golpes bancários e fraudes do PIX.

## 📋 Visão Geral

Legal Oasis Suite é uma plataforma web moderna para um escritório de advocacia especializado em direito bancário, com foco em casos de fraudes financeiras e golpes do PIX. O site oferece informações detalhadas sobre os serviços do escritório, perfis dos advogados, e um assistente virtual inteligente para responder perguntas dos visitantes.

## ✨ Funcionalidades

- **Design Moderno e Responsivo**: Interface elegante e profissional que se adapta a todos os tamanhos de tela.
- **Seções Informativas**: Páginas detalhadas sobre o escritório, áreas de atuação e perfis dos advogados.
- **Animações AOS**: Animações suaves ativadas no scroll para uma experiência visual envolvente.
- **Chatbot com IA**: Assistente virtual alimentado por Gemini AI para responder perguntas dos clientes.
- **Otimizado para SEO**: Implementação de meta tags e estrutura semântica para melhor indexação.
- **WhatsApp Integration**: Botões de contato direto para WhatsApp em pontos estratégicos.
- **FAQ Interativo**: Seção de perguntas frequentes com informações detalhadas sobre golpes do PIX.

## 🚀 Tecnologias

- React 18+ com TypeScript
- Vite como build tool
- TailwindCSS para estilização
- Radix UI para componentes acessíveis
- React Router para navegação
- Google Gemini AI para o chatbot
- AOS (Animate On Scroll) para animações

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/uniatrix/legal-oasis-suite.git

# Navegue até o diretório do projeto
cd legal-oasis-suite

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura do Projeto

```
/public             # Arquivos estáticos (favicon, imagens)
  /law-info.md      # Dados para o chatbot
/src
  /assets           # Recursos (imagens, ícones)
  /components       # Componentes React reutilizáveis
    /ui             # Componentes de UI baseados em shadcn/ui
    /Chatbot.tsx    # Componente do assistente virtual
    /FAQSection.tsx # Seção de perguntas frequentes
    # ... outros componentes
  /data             # Dados estáticos da aplicação
  /pages            # Componentes de página
  /styles           # Estilos globais
  App.tsx           # Componente principal
  main.tsx          # Ponto de entrada
```

## 🔎 Chatbot com IA

O site inclui um assistente virtual alimentado por Google Gemini AI que pode responder perguntas sobre golpes do PIX, serviços do escritório e agendamento de consultas. O chatbot utiliza informações detalhadas armazenadas em `/public/law-info.md`.

Para mais detalhes sobre o chatbot, consulte [README-CHATBOT.md](README-CHATBOT.md).

## 🖼️ Personalização

### Cores e Tema

O tema do site utiliza um esquema de cores elegante baseado em ouro e preto, apropriado para um escritório de advocacia. As cores principais podem ser modificadas no arquivo de configuração do TailwindCSS.

### Conteúdo

Para atualizar o conteúdo do site:

1. Informações dos advogados: Edite `src/components/TeamSection.tsx`
2. Áreas de atuação: Modifique `src/components/PracticeAreas.tsx`
3. FAQ: Atualize as perguntas em `src/components/FAQSection.tsx`
4. Conteúdo do chatbot: Edite `public/law-info.md`

## 📱 Responsividade

O site é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 📝 Licença

Este projeto é proprietário e de uso exclusivo de Seabra & Moura Santos Advogados.

## 📞 Contato

Para mais informações, entre em contato através de:

- **WhatsApp**: (21) 98896-2456
- **E-mail**: seabraemourasantosadv@hotmail.com

---

Desenvolvido com ❤️ para Seabra & Moura Santos Advogados
