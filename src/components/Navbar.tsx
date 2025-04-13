
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="law-container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-law-navy text-2xl font-bold font-merriweather">Legal<span className="text-law-gold">Oasis</span></span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#about" className="text-law-navy-light hover:text-law-gold transition duration-300 px-3 py-2">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#team" className="text-law-navy-light hover:text-law-gold transition duration-300 px-3 py-2">
                    Our Team
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-law-navy-light hover:text-law-gold transition duration-300">
                    Practice Areas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink href="#practice" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Wrongful Termination</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Advocacy for employees who have been illegally fired.
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink href="#practice" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Workplace Discrimination</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Representation in discrimination cases.
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink href="#practice" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Wage & Hour Claims</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Assistance with recovering unpaid wages and benefits.
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink href="#practice" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">View All</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explore all of our specialized legal services.
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#contact" className="text-law-navy-light hover:text-law-gold transition duration-300 px-3 py-2">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button className="bg-law-navy hover:bg-law-navy-light text-white transition-colors duration-300">Client Portal</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-law-navy-light focus:outline-none"
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
          <div className="md:hidden py-4 border-t animate-accordion-down">
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
