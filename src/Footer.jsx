import { GitHub, Instagram, Linkedin } from 'react-feather'

const Footer = () => {
  const socialLinks = [
    { icon: GitHub, href: 'https://github.com/somyapadhiyar-sketch', name: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/somya___2409', name: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/somya-padhiyar-gp-amreli-ict-dte/', name: 'LinkedIn' }
  ]

  return (
    <footer className="w-full py-8 border-t border-white/10 mt-12 bg-white/[0.02] backdrop-blur-sm z-10 relative">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Somya Padhiyar. All rights reserved.
        </p>
        <div className="flex gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title={link.name}
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer