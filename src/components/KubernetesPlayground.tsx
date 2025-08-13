'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Node, Edge, ReactFlow, Background, Controls, Panel, MiniMap, BackgroundVariant, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { Code, ChevronDown, ChevronUp, Server, Network, Database } from 'lucide-react';

interface CustomNodeData {
  label: string;
  type: 'ingress' | 'service' | 'deployment' | 'pod' | 'database';
  description: string;
  yaml: string;
}

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: 'ingress',
    type: 'custom',
    position: { x: 350, y: 0 },
    data: {
      label: 'Ingress Controller',
      type: 'ingress',
      description: 'Manages external access to services, routing traffic to the appropriate service within the cluster.',
      yaml: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-service
                port:
                  number: 80`,
    },
  },
  {
    id: 'service',
    type: 'custom',
    position: { x: 350, y: 120 },
    data: {
      label: 'App Service',
      type: 'service',
      description: 'Exposes the application pods under a single, stable IP address and DNS name, and load balances traffic across them.',
      yaml: `apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP`,
    },
  },
  {
    id: 'deployment',
    type: 'custom',
    position: { x: 350, y: 240 },
    data: {
      label: 'App Deployment',
      type: 'deployment',
      description: 'Manages a set of replicated pods, ensuring the desired number of instances are running and handling updates or rollbacks.',
      yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:latest
          ports:
            - containerPort: 8080`,
    },
  },
  {
    id: 'pod1',
    type: 'custom',
    position: { x: 150, y: 360 },
    data: {
      label: 'App Pod 1',
      type: 'pod',
      description: 'An instance of the application container. Smallest deployable unit in Kubernetes.',
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: app-pod-1
spec:
  containers:
    - name: app
      image: my-app:latest
      ports:
        - containerPort: 8080`,
    },
  },
  {
    id: 'pod2',
    type: 'custom',
    position: { x: 350, y: 360 },
    data: {
      label: 'App Pod 2',
      type: 'pod',
      description: 'An instance of the application container. Smallest deployable unit in Kubernetes.',
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: app-pod-2
spec:
  containers:
    - name: app
      image: my-app:latest
      ports:
        - containerPort: 8080`,
    },
  },
  {
    id: 'pod3',
    type: 'custom',
    position: { x: 550, y: 360 },
    data: {
      label: 'App Pod 3',
      type: 'pod',
      description: 'An instance of the application container. Smallest deployable unit in Kubernetes.',
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: app-pod-3
spec:
  containers:
    - name: app
      image: my-app:latest
      ports:
        - containerPort: 8080`,
    },
  },
  {
    id: 'database',
    type: 'custom',
    position: { x: 350, y: 480 },
    data: {
      label: 'Database',
      type: 'database',
      description: 'Persistent storage for the application, managed as a separate service.',
      yaml: `apiVersion: v1
kind: Service
metadata:
  name: postgres-db-service
  labels:
    app: postgres
spec:
  selector:
    app: postgres
  ports:
    - protocol: TCP
      port: 5432`,
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'ingress', target: 'service', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'e2-3', source: 'service', target: 'deployment', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'e3-4', source: 'deployment', target: 'pod1', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'e3-5', source: 'deployment', target: 'pod2', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'e3-6', source: 'deployment', target: 'pod3', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
  { id: 'e3-db', source: 'deployment', target: 'database', markerEnd: { type: MarkerType.ArrowClosed, color: '#00ffae' }, style: { stroke: '#00ffae', strokeWidth: 1.5 } },
];

const NodeIcon = ({ type }: { type: CustomNodeData['type'] }) => {
  const iconProps = { size: 18, className: "mr-2.5 text-accent flex-shrink-0" };
  switch (type) {
    case 'ingress': return <Network {...iconProps} />;
    case 'service': return <Server {...iconProps} />;
    case 'deployment': return <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><Server {...iconProps} /></motion.div>;
    case 'pod': return <div className="w-[18px] h-[18px] mr-2.5 flex-shrink-0 text-accent"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg></div>;
    case 'database': return <Database {...iconProps} />;
    default: return <Server {...iconProps} />;
  }
};

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  const [showYaml, setShowYaml] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative font-mono w-64"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 group bg-[#27272a] border-accent/60 shadow-neon-sm hover:border-accent hover:shadow-neon-md`}
        onClick={() => setShowYaml(!showYaml)}
      >
        <div className="flex items-center mb-2">
          <NodeIcon type={data.type} />
          <div className="font-semibold text-base text-accent truncate group-hover:text-gray-100 transition-colors">{data.label}</div>
        </div>
        <p className="text-xs text-gray-400 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-200">{data.description}</p>
        <button 
          className="flex items-center text-xs text-accent/70 hover:text-accent transition-colors w-full pt-2 border-t border-accent/20 mt-2"
        >
          {showYaml ? <ChevronUp size={14} className="mr-1.5" /> : <ChevronDown size={14} className="mr-1.5" />}
          {showYaml ? 'Hide' : 'Show'} YAML
          <Code size={14} className="ml-auto opacity-70" />
        </button>
      </div>
      
      {isHovered && !showYaml && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 bg-[#1c1c1e] border border-accent/50 px-2.5 py-1 rounded-md shadow-lg text-xs text-accent whitespace-nowrap"
        >
          Click to {showYaml ? 'hide' : 'view'} YAML / Details
        </motion.div>
      )}
      
      {showYaml && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden mt-2"
        >
          <pre className="bg-[#1c1c1e] border border-accent/30 p-3 rounded-md text-[11px] leading-relaxed overflow-x-auto scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent max-h-60 ">
            <code className="text-gray-300 whitespace-pre font-mono">{data.yaml}</code>
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};
const proOptions = { hideAttribution: true };

export default function KubernetesPlayground() {
  return (
    <section id="kubernetes-playground" className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-7xl text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 text-gray-100">
          <span className="text-accent">Kubernetes</span> Playground
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Explore this interactive Kubernetes cluster diagram. Click nodes to view YAML configurations and understand relationships between components.
        </p>
      </div>
      <div className="h-[700px] w-full bg-[#222225] rounded-xl border border-accent/50 shadow-neon-lg overflow-hidden mx-auto max-w-7xl relative font-mono">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          proOptions={proOptions}
          className="font-mono"
        >
          <Background color="#404040" gap={20} size={1.2} variant={BackgroundVariant.Dots} />
          <Controls className="react-flow-controls-neon" />
          <MiniMap 
            nodeStrokeColor="#00ffae"
            nodeColor="#27272a"
            nodeBorderRadius={6}
            maskColor="rgba(24, 24, 27, 0.7)"
            className="react-flow-minimap-neon"
            pannable 
            zoomable
          />
          <Panel position="top-left" className="bg-[#27272a]/80 backdrop-blur-sm p-3 rounded-lg border border-accent/30 shadow-lg text-xs text-gray-300">
            <h3 className="font-semibold text-sm text-accent mb-1.5">K8s Explorer</h3>
            <ul className="space-y-1">
              <li>Hover nodes for brief info.</li>
              <li>Click nodes to toggle YAML.</li>
            </ul>
          </Panel>
        </ReactFlow>
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
            border-bottom: 1px solid rgba(0, 255, 174, 0.2) !important;
            transition: background-color 0.2s;
          }
          .react-flow-controls-neon button:hover {
             background-color: rgba(45, 45, 48, 0.9) !important;
          }
          .react-flow-controls-neon button:last-child {
            border-bottom: none !important;
          }
          .react-flow-minimap-neon {
            background-color: rgba(34, 34, 37, 0.8) !important;
            border: 1px solid rgba(0, 255, 174, 0.3) !important;
            border-radius: 8px;
          }
          .react-flow-minimap-neon .react-flow__minimap-node {
            border-radius: 4px !important;
          }
        `}</style>
      </div>
    </section>
  );
} 