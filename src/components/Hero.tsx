
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Clock, 
  AlertCircle 
} from "lucide-react";

const Hero = () => {
  return (
    <section id="about" className="bg-gradient-to-br from-law-navy via-law-navy to-law-navy-light text-white py-20 md:py-28">
      <div className="law-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-law-gold/20 px-4 py-1 rounded-full">
              <span className="text-law-gold-light font-medium text-sm tracking-wide">Escritório de Advocacia de Excelência</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-merriweather">
              Defendendo Seus <span className="text-law-gold">Direitos</span> Com Excelência
            </h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Dedicados a alcançar justiça para nossos clientes através de representação jurídica estratégica e décadas de experiência especializada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-law-gold hover:bg-law-gold-light text-law-navy font-semibold text-lg py-6 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300">
                Consulta Gratuita
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8 rounded-md transition-all duration-300">
                Explorar Nossos Serviços
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/10">
              <h3 className="text-2xl font-merriweather font-bold mb-6 text-law-gold">Por Que Nos Escolher</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <Shield className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Representação Especializada</h4>
                    <p className="text-gray-300 text-sm">Advogados especializados com histórico comprovado em litígios trabalhistas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <Users className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Abordagem Centrada no Cliente</h4>
                    <p className="text-gray-300 text-sm">Estratégias jurídicas personalizadas de acordo com sua situação única</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <Clock className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Comunicação Oportuna</h4>
                    <p className="text-gray-300 text-sm">Atualizações regulares e diálogo transparente durante todo o seu caso</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <AlertCircle className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Orientado a Resultados</h4>
                    <p className="text-gray-300 text-sm">Comprometidos em alcançar o melhor resultado possível para cada cliente</p>
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
