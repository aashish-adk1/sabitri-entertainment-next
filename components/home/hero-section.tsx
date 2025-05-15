"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Code, Smartphone, Megaphone, ArrowRight, MousePointer, Zap, Globe, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HeroPage() {
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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
  const heroOffset = scrollY * 0.4;
  const servicesOffset = scrollY * 0.15;
  const cursorX = cursorPosition.x;
  const cursorY = cursorPosition.y;

  // Service cards data
  const serviceCards = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom, responsive websites built with modern technologies and focused on user experience",
      icon: Code,
      color: "#6366f1", // indigo
      glowColor: "rgba(99, 102, 241, 0.15)",
      link: "/services/web-development"
    },
    {
      id: 2,
      title: "App Development",
      description: "Intuitive mobile and web applications that provide seamless experiences across all devices",
      icon: Smartphone,
      color: "#a855f7", // purple
      glowColor: "rgba(168, 85, 247, 0.15)",
      link: "/services/app-development"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Strategic marketing solutions to enhance your brand visibility and drive customer engagement",
      icon: Megaphone,
      color: "#ec4899", // pink
      glowColor: "rgba(236, 72, 153, 0.15)",
      link: "/services/digital-marketing"
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "User-centered design that creates meaningful and relevant experiences for your customers",
      icon: Zap,
      color: "#3b82f6", // blue
      glowColor: "rgba(59, 130, 246, 0.15)",
      link: "/services/ui-ux-design"
    },
    {
      id: 5,
      title: "SEO Optimization",
      description: "Improve your search rankings and drive organic traffic with our comprehensive SEO strategies",
      icon: Globe,
      color: "#10b981", // emerald
      glowColor: "rgba(16, 185, 129, 0.15)",
      link: "/services/seo-optimization"
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      description: "Data-driven insights to measure performance and guide strategic business decisions",
      icon: LineChart,
      color: "#f59e0b", // amber
      glowColor: "rgba(245, 158, 11, 0.15)",
      link: "/services/analytics"
    }
  ];

  // Client logos
  const clientLogos = [
    { id: 1, initials: "AB", bgColor: "bg-indigo-600", ringColor: "ring-indigo-900" },
    { id: 2, initials: "CD", bgColor: "bg-purple-600", ringColor: "ring-purple-900" },
    { id: 3, initials: "EF", bgColor: "bg-pink-600", ringColor: "ring-pink-900" },
    { id: 4, initials: "GH", bgColor: "bg-blue-600", ringColor: "ring-blue-900" }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Hover effect for card
  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -8, transition: { duration: 0.3, ease: "easeOut" } }
  };

  if (!mounted) {
    return null; // Avoid layout shift by rendering nothing until mounted
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated background elements with enhanced colors */}
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

      {/* Enhanced Grid Pattern Overlay with more subtle opacity */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Hero Section with enhanced colors */}
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
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 pt-20 pb-32 lg:px-12 lg:pt-32 lg:pb-40 max-w-7xl mx-auto"
      >
        <motion.div 
          className="w-full lg:w-1/2 space-y-6"
          style={{ transform: `translateY(${-heroOffset}px)` }}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm"
          >
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
            Transforming digital experiences
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Presence</span> With Expert Solutions
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg max-w-xl text-gray-300"
          >
            Sabitri Entertainment delivers cutting-edge websites, intuitive applications, and strategic digital marketing that drives growth and enhances user engagement.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/50 text-lg px-8 group"
            >
              Our Services
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
              className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-600 text-lg px-8"
            >
              Get in Touch
            </Button>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="pt-8 flex items-center space-x-4"
          >
            <div className="flex -space-x-3">
              {clientLogos.map((logo) => (
                <motion.div 
                  key={logo.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${logo.bgColor} ring-2 ${logo.ringColor} text-white`}
                >
                  {logo.initials}
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-gray-400">Trusted by 100+ businesses worldwide</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end" 
          style={{ transform: `translateY(${-heroOffset * 0.7}px)` }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-full max-w-lg h-96">
            <motion.div 
              animate={{ scale: isHovering ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl bg-purple-700 opacity-30"
            ></motion.div>
            <motion.div 
              animate={{ scale: isHovering ? 1.1 : 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute bottom-0 -right-4 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl bg-indigo-700 opacity-30"
            ></motion.div>
            
            {/* Floating mockup devices with enhanced glass effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="relative border border-gray-800/80 rounded-xl shadow-2xl shadow-indigo-900/30 p-2 w-64 h-96 transform-gpu backdrop-blur-sm"
                style={{ 
                  backgroundImage: "linear-gradient(to bottom right, rgba(79, 70, 229, 0.2), rgba(168, 85, 247, 0.2))"
                }}
                animate={{ 
                  rotate: isHovering ? 6 : 3,
                  x: cursorX * 0.01,
                  y: cursorY * 0.01
                }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <div className="rounded-lg h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800/50">
                  <div className="h-4 w-full flex items-center px-2 bg-gray-800">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-3">
                    <div className="h-3 w-3/4 rounded mb-2 bg-gray-700"></div>
                    <div className="h-3 w-full rounded mb-4 bg-gray-700"></div>
                    <div className="h-20 w-full rounded mb-3 flex items-center justify-center bg-indigo-900/40 border border-indigo-800/50">
                      <MousePointer className="w-6 h-6 opacity-50 text-indigo-300" />
                    </div>
                    <div className="h-3 w-5/6 rounded mb-2 bg-gray-700"></div>
                    <div className="h-3 w-full rounded mb-2 bg-gray-700"></div>
                    <div className="h-3 w-4/6 rounded mb-4 bg-gray-700"></div>
                    <div className="h-10 w-full rounded bg-purple-900/40 border border-purple-800/50"></div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-10 -right-4 border border-gray-800/80 rounded-xl shadow-2xl shadow-purple-900/30 p-2 w-48 h-64 transform-gpu backdrop-blur-sm"
                style={{ 
                  backgroundImage: "linear-gradient(to bottom right, rgba(79, 70, 229, 0.2), rgba(168, 85, 247, 0.2))"
                }}
                animate={{ 
                  rotate: isHovering ? -12 : -6,
                  x: -cursorX * 0.015,
                  y: -cursorY * 0.015
                }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <div className="rounded-lg h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800/50">
                  <div className="h-4 w-full flex items-center px-2 bg-gray-800">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-2">
                    <div className="h-2 w-3/4 rounded mb-2 bg-gray-700"></div>
                    <div className="h-2 w-full rounded mb-3 bg-gray-700"></div>
                    <div className="h-16 w-full rounded mb-2 flex items-center justify-center bg-purple-900/40 border border-purple-800/50">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <MousePointer className="w-5 h-5 opacity-50 text-purple-300" />
                      </motion.div>
                    </div>
                    <div className="h-2 w-5/6 rounded mb-1 bg-gray-700"></div>
                    <div className="h-2 w-full rounded mb-2 bg-gray-700"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Services Section with enhanced card aesthetics */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-24 lg:px-12 max-w-7xl mx-auto" 
        style={{ transform: `translateY(${-servicesOffset}px)` }}
      >
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Premium Services
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-400"
          >
            Comprehensive digital solutions tailored to your business needs
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover="hover"
              variants={cardHover}
            >
              <Link href={service.link} className="block h-full">
                <Card className="overflow-hidden h-full transition-all duration-300 bg-gray-900/60 border-gray-800 hover:border-gray-700 backdrop-blur-sm">
                  {/* Enhanced gradient background with glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-90"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full" 
                       style={{ background: service.glowColor, filter: 'blur(25px)' }}></div>
                  
                  <CardContent className="p-6 relative">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gray-800 border border-opacity-20"
                         style={{ borderColor: service.color, boxShadow: `0 0 15px ${service.glowColor}` }}>
                      <service.icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    
                    <h4 className="text-xl font-bold mb-3 text-white">
                      {service.title}
                    </h4>
                    
                    <p className="mb-6 text-gray-400">
                      {service.description}
                    </p>
                    
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
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button className="group px-8 flex items-center bg-transparent border border-indigo-700/50 hover:bg-indigo-900/30 text-indigo-300">
            <span>View All Services</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Add a styled CSS class for the grid pattern */}
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