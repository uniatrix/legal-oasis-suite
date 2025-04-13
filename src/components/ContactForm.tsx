
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
import { Phone, Mail, MapPin } from "lucide-react";
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
      description: "Thank you for contacting us. We'll respond shortly.",
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
    <section id="contact" className="py-16 bg-law-gray">
      <div className="law-container">
        <h2 className="section-title text-center">Contact Us</h2>
        <p className="text-center text-law-navy-light max-w-3xl mx-auto mb-12">
          Schedule a consultation with our experienced labor law attorneys to discuss your case.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-law-navy mb-6">Get In Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-law-gold focus:ring-law-gold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="caseType" className="text-sm font-medium text-gray-700">Case Type</label>
                    <Select value={formData.caseType} onValueChange={handleSelectChange}>
                      <SelectTrigger className="border-gray-300 focus:border-law-gold focus:ring-law-gold">
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
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Briefly describe your situation"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="border-gray-300 focus:border-law-gold focus:ring-law-gold"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-law-navy hover:bg-law-navy-light text-white py-3 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-law-navy p-8 rounded-lg shadow-md text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-law-gold" />
                  <div>
                    <p className="font-medium text-lg">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-law-gold" />
                  <div>
                    <p className="font-medium text-lg">Email</p>
                    <p className="text-gray-300">contact@legaloasis.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-law-gold" />
                  <div>
                    <p className="font-medium text-lg">Office</p>
                    <p className="text-gray-300">
                      123 Legal Avenue, Suite 500<br />
                      Los Angeles, CA 90001
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4">Office Hours</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Monday-Friday:</p>
                  <p>9:00 AM - 6:00 PM</p>
                  <p>Saturday:</p>
                  <p>10:00 AM - 2:00 PM</p>
                  <p>Sunday:</p>
                  <p>Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
