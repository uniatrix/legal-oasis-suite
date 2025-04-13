
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-law-navy text-white">
      <div className="law-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-white text-2xl font-bold font-merriweather">Legal<span className="text-law-gold">Oasis</span></span>
            </div>
            <p className="text-gray-300 my-4">
              Dedicated to providing expert legal representation in labor and employment matters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-law-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-law-gold">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-law-gold">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-law-gold">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              <li><a href="#practice" className="text-gray-300 hover:text-law-gold">Wrongful Termination</a></li>
              <li><a href="#practice" className="text-gray-300 hover:text-law-gold">Workplace Discrimination</a></li>
              <li><a href="#practice" className="text-gray-300 hover:text-law-gold">Wage & Hour Claims</a></li>
              <li><a href="#practice" className="text-gray-300 hover:text-law-gold">Employment Contracts</a></li>
              <li><a href="#practice" className="text-gray-300 hover:text-law-gold">Workplace Harassment</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-law-gold">About Us</a></li>
              <li><a href="#team" className="text-gray-300 hover:text-law-gold">Our Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-law-gold">Client Portal</a></li>
              <li><a href="#" className="text-gray-300 hover:text-law-gold">Blog</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-law-gold">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to receive updates on labor law changes and our firm's news.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l text-sm flex-grow bg-white/10 border-none text-white focus:outline-none focus:ring-1 focus:ring-law-gold"
              />
              <button className="bg-law-gold hover:bg-law-gold-light px-4 py-2 rounded-r text-law-navy font-medium text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700">
        <div className="law-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LegalOasis. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-law-gold">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-law-gold">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-law-gold">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
