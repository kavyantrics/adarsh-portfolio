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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowModal(true)}
    >
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-primary/30 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
        <h3 className="text-lg font-bold text-primary mb-2">{data.label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{data.description}</p>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm mt-2 w-48"
          >
            Click for details
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-primary mb-4">{data.label}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{data.description}</p>
                </div>
                {data.githubUrl && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Links</h3>
                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View on GitHub →
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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
  { id: 'gateway-auth', source: 'api-gateway', target: 'auth-service' },
  { id: 'gateway-user', source: 'api-gateway', target: 'user-service' },
  { id: 'gateway-notification', source: 'api-gateway', target: 'notification-service' },
  { id: 'gateway-payment', source: 'api-gateway', target: 'payment-service' },
  { id: 'gateway-order', source: 'api-gateway', target: 'order-service' },
  { id: 'user-notification', source: 'user-service', target: 'notification-service' },
  { id: 'order-payment', source: 'order-service', target: 'payment-service' },
];

const ArchitectureDiagram = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] w-full bg-background rounded-lg border border-primary/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ArchitectureDiagram; 