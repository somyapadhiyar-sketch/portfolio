import { motion } from 'framer-motion'
import { Home, User, Code, Briefcase, Mail } from 'lucide-react'

const Navbar = () => {
  const links = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none"
    >
      <div className="flex items-center justify-evenly sm:justify-center gap-1 sm:gap-6 w-full sm:w-auto max-w-full bg-white/5 backdrop-blur-md px-3 sm:px-6 py-3 rounded-full border border-white/10 pointer-events-auto shadow-2xl">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.name} href={link.href} className="text-gray-400 hover:text-white hover:scale-110 transition-all flex items-center gap-2 group relative p-1.5 sm:px-2 sm:py-1">
              <Icon size={20} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:block text-sm font-medium">{link.name}</span>
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-500 rounded-full transition-all group-hover:w-3/4 sm:group-hover:w-full -translate-x-1/2"></span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default Navbar