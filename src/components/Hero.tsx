import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ChevronDown, Sparkles, Code, Palette, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState, useRef } from 'react';
import { Spline3D } from './Spline3D';
import { personalInfo, heroTags } from '../data/portfolio';

// Typewriter effect component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 100);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </span>
  );
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20"
    >
      {/* Enhanced Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-accent/20 to-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
          }}
        />

        {/* Additional animated elements */}
        <motion.div
          className="absolute top-1/2 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-32 right-32 w-48 h-48 bg-accent/10 rounded-full blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Spline-like 3D Scene */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Spline3D className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated greeting */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-primary">Hello, I'm</span>
          </motion.div>
          
          {/* Enhanced name animation */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgba(3, 2, 19, 0.3)"
            }}
          >
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
              className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              {personalInfo.name}
            </motion.span>
            
            {/* Floating accent elements around name */}
            <motion.div
              className="absolute -top-4 -right-4 text-primary/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code className="w-8 h-8" />
            </motion.div>
          </motion.h1>
          
          {/* Typewriter effect for role */}
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="h-12 md:h-16 flex items-center justify-center">
              <TypewriterText text={personalInfo.role} delay={2000} />
            </div>
            <motion.span
              className="block text-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              {personalInfo.tagline}
            </motion.span>
          </motion.div>
          
          {/* Enhanced buttons with more animations */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-lg"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-3 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderRadius: "var(--radius)",
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Skills preview with animations */}
          <motion.div
            className="mt-12 flex justify-center gap-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
          >
            {[
              { icon: Palette, label: "Design", color: "text-purple-500" },
              { icon: Code, label: "Develop", color: "text-blue-500" },
              { icon: Zap, label: "Performance", color: "text-yellow-500" }
            ].map((skill, index) => (
              <motion.div
                key={skill.label}
                className="flex flex-col items-center gap-2 p-4 bg-background/20 backdrop-blur-sm rounded-lg border border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                </motion.div>
                <span className="text-sm text-muted-foreground">{skill.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
      >
        <motion.span
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.button
          className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5"
          onClick={scrollToAbout}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>

      {/* Interactive mouse follower */}
      <motion.div
        className="absolute pointer-events-none z-10"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="w-4 h-4 bg-primary/20 rounded-full blur-sm"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(3,2,19,0.1),transparent_50%)] pointer-events-none" />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full opacity-60"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
}