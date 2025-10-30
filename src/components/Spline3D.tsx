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
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Only track mouse on large screens
      if (window.innerWidth < 1024) return;
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
        className="relative w-full h-full hidden lg:block"
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
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Outer ring - reduced animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 backdrop-blur-sm"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                transform: `translateZ(20px)`,
              }}
            />
            
            {/* Middle ring - simplified */}
            <motion.div
              className="absolute inset-8 rounded-full border border-accent/30 bg-gradient-to-tl from-accent/10 to-primary/5 backdrop-blur-sm"
              style={{
                transform: `translateZ(40px)`,
              }}
            />
            
            {/* Inner core - reduced animation */}
            <motion.div
              className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/15 backdrop-blur-md border border-primary/30"
              animate={{
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 8,
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
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
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

        {/* Floating skill icons - simplified animations */}
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
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="p-4 bg-background/20 backdrop-blur-sm rounded-xl border border-primary/20 shadow-lg"
            >
              <item.Icon className={`w-6 h-6 ${item.color}`} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile/Tablet simplified version */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 backdrop-blur-sm"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-8 rounded-full border border-accent/30 bg-gradient-to-tl from-accent/10 to-primary/5 backdrop-blur-sm"
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 bg-primary rounded-full shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Interactive light rays - only on large screens */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(3,2,19,0.1) 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
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
