"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  ArrowUp,
  Facebook
} from 'lucide-react';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input'; 

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
    // You would typically send this to your API
  };

  const fadeInUpItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute w-80 h-80 rounded-full bg-purple-900/20 blur-3xl bottom-[10%] right-[5%]"
        />
        <motion.div 
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute w-72 h-72 rounded-full bg-indigo-900/20 blur-3xl top-[20%] left-[5%]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 border border-gray-800 rounded-xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-indigo-900/15 blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-purple-900/15 blur-3xl"></div>
            
            <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center justify-between">
              <div className="max-w-lg">
                <motion.h3 
                  variants={fadeInUpItem}
                  className="text-2xl lg:text-3xl font-bold mb-4"
                >
                  Stay Updated with Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Newsletter</span>
                </motion.h3>
                <motion.p 
                  variants={fadeInUpItem}
                  className="text-gray-400"
                >
                  Subscribe to our newsletter to receive the latest updates, digital trends, and exclusive offers directly to your inbox.
                </motion.p>
              </div>
              
              <motion.form 
                variants={fadeInUpItem}
                onSubmit={handleSubmit}
                className="w-full lg:w-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 py-6"
                  />
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/30 py-6 px-8 whitespace-nowrap"
                  >
                    Subscribe
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <Link href="/" className="block mb-4">
                <Image 
                  src="https://sabitrientertainment.com/assets/img/sabitrilogo.png" 
                  alt="Sabitri Entertainment Logo" 
                  width={180} 
                  height={60} 
                  className="h-auto"
                  priority
                />
              </Link>
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-gray-400">
              Elevating digital experiences with cutting-edge websites, intuitive applications, and strategic digital marketing solutions.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://www.instagram.com/sabitri_entertain/" 
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 transition-all duration-300"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="https://www.facebook.com/sabitrientertainment" 
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 transition-all duration-300"
              >
                <Facebook size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Services', 'Contact Us'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link href="#" className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                    <ChevronRight className="mr-2 h-4 w-4 text-indigo-500" />
                    <span>{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {[
                'Web Development', 
                'App Development', 
                'Digital Marketing', 
                'UI/UX Design', 
                'SEO Optimization', 
                'Analytics & Reporting'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link href="#" className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                    <ChevronRight className="mr-2 h-4 w-4 text-indigo-500" />
                    <span>{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Kalash Complex, Suncity, Pepsicola<br />
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-indigo-500 flex-shrink-0" />
                <span className="text-gray-400">+977-1-5911356</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-indigo-500 flex-shrink-0" />
                <span className="text-gray-400">sabitrientertainment14@gmail.com</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {currentYear} Sabitri Entertainment. All rights reserved.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-gray-500"
          >
            <Link href="#" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors duration-300">Cookie Policy</Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/30 border border-indigo-500/20"
      >
        <motion.div
          animate={{ y: isHovering ? -3 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </motion.div>
      </motion.button>
    </footer>
  );
}