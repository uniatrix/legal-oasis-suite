import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CreditCard, MessageCircle, Smartphone } from "lucide-react";

const AboutSection = () => {
    // WhatsApp number with Brazilian country code
    const whatsappNumber = "5521988962456";
    const whatsappMessage = "Olá, fui vítima de um golpe PIX e preciso de ajuda.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const fraudTypes = [
        {
            icon: <MessageCircle className="w-6 h-6 text-white" />,
            title: "Golpes do PIX pelo WhatsApp",
            description: "Golpistas se fazem passar por conhecidos ou familiares para solicitar dinheiro via PIX. Clonagem de WhatsApp e falsidade ideológica são as táticas mais comuns.",
            gradient: "from-blue-600 to-green-500"
        },
        {
            icon: <Smartphone className="w-6 h-6 text-white" />,
            title: "Invasão de Contas Bancárias",
            description: "Criminosos invadem contas e aplicativos bancários para realizar transferências não autorizadas. As instituições financeiras são responsáveis por estes danos.",
            gradient: "from-purple-600 to-blue-500"
        },
        {
            icon: <CreditCard className="w-6 h-6 text-white" />,
            title: "Boletos Falsos",
            description: "Golpistas criam boletos fraudulentos que parecem legítimos, fazendo as vítimas enviarem dinheiro pensando estar pagando serviços reais.",
            gradient: "from-red-600 to-orange-500"
        },
        {
            icon: <AlertTriangle className="w-6 h-6 text-white" />,
            title: "Outros Golpes Financeiros",
            description: "Existem diversos tipos de fraudes que envolvem roubo de dados pessoais e bancários para realizar transações não autorizadas.",
            gradient: "from-amber-600 to-yellow-500"
        }
    ];

    return (
        <section id="about-pix" className="py-24 bg-law-black relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-law-gold/5 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-law-gold/5 rounded-full filter blur-3xl opacity-30"></div>

            <div className="law-container relative z-10">
                {/* Header Section */}
                <div className="mb-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-8">
                        <span className="text-law-white">É possível recuperar o dinheiro perdido em um </span>
                        <span className="text-law-gold bg-gradient-to-r from-law-gold-dark to-law-gold-light bg-clip-text text-transparent">golpe do PIX</span>
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-law-gold-dark to-law-gold mx-auto mb-10"></div>
                    <p className="text-law-white/90 text-xl leading-relaxed max-w-3xl mx-auto">
                        Nossa equipe especializada tem ajudado <span className="text-law-gold font-semibold">centenas de clientes</span> a recuperar valores perdidos em fraudes bancárias em todo o Brasil.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {fraudTypes.map((type, index) => (
                            <div key={index} className="bg-gradient-to-br from-law-black-light/40 via-law-black/80 to-law-black-light/40 p-8 rounded-xl border border-law-gold/10 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                                <div className="flex items-start gap-6">
                                    <div className={`bg-gradient-to-tr ${type.gradient} rounded-full p-3 h-min shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        {type.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-playfair font-bold text-law-gold mb-4 group-hover:text-law-gold-light transition-colors duration-300">{type.title}</h3>
                                        <p className="text-law-white/90 text-lg font-light leading-relaxed tracking-wide">{type.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action Section */}
                    <div className="bg-gradient-to-br from-law-black-light/20 via-law-black/90 to-law-black-light/20 p-8 rounded-xl border border-law-gold/20 text-center max-w-3xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="bg-gradient-to-tr from-law-gold-dark to-law-gold-light p-4 rounded-full shadow-lg">
                                <Shield className="h-8 w-8 text-law-black" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-playfair font-bold mb-4 text-law-gold">Como Podemos te Ajudar?</h3>
                        <p className="text-law-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            A equipe da Seabra & Moura Santos, especializada em Direito Bancário e Direito do Consumidor, está preparada para ajudar a proteger seus direitos e recuperar seus valores.
                        </p>
                        <Button
                            className="bg-gradient-to-r from-law-gold-dark to-law-gold hover:from-law-gold hover:to-law-gold-dark text-law-black py-6 px-10 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-law-gold/20 hover:shadow-xl group"
                            onClick={() => window.open(whatsappUrl, '_blank')}
                        >
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                </svg>
                                <span className="text-lg font-bold tracking-wider">Consulta Gratuita</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 