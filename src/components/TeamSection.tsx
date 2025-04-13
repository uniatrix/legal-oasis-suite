
import { Card, CardContent } from "@/components/ui/card";

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
    <section id="team" className="py-16 bg-law-gray">
      <div className="law-container">
        <h2 className="section-title text-center">Our Legal Team</h2>
        <p className="text-center text-law-navy-light max-w-3xl mx-auto mb-12">
          Our attorneys combine decades of experience with innovative thinking to advocate for employees in all labor-related matters.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-law-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-law-navy text-center mb-1">{member.name}</h3>
                <p className="text-law-gold text-center mb-4">{member.title}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 font-semibold">SPECIALIZATION</p>
                  <p className="text-law-navy-light">{member.specialization}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
