import { Button } from "@/components/ui/button";
import pixImage from "@/assets/pix.webp";
import logoImg from "@/assets/logo.png";

const PixCTA = () => {
    // WhatsApp number with Brazilian country code
    const whatsappNumber = "5521988962456";
    const whatsappMessage = "Olá, fui vítima de um golpe PIX e preciso de ajuda.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section className="bg-gradient-to-br from-law-black via-law-black to-law-black-light py-16 md:py-24 border-y border-law-gold/10 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-law-gold/5 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-law-gold/5 rounded-full filter blur-[100px] opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="law-container max-w-6xl mx-auto px-4">
                {/* Main PIX card */}
                <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-law-gold/20 animate-fade-in relative min-h-[500px] md:min-h-[600px] group backdrop-blur-sm">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-law-black/95 via-law-black/85 to-law-black/75 z-10 transition-opacity duration-700 group-hover:opacity-75"></div>

                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={pixImage}
                            alt="PIX"
                            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 scale-105 group-hover:scale-110"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-8 md:p-16 text-center">
                        {/* Logo with glow effect */}
                        <div className="mb-8 relative" data-aos="fade-down" data-aos-delay="200">
                            <div className="absolute inset-0 bg-law-gold/10 filter blur-3xl opacity-50 animate-pulse"></div>
                            <img
                                src={logoImg}
                                alt="Logo"
                                className="w-64 h-64 md:w-96 md:h-96 object-contain opacity-95 transform -translate-y-3 drop-shadow-2xl"
                            />
                        </div>

                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-law-white mb-6 font-playfair tracking-tight"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            Foi vítima de um{" "}
                            <span className="bg-gradient-to-r from-law-gold-dark to-law-gold bg-clip-text text-transparent">
                                GOLPE PIX
                            </span>?
                        </h2>

                        <div className="space-y-4 mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="600">
                            <p className="text-xl md:text-2xl text-law-white/90 leading-relaxed">
                                Escritório especializado em fraudes bancárias e casos de golpe do PIX{" "}
                                <span className="font-semibold text-law-gold">
                                    acima de R$10.000,00
                                </span>.
                            </p>

                            <p className="text-xl md:text-2xl text-law-gold font-semibold leading-relaxed">
                                É possível recuperar os valores perdidos.{" "}
                                <span className="text-law-white">
                                    Não fique no prejuízo!
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6" data-aos="fade-up" data-aos-delay="800">
                            <Button
                                className="bg-gradient-to-r from-law-gold-dark to-law-gold hover:from-law-gold hover:to-law-gold-dark text-law-black text-lg py-7 px-12 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-law-gold/30 hover:shadow-2xl transform hover:-translate-y-1 group"
                                onClick={() => window.open(whatsappUrl, '_blank')}
                            >
                                <div className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-current transition-transform duration-300 group-hover:scale-110">
                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                    </svg>
                                    <span className="text-xl font-bold tracking-wider">Consulta Gratuita</span>
                                </div>
                            </Button>

                            <div className="hidden md:flex flex-col md:flex-row items-center justify-center gap-6 md:gap-5 text-law-white/90 text-base md:text-lg border-t border-law-gold/20 pt-8 mt-2" data-aos="fade-up" data-aos-delay="1000">
                                <div className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-law-gold/10 to-law-gold/5 flex items-center justify-center border border-law-gold/20 shadow-lg group-hover:shadow-law-gold/20 transition-all duration-300">
                                        <span className="w-1.5 h-1.5 bg-law-gold rounded-full animate-pulse"></span>
                                    </div>
                                    <span className="font-medium tracking-wide group-hover:text-law-gold transition-colors duration-300">100% Online</span>
                                </div>
                                <div className="hidden md:block w-px h-6 bg-gradient-to-b from-law-gold/5 via-law-gold/20 to-law-gold/5"></div>
                                <div className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-law-gold/10 to-law-gold/5 flex items-center justify-center border border-law-gold/20 shadow-lg group-hover:shadow-law-gold/20 transition-all duration-300">
                                        <span className="w-1.5 h-1.5 bg-law-gold rounded-full animate-pulse"></span>
                                    </div>
                                    <span className="font-medium tracking-wide group-hover:text-law-gold transition-colors duration-300">Advogados Especializados</span>
                                </div>
                                <div className="hidden md:block w-px h-6 bg-gradient-to-b from-law-gold/5 via-law-gold/20 to-law-gold/5"></div>
                                <div className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-law-gold/10 to-law-gold/5 flex items-center justify-center border border-law-gold/20 shadow-lg group-hover:shadow-law-gold/20 transition-all duration-300">
                                        <span className="w-1.5 h-1.5 bg-law-gold rounded-full animate-pulse"></span>
                                    </div>
                                    <span className="font-medium tracking-wide group-hover:text-law-gold transition-colors duration-300">Atendimento Personalizado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PixCTA; 