import { motion as Motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [userOtp, setUserOtp] = useState('')
  const [savedData, setSavedData] = useState(null)
  const [otpExpiry, setOtpExpiry] = useState(null)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval;
    if (otpStep && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const name = formData.get("name")
    const message = formData.get("message")

    // 1. Strict format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      setStatus("invalid_email")
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
      return
    }

    // 2. Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(otp)
    setOtpExpiry(Date.now() + 60 * 1000) // OTP expires in 1 minute (60 seconds)
    setTimer(60)
    setSavedData({ name, email, message })

    try {
      // Send Template 1: The OTP Email directly to the user
      await emailjs.send(
        "service_g5pawwl",
        "template_2hk4qo8", // 2. Paste your OTP Template ID here (usually starts with "template_")
        { name, email, otp_code: otp },
        "3Cxe9xpJRB6cFSmA6" // 3. Paste your Public Key here
      )
      
      setOtpStep(true)
      setStatus("otp_sent")
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus("error")
      setTimeout(() => setStatus(''), 5000)
    }
    setIsSubmitting(false)
  }

  const handleResendOTP = async () => {
    setIsSubmitting(true)
    setStatus('')

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(otp)
    setOtpExpiry(Date.now() + 60 * 1000)
    setTimer(60)

    try {
      await emailjs.send(
        "service_g5pawwl",
        "template_2hk4qo8",
        { name: savedData.name, email: savedData.email, otp_code: otp },
        "3Cxe9xpJRB6cFSmA6"
      )
      
      setStatus("otp_sent")
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus("error")
      setTimeout(() => setStatus(''), 5000)
    }
    setIsSubmitting(false)
  }

  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    // Check if the OTP has expired
    if (Date.now() > otpExpiry) {
      setStatus("otp_expired")
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
      return
    }

    if (userOtp !== generatedOtp) {
      setStatus("invalid_otp")
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
      return
    }

    try {
      // Send Template 2: The final actual message to YOU
      await emailjs.send(
        "service_g5pawwl",
        "template_bdn3rfg", // 4. Your Contact Message Template ID (for the HTML template)
        savedData,
        "3Cxe9xpJRB6cFSmA6" // 3. Paste your Public Key here AGAIN
      )

      // Send Template 3: The Auto-Reply "Thank You" email (Using Account 2)
      try {
        await emailjs.send(
          "service_z2kwxvm", // Paste Account 2 Service ID here
          "template_sjqr0dk", // Paste Account 2 Template ID here
          { name: savedData.name, email: savedData.email },
          "9pnb8VX4-wmjrsSSY" // Paste Account 2 Public Key here
        )
      } catch (autoReplyError) {
        console.error("Auto-reply failed, but message was sent:", autoReplyError)
      }

      setStatus("success")
      setOtpStep(false)
      setUserOtp('')
      setSavedData(null)
    } catch (error) {
      console.error("EmailJS Error:", error)
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

        {otpStep ? (
          <form onSubmit={handleVerifyAndSubmit} className="space-y-6">
            <p className="text-gray-300 text-center">We sent a 6-digit OTP to your email. Please enter it below to verify your email address.</p>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">Enter OTP</label>
              <input 
                type="text" 
                id="otp" 
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
                maxLength="6"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center tracking-[0.5em] text-xl font-mono"
                placeholder="123456"
              />
            </div>
            <div className="flex gap-4">
              <Motion.button 
                type="button" 
                disabled={timer > 0 || isSubmitting}
                onClick={handleResendOTP} 
                className={`w-full py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {timer > 0 ? `Resend OTP (${timer}s)` : 'Resend OTP'}
              </Motion.button>
              <Motion.button 
                disabled={isSubmitting || timer === 0}
                type="submit"
                className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] ${(isSubmitting || timer === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Verifying...' : 'Verify & Send'}
              </Motion.button>
            </div>
            <div className="mt-4 text-center">
              <button type="button" onClick={() => { setOtpStep(false); setTimer(0); }} className="text-gray-400 hover:text-white text-sm underline transition-colors">
                Cancel and go back
              </button>
            </div>
          </form>
        ) : (
        <form onSubmit={handleSendOTP} className="space-y-6">
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
            {isSubmitting ? 'Sending OTP...' : 'Send OTP & Verify Email'}
          </Motion.button>
        </form>
        )}

          {status === 'success' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-medium">Message sent successfully!</Motion.p>
          )}
          {status === 'error' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">Failed to send message. (If using an AdBlocker or Brave, please disable it for this site).</Motion.p>
          )}
          {status === 'invalid_email' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">Please enter a valid email format.</Motion.p>
          )}
          {status === 'otp_sent' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400 text-center font-medium">OTP sent to your email! Please check your inbox.</Motion.p>
          )}
          {status === 'invalid_otp' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">Incorrect OTP. Please try again.</Motion.p>
          )}
          {status === 'otp_expired' && (
            <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">OTP has expired (over 1 minute). Please click Resend OTP.</Motion.p>
          )}
      </Motion.div>
    </section>
  )
}

export default Contact