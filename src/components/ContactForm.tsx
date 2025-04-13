
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Calendar 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, caseType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. One of our attorneys will contact you shortly.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      caseType: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-24 bg-law-gray">
      <div className="law-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mb-3">Contact Our Legal Team</h2>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-6"></div>
          <p className="text-center text-law-navy-light max-w-3xl mx-auto">
            Schedule a consultation with our experienced labor law attorneys to discuss your case and explore your legal options.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-law-navy mb-6 font-merriweather">Request a Consultation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Full Name</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="caseType" className="text-sm font-medium text-gray-700 block">Case Type</label>
                    <Select value={formData.caseType} onValueChange={handleSelectChange}>
                      <SelectTrigger className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wrongful-termination">Wrongful Termination</SelectItem>
                        <SelectItem value="discrimination">Workplace Discrimination</SelectItem>
                        <SelectItem value="wage-claims">Wage & Hour Claims</SelectItem>
                        <SelectItem value="harassment">Workplace Harassment</SelectItem>
                        <SelectItem value="contracts">Employment Contracts</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 block">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Briefly describe your situation"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="border-gray-300 focus:border-law-gold focus:ring-law-gold rounded-lg"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-law-navy hover:bg-law-navy-light text-white py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-law-navy p-10 rounded-xl shadow-md text-white h-full">
              <h3 className="text-2xl font-bold mb-8 font-merriweather">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-law-gold/20 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-law-gold-light">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-law-gold/20 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-law-gold-light">Email</p>
                    <p className="text-gray-300">contact@legaloasis.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-law-gold/20 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-law-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-law-gold-light">Office</p>
                    <p className="text-gray-300">
                      123 Legal Avenue, Suite 500<br />
                      Los Angeles, CA 90001
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-law-navy-light">
                <h4 className="text-lg font-medium mb-6 text-law-gold-light flex items-center">
                  <Clock className="h-5 w-5 mr-2" /> Office Hours
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monday - Friday:</span>
                    <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Saturday:</span>
                    <span className="text-white font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sunday:</span>
                    <span className="text-white font-medium">Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <Button 
                  className="w-full bg-law-gold hover:bg-law-gold-light text-law-navy font-medium rounded-lg flex items-center justify-center py-6 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = "#"}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Online
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
