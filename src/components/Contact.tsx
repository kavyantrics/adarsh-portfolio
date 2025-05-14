'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-center text-accent">
            Get in Touch
          </h2>
          <p className="text-center text-gray-400 mb-16 text-sm">
            Have a project in mind or just want to say hi? Let&apos;s discuss how we can work together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 bg-[#27272a] p-8 md:p-10 rounded-lg border border-accent/30 shadow-neon">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-600 bg-[#1e1e21] text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-500 font-mono"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-600 bg-[#1e1e21] text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-500 font-mono"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-[#1e1e21] text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-500 font-mono resize-none"
                placeholder="How can I help you today?"
              />
            </div>

            <div className="flex justify-center pt-2">
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center justify-center gap-2.5 px-10 py-3 rounded-full font-semibold transition-all duration-200 text-base border-2 
                  ${status === 'loading' || status === 'success'
                    ? 'bg-accent/60 text-white/70 border-white/50 cursor-not-allowed'
                    : 'bg-accent text-white border-white hover:bg-accent/90 hover:shadow-neon-md shadow-neon-sm'
                }`}
              >
                <Send size={18} />
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </div>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 pt-2"
              >
                Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-400 pt-2"
              >
                Oops! Something went wrong. Please try again later or contact me directly.
              </motion.p>
            )}
          </form>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <motion.div initial={{ opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="p-6 bg-[#27272a] rounded-lg border border-accent/30 shadow-neon-sm">
              <Mail size={28} className="mx-auto mb-4 text-accent" />
              <h3 className="font-semibold text-lg mb-1 text-gray-100">Email</h3>
              <a
                href="mailto:adarshh.addi@gmail.com"
                className="text-accent hover:text-accent/80 transition-colors text-sm"
              >
                adarshh.addi@gmail.com
              </a>
            </motion.div>
            <motion.div initial={{ opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="p-6 bg-[#27272a] rounded-lg border border-accent/30 shadow-neon-sm">
              <MapPin size={28} className="mx-auto mb-4 text-accent" />
              <h3 className="font-semibold text-lg mb-1 text-gray-100">Location</h3>
              <p className="text-gray-400 text-sm">Pune, India / Remote</p>
            </motion.div>
            <motion.div initial={{ opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="p-6 bg-[#27272a] rounded-lg border border-accent/30 shadow-neon-sm">
              <h3 className="font-semibold text-lg mb-3 text-gray-100">Connect</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/kavyantrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/kavyantrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 