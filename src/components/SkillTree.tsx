'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Database, Cloud, Server, Globe, Zap, Target, Star, 
  Shield, Cpu, Network, Lock, Rocket, Layers, Gift, Dock,
  Monitor, Smartphone, Tablet, Brain, Palette, Database as DbIcon
} from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  description: string;
  technologies: string[];
  experience: string;
  projects: string[];
  x: number;
  y: number;
}

const skillNodes: SkillNode[] = [
  // Frontend & UI/UX
  {
    id: 'frontend',
    name: 'Frontend Development',
    level: 95,
    category: 'Frontend',
    icon: <Globe size={24} />,
    description: 'Modern web development with cutting-edge technologies and responsive design principles',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'WebGL'],
    experience: '4+ years building interactive web applications',
    projects: ['Portfolio Website', 'E-commerce Platform', 'Dashboard Applications'],
    x: 50,
    y: 15,
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    level: 85,
    category: 'Design',
    icon: <Palette size={24} />,
    description: 'User-centered design with focus on accessibility and modern design systems',
    technologies: ['Figma', 'Adobe XD', 'Design Systems', 'Prototyping', 'User Research'],
    experience: '3+ years designing user interfaces',
    projects: ['Mobile App Designs', 'Web Design Systems', 'Brand Identity'],
    x: 25,
    y: 25,
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    level: 80,
    category: 'Mobile',
    icon: <Smartphone size={24} />,
    description: 'Cross-platform mobile development with native performance',
    technologies: ['React Native', 'Flutter', 'Progressive Web Apps', 'Mobile Optimization'],
    experience: '2+ years mobile app development',
    projects: ['Cross-platform Apps', 'PWA Implementation', 'Mobile-first Websites'],
    x: 75,
    y: 25,
  },

  // Backend & APIs
  {
    id: 'backend',
    name: 'Backend Development',
    level: 90,
    category: 'Backend',
    icon: <Server size={24} />,
    description: 'Scalable server-side applications with robust APIs and microservices architecture',
    technologies: ['Node.js', 'Express', 'Python', 'FastAPI', 'GraphQL', 'REST APIs', 'WebSockets'],
    experience: '4+ years backend development',
    projects: ['E-commerce Backend', 'Real-time Chat System', 'API Gateway'],
    x: 20,
    y: 50,
  },
  {
    id: 'databases',
    name: 'Database Design',
    level: 85,
    category: 'Database',
    icon: <DbIcon size={24} />,
    description: 'Database architecture, optimization, and management across multiple technologies',
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma', 'TypeORM', 'Database Design'],
    experience: '3+ years database design and optimization',
    projects: ['Database Migrations', 'Performance Optimization', 'Data Modeling'],
    x: 80,
    y: 50,
  },

  // DevOps & Cloud
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    level: 88,
    category: 'DevOps',
    icon: <Cloud size={24} />,
    description: 'Infrastructure automation, CI/CD pipelines, and cloud-native development',
    technologies: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jenkins', 'GitHub Actions'],
    experience: '3+ years DevOps implementation',
    projects: ['Infrastructure as Code', 'Automated Deployments', 'Cloud Migration'],
    x: 50,
    y: 70,
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Observability',
    level: 82,
    category: 'DevOps',
    icon: <Monitor size={24} />,
    description: 'Application performance monitoring, logging, and alerting systems',
    technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'New Relic', 'Sentry', 'Performance Monitoring'],
    experience: '2+ years monitoring implementation',
    projects: ['APM Setup', 'Log Aggregation', 'Alert Systems'],
    x: 30,
    y: 70,
  },

  // AI & Machine Learning
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    level: 75,
    category: 'AI/ML',
    icon: <Brain size={24} />,
    description: 'AI integration, machine learning models, and intelligent automation',
    technologies: ['OpenAI API', 'TensorFlow', 'Python', 'NLP', 'Computer Vision', 'MLOps'],
    experience: '2+ years AI/ML implementation',
    projects: ['Chatbot Systems', 'Recommendation Engines', 'Image Recognition'],
    x: 70,
    y: 40,
  },

  // Security & Testing
  {
    id: 'security',
    name: 'Security & Testing',
    level: 88,
    category: 'Security',
    icon: <Shield size={24} />,
    description: 'Application security, penetration testing, and secure development practices',
    technologies: ['OWASP', 'Jest', 'Cypress', 'Security Testing', 'Penetration Testing', 'Code Analysis'],
    experience: '3+ years security implementation',
    projects: ['Security Audits', 'Vulnerability Assessment', 'Secure Code Reviews'],
    x: 15,
    y: 35,
  },
  {
    id: 'testing',
    name: 'Quality Assurance',
    level: 85,
    category: 'Testing',
    icon: <Target size={24} />,
    description: 'Comprehensive testing strategies and quality assurance processes',
    technologies: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Performance Testing', 'Test Automation'],
    experience: '3+ years QA implementation',
    projects: ['Test Automation', 'CI/CD Testing', 'Performance Optimization'],
    x: 85,
    y: 35,
  },

  // Architecture & Performance
  {
    id: 'architecture',
    name: 'System Architecture',
    level: 87,
    category: 'Architecture',
    icon: <Layers size={24} />,
    description: 'Scalable system design, microservices architecture, and performance optimization',
    technologies: ['Microservices', 'Event-Driven Architecture', 'Load Balancing', 'Caching', 'CDN'],
    experience: '3+ years architecture design',
    projects: ['System Redesign', 'Performance Optimization', 'Scalability Implementation'],
    x: 50,
    y: 85,
  },
  {
    id: 'performance',
    name: 'Performance Optimization',
    level: 83,
    category: 'Performance',
    icon: <Rocket size={24} />,
    description: 'Application performance optimization and monitoring',
    technologies: ['Performance Profiling', 'Caching Strategies', 'Lazy Loading', 'Bundle Optimization'],
    experience: '2+ years performance optimization',
    projects: ['Performance Audits', 'Speed Optimization', 'Resource Management'],
    x: 25,
    y: 85,
  },

  // Tools & Version Control
  {
    id: 'tools',
    name: 'Development Tools',
    level: 90,
    category: 'Tools',
    icon: <Gift size={24} />,
    description: 'Version control, development workflows, and productivity tools',
    technologies: ['Git', 'GitHub', 'VS Code', 'Docker', 'Terminal', 'Shell Scripting', 'Automation'],
    experience: '4+ years using development tools',
    projects: ['CI/CD Pipelines', 'Development Automation', 'Tool Integration'],
    x: 75,
    y: 85,
  },
];

export default function SkillTree() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const getNodeColor = (category: string) => {
    const colors = {
      Frontend: 'from-blue-500 to-cyan-500',
      Design: 'from-purple-500 to-pink-500',
      Mobile: 'from-indigo-500 to-blue-500',
      Backend: 'from-green-500 to-emerald-500',
      Database: 'from-orange-500 to-red-500',
      DevOps: 'from-purple-500 to-pink-500',
      'AI/ML': 'from-yellow-500 to-orange-500',
      Security: 'from-red-500 to-pink-500',
      Testing: 'from-red-500 to-orange-500',
      Architecture: 'from-cyan-500 to-blue-500',
      Performance: 'from-green-500 to-cyan-500',
      Tools: 'from-gray-500 to-blue-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-400';
    if (level >= 80) return 'text-blue-400';
    if (level >= 70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getLevelBadge = (level: number) => {
    if (level >= 90) return { text: 'Expert', color: 'bg-green-500/20 text-green-400' };
    if (level >= 80) return { text: 'Advanced', color: 'bg-blue-500/20 text-blue-400' };
    if (level >= 70) return { text: 'Intermediate', color: 'bg-yellow-500/20 text-yellow-400' };
    return { text: 'Beginner', color: 'bg-gray-500/20 text-gray-400' };
  };

  const filteredNodes = activeCategory === 'all' 
    ? skillNodes 
    : skillNodes.filter(node => node.category === activeCategory);

  const categories = Array.from(new Set(skillNodes.map(node => node.category)));

  return (
    <section id="skills" className="py-20 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-accent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Comprehensive technical expertise across full-stack development, DevOps, and emerging technologies. 
            Each skill represents years of hands-on experience building production applications.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-accent text-[#18181b] shadow-neon-md'
                : 'bg-[#27272a] text-gray-300 hover:bg-[#3a3a3c] border border-accent/30'
            }`}
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-accent text-[#18181b] shadow-neon-md'
                  : 'bg-[#27272a] text-gray-300 hover:bg-[#3a3a3c] border border-accent/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Skill Tree Container */}
          <div className="relative w-full h-[700px] bg-gradient-to-br from-[#1a1a1c] to-[#2a2a2c] rounded-2xl border border-accent/20 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Skill Nodes */}
            {filteredNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                className="absolute cursor-pointer group"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
              >
                {/* Node */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 rounded-full bg-gradient-to-r ${getNodeColor(node.category)} shadow-neon-sm border-2 border-white/20 group-hover:shadow-neon-md transition-all duration-300`}
                >
                  <div className="text-white">
                    {node.icon}
                  </div>
                  
                  {/* Level Indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#1c1c1e] rounded-full border-2 border-accent flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{node.level}%</span>
                  </div>
                </motion.div>

                {/* Node Label */}
                <AnimatePresence>
                  {hoveredNode === node.id && !selectedNode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#1c1c1e] border border-accent/50 rounded-md shadow-lg text-xs text-accent whitespace-nowrap z-10"
                    >
                      {node.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {filteredNodes.map((node, index) => {
                if (index === 0) return null;
                const prevNode = filteredNodes[index - 1];
                return (
                  <line
                    key={`line-${index}`}
                    x1={`${prevNode.x}%`}
                    y1={`${prevNode.y}%`}
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke="rgba(99, 102, 241, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>
          </div>

          {/* Selected Node Details */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-4 right-4 w-96 bg-[#27272a]/95 backdrop-blur-md border border-accent/30 rounded-xl shadow-neon-lg z-20 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-accent flex items-center gap-3">
                      {selectedNode.icon}
                      {selectedNode.name}
                    </h3>
                    <button 
                      onClick={() => setSelectedNode(null)}
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Level Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelBadge(selectedNode.level).color}`}>
                      {getLevelBadge(selectedNode.level).text}
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/70 scrollbar-track-transparent">
                    {/* Proficiency */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Proficiency</span>
                        <span className={`text-sm font-bold ${getLevelColor(selectedNode.level)}`}>
                          {selectedNode.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedNode.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${getNodeColor(selectedNode.category)}`}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-gray-200">Description</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{selectedNode.description}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-gray-200">Experience</h4>
                      <p className="text-gray-400 text-sm">{selectedNode.experience}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-gray-200">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-gray-200">Related Projects</h4>
                      <div className="space-y-1">
                        {selectedNode.projects.map((project, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                            <Star size={12} className="text-accent" />
                            <span>{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getNodeColor(category)}`} />
              <span className="text-sm text-gray-400">{category}</span>
            </div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-[#27272a]/50 backdrop-blur-md border border-accent/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-accent mb-4">Skills Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Core Strengths</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Full-Stack Development (React, Node.js, Python)</li>
                  <li>• DevOps & Cloud Infrastructure (AWS, Docker, K8s)</li>
                  <li>• Database Design & Optimization</li>
                  <li>• Security & Testing Implementation</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Emerging Tech</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• AI/ML Integration & Automation</li>
                  <li>• Performance Optimization</li>
                  <li>• Microservices Architecture</li>
                  <li>• Modern Frontend Frameworks</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Methodologies</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Agile Development & CI/CD</li>
                  <li>• Test-Driven Development</li>
                  <li>• Security-First Approach</li>
                  <li>• Performance Monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
