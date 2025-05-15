"use client";   
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarBg: string;
}

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.15 
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white dark:bg-zinc-800/70 rounded-xl p-6 md:p-8 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/3 border border-zinc-100 dark:border-zinc-700/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Quote icon */}
      <div className="mb-4 text-blue-500/30 dark:text-blue-400/20">
        <Quote className="h-8 w-8" />
      </div>
      
      {/* Star rating */}
      <div className="flex text-amber-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400" />
        ))}
      </div>
      
      {/* Testimonial text */}
      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 flex-grow">{testimonial.quote}</p>
      
      {/* Author information */}
      <div className="flex items-center mt-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${testimonial.avatarBg}`}>
          <span className="text-white font-semibold">{testimonial.name.charAt(0)}</span>
        </div>
        <div className="ml-3">
          <h4 className="font-semibold text-zinc-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };
  
  const testimonials = [
    {
      quote: "Sabitri Entertainment revolutionized how I experience digital content. The personalized recommendations are spot-on, and the streaming quality is unmatched!",
      name: "Alex Johnson",
      role: "Creative Director",
      avatarBg: "bg-blue-600"
    },
    {
      quote: "I've tried multiple entertainment platforms, but none compare to the seamless experience and extensive library that Sabitri offers. It's become my go-to for all things entertainment.",
      name: "Sophia Chen",
      role: "Tech Enthusiast",
      avatarBg: "bg-indigo-600"
    },
    {
      quote: "The UI is intuitive and beautiful. I love how I can customize my experience and discover new content that perfectly matches my interests. Truly next-generation!",
      name: "Michael Patel",
      role: "Product Designer",
      avatarBg: "bg-purple-600"
    },
    {
      quote: "As someone who values quality and innovation, I can confidently say that Sabitri Entertainment exceeds all expectations. The attention to detail and user experience is remarkable.",
      name: "Emma Rodriguez",
      role: "Content Creator",
      avatarBg: "bg-pink-600"
    },
    {
      quote: "The performance is outstanding even on my older devices. I appreciate how accessible and smooth the platform runs regardless of what I'm watching or playing.",
      name: "David Kim",
      role: "Software Engineer",
      avatarBg: "bg-emerald-600"
    },
    {
      quote: "From the moment I signed up, I was blown away by the personalized onboarding experience. Sabitri Entertainment understands what I want to watch before I even know it myself!",
      name: "Sarah Taylor",
      role: "Digital Marketer",
      avatarBg: "bg-amber-600"
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/20 to-white dark:from-zinc-900 dark:via-indigo-950/5 dark:to-zinc-900"></div>
      
      {/* Enhanced mesh grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-30 dark:opacity-20"></div>
      
      {/* Animated gradient spheres */}
      <motion.div 
        className="absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-500/10 blur-3xl dark:from-blue-600/5 dark:to-purple-700/5 animate-pulse"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.5, 0.3, 0.5] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-500/10 blur-3xl dark:from-indigo-900/5 dark:to-pink-900/5 animate-pulse"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.4, 0.2, 0.4] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial="hidden"
            animate={controls}
            custom={0}
            variants={titleVariants}
            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
          >
            <Star className="w-3 h-3 fill-blue-500 text-blue-500 dark:fill-blue-400 dark:text-blue-400" />
            <span>User Testimonials</span>
          </motion.div>
          
          <motion.h2
            initial="hidden"
            animate={controls}
            custom={1}
            variants={titleVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            People{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text inline-block">Love</span>{' '}
            Our Platform
          </motion.h2>
          
          <motion.p
            initial="hidden"
            animate={controls}
            custom={2}
            variants={titleVariants}
            className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            Don't just take our word for it. Here's what our users have to say about their experience with Sabitri Entertainment.
          </motion.p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
        
        {/* CTA section */}
        <motion.div
          initial="hidden"
          animate={controls}
          custom={5}
          variants={titleVariants}
          className="mt-20 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 md:p-12 border border-blue-100/80 dark:border-blue-800/20 shadow-xl shadow-blue-500/5">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Ready to experience the future of entertainment?</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-8">Join thousands of satisfied users and discover why Sabitri Entertainment is the most loved platform in the industry.</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-600/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute top-0 right-0 w-16 h-full bg-white/20 skew-x-[-18deg] transform -translate-x-36 group-hover:translate-x-36 transition-transform duration-700"></span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;