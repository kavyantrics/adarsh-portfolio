'use client'

import React, { useState, useEffect, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Command = {
  input: string;
  output: string | JSX.Element;
  timestamp: string;
};

type CommandHistory = {
  [key: string]: string | JSX.Element;
};

const Terminal = () => {
  const [commands, setCommands] = useState<Command[]>([
    { 
      input: 'whoami', 
      output: 'visitor@adarsh-portfolio',
      timestamp: new Date().toISOString()
    },
    { 
      input: 'ls -la', 
      output: 'projects  skills  about  contact  resume.pdf  .git  node_modules',
      timestamp: new Date().toISOString()
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandHistory: CommandHistory = {
    help: `Available commands:
    about     - Learn more about me
    skills    - View my technical skills
    projects  - See my projects
    contact   - Get my contact information
    clear     - Clear the terminal
    sudo hire-me - Try to hire me (Easter egg)
    ls        - List files
    whoami    - Show current user
    neofetch  - Display system information
    matrix    - Enter the matrix (Easter egg)
    echo      - Echo back your input
    date      - Show current date and time
    pwd       - Show current directory
    cat       - Read file contents
    `,
    about: `Hi, I'm Adarsh! 👋

I'm a passionate Full Stack Developer with expertise in:
- Modern Web Technologies
- Cloud Architecture
- DevOps Practices
- UI/UX Design

I love building exceptional digital experiences and solving complex problems.`,
    skills: `Technical Skills:
    Frontend: React, Next.js, TypeScript, TailwindCSS
    Backend: Node.js, Python, Express, Django
    Database: MongoDB, PostgreSQL, Redis
    DevOps: Docker, AWS, CI/CD, Kubernetes
    Tools: Git, VS Code, Figma, Postman`,
    projects: `Featured Projects:
    1. E-commerce Platform (React, Node.js, MongoDB)
    2. AI Dashboard (Python, TensorFlow, React)
    3. Mobile App (React Native, Firebase)
    
    Type 'ls' to see more projects`,
    contact: `Get in touch:
    Email: adarshh.addi@gmail.com
    Phone: +91 9322265817
    GitHub: github.com/kavyantrics
    LinkedIn: linkedin.com/in/kavyantrics
    Twitter: @kavyantrics`,
    'sudo hire-me': `[sudo] password for visitor: 
    
    Initiating hiring process...
    [====================] 100%
    
    Congratulations! You've successfully initiated the hiring process! 🎉
    
    Please send your offer to: adarshh.addi@gmail.com
    
    Expected response time: 24 hours
    Status: Ready to join your team!`,
    matrix: `Entering the Matrix...
    
    Wake up, Neo...
    
    The Matrix has you...
    
    Follow the white rabbit...`,
    neofetch: `visitor@adarsh-portfolio
    -------------------------
    OS: Next.js 13
    Host: Vercel
    Kernel: React 18
    Shell: TypeScript
    Terminal: xterm-256color
    CPU: Intel i9
    Memory: 32GB
    Uptime: 24/7`,
  };

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      const input = currentInput.trim();
      let output: string | JSX.Element = 'Command not found. Type "help" for available commands.';
      
      // Handle special commands
      if (input === 'clear') {
        setCommands([]);
        setCurrentInput('');
        return;
      }

      // Handle matrix animation
      if (input === 'matrix') {
        setIsTyping(true);
        const matrixOutput = typeof commandHistory[input] === 'string' 
          ? commandHistory[input].split('\n')
          : [];
        for (const line of matrixOutput) {
          await new Promise(resolve => setTimeout(resolve, 500));
          setCommands(prev => [...prev, { 
            input: '', 
            output: line,
            timestamp: new Date().toISOString()
          }]);
        }
        setIsTyping(false);
        setCurrentInput('');
        return;
      }

      // Handle regular commands
      if (commandHistory[input]) {
        output = commandHistory[input];
      } else if (input.startsWith('echo ')) {
        output = input.slice(5);
      } else if (input === 'date') {
        output = new Date().toLocaleString();
      } else if (input === 'pwd') {
        output = '/home/visitor/adarsh-portfolio';
      } else if (input.startsWith('cat ')) {
        const file = input.slice(4);
        if (file === 'resume.pdf') {
          output = 'Binary file (application/pdf)';
        } else {
          output = `cat: ${file}: No such file or directory`;
        }
      }
      
      setCommands(prev => [...prev, { 
        input, 
        output,
        timestamp: new Date().toISOString()
      }]);
      setCurrentInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <motion.div 
      className="bg-[#18181b] border border-accent rounded-lg overflow-hidden shadow-neon w-full max-w-2xl font-mono"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-black p-2 flex items-center space-x-1.5 border-b border-[#222]">
        <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_6px_#00ffae99]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_6px_#a259ff99]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_6px_#0ea5e999]"></div>
        <div className="ml-3 text-xs font-mono text-gray-400 tracking-widest select-none">visitor@adarsh-portfolio:~</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-4 h-80 overflow-y-auto font-mono text-sm text-[#e0e0e0] bg-transparent"
      >
        <AnimatePresence>
          {commands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-2"
            >
              {cmd.input && (
                <div className="flex">
                  <span className="text-accent font-bold">visitor@adarsh-portfolio:~$</span>
                  <span className="ml-2 text-yellow-400">{cmd.input}</span>
                </div>
              )}
              <div className="mt-1 text-sky-300 whitespace-pre-line">{cmd.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="flex mt-2">
          <span className="text-accent font-bold">visitor@adarsh-portfolio:~$</span>
          <div className="ml-2 flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-yellow-400 w-full font-mono tracking-wide"
              autoFocus
              disabled={isTyping}
            />
            <motion.div
              className="w-2 h-5 bg-accent ml-1 rounded shadow-[0_0_8px_#00ffae]"
              animate={{ opacity: [1, 0.2] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;