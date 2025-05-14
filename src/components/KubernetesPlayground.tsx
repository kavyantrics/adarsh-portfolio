'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Node, Edge, ReactFlow, Background, Controls, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

interface NodeData {
  label: string;
  description: string;
  yaml: string;
}

const initialNodes: Node[] = [
  {
    id: 'ingress',
    type: 'input',
    position: { x: 250, y: 0 },
    data: {
      label: 'Ingress Controller',
      description: 'Manages external access to services',
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
    position: { x: 250, y: 100 },
    data: {
      label: 'App Service',
      description: 'Load balances traffic to pods',
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
    position: { x: 250, y: 200 },
    data: {
      label: 'App Deployment',
      description: 'Manages pod replicas and updates',
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
    position: { x: 100, y: 300 },
    data: {
      label: 'Pod 1',
      description: 'Container running application',
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
    position: { x: 250, y: 300 },
    data: {
      label: 'Pod 2',
      description: 'Container running application',
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
    position: { x: 400, y: 300 },
    data: {
      label: 'Pod 3',
      description: 'Container running application',
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
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'ingress', target: 'service' },
  { id: 'e2-3', source: 'service', target: 'deployment' },
  { id: 'e3-4', source: 'deployment', target: 'pod1' },
  { id: 'e3-5', source: 'deployment', target: 'pod2' },
  { id: 'e3-6', source: 'deployment', target: 'pod3' },
];

const CustomNode = ({ data }: { data: NodeData }) => {
  const [showYaml, setShowYaml] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <motion.div
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setShowDescription(true)}
      onHoverEnd={() => setShowDescription(false)}
      onClick={() => setShowYaml(!showYaml)}
    >
      <div className="flex items-center">
        <div className="rounded-full w-3 h-3 bg-blue-500 mr-2" />
        <div className="font-bold">{data.label}</div>
      </div>
      
      {showDescription && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-gray-600"
        >
          {data.description}
        </motion.div>
      )}
      
      {showYaml && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2"
        >
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {data.yaml}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function KubernetesPlayground() {
  return (
    <div className="h-[600px] w-full bg-gray-50 rounded-lg">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right" className="bg-white p-2 rounded shadow">
          <h3 className="font-bold mb-2">Kubernetes Playground</h3>
          <p className="text-sm text-gray-600">
            Hover over nodes to see descriptions
            <br />
            Click nodes to view YAML
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
} 