
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
    name: "Alexandra Rodriguez",
    title: "Senior Partner",
    bio: "With over 20 years of experience in labor law, Alexandra has successfully represented clients in complex employment disputes and class action lawsuits.",
    specialization: "Employment Discrimination, Wage & Hour Claims"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Managing Partner",
    bio: "Michael specializes in workplace investigations and has a strong track record of negotiating favorable settlements for employees facing wrongful termination.",
    specialization: "Wrongful Termination, Whistleblower Protection"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Associate Attorney",
    bio: "Sarah's expertise includes advocacy for workers' rights in unionized environments and representation in administrative hearings before labor boards.",
    specialization: "Union Representation, NLRB Proceedings"
  },
  {
    id: 4,
    name: "David Miller",
    title: "Of Counsel",
    bio: "With a background in both plaintiff and defense work, David brings valuable perspective to complex employment litigation and compliance matters.",
    specialization: "Employment Litigation, Regulatory Compliance"
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-law-gray">
      <div className="law-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mb-3">Meet Our Expert Legal Team</h2>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-6"></div>
          <p className="text-center text-law-navy-light max-w-3xl mx-auto">
            Our attorneys combine decades of experience with innovative thinking to advocate for employees in all labor-related matters.
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
                    <p className="text-xs font-semibold text-law-navy-light tracking-wider mb-1">AREAS OF PRACTICE</p>
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
            <h3 className="text-xl font-bold text-law-navy mb-2">Legal Excellence</h3>
            <p className="text-gray-600 text-sm">Our attorneys are recognized leaders in labor law, with numerous accolades and peer recognitions.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
            <Award className="h-12 w-12 text-law-gold mb-4" />
            <h3 className="text-xl font-bold text-law-navy mb-2">Proven Results</h3>
            <p className="text-gray-600 text-sm">We've recovered millions in compensation for our clients through settlements and court victories.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-law-gold mb-4" />
            <h3 className="text-xl font-bold text-law-navy mb-2">Industry Knowledge</h3>
            <p className="text-gray-600 text-sm">Our team stays current on employment law changes to provide cutting-edge representation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
