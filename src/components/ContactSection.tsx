import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import logo2 from "@/assets/logo2.png";

const ContactSection = () => {
    // WhatsApp number with Brazilian country code
    const whatsappNumber = "5521988962456";
    const whatsappMessage = "Olá, preciso de assistência jurídica.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Office locations with coordinates (for maps)
    const offices = [
        {
            id: 1,
            name: "Barra da Tijuca",
            address: "Av. Das Américas, 4.200, bloco 4, sala 310, Centro Empresarial Barrashopping, Rio de Janeiro – RJ CEP: 22.640-907",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.4733014597196!2d-43.344459123679966!3d-22.98410777919734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bda2ec9620a4d%3A0x648b257ef8db67d3!2sAv.%20das%20Am%C3%A9ricas%2C%204200%20-%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022640-102!5e0!3m2!1spt-BR!2sbr!4v1689252046407!5m2!1spt-BR!2sbr"
        },
        {
            id: 2,
            name: "Centro",
            address: "Rua Uruguaiana, 10, sala 1107, Centro, Rio de Janeiro, RJ, CEP: 20.050-090",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2516069266933!2d-43.18051748557213!3d-22.90396494359093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5e3e0df6d5%3A0xf2b5e36541aaa16a!2sR.%20Uruguaiana%2C%2010%20-%20Centro%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020050-090!5e0!3m2!1spt-BR!2sbr!4v1689252046407!5m2!1spt-BR!2sbr"
        }
    ];

    return (
        <section id="contact" className="py-16 bg-law-black relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-law-gold/5 rounded-full filter blur-3xl opacity-30"></div>
            </div>

            <div className="law-container relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-law-white">
                        Onde estamos
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-law-gold-dark to-law-gold mx-auto mb-4"></div>
                    <p className="text-law-white/80 text-lg max-w-3xl mx-auto mb-8">
                        Nosso escritório atende em duas localizações privilegiadas na cidade do Rio de Janeiro
                    </p>
                </div>

                {/* Map Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {offices.map(office => (
                        <div key={office.id} className="rounded-xl overflow-hidden shadow-xl border border-law-gold/10 bg-law-black-light/30 backdrop-blur-sm">
                            <div className="aspect-video w-full relative">
                                <iframe
                                    src={office.mapUrl}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Mapa do escritório - ${office.name}`}
                                ></iframe>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-tr from-law-gold-dark to-law-gold-light rounded-full p-2.5 h-min shadow-md flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-law-black" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-law-gold mb-2">{office.name}</h3>
                                        <p className="text-law-white/80 text-sm">
                                            {office.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center px-4">
                                <div className="bg-gradient-to-tr from-law-gold-dark to-law-gold-light rounded-full p-3 mb-4 shadow-md">
                                    <Mail className="w-5 h-5 text-law-black" />
                                </div>
                                <h3 className="text-lg font-semibold text-law-gold mb-2">E-mail</h3>
                                <a href="mailto:seabraemourasantosadv@hotmail.com" className="text-law-white/80 hover:text-law-gold transition-colors duration-300 text-sm">
                                    seabraemourasantosadv@hotmail.com
                                </a>
                            </div>

                            <div className="flex flex-col items-center text-center px-4">
                                <div className="bg-gradient-to-tr from-law-gold-dark to-law-gold-light rounded-full p-3 mb-4 shadow-md">
                                    <Phone className="w-5 h-5 text-law-black" />
                                </div>
                                <h3 className="text-lg font-semibold text-law-gold mb-2">Telefone</h3>
                                <a href="tel:+5521988962456" className="text-law-white/80 hover:text-law-gold transition-colors duration-300 text-sm">
                                    (21) 98896-2456
                                </a>
                            </div>

                            <div className="flex flex-col items-center text-center px-4">
                                <div className="bg-gradient-to-tr from-law-gold-dark to-law-gold-light rounded-full p-3 mb-4 shadow-md">
                                    <Globe className="w-5 h-5 text-law-black" />
                                </div>
                                <h3 className="text-lg font-semibold text-law-gold mb-2">Atendimento</h3>
                                <p className="text-law-white/80 text-sm">
                                    Atendimento online em todo Brasil
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Button - Centered and Golden */}
                    <div className="mt-10 text-center max-w-xs mx-auto">
                        <Button
                            className="bg-gradient-to-r from-law-gold-dark to-law-gold hover:from-law-gold hover:to-law-gold-dark text-law-black py-5 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-law-gold/30 hover:shadow-xl w-full group"
                            onClick={() => window.open(whatsappUrl, '_blank')}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                </svg>
                                <span className="text-base font-bold tracking-wider">Preciso de um Especialista</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection; 