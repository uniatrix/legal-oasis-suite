
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";
import PracticeAreas from "@/components/PracticeAreas";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="flex-grow">
        <TeamSection />
        <PracticeAreas />
        <ContactForm />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
