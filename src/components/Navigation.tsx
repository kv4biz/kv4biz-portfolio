import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, User, Code, Briefcase, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { personalInfo } from '../data/portfolio';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navigationItems = [
    { name: 'Home', icon: <Home className="w-4 h-4" />, href: '#' },
    { name: 'About', icon: <User className="w-4 h-4" />, href: '#about' },
    { name: 'Skills', icon: <Code className="w-4 h-4" />, href: '#skills' },
    { name: 'Projects', icon: <Briefcase className="w-4 h-4" />, href: '#projects' },
    { name: 'Contact', icon: <Mail className="w-4 h-4" />, href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-primary transition-colors"
              >
                {personalInfo.displayName}
              </button>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center space-x-8"
            >
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
              <ThemeToggle />
            </motion.div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center gap-2">
              <div className="md:hidden">
                <ThemeToggle />
              </div>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : "100%"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-background/95 backdrop-blur-md border-l border-border z-40 md:hidden"
      >
        <div className="p-6">
          <div className="space-y-4">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-3 w-full p-3 text-left text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-all duration-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                {item.icon}
                {item.name}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="mt-8 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => scrollToSection('#contact')}
              className="w-full"
              size="lg"
            >
              Let's Talk
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => scrollToSection('#contact')}
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
}