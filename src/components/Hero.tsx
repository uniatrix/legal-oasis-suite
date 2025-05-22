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
  const whatsappMessage = "Olá, sou aposentado do INSS e tive descontos indevidos. Preciso de ajuda.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="about" className="text-law-white py-12 md:py-20 relative overflow-hidden">
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
              Recupere o que foi <span className="text-law-gold bg-gradient-to-r from-law-gold-dark to-law-gold-light bg-clip-text text-transparent">Descontado</span> Indevidamente
            </h1>
            <p
              className="text-lg md:text-xl text-law-white/80 leading-relaxed text-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Especialistas em casos contra o INSS, garantindo que aposentados recuperem valores descontados indevidamente e recebam indenização em dobro e por danos morais.
            </p>

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
                    <h4 className="text-lg font-semibold text-law-white mb-1">Especialistas em Direito Previdenciário</h4>
                    <p className="text-law-white/70 leading-relaxed">
                      Mais de 25 anos de experiência em casos contra o INSS com alta taxa de sucesso.
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
                      Tratamos cada aposentado com atenção e cuidado, entendendo suas necessidades específicas.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-law-gold/10 p-2 rounded-md mt-1">
                    <Clock className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-law-white mb-1">Processo Ágil</h4>
                    <p className="text-law-white/70 leading-relaxed">
                      Compromisso com prazos eficientes para que você receba sua indenização o mais rápido possível.
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
                      Comunicação clara sobre seu caso, valores a receber e honorários, sem surpresas.
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
