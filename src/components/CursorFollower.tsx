import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      >
        <div className="w-8 h-8 bg-primary rounded-full" />
      </motion.div>

      {/* Trailing dots */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-40"
          style={{
            x: useSpring(cursorX, { stiffness: 200 - i * 20, damping: 20 + i * 2 }),
            y: useSpring(cursorY, { stiffness: 200 - i * 20, damping: 20 + i * 2 }),
          }}
          animate={{
            opacity: isVisible ? (1 - i * 0.1) : 0,
            scale: isHovering ? 0.8 - i * 0.05 : 0.6 - i * 0.05,
          }}
        >
          <div 
            className="w-2 h-2 bg-primary/60 rounded-full"
            style={{ 
              transform: `translate(${6 + i}px, ${6 + i}px)`,
            }}
          />
        </motion.div>
      ))}

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-30"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div className="w-8 h-8 bg-primary/20 rounded-full blur-md" />
      </motion.div>
    </>
  );
}