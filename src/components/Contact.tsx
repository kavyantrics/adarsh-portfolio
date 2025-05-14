'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
            <span className="text-secondary">Get in</span> Touch
          </h2>
          <p className="text-center text-foreground/80 mb-12">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-secondary/20 bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Your message..."
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-8 py-3 rounded-full font-medium transition-colors ${
                  status === 'loading'
                    ? 'bg-secondary/50 cursor-not-allowed'
                    : 'bg-secondary hover:bg-secondary/90 text-white'
                }`}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-green-500"
              >
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-red-500"
              >
                Something went wrong. Please try again later.
              </motion.p>
            )}
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-medium mb-2">Email</h3>
              <a
                href="mailto:adarshh.addi@gmail.com"
                className="text-secondary hover:text-secondary/80"
              >
                adarshh.addi@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-medium mb-2">Location</h3>
              <p className="text-foreground/80">Remote / Worldwide</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Social</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/adarshkumarsingh83"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-secondary/80"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/adarshkumarsingh83"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-secondary/80"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 