import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, MotionValue, Transition } from "framer-motion";
import { 
  Film, 
  Music, 
  Gamepad2, 
  Tv2, 
  Ticket 
} from "lucide-react";
import Image from "next/image";

// Customized items with theme-matching content
const DEFAULT_ITEMS = [
  {
    title: "Cinematic Experiences",
    description: "Immerse yourself in breathtaking visual storytelling.",
    id: 1,
    icon: <Film className="h-5 w-5 text-blue-300" />,
    color: "from-blue-500/80 to-blue-600/80",
    imageUrl: "/api/placeholder/400/300"
  },
  {
    title: "Music & Audio",
    description: "Discover sounds that move your soul and elevate your mood.",
    id: 2,
    icon: <Music className="h-5 w-5 text-indigo-300" />,
    color: "from-indigo-500/80 to-indigo-600/80",
    imageUrl: "/api/placeholder/400/300"
  },
  {
    title: "Interactive Gaming",
    description: "Challenge yourself with captivating interactive adventures.",
    id: 3,
    icon: <Gamepad2 className="h-5 w-5 text-purple-300" />,
    color: "from-purple-500/80 to-purple-600/80",
    imageUrl: "/api/placeholder/400/300"
  },
  {
    title: "Streaming Content",
    description: "Endless entertainment delivered directly to your devices.",
    id: 4,
    icon: <Tv2 className="h-5 w-5 text-blue-300" />,
    color: "from-blue-600/80 to-indigo-500/80",
    imageUrl: "/api/placeholder/400/300"
  },
  {
    title: "Live Events",
    description: "Experience the thrill of performances in real-time.",
    id: 5,
    icon: <Ticket className="h-5 w-5 text-purple-300" />,
    color: "from-purple-600/80 to-blue-500/80",
    imageUrl: "/api/placeholder/400/300"
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

// Separate component for carousel item to solve the hooks issue
type CarouselItemType = {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
  color: string;
  imageUrl: string;
};

const CarouselItem = ({ 
  item, 
  index, 
  x, 
  itemWidth, 
  trackItemOffset, 
  effectiveTransition 
}: { 
  item: CarouselItemType; 
  index: number; 
  x: MotionValue<number>; 
  itemWidth: number; 
  trackItemOffset: number; 
  effectiveTransition: Transition | undefined; 
}) => {
  // Move useTransform hook to the top level of this component
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={index}
      className="relative shrink-0 flex flex-col w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-white/10 dark:bg-zinc-800/30 backdrop-blur-sm border border-white/20 dark:border-zinc-700/40"
      style={{
        width: itemWidth,
        rotateY: rotateY,
      }}
      transition={effectiveTransition}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-1/2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={400}
          height={300}
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        
        {/* Icon with floating effect */}
        <motion.div 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 dark:bg-zinc-800/40 backdrop-blur-md flex items-center justify-center"
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }}
        >
          {item.icon}
        </motion.div>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between h-1/2">
        <div>
          <h3 className="mb-2 font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent dark:from-blue-300 dark:to-indigo-400">
            {item.title}
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {item.description}
          </p>
        </div>
        
        {/* Interactive Button */}
        <motion.button
          className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium flex items-center justify-center gap-2 group overflow-hidden relative"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Explore</span>
          <span className="absolute top-0 right-0 w-12 h-full bg-white/20 skew-x-[-18deg] transform -translate-x-36 group-hover:translate-x-36 transition-transform duration-700"></span>
        </motion.button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-3 left-3 w-12 h-1 rounded-full bg-gradient-to-r from-blue-400/40 to-indigo-500/40"></div>
      <div className="absolute top-3 left-3 w-1 h-12 rounded-full bg-gradient-to-b from-blue-400/40 to-indigo-500/40"></div>
    </motion.div>
  );
};

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition: Transition | undefined = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  interface DragEndInfo {
    offset: { x: number; y: number };
    velocity: { x: number; y: number };
  }

  const handleDragEnd = (_:unknown, info: DragEndInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full p-4">
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={containerRef}
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationComplete={handleAnimationComplete}
        >
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              x={x}
              itemWidth={itemWidth}
              trackItemOffset={trackItemOffset}
              effectiveTransition={effectiveTransition}
            />
          ))}
        </motion.div>
        
        {/* Enhanced Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full cursor-pointer backdrop-blur-sm ${
                currentIndex % items.length === index 
                  ? "bg-blue-500 dark:bg-blue-400 w-8" 
                  : "bg-zinc-300 dark:bg-zinc-600 w-2"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: currentIndex % items.length === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}