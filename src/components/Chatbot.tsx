import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, UserCircle2, Paperclip, Maximize2, Minimize2 } from "lucide-react";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

// Initialize the Gemini AI API
const genAI = new GoogleGenerativeAI("AIzaSyBQNIGPns-a1k3fJYz6jXNOEaMmePjJY48");

// Message Type
interface Message {
    role: "user" | "bot";
    content: string; // For user roles, this will be the text input. Can be empty if only a file is sent.
    timestamp: Date;
    imageUrl?: string;
    audioUrl?: string;
    fileUrl?: string;
    fileName?: string;
}

interface SelectedFileData {
    base64Data: string;
    mimeType: string;
    name: string;
    fileType: "image" | "audio" | "file"; // To know how to handle it for display & API
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lawInfo, setLawInfo] = useState("");
    const [selectedFileData, setSelectedFileData] = useState<SelectedFileData | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileUrl = e.target?.result as string; // Data URL
                if (!fileUrl) return;

                const parts = fileUrl.split(';base64,');
                if (parts.length < 2) return; // Invalid Data URL
                const mimeType = parts[0].split(':')[1];
                const base64Data = parts[1];
                let fileType: "image" | "audio" | "file" = "file";

                if (file.type.startsWith("image/")) {
                    fileType = "image";
                    setSelectedFileData({ base64Data, mimeType, name: file.name, fileType });
                } else if (file.type.startsWith("audio/")) {
                    // fileType = "audio"; // For future use if sending audio data
                    // setSelectedFileData({ base64Data, mimeType, name: file.name, fileType });
                    console.log("Audio file selected, but not yet handled for AI context:", file.name);
                    setSelectedFileData(null); // Or handle audio preview without sending to AI yet
                } else {
                    // fileType = "file"; // For future use
                    console.log("Generic file selected, but not yet handled for AI context:", file.name);
                    setSelectedFileData(null);
                }
                // No longer adding a message here, handleSubmit will do it.
            };
            reader.readAsDataURL(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    // Handle chat input submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessageContent = input.trim();

        if (!userMessageContent && !selectedFileData) return;

        setIsLoading(true);

        // 1. Create and display the user's message (text and/or file preview)
        let messageToDisplay: Message = {
            role: "user",
            content: userMessageContent, // Will be empty if only a file is sent
            timestamp: new Date(),
        };

        if (selectedFileData && selectedFileData.fileType === "image") {
            messageToDisplay.imageUrl = `data:${selectedFileData.mimeType};base64,${selectedFileData.base64Data}`;
            if (!userMessageContent) {
                // If only an image is sent, content can be the file name or a generic placeholder.
                // For now, let's keep content as potentially empty, the image is the main part.
            }
        }
        // TODO: Add similar handling for audioUrl, fileUrl if selectedFileData supports them

        setMessages((prev) => [...prev, messageToDisplay]);
        setInput(""); // Clear text input

        // The file data for the API will be taken from selectedFileData, which is fine.
        // We will clear selectedFileData after the API call.

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const systemPrompt = `
            Você é um assistente virtual do escritório de advocacia Seabra & Moura Santos Advogados.
            Você deve ser cordial, profissional e conciso em suas respostas.
            O escritório é especializado em direito previdenciário (especialmente casos de descontos indevidos no INSS), direito do consumidor (cobranças abusivas de contas), direito imobiliário (administração de imóveis) e direito do trabalho (direitos trabalhistas).
            Sempre que apropriado, e especialmente se o cliente demonstrar interesse em consulta ou necessitar de análise de documentos para seu caso, incentive-o a agendar uma consulta através da página /consulta-inss em nosso site.
            Baseie suas respostas nas seguintes informações sobre o escritório:
            
            ${lawInfo}
            `;

            const requestParts: Part[] = [{ text: systemPrompt }];

            if (selectedFileData && selectedFileData.fileType === "image") {
                requestParts.push({
                    inlineData: {
                        data: selectedFileData.base64Data,
                        mimeType: selectedFileData.mimeType,
                    },
                });
            }
            // TODO: Add parts for other file types if Gemini model supports them

            if (userMessageContent) {
                requestParts.push({ text: `Pergunta do cliente: ${userMessageContent}` });
            } else if (selectedFileData && selectedFileData.fileType === "image" && !userMessageContent) {
                requestParts.push({ text: "Descreva esta imagem ou responda com base nela." });
            }

            if (requestParts.length <= 1 && !userMessageContent && !selectedFileData) { // Only system prompt and no user input
                setIsLoading(false);
                return; // Avoid API call if there's nothing new from the user
            }

            const result = await model.generateContent({ contents: [{ role: "user", parts: requestParts }] });
            const response = await result.response;
            const botMessageText = response.text();

            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: botMessageText,
                    timestamp: new Date()
                }
            ]);
        } catch (error) {
            console.error("Erro ao processar a resposta:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: "Desculpe, estou enfrentando dificuldades técnicas no momento. Você pode: \n\n1. Tentar novamente em alguns instantes \n2. Entrar em contato direto pelo WhatsApp: (21) 98896-2456 \n3. Enviar email para: seabraemourasantosadv@hotmail.com",
                    timestamp: new Date()
                }
            ]);
        } finally {
            setSelectedFileData(null); // Clear selected file data after submission attempt
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

    // Helper function to render bot messages with clickable links
    const renderBotMessageContent = (content: string) => {
        const parts = content.split(/(\/consulta-inss)/gi);
        return parts.map((part, index) => {
            if (part.toLowerCase() === "/consulta-inss") {
                return (
                    <a
                        key={index}
                        href="/consulta-inss"
                        className="text-law-gold font-semibold hover:underline"
                        target="_blank" // Opens in a new tab, or use react-router Link for SPA navigation
                        rel="noopener noreferrer"
                    >
                        /consulta-inss
                    </a>
                );
            }
            return part;
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
                className={`fixed z-50 transition-all duration-300 ease-in-out \
                ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} \
                ${isExpanded
                        ? "left-6 bottom-6 w-[calc(100%-3rem)] md:w-[700px] h-[calc(80vh+4.5rem)] max-h-[calc(900px+4.5rem)]" // Adjust position for expanded
                        : "left-6 bottom-24 w-80 md:w-96 h-[500px]"}
                `}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-law-gold-dark to-law-gold p-4 text-law-black flex items-center justify-between rounded-t-xl">
                    <div className="flex items-center gap-2">
                        <Bot size={20} />
                        <h3 className="font-bold">Assistente Jurídico Virtual</h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-law-black hover:bg-law-black/10 p-1 h-auto w-auto"
                        >
                            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </Button>
                        {/* Close button for the main chat window can remain or be integrated differently if desired */}
                        {/* For now, assuming the original X button (part of the popup toggle) handles closing entirely */}
                    </div>
                </div>
                <div className="bg-law-black border border-law-gold/20 rounded-b-xl shadow-2xl flex flex-col overflow-hidden \
                    h-[calc(100%-3.5rem)]" // Adjust height of content area
                >
                    <p className="text-xs opacity-80 bg-gradient-to-r from-law-gold-dark to-law-gold pl-4 pb-1 pr-4 text-law-black -mt-px pt-1 border-b border-law-gold-dark/20">
                        Seabra & Moura Santos Advogados
                    </p>

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
                                    <p className="text-sm whitespace-pre-wrap">
                                        {message.role === 'bot' ? renderBotMessageContent(message.content) : message.content}
                                    </p>
                                    {message.imageUrl && (
                                        <img src={message.imageUrl} alt="Chat image" className="mt-2 rounded-lg max-w-full h-auto" />
                                    )}
                                    {message.audioUrl && (
                                        <audio controls src={message.audioUrl} className="mt-2 w-full">
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                    {message.fileUrl && (
                                        <div className="mt-2">
                                            <a
                                                href={message.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-law-gold hover:underline break-all"
                                            >
                                                Download: {message.fileName || message.fileUrl}
                                            </a>
                                        </div>
                                    )}
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
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="image/*,audio/*,.pdf,.doc,.docx,.txt" // Example accept types
                            />
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                                className="bg-law-gold hover:bg-law-gold-dark text-law-black p-2.5"
                            >
                                <Paperclip size={18} />
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || (!input.trim() && !selectedFileData)}
                                className="bg-law-gold hover:bg-law-gold-dark text-law-black"
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                        <div className="mt-2 text-center">
                            <Button
                                variant="link"
                                className="text-xs text-law-gold hover:text-law-gold-dark p-0 h-auto"
                                onClick={() => window.open("https://api.whatsapp.com/send/?phone=5521988962456&text=Ol%C3%A1%2C+preciso+de+assist%C3%AAncia+jur%C3%ADdica.+Gostaria+de+uma+consulta.&type=phone_number&app_absent=0", "_blank")}
                            >
                                Dúvidas mais complexas? Contato via WhatsApp
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot; 