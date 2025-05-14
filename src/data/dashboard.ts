export interface DeploymentStatus {
  id: string;
  project: string;
  status: 'success' | 'failed' | 'in-progress';
  timestamp: string;
  branch: string;
  commit: string;
  duration: number;
}

export interface ProjectHealth {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    in: number;
    out: number;
  };
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
}

// Mock data
export const mockDeployments: DeploymentStatus[] = [
  {
    id: '1',
    project: 'Portfolio Website',
    status: 'success',
    timestamp: new Date().toISOString(),
    branch: 'main',
    commit: 'a1b2c3d',
    duration: 120,
  },
  {
    id: '2',
    project: 'API Service',
    status: 'in-progress',
    timestamp: new Date().toISOString(),
    branch: 'develop',
    commit: 'e4f5g6h',
    duration: 45,
  },
];

export const mockProjectHealth: ProjectHealth[] = [
  {
    name: 'Portfolio Website',
    status: 'healthy',
    uptime: 99.99,
    responseTime: 120,
    lastChecked: new Date().toISOString(),
  },
  {
    name: 'API Service',
    status: 'warning',
    uptime: 99.95,
    responseTime: 250,
    lastChecked: new Date().toISOString(),
  },
];

export const mockSystemMetrics: SystemMetrics = {
  cpu: 45,
  memory: 60,
  disk: 75,
  network: {
    in: 1024,
    out: 512,
  },
};

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    level: 'info',
    message: 'Deployment completed successfully',
    source: 'CI/CD Pipeline',
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    level: 'warning',
    message: 'High memory usage detected',
    source: 'System Monitor',
  },
  {
    id: '3',
    timestamp: new Date().toISOString(),
    level: 'error',
    message: 'Database connection timeout',
    source: 'API Service',
  },
]; 