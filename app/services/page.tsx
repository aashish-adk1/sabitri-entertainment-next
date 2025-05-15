"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Users, Code, Smartphone, 
         Megaphone, Zap, Globe, LineChart, Layers, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("all");
  const [mounted, setMounted] = useState(false);

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
  const headerOffset = scrollY * 0.4;
  const cursorX = cursorPosition.x;
  const cursorY = cursorPosition.y;

  // Service categories
  const categories = [
    { id: "all", name: "All Services" },
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" }
  ];

  // Service cards data
  const serviceCards = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom, responsive websites built with modern technologies and focused on user experience",
      longDescription: "Our web development services include everything from simple landing pages to complex web applications. We use the latest technologies like React, Next.js, and Tailwind CSS to create fast, responsive, and accessible websites tailored to your specific needs.",
      features: ["Responsive design", "SEO-friendly structure", "Performance optimization", "CMS integration"],
      icon: Code,
      color: "#6366f1", // indigo
      glowColor: "rgba(99, 102, 241, 0.15)",
      category: "development",
      link: "/services/web-development"
    },
    {
      id: 2,
      title: "App Development",
      description: "Intuitive mobile and web applications that provide seamless experiences across all devices",
      longDescription: "We create native and cross-platform mobile applications that work flawlessly on iOS and Android. Our development process focuses on creating intuitive user interfaces with smooth performance and reliable functionality.",
      features: ["Cross-platform development", "Native iOS & Android apps", "Performance optimization", "Backend integration"],
      icon: Smartphone,
      color: "#a855f7", // purple
      glowColor: "rgba(168, 85, 247, 0.15)",
      category: "development",
      link: "/services/app-development"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Strategic marketing solutions to enhance your brand visibility and drive customer engagement",
      longDescription: "Our digital marketing strategies are designed to increase your brand's online presence and engage with your target audience effectively. We use data-driven approaches to maximize your ROI across multiple channels.",
      features: ["Social media management", "Email marketing", "Content strategy", "PPC campaigns"],
      icon: Megaphone,
      color: "#ec4899", // pink
      glowColor: "rgba(236, 72, 153, 0.15)",
      category: "marketing",
      link: "/services/digital-marketing"
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "User-centered design that creates meaningful and relevant experiences for your customers",
      longDescription: "Our design team focuses on creating beautiful and functional interfaces that delight users while achieving your business goals. We follow a user-centered design process to ensure optimal user experiences.",
      features: ["User research", "Wireframing & prototyping", "Usability testing", "Design systems"],
      icon: Zap,
      color: "#3b82f6", // blue
      glowColor: "rgba(59, 130, 246, 0.15)",
      category: "design",
      link: "/services/ui-ux-design"
    },
    {
      id: 5,
      title: "SEO Optimization",
      description: "Improve your search rankings and drive organic traffic with our comprehensive SEO strategies",
      longDescription: "Our SEO services help you climb the search engine rankings and drive targeted organic traffic to your website. We conduct thorough analysis and implement proven strategies to improve your online visibility.",
      features: ["Keyword research", "On-page optimization", "Technical SEO", "Link building"],
      icon: Globe,
      color: "#10b981", // emerald
      glowColor: "rgba(16, 185, 129, 0.15)",
      category: "marketing",
      link: "/services/seo-optimization"
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      description: "Data-driven insights to measure performance and guide strategic business decisions",
      longDescription: "We provide detailed analytics and reporting to help you understand your digital performance and make informed business decisions. Our custom dashboards give you real-time visibility into your key metrics.",
      features: ["Custom dashboard creation", "Performance tracking", "Conversion optimization", "Audience insights"],
      icon: LineChart,
      color: "#f59e0b", // amber
      glowColor: "rgba(245, 158, 11, 0.15)",
      category: "marketing",
      link: "/services/analytics"
    },
    {
      id: 7,
      title: "Brand Identity Design",
      description: "Create a memorable brand identity that resonates with your audience and stands out in the market",
      longDescription: "Our brand identity services help establish a cohesive visual language for your business. We craft unique logos, color palettes, and typography that reflect your brand values and connect with your target audience.",
      features: ["Logo design", "Brand guidelines", "Visual identity systems", "Brand strategy"],
      icon: Layers,
      color: "#ef4444", // red
      glowColor: "rgba(239, 68, 68, 0.15)",
      category: "design",
      link: "/services/brand-identity"
    },
    {
      id: 8,
      title: "Content Creation",
      description: "Engaging content that tells your brand story and drives audience engagement across platforms",
      longDescription: "Our content creation services produce high-quality written and visual materials that enhance your brand narrative and engage your audience. We develop content strategies aligned with your business objectives.",
      features: ["Copywriting", "Blog articles", "Social media content", "Visual content creation"],
      icon: FileCheck,
      color: "#0ea5e9", // sky
      glowColor: "rgba(14, 165, 233, 0.15)",
      category: "marketing",
      link: "/services/content-creation"
    },
    {
      id: 9,
      title: "Consultation Services",
      description: "Expert advice on digital strategy, technology implementation, and growth opportunities",
      longDescription: "Our consultation services provide strategic guidance for your digital initiatives. We analyze your current situation, identify opportunities for improvement, and create actionable plans to achieve your business goals.",
      features: ["Digital transformation", "Technology assessment", "Growth strategy", "Competitive analysis"],
      icon: Users,
      color: "#8b5cf6", // violet
      glowColor: "rgba(139, 92, 246, 0.15)",
      category: "development",
      link: "/services/consultation"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Card hover animation
  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -8, transition: { duration: 0.3, ease: "easeOut" } }
  };

  // Filter services based on active tab
  const filteredServices = activeTab === "all" 
    ? serviceCards 
    : serviceCards.filter(service => service.category === activeTab);

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

      {/* Header Section */}
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
        className="relative z-10 px-6 pt-20 pb-20 lg:px-12 lg:pt-32 lg:pb-24 max-w-7xl mx-auto"
        style={{ transform: `translateY(${-headerOffset * 0.5}px)` }}
      >
        <motion.div 
          variants={fadeInUp}
          className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm mb-6"
        >
          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
          Tailored solutions for your business
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Professional Services</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg max-w-3xl text-gray-300 mb-10"
        >
          At Sabitri Entertainment, we offer a comprehensive suite of digital services designed to elevate your brand, engage your audience, and drive measurable results.
        </motion.p>

        <motion.div 
          variants={fadeInUp}
          className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-12"
        ></motion.div>
      </motion.div>

      {/* Services Section with Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 pb-24 lg:px-12 max-w-7xl mx-auto"
      >
        {/* Service Category Tabs */}
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-12"
        >
          <div className="flex justify-center">
            <TabsList className="bg-gray-900/60 border border-gray-800 backdrop-blur-sm px-2 py-1">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-indigo-900/50 data-[state=active]:text-indigo-300 px-4 py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Service Cards Grid */}
          <div className="mt-12">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                  whileHover="hover"
                  variants={cardHover}
                >
                  <Link href={service.link} className="block h-full">
                    <Card className="overflow-hidden h-full transition-all duration-300 bg-gray-900/60 border-gray-800 hover:border-gray-700 backdrop-blur-sm">
                      {/* Gradient background with glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-90"></div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full" 
                          style={{ background: service.glowColor, filter: 'blur(25px)' }}></div>
                      
                      <CardContent className="p-6 relative">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gray-800 border border-opacity-20"
                            style={{ borderColor: service.color, boxShadow: `0 0 15px ${service.glowColor}` }}>
                          <service.icon className="w-6 h-6" style={{ color: service.color }} />
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 text-white">
                          {service.title}
                        </h3>
                        
                        <p className="mb-4 text-gray-400">
                          {service.description}
                        </p>

                        <div className="mb-6 space-y-2">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: service.color }}></div>
                              <span className="text-sm text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="inline-flex items-center" style={{ color: service.color }}>
                          <span>Learn more</span>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Tabs>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 px-6 pb-32 lg:px-12 max-w-6xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 border border-gray-800 backdrop-blur-sm p-8 md:p-12">
          {/* Background glow effects */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-indigo-700/20 filter blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-purple-700/20 filter blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your digital presence?</h2>
              <p className="text-gray-300 max-w-xl">
                Let's discuss how our services can help your business reach its full potential in the digital landscape.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/50 px-8 group"
              >
                Contact Us
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
                className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-600 px-8"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid pattern style */}
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