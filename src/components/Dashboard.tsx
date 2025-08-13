'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DeploymentStatus,
  ProjectHealth,
  SystemMetrics,
  LogEntry,
} from '@/data/dashboard';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Server, Cpu, MemoryStick, HardDrive } from 'lucide-react';

interface DashboardData {
  deployments: DeploymentStatus[];
  projectHealth: ProjectHealth[];
  systemMetrics: SystemMetrics;
  logs: LogEntry[];
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async (retryCount = 0) => {
    try {
      // Try with absolute URL and more explicit options
      const url = `${window.location.origin}/api/dashboard`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        // Prevent any redirects
        redirect: 'manual',
        // Force fresh request
        cache: 'no-store'
      });
      
      if (response.ok) {
        const newData = await response.json();
        setData(newData);
        setError(null);
        setLastUpdated(new Date());
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      // Retry logic for transient errors
      if (retryCount < 2 && err instanceof Error && err.message.includes('Failed to fetch')) {
        setTimeout(() => fetchData(retryCount + 1), 5000);
        return;
      }
      
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Fallback to XMLHttpRequest if fetch fails completely
      if (retryCount === 2) {
        fetchDataXHR();
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDataXHR = () => {
    try {
      const xhr = new XMLHttpRequest();
      const url = `${window.location.origin}/api/dashboard`;
      
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              setData(data);
              setError(null);
            } catch {
              setError('Failed to parse XHR response');
            }
          } else {
            setError(`XHR failed: ${xhr.status} ${xhr.statusText}`);
          }
        }
      };
      
      xhr.onerror = function() {
        setError(`XHR network error: ${xhr.statusText}`);
      };
      
      xhr.send();
    } catch (err) {
      setError(`XHR error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Smart polling with error handling
    const interval = setInterval(() => {
      // Only poll if there's no current error
      if (!error) {
        fetchData();
      } else {
        // Silently skip refresh due to error
      }
    }, 30000); // 30 seconds instead of 5 seconds
    
    return () => clearInterval(interval);
  }, [error, fetchData]); // Re-run effect if error or fetchData changes

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'healthy':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          icon: <CheckCircle size={16} className="mr-1.5" />,
          ring: 'ring-accent/30',
        };
      case 'failed':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-400',
          icon: <XCircle size={16} className="mr-1.5" />,
          ring: 'ring-red-500/30',
        };
      case 'pending':
      case 'warning':
        return {
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-400',
          icon: <AlertTriangle size={16} className="mr-1.5" />,
          ring: 'ring-yellow-500/30',
        };
      default:
        return {
          bg: 'bg-gray-700/20',
          text: 'text-gray-400',
          icon: <Server size={16} className="mr-1.5" />,
          ring: 'ring-gray-700/30',
        };
    }
  };

  const getLogLevelStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'bg-red-500/10 text-red-400 border-l-2 border-red-500';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-400 border-l-2 border-yellow-500';
      default: // info, debug, etc.
        return 'bg-gray-700/20 text-gray-400 border-l-2 border-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#18181b] font-mono">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-4 bg-[#18181b] font-mono min-h-[400px] flex items-center justify-center">
        <div className="bg-[#27272a] p-6 rounded-lg border border-red-500/50 shadow-neon-red">
          <AlertTriangle size={24} className="text-red-400 mx-auto mb-3" />
          Error: {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <section className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-gray-100">
            <span className="text-accent">DevOps</span> Dashboard
          </h2>
          <button
            onClick={() => fetchData()}
            className="flex items-center gap-2 px-5 py-2.5 border border-accent text-accent rounded-lg hover:bg-accent hover:text-gray-600 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-neon-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          {lastUpdated && (
            <div className="text-xs text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Deployment Status */}
          <div className="bg-[#27272a] p-6 rounded-xl shadow-neon border border-accent/30">
            <h3 className="text-xl font-semibold mb-6 text-gray-100">
              Recent Deployments
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {data.deployments.map((deployment) => {
                  const statusStyle = getStatusStyles(deployment.status);
                  return (
                    <motion.div
                      key={deployment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`p-4 border ${statusStyle.ring} rounded-lg bg-gradient-to-br from-[#2c2c30] to-[#27272a]/80 ring-1 ring-inset ring-white/10`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-200">
                          {deployment.project}
                        </span>
                        <span
                          className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                        >
                          {statusStyle.icon}
                          {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>Branch: <span className="text-gray-300">{deployment.branch}</span></p>
                        <p>Commit: <span className="text-gray-300 truncate">{deployment.commit.substring(0,7)}...</span></p>
                        <p>Duration: <span className="text-gray-300">{deployment.duration}s</span></p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Project Health */}
          <div className="bg-[#27272a] p-6 rounded-xl shadow-neon border border-accent/30">
            <h3 className="text-xl font-semibold mb-6 text-gray-100">
              Project Health
            </h3>
            <div className="space-y-5">
              {data.projectHealth.map((project) => {
                const statusStyle = getStatusStyles(project.status);
                return (
                  <div key={project.name} className={`p-4 border ${statusStyle.ring} rounded-lg bg-gradient-to-br from-[#2c2c30] to-[#27272a]/80 ring-1 ring-inset ring-white/10`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-200">
                        {project.name}
                      </span>
                      <span
                        className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                      >
                         {statusStyle.icon}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Uptime</span>
                          <span className="text-gray-200">
                            {project.uptime.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-accent h-1.5 rounded-full"
                            style={{ width: `${project.uptime}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Response Time</span>
                          <span className="text-gray-200">
                            {project.responseTime}ms
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Metrics */}
          <div className="bg-[#27272a] p-6 rounded-xl shadow-neon border border-accent/30">
            <h3 className="text-xl font-semibold mb-6 text-gray-100">
              System Metrics
            </h3>
            <div className="space-y-5">
              {[
                { Icon: Cpu, label: 'CPU Usage', value: data.systemMetrics.cpu, color: 'bg-accent' },
                { Icon: MemoryStick, label: 'Memory Usage', value: data.systemMetrics.memory, color: 'bg-sky-400' },
                { Icon: HardDrive, label: 'Disk Usage', value: data.systemMetrics.disk, color: 'bg-pink-500' },
              ].map(({ Icon, label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="text-gray-300 flex items-center"><Icon size={14} className="mr-2 text-accent/80"/>{label}</span>
                    <span className="text-gray-200 font-medium">
                      {value.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`${color} h-2 rounded-full shadow-md`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="mt-10 bg-[#27272a] p-6 rounded-xl shadow-neon-lg border border-accent/50">
          <h3 className="text-xl font-semibold mb-6 text-gray-100">
            Recent Logs
          </h3>
          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/70 scrollbar-track-transparent">
            <AnimatePresence>
              {data.logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-3.5 rounded-md text-xs ${getLogLevelStyles(log.level)}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{log.source} [{log.level.toUpperCase()}]</span>
                    <span className="text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap break-words">{log.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard; 