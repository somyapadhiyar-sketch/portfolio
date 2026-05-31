import { motion as Motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="w-full max-w-6xl mx-auto py-24 mb-12 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 text-center"
      >
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 text-lg">Have a project in mind or want to say hi? Feel free to reach out to me directly!</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          {/* Email Button */}
          <Motion.a
            href="mailto:somyapadhiyar@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] w-full md:w-auto justify-center"
          >
            <Mail className="w-6 h-6" />
            <span>somyapadhiyar@gmail.com</span>
          </Motion.a>

          {/* WhatsApp Button */}
          <Motion.a
            href="https://wa.me/917990360899"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold text-lg rounded-2xl transition-all shadow-[0_0_25px_rgba(34,197,94,0.4)] w-full md:w-auto justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            <span>+91 7990360899</span>
          </Motion.a>
        </div>
      </Motion.div>
    </section>
  )
}

export default Contact