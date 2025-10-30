import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 py-8">
        {/* Simple Footer Content */}
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span>© {currentYear} {personalInfo.name}. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </motion.div>
            <span>and lots of coffee ☕</span>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </footer>
  );
}
