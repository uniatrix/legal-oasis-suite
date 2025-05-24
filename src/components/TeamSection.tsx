import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Shield,
  Award,
  BookOpen,
  Scale,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo2 from "@/assets/logo2.png";

interface Attorney {
  id: number;
  name: string;
  title: string;
  oab: string;
  education: string[];
  specialization: string[];
  bio: string;
  imageUrl: string;
  displayInitial?: string; // Optional override for the profile initial
}

const attorneys: Attorney[] = [
  {
    id: 1,
    name: "Dra. Denise Santos",
    title: "Sócia-Fundadora",
    oab: "OAB/RJ 123.456",
    education: [
      "Formação em Direito pela Universidade X do Rio de Janeiro",
      "Mestre em Direito Empresarial pela Y",
      "Especialista em Resolução de Conflitos"
    ],
    specialization: [
      "Direito Imobiliário",
      "Direito Sucessório (Inventários)",
      "Direito de Família",
    ],
    bio: "Com mais de 20 anos de experiência, Dra. Denise Santos é especialista em Direito Imobiliário, Sucessório (incluindo inventários judiciais e extrajudiciais) e de Família. Sua vasta experiência e dedicação garantem uma assessoria jurídica completa e eficaz na defesa dos interesses de seus clientes.",
    imageUrl: "/attorneys/denise.jpg",
    displayInitial: "D"
  },
  {
    id: 2,
    name: "Dr. Carlos Seabra",
    title: "Sócio-Fundador",
    oab: "OAB/RJ 789.012",
    education: [
      "Formado em Direito pela Universidade Z",
      "Especialista em Direito do Trabalho",
      "MBA em Gestão Jurídica"
    ],
    specialization: [
      "Direito do Trabalho",
      "Direito Previdenciário",
      "Direito Imobiliário (Condomínios)",
      "Consultoria Jurídica Empresarial"
    ],
    bio: "Com mais de 30 anos de experiência, Dr. Carlos Seabra possui vasta atuação em consultoria jurídica empresarial, com ênfase em Direito do Trabalho e Direito Previdenciário, inclusive na área de Direito Processual do Trabalho. Atuou como Defensor Público Dativo na Justiça Federal em matéria previdenciária e possui ampla experiência em Direito Imobiliário na defesa de condomínios residenciais e comerciais.",
    imageUrl: "/attorneys/carlos.jpg",
    displayInitial: "C"
  }
];

// Helper function to get the proper initial for the profile picture
const getAttorneyInitial = (attorney: Attorney): string => {
  // Use the displayInitial if provided, otherwise extract from name
  if (attorney.displayInitial) {
    return attorney.displayInitial;
  }

  // Default behavior: use first character of name
  return attorney.name.charAt(0);
};

const TeamSection = () => {
  // WhatsApp number with Brazilian country code
  const whatsappNumber = "5521988962456";
  const whatsappMessage = "Olá, sou aposentado do INSS e tive descontos indevidos. Preciso de ajuda.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="team" className="text-law-white py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-law-gold/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-law-gold/5 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="law-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <img
              src={logo2}
              alt="Logo"
              className="w-48 h-48 md:w-56 md:h-56 object-contain opacity-95"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6 text-law-white">
            Sobre o Escritório
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-law-gold-dark to-law-gold mx-auto mb-8"></div>
          <p className="text-law-white/80 text-lg leading-relaxed mb-6">
            Seabra & Moura Santos Advogados é um escritório especializado em diversas áreas do direito, reconhecido por sua excelência e pelos resultados obtidos para seus clientes.
          </p>
        </div>

        {/* Team profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-16">
          {attorneys.map((attorney) => (
            <div
              key={attorney.id}
              className="bg-law-black-lighter/60 backdrop-blur-md rounded-xl border border-law-blue-dark/30 shadow-2xl p-6 md:p-8 group transition-all duration-300 hover:border-law-gold/50 hover:shadow-law-gold/10"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 mb-6">
                {/* Attorney Initial Display */}
                <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-law-gold/50 shadow-lg bg-law-black-light flex items-center justify-center">
                  <span className="text-5xl md:text-6xl font-semibold text-law-gold/70">{getAttorneyInitial(attorney)}</span>
                </div>
                {/* Name, Title, OAB */}
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-law-gold font-playfair mb-1">{attorney.name}</h3>
                  <p className="text-law-white-light font-medium text-sm md:text-base mb-1">{attorney.title}</p>
                  <p className="text-law-gold/80 text-xs md:text-sm font-mono tracking-wider">{attorney.oab}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-law-white/80 leading-relaxed text-sm mb-6 text-justify sm:text-left">
                {attorney.bio}
              </p>

              {/* Specializations */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Scale className="text-law-gold mr-2.5 h-5 w-5 flex-shrink-0" />
                  <h4 className="text-law-white font-semibold text-base md:text-lg">Especialidades</h4>
                </div>
                <div className="flex flex-wrap gap-2 pl-1">
                  {attorney.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-law-gold/10 text-law-gold text-xs font-medium px-3 py-1 rounded-full border border-law-gold/30 hover:bg-law-gold/20 transition-colors duration-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-gradient-to-r from-law-gold-dark to-law-gold hover:from-law-gold hover:to-law-gold-dark text-law-black py-6 px-10 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-law-gold/30 hover:shadow-xl"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span className="text-lg font-bold tracking-wider">Fale com um Advogado</span>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
