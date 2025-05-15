import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Palette, Star, Mail, FileText, MessageSquare, BarChart3, Settings } from 'lucide-react';

const FloatingIcons = () => {
  // Icons and their properties for animation
  const icons = [
    { Icon: Sparkles, color: 'text-blue-500', size: 'w-8 h-8', position: 'top-1/4 left-[15%]', animationDelay: 0 },
    { Icon: Zap, color: 'text-indigo-500', size: 'w-6 h-6', position: 'top-1/3 right-[20%]', animationDelay: 2 },
    { Icon: Heart, color: 'text-pink-500', size: 'w-5 h-5', position: 'bottom-1/4 left-[25%]', animationDelay: 4 },
    { Icon: Palette, color: 'text-purple-500', size: 'w-7 h-7', position: 'top-2/3 right-[10%]', animationDelay: 1 },
    { Icon: Star, color: 'text-amber-500', size: 'w-6 h-6', position: 'bottom-1/3 left-[10%]', animationDelay: 3 },
    { Icon: Mail, color: 'text-emerald-500', size: 'w-5 h-5', position: 'top-20 left-[30%]', animationDelay: 2.5 },
    { Icon: FileText, color: 'text-cyan-500', size: 'w-4 h-4', position: 'bottom-16 right-[25%]', animationDelay: 1.5 },
    { Icon: MessageSquare, color: 'text-violet-500', size: 'w-5 h-5', position: 'top-40 right-[35%]', animationDelay: 3.5 },
    { Icon: BarChart3, color: 'text-red-500', size: 'w-6 h-6', position: 'bottom-32 left-[40%]', animationDelay: 2.2 },
    { Icon: Settings, color: 'text-orange-500', size: 'w-4 h-4', position: 'top-1/2 left-[15%]', animationDelay: 4.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} ${item.color} dark:opacity-60 z-10`}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1, 0],
            scale: [0, 1, 1.2, 1, 0],
            y: [20, 0, -10, 0, -20],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: 10,
            delay: item.animationDelay,
            repeat: Infinity,
            repeatDelay: 15,
          }}
        >
          <item.Icon className={`${item.size} transition-colors duration-300`} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;