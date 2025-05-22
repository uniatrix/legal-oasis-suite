import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, UserCircle2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI API
const genAI = new GoogleGenerativeAI("AIzaSyBQNIGPns-a1k3fJYz6jXNOEaMmePjJY48");

// Message Type
interface Message {
    role: "user" | "bot";
    content: string;
    timestamp: Date;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lawInfo, setLawInfo] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch law info from markdown file
    useEffect(() => {
        const fetchLawInfo = async () => {
            try {
                const response = await fetch("/law-info.md");
                const text = await response.text();
                setLawInfo(text);

                // Add initial greeting
                setMessages([
                    {
                        role: "bot",
                        content: "Olá! Sou o assistente virtual do escritório Seabra & Moura Santos Advogados. Como posso ajudar você hoje? Você pode perguntar sobre descontos indevidos no INSS, direito do consumidor, direito imobiliário, direito do trabalho ou agendar uma consulta jurídica.",
                        timestamp: new Date()
                    }
                ]);
            } catch (error) {
                console.error("Erro ao carregar as informações:", error);
            }
        };

        fetchLawInfo();
    }, []);

    // Scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Handle chat input submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Initialize Gemini model - updated to newer model version
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Create prompt with context
            const prompt = `
      Você é um assistente virtual do escritório de advocacia Seabra & Moura Santos Advogados.
      Você deve ser cordial, profissional e conciso em suas respostas.
      O escritório é especializado em direito previdenciário (especialmente casos de descontos indevidos no INSS), direito do consumidor (cobranças abusivas de contas), direito imobiliário (administração de imóveis) e direito do trabalho (direitos trabalhistas).
      Baseie suas respostas nas seguintes informações sobre o escritório:
      
      ${lawInfo}
      
      Pergunta do cliente: ${input}
      
      Responda de maneira natural, como se fosse um advogado falando diretamente com o cliente.
      Não mencione que está usando informações de um documento.
      Se não souber a resposta, sugira que o cliente entre em contato diretamente com o escritório.
      `;

            // Generate response
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const botMessage = response.text();

            // Add bot response
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: botMessage,
                    timestamp: new Date()
                }
            ]);
        } catch (error) {
            console.error("Erro ao processar a resposta:", error);

            // More descriptive error message with fallback options
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: "Desculpe, estou enfrentando dificuldades técnicas no momento. Você pode: \n\n1. Tentar novamente em alguns instantes \n2. Entrar em contato direto pelo WhatsApp: (21) 98896-2456 \n3. Enviar email para: seabraemourasantosadv@hotmail.com",
                    timestamp: new Date()
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Format timestamp
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <>
            {/* Chat popup button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed left-6 bottom-6 z-50 rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-xl transition-all duration-300 ${isOpen
                    ? "bg-law-black text-law-gold hover:bg-law-black-light"
                    : "bg-gradient-to-r from-law-gold-dark to-law-gold text-law-black hover:from-law-gold hover:to-law-gold-dark"
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </Button>

            {/* Chat interface */}
            <div
                className={`fixed left-6 bottom-24 z-50 w-80 md:w-96 h-[500px] bg-law-black border border-law-gold/20 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-law-gold-dark to-law-gold p-4 text-law-black">
                    <div className="flex items-center gap-2">
                        <Bot size={20} />
                        <h3 className="font-bold">Assistente Jurídico Virtual</h3>
                    </div>
                    <p className="text-xs opacity-80">Seabra & Moura Santos Advogados</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-law-black-light/50 backdrop-blur-sm">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-xl p-3 relative ${message.role === "user"
                                    ? "bg-law-gold/10 text-law-white ml-4"
                                    : "bg-law-gold/20 text-law-white mr-4"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {message.role === "bot" ? (
                                        <Bot size={16} className="text-law-gold" />
                                    ) : (
                                        <UserCircle2 size={16} className="text-law-gold" />
                                    )}
                                    <span className="text-xs text-law-gold">
                                        {message.role === "user" ? "Você" : "Assistente"}
                                    </span>
                                    <span className="text-xs text-law-white/50 ml-auto">
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-law-gold/20 text-law-white rounded-xl p-3 max-w-[80%] mr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Bot size={16} className="text-law-gold" />
                                    <span className="text-xs text-law-gold">Assistente</span>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <div className="w-2 h-2 rounded-full bg-law-gold/50 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-law-gold/50 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="w-2 h-2 rounded-full bg-law-gold/50 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-3 bg-law-black border-t border-law-gold/10">
                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="bg-law-black-light border-law-gold/20 text-law-white placeholder:text-law-white/50 focus:border-law-gold"
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-law-gold hover:bg-law-gold-dark text-law-black"
                        >
                            <Send size={18} />
                        </Button>
                    </div>
                    <p className="text-xs text-law-white/50 mt-2 text-center">
                        Dúvidas mais complexas? Entre em contato direto: (21) 98896-2456
                    </p>
                </form>
            </div>
        </>
    );
};

export default Chatbot; 