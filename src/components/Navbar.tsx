import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logoImg from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  // WhatsApp number with Brazilian country code
  const whatsappNumber = "5521988962456";
  const whatsappMessage = "Olá, preciso de assistência jurídica. Gostaria de uma consulta.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Navbar height offset for scrolling (in pixels)
  const SCROLL_OFFSET = 80;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle smooth scrolling to sections with offset
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);

    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - SCROLL_OFFSET,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active menu item based on scroll position
      const sections = ["about", "team", "faq", "contact"];
      let currentActive = "";

      // Calculate which section is currently most visible in the viewport
      let maxVisiblePercentage = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate how much of the section is visible as a percentage
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const visiblePercentage = (visibleHeight > 0) ? visibleHeight / rect.height : 0;

          // If this section is more visible than the previous most visible section, make it active
          if (visiblePercentage > maxVisiblePercentage) {
            maxVisiblePercentage = visiblePercentage;
            currentActive = section;
          }

          // Special case for when the section is at the top of the viewport (accounting for navbar)
          if (rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET + 100) {
            currentActive = section;
          }
        }
      }

      setActiveItem(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to set initial active state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "about", label: "Sobre Nós" },
    { id: "team", label: "Equipe" },
    { id: "faq", label: "Perguntas Frequentes" },
    { id: "contact", label: "Contato" }
  ];

  return (
    <nav className={`backdrop-blur-sm transition-all duration-300 sticky top-0 z-50 ${scrolled ? "bg-law-black/90 shadow-md" : "bg-transparent"
      }`}>
      <div className="law-container">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center animate-fade-in-right">
            <a href="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Seabra & Moura Santos Advogados"
                className="h-16 md:h-20 transition-transform duration-300 hover:scale-105 object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 animate-fade-in">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink
                      href={`#${item.id}`}
                      className={`text-law-white hover:text-law-gold transition-all duration-300 px-3 py-2 rounded-md relative ${activeItem === item.id ? 'text-law-gold' : ''}`}
                      onMouseEnter={() => setActiveItem(item.id)}
                      onMouseLeave={() => setActiveItem(activeItem)}
                      onClick={(e) => scrollToSection(e, item.id)}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {(activeItem === item.id) && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-law-gold"></span>
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              className="bg-law-gold hover:bg-law-gold-dark text-law-black transition-all duration-300 font-medium rounded-md border border-law-gold/20 shadow-md hover:shadow-law-gold/20 hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              Consulta Jurídica Gratuita
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-law-white hover:text-law-gold focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
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
          <div className="md:hidden py-4 border-t border-law-gold/20 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-law-white hover:text-law-gold transition-all duration-300 py-2 px-3 rounded-md hover:bg-law-black-light/50 ${activeItem === item.id ? 'text-law-gold bg-law-black-light/30' : ''}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="bg-law-gold hover:bg-law-gold-dark text-law-black transition-all duration-300 font-medium rounded-md border border-law-gold/20 shadow-md w-full"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                Consulta Jurídica Gratuita
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
