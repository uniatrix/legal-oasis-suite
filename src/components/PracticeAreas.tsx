
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Gavel,
  Scale,
  FileWarning,
  FileCheck,
  Users,
  Heart
} from "lucide-react";

type PracticeArea = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const practiceAreas: PracticeArea[] = [
  {
    id: 1,
    title: "Direito Trabalhista",
    description: "Assessoria jurídica para empregados e empregadores em questões como rescisão de contrato, horas extras, assédio moral e danos morais.",
    icon: <Briefcase className="h-10 w-10 text-law-gold" />
  },
  {
    id: 2,
    title: "Direito Previdenciário",
    description: "Orientação e representação em processos de aposentadoria, pensão por morte, auxílio-doença e outros benefícios junto ao INSS.",
    icon: <Users className="h-10 w-10 text-law-gold" />
  },
  {
    id: 3,
    title: "Direito Civil",
    description: "Assistência em questões contratuais, responsabilidade civil, direito de família, sucessões e propriedade.",
    icon: <Scale className="h-10 w-10 text-law-gold" />
  },
  {
    id: 4,
    title: "Direito do Consumidor",
    description: "Defesa dos direitos em casos de produtos defeituosos, serviços inadequados, cobranças indevidas e práticas abusivas.",
    icon: <FileCheck className="h-10 w-10 text-law-gold" />
  },
  {
    id: 5,
    title: "Causas Acidentárias",
    description: "Representação em casos de acidentes de trabalho, doenças ocupacionais e busca de indenizações relacionadas.",
    icon: <Heart className="h-10 w-10 text-law-gold" />
  },
  {
    id: 6,
    title: "Direito Administrativo",
    description: "Assessoria em processos administrativos, licitações, contratos com o poder público e defesa em procedimentos disciplinares.",
    icon: <Gavel className="h-10 w-10 text-law-gold" />
  }
];

const PracticeAreas = () => {
  return (
    <section id="practice" className="py-24 bg-white">
      <div className="law-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mb-3">Nossas Áreas de Atuação</h2>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-6"></div>
          <p className="text-center text-law-navy-light max-w-3xl mx-auto">
            Oferecemos serviços jurídicos abrangentes focados na proteção dos direitos dos nossos clientes e na resolução eficaz de disputas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <Card key={area.id} className="rounded-xl overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="bg-law-navy p-8 flex justify-center">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                    {React.cloneElement(area.icon as React.ReactElement, {
                      className: "h-10 w-10 text-law-gold group-hover:text-white transition-colors duration-300"
                    })}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-law-navy mb-3">{area.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <a href="#contact" className="inline-flex items-center text-law-gold font-medium hover:text-law-navy transition-colors duration-300 text-sm">
                      Saiba Mais
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
