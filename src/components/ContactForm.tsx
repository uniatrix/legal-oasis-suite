
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Calendar 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, caseType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    
    // Show success message
    toast({
      title: "Mensagem Enviada",
      description: "Obrigado por entrar em contato. Um de nossos advogados entrará em contato em breve.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      caseType: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-24 bg-law-gray">
      <div className="law-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mb-3">Entre em Contato</h2>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-6"></div>
          <p className="text-center text-law-navy-light max-w-3xl mx-auto">
            Agende uma consulta com nossos advogados experientes para discutir seu caso e explorar suas opções legais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-law-navy mb-6 font-merriweather">Solicitar uma Consulta</h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Nome Completo</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Seu email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">Telefone</label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Seu telefone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="caseType" className="text-sm font-medium text-gray-700 block">Tipo de Caso</label>
                    <Select value={formData.caseType} onValueChange={handleSelectChange}>
                      <SelectTrigger className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg">
                        <SelectValue placeholder="Selecione o tipo de caso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trabalhista">Direito Trabalhista</SelectItem>
                        <SelectItem value="previdenciario">Direito Previdenciário</SelectItem>
                        <SelectItem value="civil">Direito Civil</SelectItem>
                        <SelectItem value="consumidor">Direito do Consumidor</SelectItem>
                        <SelectItem value="acidentario">Causas Acidentárias</SelectItem>
                        <SelectItem value="administrativo">Direito Administrativo</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 block">Mensagem</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva brevemente sua situação"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-law-navy hover:bg-law-navy-light text-white py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    Ao enviar este formulário, você concorda com nossa política de privacidade e termos de serviço.
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-law-navy p-10 rounded-xl shadow-md text-white h-full">
              <h3 className="text-2xl font-bold mb-8 font-merriweather">Informações de Contato</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-law-gold/20 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-law-gold-light">Telefone</p>
                    <p className="text-gray-300">(11) 3434-5678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-law-gold/20 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-law-gold-light">Email</p>
                    <p className="text-gray-300">contato@seabramoura.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-law-gold/20 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-law-gold-light">Escritório</p>
                    <p className="text-gray-300">
                      Rua Libero Badaró, 293 - Conj. 13A<br />
                      Centro, São Paulo - SP, 01009-000
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-law-navy-light">
                <h4 className="text-lg font-medium mb-6 text-law-gold-light flex items-center">
                  <Clock className="h-5 w-5 mr-2" /> Horário de Funcionamento
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Segunda a Sexta:</span>
                    <span className="text-white font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sábado:</span>
                    <span className="text-white font-medium">9:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Domingo:</span>
                    <span className="text-white font-medium">Fechado</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <Button 
                  className="w-full bg-law-gold hover:bg-law-gold-light text-law-navy font-medium rounded-lg flex items-center justify-center py-6 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = "#"}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Online
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
