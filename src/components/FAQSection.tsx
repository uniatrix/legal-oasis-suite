import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
    // WhatsApp number with Brazilian country code
    const whatsappNumber = "5521988962456";
    const whatsappMessage = "Olá, sou aposentado do INSS e tive descontos indevidos. Preciso de ajuda.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const faqs = [
        {
            question: "O que são descontos indevidos no benefício do INSS?",
            answer: "São quaisquer valores descontados de seu benefício sem sua autorização ou conhecimento. Isso pode incluir empréstimos consignados que você não solicitou, seguros que nunca contratou, taxas de associações que não conhece, ou mesmo serviços indevidos. Os bancos e instituições financeiras costumam realizar esses descontos sem a devida autorização do aposentado, o que é ilegal."
        },
        {
            question: "Percebi descontos indevidos no meu benefício. O que devo fazer?",
            answer: "O primeiro passo é obter o extrato detalhado de seu benefício através do site ou aplicativo Meu INSS, ou diretamente em uma agência do INSS. Em seguida, identifique todos os descontos que você não reconhece ou não autorizou. Depois, procure um advogado especializado em Direito Previdenciário para analisar seu caso e orientar sobre as medidas cabíveis para recuperar os valores."
        },
        {
            question: "É possível recuperar os valores descontados indevidamente?",
            answer: "Sim! Além de recuperar todos os valores descontados indevidamente, a lei garante o direito à indenização em dobro do que foi descontado, conforme o Código de Defesa do Consumidor. Também é possível pleitear indenização por danos morais pela violação aos seus direitos e pelo transtorno causado."
        },
        {
            question: "Qual o prazo para entrar com ação contra descontos indevidos?",
            answer: "O prazo para entrar com uma ação por descontos indevidos é de 5 anos, contados a partir da data de cada desconto. Por isso, é importante agir rapidamente após constatar o problema para garantir o direito de recuperar todos os valores descontados."
        }
    ];

    return (
        <section id="faq" className="pt-6 pb-12 relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-law-gold/3 rounded-full filter blur-[100px] opacity-30"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-law-gold/3 rounded-full filter blur-[100px] opacity-30"></div>
            </div>

            <div className="law-container relative z-10">
                {/* Section header */}
                <div className="text-center mb-10 max-w-3xl mx-auto" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-law-white">
                        Perguntas Frequentes
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-law-gold-dark to-law-gold mx-auto mb-4"></div>
                    <p className="text-law-white/80 text-lg">
                        Confira algumas dúvidas comuns sobre descontos indevidos em benefícios do INSS.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-law-gold/10 rounded-lg overflow-hidden bg-law-black/50 backdrop-blur-sm"
                                data-aos="fade-up"
                                data-aos-delay={200 + index * 100}
                            >
                                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                    <h3 className="font-bold text-lg text-law-white text-left">{faq.question}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 text-law-white/70 text-lg leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQSection; 