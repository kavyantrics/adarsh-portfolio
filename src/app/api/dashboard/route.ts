import { NextResponse } from 'next/server';
import {
  mockDeployments,
  mockProjectHealth,
  mockSystemMetrics,
  mockLogs,
} from '@/data/dashboard';

// Simulate real-time updates by slightly modifying the mock data
function getUpdatedMetrics() {
  return {
    deployments: mockDeployments.map(deployment => ({
      ...deployment,
      timestamp: new Date().toISOString(),
    })),
    projectHealth: mockProjectHealth.map(health => ({
      ...health,
      uptime: Math.min(100, Math.max(99, health.uptime + (Math.random() - 0.5) * 0.1)),
      responseTime: Math.max(50, health.responseTime + (Math.random() - 0.5) * 20),
      lastChecked: new Date().toISOString(),
    })),
    systemMetrics: {
      ...mockSystemMetrics,
      cpu: Math.min(100, Math.max(0, mockSystemMetrics.cpu + (Math.random() - 0.5) * 10)),
      memory: Math.min(100, Math.max(0, mockSystemMetrics.memory + (Math.random() - 0.5) * 5)),
      disk: Math.min(100, Math.max(0, mockSystemMetrics.disk + (Math.random() - 0.5) * 2)),
      network: {
        in: Math.max(0, mockSystemMetrics.network.in + (Math.random() - 0.5) * 100),
        out: Math.max(0, mockSystemMetrics.network.out + (Math.random() - 0.5) * 50),
      },
    },
    logs: [
      ...mockLogs,
      {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        level: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)] as 'info' | 'warning' | 'error',
        message: 'System check completed',
        source: 'System Monitor',
      },
    ].slice(-10), // Keep only the last 10 logs
  };
}

export async function GET() {
  const data = getUpdatedMetrics();
  return NextResponse.json(data);
} 