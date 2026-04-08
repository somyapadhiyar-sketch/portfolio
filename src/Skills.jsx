/* eslint-disable no-unused-vars */
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Layout, Database, Cpu } from 'lucide-react'

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "text-blue-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    border: "group-hover:border-blue-400/50",
    itemHover: "hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:border-blue-400/50",
    skills: ["React", "HTML", "CSS", "JS", "Tailwind CSS", "Three.js", "Framer Motion"]
  },
  {
    title: "Backend & Database",
    icon: Database,
    color: "text-purple-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    border: "group-hover:border-purple-400/50",
    itemHover: "hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-purple-400/50",
    skills: ["Node.js", "Python", "Firebase", "MongoDB", "REST APIs"]
  },
  {
    title: "AI & Tools",
    icon: Cpu,
    color: "text-pink-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
    border: "group-hover:border-pink-400/50",
    itemHover: "hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:border-pink-400/50",
    skills: ["n8n (AI Agents)", "Git", "GitHub", "Responsive Design", "VS Code"]
  }
]

const SkillCard = ({ category, index }) => {
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
    x.set(xPct * 15); // Max 15 degree tilt
    y.set(yPct * -15);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const Icon = category.icon;

  return (
    <motion.div 
      ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
      transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 100 }} 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-colors duration-500 group relative ${category.glow} ${category.border}`}
    >
      {/* Hover Background Layer */}
      <div style={{ transform: "translateZ(10px)" }} className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      {/* Card Content popped out in 3D */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-center gap-4 mb-8">
          <motion.div animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }} className={`p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 ${category.color}`}>
            <Icon size={28} strokeWidth={1.5} />
          </motion.div>
          <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">{category.title}</h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill, i) => (
            <motion.span 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.2 + (i * 0.1), duration: 0.4, type: "spring", stiffness: 150 } }} 
              viewport={{ once: true }} 
              whileHover={{ scale: 1.1, y: -3, rotate: i % 2 === 0 ? 3 : -3 }} 
              className={`px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-sm font-medium text-gray-300 transition-colors cursor-default ${category.itemHover}`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="w-full max-w-6xl mx-auto py-24 px-4 relative z-10">
      {/* Ambient Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-4xl h-64 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" 
      />
      
      <motion.div className="relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
        
        {/* Animated Title */}
        <div className="flex justify-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              My Tech Arsenal
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills