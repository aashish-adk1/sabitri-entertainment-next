"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { 
  Rocket, 
  Menu, 
  X, 
  ChevronDown, 
  Layers, 
  BarChart2, 
  PieChart,
  Sun,
  Moon,
  Sparkles,
  MousePointer,
  Home,
  Users,
  Mail
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

const Header = () => {
  // States
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();
  
  // Refs
  const submenuRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Navigation data
   const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Services', href: '/services'},
    { name: 'Contact us', href: '/contact' }
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleMenuItemClick = () => {
    setMenuState(false);
    setActiveSubmenu(null);
  };

  // Toggle theme with animation
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmenuToggle = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <header className="relative z-1000" ref={headerRef}>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full border-b transition-all duration-500 backdrop-blur-xl ${
          scrolled
            ? 'bg-white/90 dark:bg-zinc-900/95 shadow-lg shadow-purple-500/10 dark:shadow-indigo-500/5'
            : 'bg-transparent border-transparent'
        } dark:border-zinc-800/30`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
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
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <Link 
                    href={item.href}
                    className="font-medium text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMenuState(!menuState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-indigo-400 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {menuState ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/30 font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {menuState && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-zinc-900 border-t dark:border-zinc-800"
            >
             
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Header;