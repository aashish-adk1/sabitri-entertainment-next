"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Lightbulb, 
  Target, 
  Award, 
  Star, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AboutUsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
  const sectionOffset = scrollY * 0.15;
  const cursorX = cursorPosition.x;
  const cursorY = cursorPosition.y;

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Aditya Sharma",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/89.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Creative Director",
      image: "https://randomuser.me/api/portraits/women/73.jpg",
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "Technical Lead",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      id: 4,
      name: "Anjali Kapoor",
      role: "Marketing Manager",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
    }
  ];

  // Company values data
  const companyValues = [
    {
      id: 1,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative approaches to solve complex challenges",
      icon: Lightbulb,
      color: "#6366f1", // indigo
      glowColor: "rgba(99, 102, 241, 0.15)"
    },
    {
      id: 2,
      title: "Excellence",
      description: "We maintain the highest standards in our work, constantly improving and refining our processes",
      icon: Award,
      color: "#a855f7", // purple
      glowColor: "rgba(168, 85, 247, 0.15)"
    },
    {
      id: 3,
      title: "Client-Focused",
      description: "We prioritize our clients' needs, building lasting relationships based on trust and results",
      icon: Target,
      color: "#ec4899", // pink
      glowColor: "rgba(/236, 72, 153, 0.15)"
    }
  ];

  // Milestones data for timeline
  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Sabitri Entertainment was established with a vision to transform digital experiences"
    },
    {
      year: "2019",
      title: "First Major Client",
      description: "Secured partnership with a leading brand, marking our entry into the enterprise market"
    },
    {
      year: "2020",
      title: "Expanded Services",
      description: "Added mobile app development and digital marketing to our core service offerings"
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Opened our first international office to serve clients across multiple regions"
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Received multiple awards for innovation and excellence in digital solutions"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Card hover effect
  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } }
  };

  if (!mounted) {
    return null; // Avoid layout shift by rendering nothing until mounted
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { size: 'w-64 h-64', bg: 'bg-purple-900/20', blur: 'blur-3xl', position: 'top-[5%] left-[15%]', factor: 0.012 },
          { size: 'w-96 h-96', bg: 'bg-indigo-900/20', blur: 'blur-3xl', position: 'top-[40%] right-[5%]', factor: -0.018 },
          { size: 'w-80 h-80', bg: 'bg-blue-900/20', blur: 'blur-3xl', position: 'bottom-[20%] left-[20%]', factor: 0.014 },
          { size: 'w-72 h-72', bg: 'bg-emerald-900/15', blur: 'blur-3xl', position: 'bottom-[10%] right-[15%]', factor: 0.01 }
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
        className="relative z-10 px-6 pt-24 pb-20 lg:px-12 lg:pt-32 lg:pb-28 max-w-7xl mx-auto"
        style={{ transform: `translateY(${-heroOffset * 0.5}px)` }}
      >
        <motion.div 
          variants={fadeInUp}
          className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm mb-6"
        >
          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
          Our Story
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          We Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Experiences</span> That Matter
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg max-w-3xl text-gray-300 mb-8"
        >
          Founded in 2018, Sabitri Entertainment has grown from a small startup to a leading digital agency. 
          We combine creativity, technology, and strategic thinking to deliver exceptional results for our clients.
        </motion.p>
        
        <motion.div 
          variants={fadeInUp}
          className="flex items-center space-x-6 mb-16"
        >
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
            <span className="text-gray-300">100+ Projects Delivered</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-gray-300">30+ Experts</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-pink-400 mr-2" />
            <span className="text-gray-300">Award-Winning Team</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/30 border border-gray-800"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm"></div>
          <img 
            src="https://plus.unsplash.com/premium_photo-1670315264879-59cc6b15db5f" 
            alt="Our Headquarter" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-2xl font-bold mb-2">Our Headquarters</h3>
            <p className="text-gray-300">Where innovation meets execution</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Our Values Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-7xl mx-auto" 
        style={{ transform: `translateY(${-sectionOffset}px)` }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Core Values
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-400"
          >
            The principles that guide our work and define our culture
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyValues.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover="hover"
              variants={cardHover}
            >
              <Card className="overflow-hidden h-full transition-all duration-300 bg-gray-900/60 border-gray-800 hover:border-gray-700 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-90"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full" 
                     style={{ background: value.glowColor, filter: 'blur(25px)' }}></div>
                
                <CardContent className="p-6 relative">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gray-800 border border-opacity-20"
                       style={{ borderColor: value.color, boxShadow: `0 0 15px ${value.glowColor}` }}>
                    <value.icon className="w-6 h-6" style={{ color: value.color }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Meet The Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-400"
          >
            The talented experts behind our success
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover="hover"
              variants={cardHover}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl aspect-square shadow-lg shadow-indigo-900/30 border border-gray-800">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 mix-blend-overlay transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-300 font-medium">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm mb-6">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Excellence That Sets <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Us Apart</span>
            </h2>
            <p className="text-gray-300 mb-8">
              We combine technical expertise, creative innovation, and strategic thinking to deliver results that exceed expectations. Our approach is collaborative, transparent, and focused on your success.
            </p>
            
            <div className="space-y-4">
              {[
                "Custom solutions tailored to your specific needs",
                "Transparent communication throughout the project lifecycle",
                "Dedicated support team available 24/7",
                "Continuous improvement and adaptation to new technologies"
              ].map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <div className="mt-1 mr-3 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-indigo-400" />
                  </div>
                  <p className="text-gray-300">{point}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <Button
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/50 text-lg px-8 group"
              >
                Get in Touch
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
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-purple-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm"></div>
              <img 
                src="https://plus.unsplash.com/premium_photo-1663040303769-cd3ee2dfb172" 
                alt="Our Office" 
                className="w-full h-full object-cover opacity-70 mix-blend-overlay"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-bold mb-1">Modern Workspace</h3>
                <p className="text-gray-300">Where creativity and technology converge</p>
              </div>
            </div>
            
            {/* Floating accent elements */}
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-24 h-24 rounded-lg overflow-hidden border border-gray-800 shadow-lg shadow-indigo-900/30 transform rotate-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-5xl mx-auto"
      >
        <div className="relative rounded-2xl overflow-hidden border border-indigo-800/50 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-black/80"></div>
          
          {/* Animated background elements */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-900/30 filter blur-3xl"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-900/30 filter blur-3xl"
          ></motion.div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with our team to discuss how we can help you achieve your business goals through innovative digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/50 text-lg px-8 group"
              >
                Contact Us
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
              
                              <Button 
                variant="outline" 
                size="lg" 
                className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-600 text-lg px-8"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Client Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-400"
          >
            What our clients say about working with us
          </motion.p>
        </div>
        
        <Tabs defaultValue="client1" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8 bg-gray-900/60 border border-gray-800 backdrop-blur-sm">
            <TabsTrigger value="client1" className="data-[state=active]:bg-indigo-900/50 data-[state=active]:text-white">
              TechFusion
            </TabsTrigger>
            <TabsTrigger value="client2" className="data-[state=active]:bg-indigo-900/50 data-[state=active]:text-white">
              GrowthMax
            </TabsTrigger>
            <TabsTrigger value="client3" className="data-[state=active]:bg-indigo-900/50 data-[state=active]:text-white">
              EcoVital
            </TabsTrigger>
          </TabsList>
          
          {[
            {
              id: "client1",
              name: "Vikram Malhotra",
              role: "CTO, TechFusion",
              quote: "Sabitri Entertainment transformed our digital presence completely. Their team's technical expertise and creative approach delivered a solution that exceeded our expectations. The new platform has significantly improved user engagement and conversion rates.",
              initials: "VM",
              bgColor: "bg-indigo-600",
              ringColor: "ring-indigo-900"
            },
            {
              id: "client2",
              name: "Amrita Singh",
              role: "Marketing Director, GrowthMax",
              quote: "Working with Sabitri has been a game-changer for our brand. Their strategic approach to digital marketing helped us reach new audiences and increase our market share. The team is responsive, professional, and truly invested in our success.",
              initials: "AS",
              bgColor: "bg-purple-600",
              ringColor: "ring-purple-900"
            },
            {
              id: "client3",
              name: "Rohit Kapoor",
              role: "Founder, EcoVital",
              quote: "The mobile app developed by Sabitri Entertainment has revolutionized how we connect with our customers. The intuitive design and seamless functionality have received overwhelmingly positive feedback. Their ongoing support has been exceptional.",
              initials: "RK",
              bgColor: "bg-pink-600",
              ringColor: "ring-pink-900"
            }
          ].map((testimonial) => (
            <TabsContent key={testimonial.id} value={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-8 md:p-10"
              >
                <div className="absolute top-0 right-0 -mt-6 -mr-6 text-indigo-500 opacity-20">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.3 2C6.8 2.4 3.4 5.8 3 10.3V18H10.7V10.3H5.7C6.1 7.1 8.5 4.7 11.7 4.3V2H11.3ZM21.3 2C16.8 2.4 13.4 5.8 13 10.3V18H20.7V10.3H15.7C16.1 7.1 18.5 4.7 21.7 4.3V2H21.3Z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold ${testimonial.bgColor} ring-4 ${testimonial.ringColor} text-white`}>
                      {testimonial.initials}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-lg text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="text-xl font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 px-6 py-20 lg:px-12 max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-400"
          >
            Everything you need to know about working with us
          </motion.p>
        </div>
        
        <div className="space-y-6">
          {[
            {
              question: "What sets Sabitri Entertainment apart from other digital agencies?",
              answer: "Our unique blend of technical expertise, creative innovation, and strategic thinking allows us to deliver comprehensive solutions that address the full spectrum of digital needs. We prioritize long-term partnerships over one-off projects, investing in understanding your business and goals to create truly impactful work."
            },
            {
              question: "How do you approach new projects?",
              answer: "Every project begins with an in-depth discovery phase where we learn about your business, goals, target audience, and competitive landscape. We then develop a strategic roadmap, create detailed specifications, and work collaboratively through design, development, testing, and launch phases."
            },
            {
              question: "What size companies do you work with?",
              answer: "We work with organizations of all sizes, from startups to enterprise businesses. Our flexible approach allows us to scale our services according to your specific needs and resources, ensuring effective solutions regardless of company size."
            },
            {
              question: "How do you handle project timelines and budgets?",
              answer: "Transparency is core to our process. At the start of each project, we establish clear timelines and budgets based on your requirements. We use agile methodologies to maintain flexibility while ensuring on-time and on-budget delivery. Regular updates keep you informed throughout the project lifecycle."
            },
            {
              question: "Do you provide ongoing support after project completion?",
              answer: "Absolutely. We offer various support and maintenance packages to ensure your digital assets continue to perform optimally. Our dedicated support team is available to address any issues, implement updates, and help you evolve your digital presence as your business grows."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/60 backdrop-blur-sm"
            >
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <div className="ml-4 flex-shrink-0 p-1 text-indigo-400 rounded-full group-open:rotate-180 transition-transform duration-300">
                    <ChevronRight className="w-5 h-5 transform rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-0 text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
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