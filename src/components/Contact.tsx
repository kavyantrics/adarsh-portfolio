'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, AlertCircle, Loader2, ExternalLink, Users } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Please enter a valid email';
    if (formData.message.trim().length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <section id="contact" className="py-12 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-3 text-center text-gray-100">
            <span className="text-accent">Get in</span> Touch
          </h2>
          <p className="text-center text-gray-400 mb-6 text-sm">
            Have a project in mind or just want to say hi? Let&apos;s discuss how we can work together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 bg-[#27272a] p-5 md:p-6 rounded-lg border border-accent/30 shadow-neon">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1e1e21] text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-500 font-mono transition-all duration-200"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1e1e21] text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-500 font-mono transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1e1e21] text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-500 font-mono resize-none transition-all duration-200"
                placeholder="How can I help you today? (Minimum 10 characters)"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            <div className="flex justify-center pt-1">
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center justify-center gap-2.5 px-8 py-2.5 rounded-full font-semibold transition-all duration-200 text-sm border-2 
                  ${status === 'loading' || status === 'success'
                    ? 'bg-accent/60 text-white/70 border-white/50 cursor-not-allowed'
                    : 'border-accent text-accent hover:bg-accent hover:text-gray-600 shadow-neon-sm hover:shadow-neon-md'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="flex items-center justify-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
                >
                  <CheckCircle size={18} />
                  <span>Thank you! Your message has been sent successfully. I&apos;ll get back to you within 24 hours.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="flex items-center justify-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-12">
            {/* Divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent flex-1"></div>
              <div className="px-4">
                <span className="text-accent/60 text-sm font-medium tracking-wider">CONNECT WITH ME</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent flex-1"></div>
            </div>

            {/* Enhanced Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden bg-gradient-to-br from-[#27272a] to-[#1e1e21] rounded-xl border border-accent/20 p-6 shadow-neon-sm hover:shadow-neon-md transition-all duration-300 hover:border-accent/40"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -translate-y-10 translate-x-10 group-hover:bg-accent/10 transition-all duration-300"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-all duration-300">
                    <Mail size={24} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="font-bold text-gray-100 mb-2 text-lg">Email</h3>
                  <p className="text-gray-400 text-sm mb-3">Let&apos;s start a conversation</p>
                  
                  <a
                    href="mailto:adarshh.addi@gmail.com"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium text-sm group-hover:scale-105 transition-transform duration-200"
                  >
                    <span>adarshh.addi@gmail.com</span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden bg-gradient-to-br from-[#27272a] to-[#1e1e21] rounded-xl border border-accent/20 p-6 shadow-neon-sm hover:shadow-neon-md transition-all duration-300 hover:border-accent/40"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -translate-y-10 translate-x-10 group-hover:bg-accent/10 transition-all duration-300"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-all duration-300">
                    <MapPin size={24} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="font-bold text-gray-100 mb-2 text-lg">Location</h3>
                  <p className="text-gray-400 text-sm mb-3">Based in India, working globally</p>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Pune, India</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-1">
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full"></div>
                    <span>Remote Available</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Connect Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden bg-gradient-to-br from-[#27272a] to-[#1e1e21] rounded-xl border border-accent/20 p-6 shadow-neon-sm hover:shadow-neon-md transition-all duration-300 hover:border-accent/40"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -translate-y-10 translate-x-10 group-hover:bg-accent/10 transition-all duration-300"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-all duration-300">
                    <Users size={24} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="font-bold text-gray-100 mb-2 text-lg">Connect</h3>
                  <p className="text-gray-400 text-sm mb-4">Let&apos;s build something amazing together</p>
                  
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://github.com/kavyantrics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center justify-center w-10 h-10 bg-[#1e1e21] hover:bg-accent/20 rounded-lg border border-accent/30 hover:border-accent/50 text-gray-400 hover:text-accent transition-all duration-200 hover:scale-110"
                      aria-label="GitHub Profile"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href="https://linkedin.com/in/kavyantrics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center justify-center w-10 h-10 bg-[#1e1e21] hover:bg-accent/20 rounded-lg border border-accent/30 hover:border-accent/50 text-gray-400 hover:text-accent transition-all duration-200 hover:scale-110"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/5 border border-accent/20 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-accent/80 text-sm font-medium">Available for new opportunities</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 