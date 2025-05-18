"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, HelpCircle, ArrowRight, Mail, Phone, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Shadcn UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GetStartedPage() {
    const [scrollY, setScrollY] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [activeStep, setActiveStep] = useState("discover");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
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
    const processOffset = scrollY * 0.15;
    const cursorX = cursorPosition.x;
    const cursorY = cursorPosition.y;

    // Process steps data
    const processSteps = [
        {
            id: "discover",
            title: "Discovery",
            description: "We begin with a comprehensive consultation to understand your business, goals, and digital needs",
            icon: HelpCircle,
            color: "#6366f1", // indigo
            glowColor: "rgba(99, 102, 241, 0.15)",
            items: [
                "Initial consultation (30-60 minutes)",
                "Business goals assessment",
                "Current digital presence review",
                "Target audience analysis",
                "Competitive landscape evaluation"
            ]
        },
        {
            id: "plan",
            title: "Strategy & Planning",
            description: "Our team creates a tailored digital strategy and project roadmap to achieve your business objectives",
            icon: Calendar,
            color: "rgba(125, 21, 216, 0.95)", // purple
            glowColor: "rgba(168, 85, 247, 0.15)",
            items: [
                "Project scope definition",
                "Timeline development",
                "Resource allocation planning",
                "Technology stack selection",
                "Budget finalization"
            ]
        },
        {
            id: "create",
            title: "Creation & Development",
            description: "We design and develop your digital solutions with regular updates and feedback integration",
            icon: Clock,
            color: "#ec4899", // pink
            glowColor: "rgba(236, 72, 153, 0.15)",
            items: [
                "Initial design concepts",
                "Content creation and assembly",
                "Development sprints",
                "Regular progress updates",
                "Client feedback integration"
            ]
        },
        {
            id: "launch",
            title: "Launch & Support",
            description: "Once approved, we deploy your solutions and provide ongoing support and optimization",
            icon: CheckCircle2,
            color: "#10b981", // emerald
            glowColor: "rgba(16, 185, 129, 0.15)",
            items: [
                "Pre-launch quality assurance",
                "Official deployment",
                "Post-launch monitoring",
                "Team training sessions",
                "Ongoing maintenance and updates"
            ]
        }
    ];

    // FAQ items
    const faqItems = [
        {
            question: "How long does a typical project take?",
            answer: "Project timelines vary based on scope and complexity. Simple websites may take 2-4 weeks, while complex applications or comprehensive marketing strategies can take 2-6 months. During our discovery phase, we'll provide you with a detailed timeline for your specific project."
        },
        {
            question: "What is your pricing structure?",
            answer: "We offer flexible pricing models including project-based pricing, monthly retainers, and hourly rates depending on your needs. We provide transparent quotes after the discovery phase when we have a complete understanding of your project requirements."
        },
        {
            question: "Do you offer post-launch support?",
            answer: "Yes, we provide comprehensive post-launch support and maintenance packages. These can include technical updates, content changes, performance optimization, security monitoring, and ongoing marketing services."
        },
        {
            question: "Can you work with our existing team?",
            answer: "Absolutely! We're happy to collaborate with your in-house team or other agencies. We can augment your existing capabilities or provide specialized expertise in specific areas of your digital strategy."
        },
        {
            question: "How do we track progress during the project?",
            answer: "We utilize project management tools that give you visibility into milestones and progress. You'll receive regular updates and have scheduled check-ins with your dedicated project manager throughout the development process."
        }
    ];

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
                className="relative z-10 px-6 pt-20 pb-16 lg:px-12 lg:pt-32 lg:pb-24 max-w-7xl mx-auto"
                style={{ transform: `translateY(${-headerOffset}px)` }}
            >
                <motion.div
                    variants={fadeInUp}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm mb-6"
                >
                    <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
                    Start your digital journey
                </motion.div>

                <motion.h1
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                >
                    Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Get Started</span> With Sabitri Entertainment?
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    className="text-lg max-w-3xl text-gray-300 mb-10"
                >
                    We're excited to partner with you on your digital transformation journey. Our streamlined process makes it easy to turn your vision into reality while keeping you informed every step of the way.
                </motion.p>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-900/50 px-8 text-lg group"
                        >
                            Book a Consultation
                            <motion.div
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </motion.div>
                        </Button>
                    </Link>

                    <Link href="#our-process">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-600 px-8 text-lg"
                        >
                            Explore our Process
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Process Section */}
            <div
                id="our-process"
                className="relative z-10 px-6 py-20 lg:px-12 max-w-7xl mx-auto"
                style={{ transform: `translateY(${-processOffset}px)` }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
                    <p className="max-w-2xl mx-auto text-gray-400">
                        Your journey with Sabitri Entertainment follows our proven four-step process designed to deliver exceptional results
                    </p>
                </motion.div>

                {/* Process Steps Desktop View */}
                <div className="hidden lg:block mb-16">
                    <div className="flex justify-between relative mb-20">
                        {/* Connecting line with gradient */}
                        <div className="absolute top-7 left-14 right-14 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative z-10 flex flex-col items-center"
                                onClick={() => setActiveStep(step.id)}
                            >
                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${activeStep === step.id ? 'scale-110' : 'opacity-80'}`}
                                    style={{
                                        backgroundColor: step.color,
                                        boxShadow: activeStep === step.id ? `0 0 20px ${step.glowColor}` : 'none'
                                    }}
                                >
                                    <step.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                                <span className="text-xs text-gray-400">Step {index + 1}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Active step details */}
                    {processSteps.map((step) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeStep === step.id ? 1 : 0,
                                height: activeStep === step.id ? 'auto' : 0
                            }}
                            transition={{ duration: 0.5 }}
                            className={`overflow-hidden ${activeStep === step.id ? 'block' : 'hidden'}`}
                        >
                            <Card className="overflow-hidden bg-gray-900/60 border-gray-800 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-90"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
                                    style={{ background: step.glowColor, filter: 'blur(25px)' }}></div>

                                <CardContent className="p-8 relative">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2">
                                            <h3 className="text-2xl font-bold mb-4" style={{ color: step.color }}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-300 mb-6">{step.description}</p>
                                            <Link href="/contact">
                                                <Button className="group" style={{ backgroundColor: step.color }}>
                                                    <span>Start This Step</span>
                                                    <motion.div
                                                        initial={{ x: 0 }}
                                                        whileHover={{ x: 4 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </motion.div>
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="md:w-1/2">
                                            <h4 className="font-semibold mb-4 text-white">What to expect:</h4>
                                            <ul className="space-y-3">
                                                {step.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                                                        <span className="text-gray-300">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Process Steps Mobile View */}
                <div className="lg:hidden mb-16">
                    <Tabs defaultValue="discover" className="w-full" onValueChange={setActiveStep}>
                        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                            {processSteps.map((step) => (
                                <TabsTrigger
                                    key={step.id}
                                    value={step.id}
                                    className="data-[state=active]:shadow-lg transition-all"
                                    style={{
                                        '--shadow-color': step.glowColor,
                                        '--active-color': step.color
                                    } as React.CSSProperties}
                                >
                                    {step.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {processSteps.map((step) => (
                            <TabsContent key={step.id} value={step.id}>
                                <Card className="overflow-hidden bg-gray-900/60 border-gray-800 backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-90"></div>
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
                                        style={{ background: step.glowColor, filter: 'blur(25px)' }}></div>

                                    <CardContent className="p-6 relative">
                                        <div className="flex items-center mb-4">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                                                style={{ backgroundColor: step.color }}
                                            >
                                                <step.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold" style={{ color: step.color }}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        <p className="text-gray-300 mb-6">{step.description}</p>

                                        <h4 className="font-semibold mb-4 text-white">What to expect:</h4>
                                        <ul className="space-y-3 mb-6">
                                            {step.items.map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                                                    <span className="text-gray-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link href="/contact">
                                            <Button className="w-full md:w-auto group" style={{ backgroundColor: step.color }}>
                                                <span>Start This Step</span>
                                                <motion.div
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 4 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </motion.div>
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 px-6 py-16 lg:px-12 max-w-7xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="max-w-2xl mx-auto text-gray-400">
                        Get answers to common questions about working with us
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-6 hover:border-indigo-700/30 transition-all"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-indigo-300">{item.question}</h3>
                            <p className="text-gray-300">{item.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-10 px-6 py-24 lg:px-12 max-w-7xl mx-auto text-center"
            >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/60 text-indigo-300 backdrop-blur-sm mb-6">
                    <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
                    Ready when you are
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Let's Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Presence</span> Together
                </h2>

                <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-10">
                    Contact us today to schedule your free consultation and start your journey with Sabitri Entertainment
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href={"/contact"} className="inline-block">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-900/50 px-8 text-lg"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            Contact Us
                        </Button>
                    </Link>

                    <a href="tel:+977-1-5911356" className="inline-block">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-600 px-8 text-lg"
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            Call (+977)-1-5911356
                        </Button>
                    </a>
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
        
        /* Custom styles for tabs */
        .tabs-trigger[data-state="active"] {
          background-color: var(--active-color);
          color: white;
          box-shadow: 0 0 15px var(--shadow-color);
        }
      `}</style>
        </div>
    );
}