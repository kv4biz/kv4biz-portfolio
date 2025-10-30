import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Code2, 
  Database, 
  Palette, 
  Smartphone, 
  Globe, 
  GitBranch,
  Server,
  Zap
} from 'lucide-react';
import { skillCategories, technologies, workflowPractices } from '../data/portfolio';

const iconMap: Record<string, any> = {
  Code2,
  Server,
  Database,
  GitBranch
};

export function Skills() {
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
    <section id="skills" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive set of technologies and tools I use to build scalable, high-performing web applications
            </p>
          </motion.div>

          {/* Skill Categories */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon];
              return (
                <motion.div key={category.title} variants={itemVariants}>
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 bg-secondary/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl">{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, index) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ 
                                duration: 1, 
                                delay: categoryIndex * 0.1 + index * 0.1,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Technology Tags */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl text-center mb-8">Technologies I Work With</h3>
            <motion.div 
              className="flex flex-wrap gap-3 justify-center"
              variants={containerVariants}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="px-4 py-2 text-sm cursor-pointer transition-all duration-200"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Workflow & Practices */}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-2xl text-center mb-8">Workflow & Practices</h3>
            <motion.div 
              className="flex flex-wrap gap-3 justify-center"
              variants={containerVariants}
            >
              {workflowPractices.map((practice, index) => (
                <motion.div
                  key={practice}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge 
                    variant="outline" 
                    className="px-4 py-2 text-sm cursor-pointer transition-all duration-200 border-primary/30"
                  >
                    {practice}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Additional Icons Section */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { icon: <Globe className="w-8 h-8" />, label: "Web Development" },
              { icon: <Smartphone className="w-8 h-8" />, label: "Mobile Responsive" },
              { icon: <Palette className="w-8 h-8" />, label: "UI/UX Design" },
              { icon: <Zap className="w-8 h-8" />, label: "Performance" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/20 hover:from-secondary/50 hover:to-accent/30 transition-all duration-300"
              >
                <div className="text-primary mb-3 flex justify-center">
                  {item.icon}
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
