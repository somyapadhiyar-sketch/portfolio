/* eslint-disable no-unused-vars */
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { ShoppingCart, Users, Sparkles } from 'lucide-react'

const projects = [
  {
    title: "Zesty Organic Store",
    description: "An e-commerce platform for organic products with an AI Agent integration, seamless shopping cart, and sleek UI.",
    tech: ["React", "Node.js", "Tailwind CSS", "Firebase", "MongoDB", "n8n"],
    icon: ShoppingCart,
    color: "text-blue-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    border: "group-hover:border-blue-400/50",
    itemHover: "hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:border-blue-400/50"
  },
  {
    title: "HRMS System",
    description: "A modern Human Resource Management System portal UI to efficiently track employee data, attendance, and leave management.",
    tech: ["React", "Node.js", "Tailwind CSS"],
    icon: Users,
    color: "text-purple-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    border: "group-hover:border-purple-400/50",
    itemHover: "hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-purple-400/50"
  },
  {
    title: "English Joke Generator",
    description: "A fun and interactive web app that fetches and displays random English jokes using an external API with smooth animations.",
    tech: ["React", "API Integration", "Framer Motion"],
    icon: Sparkles,
    color: "text-pink-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
    border: "group-hover:border-pink-400/50",
    itemHover: "hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:border-pink-400/50"
  }
]

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 15); 
    y.set(yPct * -15);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const Icon = project.icon;

  return (
    <motion.div 
      ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} 
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
      transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
      className={`relative w-full h-[420px] rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between group transition-colors duration-500 ${project.glow} ${project.border}`}
    >
      {/* Hover Background Layer */}
      <div style={{ transform: "translateZ(10px)" }} className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      <div style={{ transform: "translateZ(40px)" }} className="flex flex-col h-full relative z-10">
        <div className="w-full h-40 rounded-xl mb-6 flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
          <motion.div 
            animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          >
            <Icon size={56} className={`${project.color} group-hover:scale-110 transition-transform duration-500`} strokeWidth={1.5} />
          </motion.div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">{project.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">{project.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t, i) => (
            <motion.span 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.2 + (i * 0.1), duration: 0.4, type: "spring", stiffness: 150 } }} 
              viewport={{ once: true }} 
              whileHover={{ scale: 1.1, y: -3, rotate: i % 2 === 0 ? 3 : -3 }} 
              className={`text-xs px-3 py-1.5 bg-black/40 border border-white/5 rounded-xl font-medium text-gray-300 transition-colors cursor-default ${project.itemHover}`}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="w-full max-w-6xl mx-auto py-24 px-4 relative z-10">
      {/* Ambient Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-4xl h-64 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" 
      />
      
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }} className="relative z-10">
        
        {/* Animated Title */}
        <div className="flex justify-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Featured Projects
            </span>
            <motion.div 
              className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            />
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-white/10 rounded-full -z-10" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects