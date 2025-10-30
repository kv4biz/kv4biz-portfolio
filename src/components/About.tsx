import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { SectionTransition } from './SectionTransition';
import { aboutMe, stats, education, experience } from '../data/portfolio';
import victorImage from 'figma:asset/076cd73e55bd7acbfd42ac315e7cb9d82f2dfbc3.png';
import { GraduationCap, Briefcase } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="about" className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          {/* Main About Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl"
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <img
                  src={victorImage}
                  alt="Kayode Victor"
                  className="relative z-10 rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl">{aboutMe.title}</h3>
              {aboutMe.description.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              <motion.div
                className="flex flex-wrap gap-3 pt-4"
                variants={containerVariants}
              >
                {aboutMe.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    variants={itemVariants}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm cursor-pointer relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(3,2,19,0.1)"
                    }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                  >
                    <span className="relative z-10">{tag}</span>
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {tag}
                    </motion.span>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-6 border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                  <motion.div
                    className="text-3xl md:text-4xl text-primary mb-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="text-2xl md:text-3xl">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h4 className="text-lg mb-1">
                          {edu.degree}{edu.field && `, ${edu.field}`}
                        </h4>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        {edu.period}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Experience Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-2xl md:text-3xl">Professional Experience</h3>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-lg mb-1">{exp.title}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        {exp.period}
                      </div>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Section Transition */}
      <SectionTransition direction="wave" color="text-secondary" />
    </section>
  );
}
