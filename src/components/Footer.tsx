
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-law-navy text-white">
      <div className="law-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-white text-3xl font-bold font-merriweather">Seabra<span className="text-law-gold">Moura</span></span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dedicados a oferecer representação jurídica especializada em questões trabalhistas e previdenciárias desde 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-law-gold/20 transition-colors duration-300">
                <Facebook className="h-5 w-5 text-white hover:text-law-gold transition-colors duration-300" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-law-gold/20 transition-colors duration-300">
                <Twitter className="h-5 w-5 text-white hover:text-law-gold transition-colors duration-300" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-law-gold/20 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-white hover:text-law-gold transition-colors duration-300" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-law-gold/20 transition-colors duration-300">
                <Instagram className="h-5 w-5 text-white hover:text-law-gold transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Áreas de Atuação</h3>
            <ul className="space-y-4">
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Direito Trabalhista</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Direito Previdenciário</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Direito Civil</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Direito do Consumidor</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Causas Acidentárias</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Sobre Nós</span>
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Nossa Equipe</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Portal do Cliente</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Recursos</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Contato</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-6">Inscreva-se para receber atualizações sobre mudanças na legislação e novidades do escritório.</p>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Seu endereço de email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg focus:border-law-gold focus:ring-law-gold"
              />
              <Button className="w-full bg-law-gold hover:bg-law-gold-light text-law-navy font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Inscrever-se
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="law-container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Seabra Moura Santos Advocacia. Todos os direitos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-8 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-law-gold transition-colors duration-300">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-law-gold transition-colors duration-300">Termos de Serviço</a></li>
                <li><a href="#" className="text-gray-400 hover:text-law-gold transition-colors duration-300">Declaração</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
