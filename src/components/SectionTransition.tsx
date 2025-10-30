import { motion } from 'motion/react';

interface SectionTransitionProps {
  direction?: 'wave' | 'diagonal' | 'curve';
  color?: string;
  className?: string;
}

export function SectionTransition({ 
  direction = 'wave', 
  color = 'text-primary',
  className = '' 
}: SectionTransitionProps) {
  const waveVariants = {
    animate: {
      d: [
        "M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 V0 H0 Z",
        "M0,30 Q150,60 300,30 T600,30 T900,30 T1200,30 V0 H0 Z",
        "M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 V0 H0 Z",
      ]
    }
  };

  if (direction === 'wave') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <svg 
          className="w-full h-20" 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 V0 H0 Z"
            fill="currentColor"
            className={color}
            variants={waveVariants}
            animate="animate"
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    );
  }

  if (direction === 'diagonal') {
    return (
      <div className={`relative overflow-hidden h-20 ${className}`}>
        <motion.div
          className={`absolute inset-0 ${color.replace('text-', 'bg-')}`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)"
          }}
          animate={{
            clipPath: [
              "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
              "polygon(0 0, 100% 0, 100% 80%, 0 70%)",
              "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    );
  }

  // Default curve
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg 
        className="w-full h-20" 
        viewBox="0 0 1200 80" 
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,80 C200,0 400,0 600,20 C800,40 1000,40 1200,20 V0 H0 Z"
          fill="currentColor"
          className={color}
          animate={{
            d: [
              "M0,80 C200,0 400,0 600,20 C800,40 1000,40 1200,20 V0 H0 Z",
              "M0,80 C200,40 400,40 600,60 C800,0 1000,0 1200,60 V0 H0 Z",
              "M0,80 C200,0 400,0 600,20 C800,40 1000,40 1200,20 V0 H0 Z",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}