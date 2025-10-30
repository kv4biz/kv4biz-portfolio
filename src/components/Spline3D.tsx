import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { Code2, Palette, Zap, Globe, Database, Smartphone } from 'lucide-react';

interface Spline3DProps {
  className?: string;
}

export function Spline3D({ className = '' }: Spline3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (event.clientX - centerX) / rect.width;
      const y = (event.clientY - centerY) / rect.height;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const icons = [
    { Icon: Code2, color: 'text-blue-500', position: { x: 20, y: 20 } },
    { Icon: Palette, color: 'text-purple-500', position: { x: 80, y: 15 } },
    { Icon: Database, color: 'text-green-500', position: { x: 15, y: 70 } },
    { Icon: Globe, color: 'text-cyan-500', position: { x: 75, y: 80 } },
    { Icon: Smartphone, color: 'text-pink-500', position: { x: 50, y: 30 } },
    { Icon: Zap, color: 'text-yellow-500', position: { x: 60, y: 65 } }
  ];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Main 3D Container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Central geometric shape */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 backdrop-blur-sm"
              animate={{
                scale: [1, 1.1, 1],
                borderColor: ['rgba(3,2,19,0.2)', 'rgba(3,2,19,0.4)', 'rgba(3,2,19,0.2)'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                transform: `translateZ(20px)`,
              }}
            />
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-8 rounded-full border border-accent/30 bg-gradient-to-tl from-accent/10 to-primary/5 backdrop-blur-sm"
              animate={{
                rotateY: [0, 360],
                scale: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                transform: `translateZ(40px)`,
              }}
            />
            
            {/* Inner core */}
            <motion.div
              className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/15 backdrop-blur-md border border-primary/30"
              animate={{
                rotateX: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                transform: `translateZ(60px)`,
              }}
            />
            
            {/* Central glowing orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 bg-primary rounded-full shadow-lg"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 20px rgba(3,2,19,0.3)',
                  '0 0 40px rgba(3,2,19,0.6)',
                  '0 0 20px rgba(3,2,19,0.3)'
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                transform: `translateZ(80px)`,
              }}
            />
          </div>
        </motion.div>

        {/* Floating skill icons */}
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
              transform: `translateZ(${20 + index * 10}px)`,
            }}
            animate={{
              y: [0, -20, 0],
              rotateY: [0, 360],
              rotateX: [0, 180, 360],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
            whileHover={{
              scale: 1.3,
              rotateZ: 15,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="p-4 bg-background/20 backdrop-blur-sm rounded-xl border border-primary/20 shadow-lg"
              style={{
                boxShadow: `0 10px 30px rgba(3,2,19,0.1)`,
              }}
              animate={{
                boxShadow: [
                  '0 10px 30px rgba(3,2,19,0.1)',
                  '0 20px 40px rgba(3,2,19,0.2)',
                  '0 10px 30px rgba(3,2,19,0.1)'
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3
              }}
            >
              <item.Icon className={`w-6 h-6 ${item.color}`} />
            </motion.div>
          </motion.div>
        ))}

        {/* Orbiting elements */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/30 rounded-full"
            style={{
              transform: `translateZ(${10 + i * 5}px)`,
            }}
            animate={{
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2
            }}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{
                transformOrigin: `${100 + i * 20}px center`,
              }}
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive light rays */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(3,2,19,0.1) 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        className="fixed inset-0 bg-background flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl text-primary mb-2">Loading Portfolio</h2>
            <p className="text-muted-foreground">Preparing an amazing experience...</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
        style={{ scaleX }}
        transformOrigin="0%"
      />

      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Hero />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.8 }}
        >
          <About />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.8 }}
        >
          <Skills />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.8 }}
        >
          <Projects />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.8 }}
        >
          <Contact />
        </motion.div>
      </main>
      
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Footer />
      </motion.div>
      
      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right" 
        richColors 
        expand={false}
        duration={3000}
      />

      {/* Floating Action Elements */}
      <motion.div
        className="fixed bottom-20 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-all duration-300"
          whileHover={{ scale: 1.2, rotateZ: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-6 h-6 border-2 border-primary rounded-full border-t-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}