import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-law-white relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-law-gold/3 rounded-full filter blur-[100px] opacity-30"></div>
      </div>

      <div className="law-container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="flex justify-center md:justify-start">
              <img
                src={logo}
                alt="SeabraMoura"
                className="h-36 md:h-32 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-law-white/70 leading-relaxed text-center md:text-left">
              Dedicados a oferecer representação jurídica especializada em questões trabalhistas e previdenciárias desde 1995.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/SeabraJr1964"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-law-gold/10 p-3 rounded-full hover:bg-law-gold/20 transition-all duration-300 group"
              >
                <Facebook className="h-6 w-6 text-law-white group-hover:text-law-gold transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/seabraemourasantosadvogados"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-law-gold/10 p-3 rounded-full hover:bg-law-gold/20 transition-all duration-300 group"
              >
                <Instagram className="h-6 w-6 text-law-white group-hover:text-law-gold transition-colors duration-300" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-law-gold mb-6 font-playfair">Áreas de Atuação</h3>
            <ul className="space-y-4">
              <li>
                <a href="#practice" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Direito Trabalhista</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Direito Previdenciário</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Direito Civil</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Direito do Consumidor</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-law-gold mb-6 font-playfair">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Sobre Nós</span>
                </a>
              </li>
              <li>
                <a href="#team" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Nossa Equipe</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Portal do Cliente</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Recursos</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-law-white/70 hover:text-law-gold flex items-center transition-colors duration-300 group">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Contato</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-law-gold mb-6 font-playfair">Newsletter</h3>
            <p className="text-law-white/70 mb-6">Inscreva-se para receber atualizações sobre mudanças na legislação e novidades do escritório.</p>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Seu endereço de email"
                className="bg-law-black-light border-law-gold/20 text-law-white placeholder:text-law-white/50 rounded-lg focus:border-law-gold focus:ring-law-gold"
              />
              <Button className="w-full bg-gradient-to-tr from-law-gold-dark to-law-gold hover:from-law-gold hover:to-law-gold-dark text-law-black font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Inscrever-se
              </Button>
            </div>
            <p className="mt-4 text-xs text-law-white/50">
              Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-law-gold/10">
        <div className="law-container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-law-white/50 text-sm">
              &copy; {new Date().getFullYear()} SeabraMoura Advocacia. Todos os direitos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-8 text-sm">
                <li><a href="#" className="text-law-white/50 hover:text-law-gold transition-colors duration-300">Política de Privacidade</a></li>
                <li><a href="#" className="text-law-white/50 hover:text-law-gold transition-colors duration-300">Termos de Serviço</a></li>
                <li><a href="#" className="text-law-white/50 hover:text-law-gold transition-colors duration-300">Declaração</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
