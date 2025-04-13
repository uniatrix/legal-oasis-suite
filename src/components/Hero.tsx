
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="about" className="bg-law-navy text-white py-16 md:py-24">
      <div className="law-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-merriweather">
              Expert Legal Solutions for Labor Disputes
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Dedicated to protecting employee rights and achieving favorable outcomes through strategic legal representation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-law-gold hover:bg-law-gold-light text-law-navy font-semibold text-lg py-6 px-8">
                Free Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
                Learn About Our Practice
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-law-navy-light p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-merriweather font-bold mb-4">Our Commitment</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-law-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Expert representation in all labor disputes</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-law-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Personalized approach to each case</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-law-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Transparent communication throughout the process</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-law-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-law-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Results-oriented legal strategies</span>
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
