
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  Gavel, 
  Scale, 
  FileWarning, 
  FileCheck, 
  Users 
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
    title: "Wrongful Termination",
    description: "Advocacy for employees who have been illegally fired due to discrimination, retaliation, or in violation of employment contracts.",
    icon: <FileWarning className="h-10 w-10 text-law-gold" />
  },
  {
    id: 2,
    title: "Workplace Discrimination",
    description: "Representation in cases involving discrimination based on race, gender, age, disability, religion, or other protected characteristics.",
    icon: <Users className="h-10 w-10 text-law-gold" />
  },
  {
    id: 3,
    title: "Wage & Hour Claims",
    description: "Assistance with recovering unpaid wages, overtime, benefits, and addressing other compensation violations.",
    icon: <Scale className="h-10 w-10 text-law-gold" />
  },
  {
    id: 4,
    title: "Employment Contracts",
    description: "Guidance on negotiating, reviewing, and litigating employment agreements, non-competes, and severance packages.",
    icon: <FileCheck className="h-10 w-10 text-law-gold" />
  },
  {
    id: 5,
    title: "Workplace Harassment",
    description: "Legal support for employees experiencing hostile work environments, sexual harassment, or other forms of workplace harassment.",
    icon: <Briefcase className="h-10 w-10 text-law-gold" />
  },
  {
    id: 6,
    title: "Labor Union Matters",
    description: "Representation in collective bargaining, grievance processes, and unfair labor practice claims.",
    icon: <Gavel className="h-10 w-10 text-law-gold" />
  }
];

const PracticeAreas = () => {
  return (
    <section id="practice" className="py-16">
      <div className="law-container">
        <h2 className="section-title text-center">Our Labor Law Practice Areas</h2>
        <p className="text-center text-law-navy-light max-w-3xl mx-auto mb-12">
          We provide comprehensive legal services focused on protecting employee rights and resolving workplace disputes effectively.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <Card key={area.id} className="border border-gray-200 hover:border-law-gold hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-law-navy mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
