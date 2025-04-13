import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
    // WhatsApp number with Brazilian country code
    const whatsappNumber = "5521988962456";
    const whatsappMessage = "Olá, fui vítima de um golpe PIX e preciso de ajuda.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const faqs = [
        {
            question: "O que é o Golpe do PIX?",
            answer: "Em geral, os golpes relacionados ao PIX começam com a obtenção indevida dos dados do usuário, muitas vezes por meio de links falsos enviados via SMS, WhatsApp ou outros aplicativos. Com acesso à conta bancária do usuário, o golpista pode efetuar transações utilizando o PIX. Em alguns casos, o fraudador pode se fazer passar por um funcionário do banco e entrar em contato com a vítima para obter mais informações. Assim que o golpista adquire as informações necessárias, ele pode acessar a conta do usuário e iniciar transferências por meio do PIX, além de criar perfis falsos no WhatsApp para solicitar transferências dos contatos da vítima, alegando situações de emergência."
        },
        {
            question: "Fui vítima do Golpe do Pix. E agora?",
            answer: "Entre em contato imediatamente com o seu banco, pois, em certos casos, eles podem oferecer algum tipo de assistência. Peça o bloqueio preventivo dos seus recursos em conta e, em seguida, consulte um advogado especializado para relatar a situação e planejar os próximos passos. Não se esqueça de registrar um boletim de ocorrência o mais rápido possível."
        },
        {
            question: "Consigo recuperar meu dinheiro?",
            answer: "Na maioria esmagadora dos casos, isso é verdade! Apesar de algumas opiniões discordantes, a visão predominante no sistema judiciário é que os bancos têm uma responsabilidade clara nessas situações e devem compensar completamente os prejuízos financeiros."
        },
        {
            question: "Além de recuperar o dinheiro, é possível receber uma indenização?",
            answer: "Em muitas situações, é viável buscar uma compensação por omissões ou ações inadequadas do seu banco. Contudo, é importante destacar que a elegibilidade para indenização varia caso a caso, portanto, é crucial que um advogado avalie a sua situação de forma personalizada."
        }
    ];

    return (
        <section id="faq" className="pt-6 pb-12 bg-law-black-light relative">
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
                        Confira algumas perguntas frequentes que recebemos em nosso escritório.
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
                                    <div className="flex items-center justify-between w-full">
                                        <h3 className="font-bold text-lg text-law-white text-left">{faq.question}</h3>
                                        <div className="flex-shrink-0 ml-4">
                                            <PlusCircle className="h-5 w-5 text-law-gold [&[data-state=open]]:hidden" />
                                            <MinusCircle className="h-5 w-5 text-law-gold-light hidden [&[data-state=open]]:block" />
                                        </div>
                                    </div>
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