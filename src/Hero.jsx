import { motion as MotionDom } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center pt-20 text-center relative px-4">
      {/* Floating Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <MotionDom.div animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-[10%] md:left-[20%] w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        <MotionDom.div animate={{ y: [0, 40, 0], rotate: [0, -45, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-[10%] md:right-[20%] w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        <MotionDom.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-blue-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <MotionDom.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 backdrop-blur-sm bg-white/[0.03] p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.1)] w-full max-w-4xl flex flex-col items-center"
      >
        <MotionDom.h2 variants={itemVariants} className="text-blue-400 font-semibold tracking-[0.2em] uppercase mb-6">
          Welcome to my universe
        </MotionDom.h2>
        <MotionDom.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight">
          Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Somya</span>
        </MotionDom.h1>
        <MotionDom.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          I engineer intelligent AI agents, architect scalable database solutions, and craft immersive 3D web experiences using modern technologies.
        </MotionDom.p>
        <MotionDom.div variants={itemVariants}>
          <MotionDom.a href="#projects" whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)" }} whileTap={{ scale: 0.95 }} className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg transition-all">
            Explore My Work
          </MotionDom.a>
        </MotionDom.div>
      </MotionDom.div>

      {/* Scroll Down Mouse Indicator */}
      <MotionDom.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500 gap-3 z-10 pointer-events-none hidden md:flex">
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-blue-400/80">Scroll</span>
        <MotionDom.div
          className="w-6 h-10 border-2 border-gray-600/50 rounded-full flex justify-center p-1"
        >
          <MotionDom.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-2 bg-blue-500/80 rounded-full" />
        </MotionDom.div>
      </MotionDom.div>
    </section>
  )
}

export default Hero