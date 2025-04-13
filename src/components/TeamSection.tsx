
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  BookOpen 
} from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  specialization: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Orlando Seabra",
    title: "Sócio-Fundador",
    bio: "Advogado especialista em Direito do Trabalho e Previdenciário, com mais de 30 anos de experiência em defesa dos direitos de trabalhadores e aposentados.",
    specialization: "Direito Trabalhista, Previdenciário"
  },
  {
    id: 2,
    name: "Rosana Moura Santos",
    title: "Sócia-Fundadora",
    bio: "Especialista em Direito Civil e Consumidor, com vasta experiência em litígios e mediação de conflitos, proporcionando soluções eficazes para os clientes.",
    specialization: "Direito Civil, Direito do Consumidor"
  },
  {
    id: 3,
    name: "Paulo Gomes",
    title: "Advogado Associado",
    bio: "Advogado especializado em Direito Administrativo e Trabalhista, com foco em processos administrativos e ações coletivas.",
    specialization: "Direito Administrativo, Trabalhista"
  },
  {
    id: 4,
    name: "Carla Mendes",
    title: "Advogada Associada",
    bio: "Especialista em causas acidentárias e direito previdenciário, com ampla experiência em auxílio-doença, aposentadoria por invalidez e acidentes de trabalho.",
    specialization: "Causas Acidentárias, Previdenciário"
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-law-gray">
      <div className="law-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mb-3">Conheça Nossa Equipe Jurídica</h2>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-6"></div>
          <p className="text-center text-law-navy-light max-w-3xl mx-auto">
            Nossos advogados combinam décadas de experiência com pensamento inovador para defender os interesses dos clientes em todas as questões jurídicas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-white border-none rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-law-navy to-law-navy-light p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-law-gold/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-law-gold/10 rounded-full -ml-8 -mb-8"></div>
                  
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center relative z-10 border border-white/20 shadow-lg">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                  <p className="text-law-gold text-center font-medium">{member.title}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{member.bio}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-law-navy-light tracking-wider mb-1">ÁREAS DE ATUAÇÃO</p>
                    <p className="text-law-navy font-medium text-sm">{member.specialization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-law-gold mb-4" />
            <h3 className="text-xl font-bold text-law-navy mb-2">Excelência Jurídica</h3>
            <p className="text-gray-600 text-sm">Nossos advogados são reconhecidos como líderes em suas áreas, com diversas conquistas e reconhecimento de colegas.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
            <Award className="h-12 w-12 text-law-gold mb-4" />
            <h3 className="text-xl font-bold text-law-navy mb-2">Resultados Comprovados</h3>
            <p className="text-gray-600 text-sm">Recuperamos milhões em indenizações para nossos clientes através de acordos e vitórias judiciais.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-law-gold mb-4" />
            <h3 className="text-xl font-bold text-law-navy mb-2">Conhecimento do Setor</h3>
            <p className="text-gray-600 text-sm">Nossa equipe se mantém atualizada sobre as mudanças na legislação para fornecer representação de ponta.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
