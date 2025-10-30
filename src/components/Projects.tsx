import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionTransition } from "./SectionTransition";
import { projects } from "../data/portfolio";

const projectImages: Record<string, string> = {
  "university system":
    "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3lzdGVtfGVufDF8fHx8MTc2MTgwMzU0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "finance dashboard":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MTcyMTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "qr code 3d":
    "https://images.unsplash.com/photo-1650454664813-904aa41701bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjAzZHxlbnwxfHx8fDE3NjE4MDM1NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "3d game website":
    "https://images.unsplash.com/photo-1673350808686-209dc177c898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdhbWUlMjB3ZWJzaXRlfGVufDF8fHx8MTc2MTgwMzU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "ecommerce website":
    "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc2MTczOTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "anime website":
    "https://images.unsplash.com/photo-1613724821556-b6c44f78d4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMHdlYnNpdGV8ZW58MXx8fHwxNzYxODAzNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-20 bg-secondary/20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2 className="text-4xl md:text-5xl">Featured Projects</h2>
            </div>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A showcase of production-ready applications I've built from concept to deployment
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={containerVariants} className="space-y-12 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <motion.div className={index % 2 === 1 ? "lg:col-start-2" : ""} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <ImageWithFallback
                      src={projectImages[project.image]}
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`} variants={itemVariants}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{project.icon}</span>
                      <h3 className="text-2xl md:text-3xl">{project.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
                  </div>

                  <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div key={tech} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                        <Badge variant="secondary" className="px-3 py-1">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="flex gap-4">
                    <Button asChild className="group">
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="group">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Other Projects Grid */}
          <motion.div variants={containerVariants}>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">💻</span>
                <h3 className="text-2xl md:text-3xl">Other Projects</h3>
              </div>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {otherProjects.map((project, index) => (
                <motion.div key={project.title} variants={itemVariants} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={projectImages[project.image]}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 text-4xl">{project.icon}</div>
                    </div>

                    <div className="p-6">
                      <h4 className="text-xl mb-3">{project.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Want to see more of my work or discuss a project?</p>
            <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Let's Connect
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Transition */}
      <SectionTransition direction="curve" color="text-accent" />
    </section>
  );
}
