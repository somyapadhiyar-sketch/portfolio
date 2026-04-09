import { motion as Motion } from 'framer-motion'
import { useState } from 'react'

const Contact = () => {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    const formData = new FormData(e.target)
    
    // IMPORTANT: Replace the string below with your ACTUAL Web3Forms key
    formData.append("access_key", "c8530694-4f7b-41cc-8e44-fe984257b9a6")

    // Convert form data to JSON (Web3Forms recommended approach for React)
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        e.target.reset()
      } else {
        console.error("Web3Forms Error:", data)
        setStatus("error")
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      setStatus("error")
    }
    setIsSubmitting(false)
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto py-24 mb-12 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400">Have a project in mind or want to say hi? Feel free to reach out!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea 
              id="message" 
              name="message"
              rows="4" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
              placeholder="Your message here..."
            ></textarea>
          </div>
          <Motion.button 
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            type="submit"
            className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Motion.button>

          {status === 'success' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-medium">Message sent successfully!</Motion.p>
          )}
          {status === 'error' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">Failed to send message. Please try again later.</Motion.p>
          )}
        </form>
      </Motion.div>
    </section>
  )
}

export default Contact