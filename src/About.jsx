// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  "https://res.cloudinary.com/dbnuemnv5/image/upload/v1775643584/me2_rqikwo.jpg",
  "https://res.cloudinary.com/dbnuemnv5/image/upload/v1775643584/me_fhopfg.jpg",
  "https://res.cloudinary.com/dbnuemnv5/image/upload/v1775643584/me1_hzuoia.jpg"
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
}

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = useCallback(() => {
    setDirection(1)
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [])

  const prevImage = useCallback(() => {
    setDirection(-1)
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [])

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextImage, 4000)
    return () => clearInterval(interval)
  }, [isHovered, nextImage])

  return (
    <section id="about" className="w-full max-w-6xl mx-auto py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block relative">
            About Me
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Hello! I&apos;m Somya, a Full Stack Developer who loves creating beautiful, functional, and user-centric digital experiences. My journey in web development has equipped me with a strong foundation in both frontend and backend technologies.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            I specialize in building robust applications using React, Node.js, and Tailwind CSS. My expertise also extends to database management with MongoDB and Firebase, as well as integrating intelligent AI agents using n8n and Python.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            I am constantly learning and exploring new technologies to stay at the forefront of web development. Whether it&apos;s crafting sleek modern UIs or architecting secure backend systems, I am dedicated to delivering high-quality, scalable solutions.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div 
            className="w-72 h-80 md:w-80 md:h-[400px] relative rounded-2xl overflow-hidden group shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-2xl m-4 group-hover:m-2 transition-all duration-500 z-20 pointer-events-none"></div>
            
            <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  alt="Somya" 
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </AnimatePresence>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button onClick={prevImage} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors pointer-events-auto backdrop-blur-sm border border-white/10">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextImage} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors pointer-events-auto backdrop-blur-sm border border-white/10">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About