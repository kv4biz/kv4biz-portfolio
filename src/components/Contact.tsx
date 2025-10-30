import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { contactInfo, socialLinks, personalInfo } from '../data/portfolio';

const iconMap: Record<string, any> = {
  Mail,
  MessageSquare,
  MapPin,
  Github,
  Linkedin
};

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Let's Work Together</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, creative projects, 
              or just having a chat about web development. Feel free to reach out!
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div variants={containerVariants} className="space-y-4 mb-12">
            {contactInfo.map((info, index) => {
              const IconComponent = iconMap[info.icon];
              return (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 border-0 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300">
                    <a 
                      href={info.href}
                      className="flex items-center gap-4 group"
                      target={info.icon === 'MessageSquare' ? '_blank' : undefined}
                      rel={info.icon === 'MessageSquare' ? 'noopener noreferrer' : undefined}
                    >
                      <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{info.title}</div>
                        <div className="text-lg group-hover:text-primary transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl mb-8">Connect With Me</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map((social, index) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-6 py-3 bg-secondary/30 rounded-lg text-muted-foreground hover:bg-secondary/50 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div variants={itemVariants} className="mt-12">
            <Card className="p-8 border-0 bg-gradient-to-br from-primary/5 to-accent/10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h4 className="text-xl">Currently Based In</h4>
              </div>
              <p className="text-2xl mb-2">{personalInfo.location}</p>
              <p className="text-muted-foreground">
                Available for remote collaboration worldwide
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
