
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
              <span className="text-law-gold-light font-medium text-sm tracking-wide">Premier Labor Law Firm</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-merriweather">
              Protecting Your <span className="text-law-gold">Employment Rights</span> With Excellence
            </h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Dedicated to achieving justice for employees through strategic legal representation and decades of specialized experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-law-gold hover:bg-law-gold-light text-law-navy font-semibold text-lg py-6 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300">
                Free Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8 rounded-md transition-all duration-300">
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/10">
              <h3 className="text-2xl font-merriweather font-bold mb-6 text-law-gold">Why Choose Us</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <Shield className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Expert Representation</h4>
                    <p className="text-gray-300 text-sm">Specialized attorneys with proven track record in labor disputes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <Users className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Client-Focused Approach</h4>
                    <p className="text-gray-300 text-sm">Personalized legal strategies tailored to your unique situation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <Clock className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Timely Communication</h4>
                    <p className="text-gray-300 text-sm">Regular updates and transparent dialogue throughout your case</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-2 mr-4 shadow-md">
                    <AlertCircle className="w-5 h-5 text-law-navy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Results-Driven</h4>
                    <p className="text-gray-300 text-sm">Committed to achieving the best possible outcome for every client</p>
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
