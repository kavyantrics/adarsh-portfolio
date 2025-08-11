'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '#projects' },
    { name: 'Skills', path: '#skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Experience', path: '#experience' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <motion.header
      className="fixed w-full z-50 py-3 bg-card/80 backdrop-blur-md border-b border-border shadow-sm font-mono transition-colors duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold font-mono text-accent tracking-widest uppercase"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">Adarsh</Link>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              {item.path.startsWith('#') ? (
                <button
                  onClick={() => handleNavClick(item.path)}
                  className="font-mono text-sm tracking-widest uppercase px-2 py-1 transition-colors duration-200 border-b-2 border-transparent hover:border-accent hover:text-accent focus:text-accent focus:border-accent cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.path}
                  className="font-mono text-sm tracking-widest uppercase px-2 py-1 transition-colors duration-200 border-b-2 border-transparent hover:border-accent hover:text-accent focus:text-accent focus:border-accent"
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Empty div to maintain spacing */}
        <div className="w-10"></div>
      </div>

      <motion.button
        className="md:hidden text-accent border border-border p-2 rounded focus:outline-none focus:border-accent transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </motion.button>
    </motion.header>
  );
};

export default Navbar;