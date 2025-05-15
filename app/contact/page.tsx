"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ChevronRight, 
  MessageSquare, 
} from 'lucide-react';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e:MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect values
  const heroOffset = scrollY * 0.4;
  const contentOffset = scrollY * 0.15;
  const cursorX = cursorPosition.x;
  const cursorY = cursorPosition.y;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };



  // Contact info items
  const contactItems = [
    {
      id: 1,
      title: "Email Us",
      info: "sabitrientertainment14@gmail.com",
      description: "Our team will respond within 24 hours",
      icon: Mail,
      color: "#6366f1", // indigo
      glowColor: "rgba(99, 102, 241, 0.15)",
    },
    {
      id: 2,
      title: "Call Us",
      info: "+977-1-5911265",
      description: "Monday-Friday, 9am-5pm EST",
      icon: Phone,
      color: "#a855f7", // purple
      glowColor: "rgba(168, 85, 247, 0.15)",
    },
    {
      id: 3,
      title: "Visit Us",
      info: "Kalash Complex",
      description: "Suncity,Pepsicola",
      icon: MapPin,
      color: "#ec4899", // pink
      glowColor: "rgba(236, 72, 153, 0.15)",
    },
    {
      id: 4,
      title: "Office Hours",
      info: "10:00 AM - 06:00 PM",
      description: "Sunday to Friday",
      icon: Clock,
      color: "#3b82f6", // blue
      glowColor: "rgba(59, 130, 246, 0.15)",
    },
  ];

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        service: '',
        message: ''
      });
      
      // Reset form status after showing success message
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  if (!mounted) {
    return null; // Avoid layout shift by rendering nothing until mounted
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { size: 'w-64 h-64', bg: 'bg-purple-900/20', blur: 'blur-3xl', position: 'top-[10%] left-[5%]', factor: 0.012 },
          { size: 'w-96 h-96', bg: 'bg-indigo-900/20', blur: 'blur-3xl', position: 'top-[50%] right-[10%]', factor: -0.018 },
          { size: 'w-80 h-80', bg: 'bg-blue-900/20', blur: 'blur-3xl', position: 'bottom-[10%] left-[30%]', factor: 0.014 },
          { size: 'w-72 h-72', bg: 'bg-emerald-900/15', blur: 'blur-3xl', position: 'bottom-[30%] right-[5%]', factor: 0.01 }
        ].map((blob, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 12 + index * 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className={`absolute rounded-full ${blob.size} ${blob.bg} ${blob.blur} ${blob.position}`}
            style={{ 
              transform: `translate(${cursorX * blob.factor}px, ${cursorY * blob.factor}px)` 
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="relative z-10 px-6 pt-20 pb-16 lg:px-12 lg:pt-32 lg:pb-24 max-w-7xl mx-auto"
      >
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          style={{ transform: `translateY(${-heroOffset}px)` }}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm"
          >
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
            We&apos;d love to hear from you
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Touch</span> With Us
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto text-gray-300 mb-8"
          >
            Have questions about our services? Ready to start your project? Reach out to our team and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Contact Details Section */}
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 px-6 py-6 lg:px-12 max-w-7xl mx-auto" 
      style={{ transform: `translateY(${-contentOffset}px)` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactItems.map((item) => (
          <div
            key={item.id}
            className="opacity-100 transition-transform duration-300 hover:-translate-y-1"
          >
            <Card className="overflow-hidden h-full transition-all duration-300 bg-gray-900/60 border border-gray-800 hover:border-gray-700 backdrop-blur-sm">
              {/* Enhanced gradient background with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-90"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full" 
                   style={{ background: item.glowColor, filter: 'blur(25px)' }}></div>
              
              <CardContent className="p-6 relative">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gray-800 border border-opacity-20"
                     style={{ borderColor: item.color, boxShadow: `0 0 15px ${item.glowColor}` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                
                <h4 className="text-lg font-bold mb-2 text-white">
                  {item.title}
                </h4>
                
                <p className="text-lg font-medium mb-1 break-words overflow-wrap-anywhere" style={{ color: item.color }}>
                  {item.info}
                </p>
                
                <p className="text-sm text-gray-400 break-words overflow-wrap-anywhere">We&apos;ve helped hundreds of clients.</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>

      {/* Contact Form & Map Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 px-6 py-12 lg:px-12 max-w-7xl mx-auto" 
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-indigo-900/20 filter blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-900/20 filter blur-3xl"></div>
            
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="mr-3 text-indigo-400" />
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required 
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    required 
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?" 
                    required 
                    className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-gray-300">Service Interested In</Label>
                  <Select onValueChange={handleSelectChange} value={formData.service}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="app-development">App Development</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="seo-optimization">SEO Optimization</SelectItem>
                      <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Your Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..." 
                  required 
                  className="bg-gray-800/50 border-gray-700 focus:border-indigo-500 text-white min-h-32" 
                />
              </div>
              
              <div>
                <Button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/30 group"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
                
                {formStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-md bg-green-900/50 border border-green-700 text-green-300 text-sm"
                  >
                    Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
          
          {/* Google Map Integration */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Google Maps Integration */}
            <div className="rounded-2xl overflow-hidden bg-gray-900/70 backdrop-blur-md border border-gray-800 relative h-full">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-900/20 filter blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-indigo-900/20 filter blur-3xl"></div>
              
              {/* Google Maps iframe with Sabitri Reading Room location */}
              <div className="h-64 w-full relative z-10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6429480553826!2d85.36787201549812!3d27.69353367620431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b50cb347f1f%3A0x73c05143e3a8b2df!2sSabitri%20Reading%20Room!5e0!3m2!1sen!2sus!4v1621234567890!5m2!1sen!2sus" 
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sabitri Reading Room Location"
                />
              </div>
              
              {/* Location Info Below Map */}
              <div className="p-4 border-t border-gray-800">
                <h4 className="font-bold text-lg mb-2 text-indigo-300">Sabitri Reading Room</h4>
                <p className="text-gray-300 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                  Shantinagar, Kathmandu, Nepal
                </p>
                <p className="text-gray-400 text-sm">
                  Visit us in person to discover our wide selection of books and peaceful reading environment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-5xl mx-auto text-center" 
      >
        <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 rounded-2xl p-10 lg:p-16 backdrop-blur-md border border-indigo-800/30 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-900/20 mix-blend-screen filter blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-900/20 mix-blend-screen filter blur-3xl"></div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Ready to Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Journey</span>?
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Let&apos;s transform your ideas into reality. Our team of experts is ready to help you achieve your digital goals.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/30 group"
            >
              Schedule a Consultation
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-600"
            >
              Explore Our Portfolio
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Styled CSS class for the grid pattern */}
      <style jsx global>{`
        @tailwind base;
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}