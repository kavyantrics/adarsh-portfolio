'use client';

import { useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Info, X, Github } from 'lucide-react';

interface ServiceNodeData {
  label: string;
  description: string;
  techStack: string[];
  githubUrl: string;
}

// Custom node types
const ServiceNode = ({ data }: { data: ServiceNodeData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="relative font-mono"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowModal(true)}
    >
      <div className="bg-[#27272a] p-4 rounded-lg shadow-neon-sm border border-accent cursor-pointer transition-all duration-300 hover:shadow-neon-md hover:scale-105 w-56 min-h-[80px]">
        <h3 className="text-base font-semibold text-accent mb-1 truncate">{data.label}</h3>
        <p className="text-xs text-gray-400 line-clamp-2">{data.description}</p>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 bg-[#1c1c1e] border border-accent/50 px-3 py-1.5 rounded-md shadow-lg text-xs text-accent whitespace-nowrap"
          >
            <Info size={12} className="inline mr-1.5" /> Click for details
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-[#27272a] p-6 rounded-xl shadow-neon-lg max-w-lg w-full mx-auto border border-accent overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-accent flex items-center"><Briefcase size={24} className="mr-3"/> {data.label}</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-accent transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/70 scrollbar-track-transparent">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">Description</h3>
                  <p className="text-gray-400 text-sm whitespace-pre-line">{data.description}</p>
                </div>
                {data.githubUrl && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-100">Links</h3>
                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                    >
                      <Github size={16} /> View on GitHub
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-8 w-full px-4 py-2.5 bg-accent text-[#18181b] rounded-lg hover:bg-accent/90 transition-colors font-semibold text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  service: ServiceNode,
};

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: 'api-gateway',
    type: 'service',
    position: { x: 400, y: 50 },
    data: {
      label: 'API Gateway',
      description: 'Entry point for all client requests',
      techStack: ['Node.js', 'Express', 'TypeScript'],
      githubUrl: 'https://github.com/adarsh/api-gateway',
    },
  },
  {
    id: 'auth-service',
    type: 'service',
    position: { x: 200, y: 200 },
    data: {
      label: 'Auth Service',
      description: 'Handles user authentication and authorization',
      techStack: ['Node.js', 'JWT', 'Redis'],
      githubUrl: 'https://github.com/adarsh/auth-service',
    },
  },
  {
    id: 'user-service',
    type: 'service',
    position: { x: 400, y: 200 },
    data: {
      label: 'User Service',
      description: 'Manages user profiles and preferences',
      techStack: ['Node.js', 'MongoDB', 'Express'],
      githubUrl: 'https://github.com/adarsh/user-service',
    },
  },
  {
    id: 'notification-service',
    type: 'service',
    position: { x: 600, y: 200 },
    data: {
      label: 'Notification Service',
      description: 'Handles real-time notifications',
      techStack: ['Node.js', 'Socket.io', 'Redis'],
      githubUrl: 'https://github.com/adarsh/notification-service',
    },
  },
  {
    id: 'payment-service',
    type: 'service',
    position: { x: 300, y: 350 },
    data: {
      label: 'Payment Service',
      description: 'Processes payments and transactions',
      techStack: ['Node.js', 'Stripe', 'PostgreSQL'],
      githubUrl: 'https://github.com/adarsh/payment-service',
    },
  },
  {
    id: 'order-service',
    type: 'service',
    position: { x: 500, y: 350 },
    data: {
      label: 'Order Service',
      description: 'Manages orders and inventory',
      techStack: ['Node.js', 'MongoDB', 'RabbitMQ'],
      githubUrl: 'https://github.com/adarsh/order-service',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'gateway-auth', source: 'api-gateway', target: 'auth-service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'gateway-user', source: 'api-gateway', target: 'user-service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'gateway-notification', source: 'api-gateway', target: 'notification-service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'gateway-payment', source: 'api-gateway', target: 'payment-service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'gateway-order', source: 'api-gateway', target: 'order-service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'user-notification', source: 'user-service', target: 'notification-service', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'order-payment', source: 'order-service', target: 'payment-service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
];

const ArchitectureDiagram = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const proOptions = { hideAttribution: true };

  return (
    <section id="architecture" className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-6xl text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-accent">
          System Architecture
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          An overview of the microservices architecture, demonstrating the flow of information and a scalable system design.
        </p>
      </div>
      <div className="h-[600px] md:h-[700px] w-full bg-[#222225] rounded-xl border border-accent/50 shadow-neon-lg overflow-hidden mx-auto max-w-5xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          proOptions={proOptions}
          className="font-mono"
        >
          <Background color="#404040" gap={20} size={1.5} variant={BackgroundVariant.Dots} />
          <Controls className="react-flow-controls-neon" />
          <MiniMap nodeStrokeColor="#00ffae" nodeColor="#27272a" nodeBorderRadius={8} maskColor="rgba(0,0,0,0.3)" className="react-flow-minimap-neon" />
        </ReactFlow>
      </div>
      <style jsx global>{`
        .react-flow__attribution {
          display: none !important;
        }
        .react-flow-controls-neon button svg {
          fill: #00ffae;
        }
        .react-flow-controls-neon button:hover svg {
          fill: #00e69f; 
        }
        .react-flow-controls-neon button {
          background-color: rgba(39, 39, 42, 0.8) !important;
          border-bottom: 1px solid rgba(0, 255, 174, 0.3) !important;
        }
        .react-flow-controls-neon button:last-child {
          border-bottom: none !important;
        }
        .react-flow-minimap-neon {
          background-color: rgba(39, 39, 42, 0.8) !important;
          border: 1px solid rgba(0, 255, 174, 0.3) !important;
        }
      `}</style>
    </section>
  );
};

export default ArchitectureDiagram; 