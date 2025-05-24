import Navbar from "@/components/Navbar";
import InssAdvertisingCTA from "@/components/InssAdvertisingCTA";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-law-black via-law-black-light to-law-black text-law-white relative">
      {/* Subtle animated background elements - these should remain on z-0 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-law-gold/3 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-law-gold/3 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <InssAdvertisingCTA />
        <Hero />
        <AboutSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <Toaster />
      </div>
    </div>
  );
};

export default Index;
