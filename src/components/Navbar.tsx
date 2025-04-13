
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="law-container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-law-navy text-2xl font-bold font-merriweather">Legal<span className="text-law-gold">Oasis</span></span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-law-navy-light hover:text-law-gold transition duration-300">About</a>
            <a href="#team" className="text-law-navy-light hover:text-law-gold transition duration-300">Our Team</a>
            <a href="#practice" className="text-law-navy-light hover:text-law-gold transition duration-300">Practice Areas</a>
            <a href="#contact" className="text-law-navy-light hover:text-law-gold transition duration-300">Contact</a>
            <Button className="bg-law-navy hover:bg-law-navy-light text-white">Client Portal</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-law-navy-light focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a 
                href="#about" 
                className="text-law-navy-light hover:text-law-gold transition duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a 
                href="#team" 
                className="text-law-navy-light hover:text-law-gold transition duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Our Team
              </a>
              <a 
                href="#practice" 
                className="text-law-navy-light hover:text-law-gold transition duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Practice Areas
              </a>
              <a 
                href="#contact" 
                className="text-law-navy-light hover:text-law-gold transition duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <Button className="bg-law-navy hover:bg-law-navy-light text-white w-full">
                Client Portal
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
