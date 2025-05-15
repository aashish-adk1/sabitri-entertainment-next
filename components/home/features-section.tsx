"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Zap, Shield, Palette, Library, BarChart3, Cpu } from 'lucide-react';
import { useRef } from 'react';

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  index: number;
  glowColor: string;
}

// Floating icon component with enhanced animations
const FloatingIcon: React.FC<{icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, color: string}> = ({icon: Icon, color}) => {
  return (
    <motion.div
      className="absolute opacity-20"
      animate={{
        y: [0, -15, 0],
        x: [0, 8, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      style={{
        filter: `drop-shadow(0 0 12px ${color})`,
      }}
    >
      <Icon className="h-24 w-24" style={{ color }} />
    </motion.div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index, glowColor }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  // Subtle card float animation
  const floatAnimation = {
    rest: { 
      y: 0,
      boxShadow: `0 5px 30px -15px ${glowColor}30`,
      transition: { 
        duration: 0.45, 
        ease: "easeInOut" 
      }
    },
    hover: { 
      y: -10, 
      boxShadow: `0 25px 40px -15px ${glowColor}50`,
      transition: { 
        duration: 0.35, 
        ease: "easeInOut" 
      }
    }
  };

  // Particle animation for the card
  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: [0, 0.4, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as "reverse", 
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={floatAnimation}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        className="h-full bg-zinc-900/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-zinc-800 group hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
        style={{
          background: `linear-gradient(125deg, rgba(18, 18, 18, 0.9) 0%, rgba(25, 25, 28, 0.9) 90%)`,
        }}
      >
        {/* Enhanced glow effect */}
        <motion.div 
          className="absolute -inset-1 blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 z-0"
          animate={{
            opacity: isHovered ? [0.2, 0.35, 0.2] : 0.1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)` }}
        />
        
        {/* Animated particles */}
        {isHovered && (
          <>
            <motion.div
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              className="absolute w-32 h-32 rounded-full"
              style={{ 
                background: `radial-gradient(circle at center, ${glowColor}30 0%, transparent 70%)`,
                top: "10%",
                right: "10%"
              }}
            />
            <motion.div
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              className="absolute w-24 h-24 rounded-full"
              style={{ 
                background: `radial-gradient(circle at center, ${glowColor}30 0%, transparent 70%)`,
                bottom: "15%",
                left: "5%",
                animationDelay: "1s"
              }}
            />
          </>
        )}
        
        {/* Horizontal glowing accent line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <motion.div 
            className="relative mb-8 inline-flex"
            animate={isHovered ? {
              y: [0, -8, 0],
              rotate: [0, 5, 0],
            } : {}}
            transition={{
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)` }}
            />
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-800/90 group-hover:scale-110 transition-transform duration-500"
              style={{ 
                boxShadow: `0 0 25px -5px ${glowColor}70`,
                background: `linear-gradient(135deg, rgba(30, 30, 35, 0.95) 0%, rgba(20, 20, 25, 0.95) 100%)`,
                border: `1px solid rgba(255, 255, 255, 0.1)`
              }}
            >
              <Icon className="h-8 w-8" style={{ color: glowColor }} />
            </div>
          </motion.div>

          <motion.h3 
            className="text-2xl font-bold mb-4 tracking-tight"
            style={{ 
              textShadow: isHovered ? `0 0 15px ${glowColor}70` : `0 0 5px ${glowColor}30`
            }}
            animate={{
              textShadow: isHovered ? `0 0 20px ${glowColor}90` : `0 0 5px ${glowColor}30`
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            <span className="bg-gradient-to-r from-white via-white to-zinc-300 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h3>

          <motion.p 
            className="text-zinc-300 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
          >
            {description}
          </motion.p>

          {/* Bottom animated accent line */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 rounded-full"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
              opacity: 0
            }}
            animate={isHovered ? {
              opacity: [0, 0.7, 0],
              width: ["0%", "100%", "0%"],
              left: ["0%", "0%", "100%"],
            } : {}}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 1.2,
            ease: [0.215, 0.61, 0.355, 1]
        }
    })
  };
  
  const glowColors = [
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#8B5CF6", // Violet 
    "#EC4899", // Pink
    "#10B981", // Emerald
    "#F59E0B", // Amber
  ];
  
  const features = [
    {
      icon: Zap,
      title: "High Performance",
      description: "Experience lightning-fast streaming and rendering with our optimized entertainment platform, designed for maximum performance across all devices.",
      glowColor: glowColors[0]
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data and content are protected with enterprise-grade security and encryption, ensuring a safe entertainment experience.",
      glowColor: glowColors[1]
    },
    {
      icon: Palette,
      title: "Customizable Experience",
      description: "Personalize your entertainment journey with customizable themes, playlists, and content recommendations tailored to your preferences.",
      glowColor: glowColors[2]
    },
    {
      icon: Library,
      title: "Extensive Content Library",
      description: "Access thousands of titles across multiple genres, from blockbuster hits to indie favorites, updated daily with fresh content.",
      glowColor: glowColors[3]
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Gain insights into your entertainment habits with comprehensive analytics and personalized recommendations based on your viewing patterns.",
      glowColor: glowColors[4]
    },
    {
      icon: Cpu,
      title: "AI-Powered Recommendations",
      description: "Our advanced AI algorithms learn your preferences to suggest content you'll love, creating a truly personalized entertainment experience.",
      glowColor: glowColors[5]
    }
  ];

  // For animated background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative py-40 overflow-hidden bg-zinc-950" ref={ref}>
      {/* Enhanced background with matrix pattern and noise texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-[0.015] mix-blend-luminosity z-0"></div>
      
      {/* Advanced gradient blobs for enhanced glow effect */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[150px] rounded-full z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-purple-500/5 blur-[120px] rounded-full z-0"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-indigo-500/3 blur-[180px] rounded-full z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      
      {/* Responsive cursor gradient effect */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.02] blur-[180px] pointer-events-none z-0"
        style={{ 
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
        }}
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 100,
          mass: 3
        }}
      />
      
      {/* Floating background icons for ambiance */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={Zap} color="rgba(59, 130, 246, 0.08)" />
        <FloatingIcon icon={Shield} color="rgba(99, 102, 241, 0.08)" />
        <FloatingIcon icon={Palette} color="rgba(139, 92, 246, 0.08)" />
        <div className="absolute bottom-10 right-10">
          <FloatingIcon icon={Library} color="rgba(236, 72, 153, 0.08)" />
        </div>
        <div className="absolute top-32 right-1/4">
          <FloatingIcon icon={BarChart3} color="rgba(16, 185, 129, 0.08)" />
        </div>
        <div className="absolute bottom-1/4 left-40">
          <FloatingIcon icon={Cpu} color="rgba(245, 158, 11, 0.08)" />
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced glowing section header */}
        <div className="max-w-3xl mx-auto text-center mb-28">
          <motion.div
            initial="hidden"
            animate={controls}
            custom={0}
            variants={titleVariants}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 px-5 py-2.5 rounded-full text-blue-300 text-sm font-medium mb-8 border border-blue-800/30 backdrop-blur-sm"
            style={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
            }}
          >
            <Zap className="w-4 h-4" />
            <span>Innovative Features</span>
          </motion.div>
          
          <motion.h2
            initial="hidden"
            animate={controls}
            custom={1}
            variants={titleVariants}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Cutting-Edge</span>
              <motion.span 
                className="absolute -inset-1 bg-blue-500/10 blur-md rounded-lg z-0"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </span>{' '}
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% auto",
                textShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
              }}
            >
              Entertainment
            </motion.span>{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Features</span>
              <motion.span 
                className="absolute -inset-1 bg-purple-500/10 blur-md rounded-lg z-0"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1.5,
                }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial="hidden"
            animate={controls}
            custom={2}
            variants={titleVariants}
            className="text-xl text-zinc-300 leading-relaxed backdrop-blur-sm mx-auto max-w-2xl"
          >
            Discover what makes our platform the leading choice for entertainment lovers worldwide. Our innovative features create an unmatched digital experience.
          </motion.p>
        </div>
        
        {/* Enhanced features grid with improved layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              glowColor={feature.glowColor}
            />
          ))}
        </div>
        
        {/* Enhanced stats counter with glowing effects */}
        <motion.div
          initial="hidden"
          animate={controls}
          custom={5}
          variants={titleVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 text-center"
        >
          {[
            { value: "10M+", label: "Active Users", color: "#3B82F6" },
            { value: "50K+", label: "Content Titles", color: "#8B5CF6" },
            { value: "99.9%", label: "Uptime", color: "#10B981" },
            { value: "24/7", label: "Customer Support", color: "#EC4899" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="p-8 rounded-xl backdrop-blur-sm relative overflow-hidden group"
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              style={{
                background: `linear-gradient(135deg, rgba(30, 30, 35, 0.7) 0%, rgba(18, 18, 20, 0.8) 100%)`,
                border: `1px solid rgba(255, 255, 255, 0.05)`,
                boxShadow: `0 10px 30px -10px ${stat.color}30`
              }}
            >
              {/* Animated glow effect */}
              <motion.div 
                className="absolute -inset-1 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.5,
                }}
                style={{ background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 70%)` }}
              />
              
              {/* Subtle animated border */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}70, transparent)` }}
                  animate={{
                    left: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                />
              </div>
              
              <motion.div 
                className="text-5xl font-bold mb-3"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  fontWeight: 800,
                  textShadow: `0 0 20px ${stat.color}50`,
                }}
              >
                <motion.span 
                  className="bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text inline-block"
                  animate={{
                    textShadow: [`0 0 20px ${stat.color}20`, `0 0 30px ${stat.color}60`, `0 0 20px ${stat.color}20`]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {stat.value}
                </motion.span>
              </motion.div>
              <div className="text-sm text-zinc-300 font-medium tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-action button with glow effect */}
        <motion.div
          initial="hidden"
          animate={controls}
          custom={6}
          variants={titleVariants}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg overflow-hidden"
            style={{
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <Zap className="w-5 h-5" />
            <span>Experience the Future</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;