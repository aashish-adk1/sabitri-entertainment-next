"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Ensure theme toggle only works client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, render a placeholder to avoid layout shift
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative">
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
        className="relative overflow-hidden"
      >
        <motion.div
          animate={{ 
            rotate: theme === "dark" ? 360 : 0,
            scale: theme === "dark" ? 0 : 1
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: theme === "dark" ? 0 : -360,
            scale: theme === "dark" ? 1 : 0
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        
        <span className="sr-only">
          {theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        </span>
      </Button>
    </motion.div>
  );
}