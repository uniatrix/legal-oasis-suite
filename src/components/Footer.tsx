
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
              <span className="text-white text-3xl font-bold font-merriweather">Legal<span className="text-law-gold">Oasis</span></span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dedicated to providing expert legal representation in labor and employment matters since 2005.
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
            <h3 className="text-xl font-semibold text-white mb-6">Practice Areas</h3>
            <ul className="space-y-4">
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Wrongful Termination</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Workplace Discrimination</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Wage & Hour Claims</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Employment Contracts</span>
                </a>
              </li>
              <li>
                <a href="#practice" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Workplace Harassment</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Our Team</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Client Portal</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Resources</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-law-gold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-law-gold" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-6">Subscribe to receive updates on labor law changes and our firm's news.</p>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg focus:border-law-gold focus:ring-law-gold"
              />
              <Button className="w-full bg-law-gold hover:bg-law-gold-light text-law-navy font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="law-container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LegalOasis. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-8 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-law-gold transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-law-gold transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-law-gold transition-colors duration-300">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
