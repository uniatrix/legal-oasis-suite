import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Clock,
  AlertCircle
} from "lucide-react";
import logo2 from "@/assets/logo2.png";

const Hero = () => {
  // WhatsApp number with Brazilian country code
  const whatsappNumber = "5521988962456";
  const whatsappMessage = "Olá, fui vítima de um golpe PIX e preciso de ajuda.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="about" className="bg-gradient-to-br from-law-black via-law-black to-law-black-light text-law-white py-12 md:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-law-gold/5 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-law-gold/5 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="law-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in-right">
            {/* Prominent Logo */}
            <div className="flex justify-center mb-6" data-aos="fade-up" data-aos-delay="200">
              <img
                src={logo2}
                alt="LogoFinal - Seabra e MouraT"
                className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain opacity-95"
              />
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Defendendo Seus <span className="text-law-gold bg-gradient-to-r from-law-gold-dark to-law-gold-light bg-clip-text text-transparent">Direitos</span> Com Excelência
            </h1>
            <p
              className="text-lg md:text-xl text-law-white/80 leading-relaxed text-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Dedicados a alcançar justiça para nossos clientes através de representação jurídica estratégica e décadas de experiência especializada.
            </p>

            <div
              className="flex justify-center pt-2"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <Button
                className="bg-gradient-to-r from-law-gold-dark to-law-gold hover:from-law-gold hover:to-law-gold-dark text-law-black text-lg py-6 px-10 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-law-gold/30 hover:shadow-xl transform hover:-translate-y-1 group"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>Fale Conosco</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="hidden md:block animate-fade-in">
            <div className="bg-gradient-to-br from-law-black-light to-law-black/90 p-8 rounded-xl shadow-xl border border-law-gold/10 backdrop-blur-sm transform transition-transform duration-500 hover:scale-[1.02] relative">
              <h3 className="text-2xl font-playfair font-bold mb-6 text-law-gold">Por Que Nos Escolher</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="bg-law-gold/10 p-2 rounded-md mt-1">
                    <Shield className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-law-white mb-1">Expertise Comprovada</h4>
                    <p className="text-law-white/70 leading-relaxed">
                      Mais de 25 anos de experiência em casos complexos com alta taxa de sucesso.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-law-gold/10 p-2 rounded-md mt-1">
                    <Users className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-law-white mb-1">Atendimento Personalizado</h4>
                    <p className="text-law-white/70 leading-relaxed">
                      Tratamos cada cliente de forma individualizada, entendendo suas necessidades específicas.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-law-gold/10 p-2 rounded-md mt-1">
                    <Clock className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-law-white mb-1">Resposta Rápida</h4>
                    <p className="text-law-white/70 leading-relaxed">
                      Compromisso com prazos ágeis e atendimento eficiente para resolução de processos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-law-gold/10 p-2 rounded-md mt-1">
                    <AlertCircle className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-law-white mb-1">Transparência Total</h4>
                    <p className="text-law-white/70 leading-relaxed">
                      Comunicação clara sobre honorários, estratégias e expectativas realistas para cada caso.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
