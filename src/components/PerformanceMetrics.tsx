'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, Clock, TrendingUp, Activity, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { getRealPerformanceMetrics, startFPSTracking } from '@/lib/performance';

interface PerformanceData {
  loadTime: number;
  fps: number;
  memoryUsage: number;
  networkLatency: number;
  cacheHitRate: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceData>({
    loadTime: 0,
    fps: 0,
    memoryUsage: 0,
    networkLatency: 0,
    cacheHitRate: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const updateMetrics = async () => {
    try {
      const realMetrics = await getRealPerformanceMetrics();
      setMetrics(realMetrics);
    } catch (error) {
      console.error('Failed to get performance metrics:', error);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await updateMetrics();
    setIsLoading(false);
  };

  const toggleVisibility = () => {
    const newState = !isHidden;
    setIsHidden(newState);
    localStorage.setItem('performanceMetricsHidden', newState.toString());
  };

  useEffect(() => {
    // Check localStorage for saved preference
    const savedState = localStorage.getItem('performanceMetricsHidden');
    if (savedState) {
      setIsHidden(savedState === 'true');
    }

    // Get initial metrics
    updateMetrics();
    setIsVisible(true);

    // Start FPS tracking
    startFPSTracking((fps) => {
      setMetrics(prev => ({ ...prev, fps }));
    });

    // Update metrics every 10 seconds
    const interval = setInterval(updateMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-400';
    if (value <= thresholds.warning) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'Excellent';
    if (value <= thresholds.warning) return 'Good';
    return 'Needs Attention';
  };

  const getOverallScore = () => {
    let score = 0;
    let total = 0;

    // Load time score (lower is better)
    if (metrics.loadTime <= 150) score += 100;
    else if (metrics.loadTime <= 300) score += 80;
    else if (metrics.loadTime <= 500) score += 60;
    else score += 40;
    total += 100;

    // FPS score (higher is better)
    if (metrics.fps >= 60) score += 100;
    else if (metrics.fps >= 45) score += 80;
    else if (metrics.fps >= 30) score += 60;
    else score += 40;
    total += 100;

    // Memory score (lower is better)
    if (metrics.memoryUsage <= 15) score += 100;
    else if (metrics.memoryUsage <= 25) score += 80;
    else if (metrics.memoryUsage <= 35) score += 60;
    else score += 40;
    total += 100;

    // Network score (lower is better)
    if (metrics.networkLatency <= 30) score += 100;
    else if (metrics.networkLatency <= 50) score += 80;
    else if (metrics.networkLatency <= 100) score += 60;
    else score += 40;
    total += 100;

    return Math.round(score / total);
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const overallScore = getOverallScore();
  const grade = getGrade(overallScore);

  // If hidden, show a small toggle button
  if (isHidden) {
    return (
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={toggleVisibility}
        className="fixed top-4 right-4 z-50 bg-card/20 hover:bg-card/30 text-accent p-3 rounded-lg border border-accent/30 shadow-neon-sm transition-all duration-200 hover:scale-105"
        title="Show Performance Metrics"
      >
        <Eye size={20} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-4 right-4 z-50 bg-card/90 backdrop-blur-md border border-accent/30 rounded-lg p-4 shadow-neon-sm w-64"
    >
      <div className="text-center mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider flex items-center gap-2">
            <Activity size={16} />
            Performance
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleVisibility}
              className="text-accent hover:text-accent/80 transition-colors p-1 rounded hover:bg-accent/10"
              title="Hide Performance Metrics"
            >
              <EyeOff size={14} />
            </button>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-accent hover:text-accent/80 transition-colors p-1 rounded hover:bg-accent/10"
              title="Refresh metrics"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
        <div className="text-xs text-text-secondary">Real-time monitoring</div>
      </div>

      <div className="space-y-3">
        {/* Load Time */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-accent" />
            <span className="text-xs text-text-secondary">Load Time:</span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-mono ${getPerformanceColor(metrics.loadTime, { good: 150, warning: 300 })}`}>
              {metrics.loadTime.toFixed(0)}ms
            </span>
            <div className="text-xs text-text-secondary">
              {getPerformanceStatus(metrics.loadTime, { good: 150, warning: 300 })}
            </div>
          </div>
        </motion.div>

        {/* FPS */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-accent" />
            <span className="text-xs text-text-secondary">FPS:</span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-mono ${getPerformanceColor(60 - metrics.fps, { good: 0, warning: 15 })}`}>
              {metrics.fps.toFixed(0)}
            </span>
            <div className="text-xs text-text-secondary">
              {getPerformanceStatus(60 - metrics.fps, { good: 0, warning: 15 })}
            </div>
          </div>
        </motion.div>

        {/* Memory Usage */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Gauge size={14} className="text-accent" />
            <span className="text-xs text-text-secondary">Memory:</span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-mono ${getPerformanceColor(metrics.memoryUsage, { good: 15, warning: 25 })}`}>
              {metrics.memoryUsage.toFixed(1)}MB
            </span>
            <div className="text-xs text-text-secondary">
              {getPerformanceStatus(metrics.memoryUsage, { good: 15, warning: 25 })}
            </div>
          </div>
        </motion.div>

        {/* Network Latency */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-accent" />
            <span className="text-xs text-text-secondary">Latency:</span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-mono ${getPerformanceColor(metrics.networkLatency, { good: 30, warning: 50 })}`}>
              {metrics.networkLatency.toFixed(0)}ms
            </span>
            <div className="text-xs text-text-secondary">
              {getPerformanceStatus(metrics.networkLatency, { good: 30, warning: 50 })}
            </div>
          </div>
        </motion.div>

        {/* Cache Hit Rate */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-accent" />
            <span className="text-xs text-text-secondary">Cache:</span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-mono ${getPerformanceColor(100 - metrics.cacheHitRate, { good: 10, warning: 20 })}`}>
              {metrics.cacheHitRate.toFixed(1)}%
            </span>
            <div className="text-xs text-text-secondary">
              {getPerformanceStatus(100 - metrics.cacheHitRate, { good: 10, warning: 20 })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Bar */}
      <div className="mt-4 pt-3 border-t border-accent/20">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
          <span>Overall Performance</span>
          <span className="text-accent font-semibold">{grade}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallScore}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`h-2 rounded-full ${
              overallScore >= 90 ? 'bg-gradient-to-r from-green-500 to-accent' :
              overallScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-accent' :
              overallScore >= 70 ? 'bg-gradient-to-r from-yellow-500 to-accent' :
              'bg-gradient-to-r from-red-500 to-accent'
            }`}
          />
        </div>
        <div className="text-center text-xs text-text-secondary mt-1">
          Score: {overallScore}/100
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-3 pt-3 border-t border-accent/20">
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex justify-between">
            <span>DOM Ready:</span>
            <span className="text-accent">{metrics.domContentLoaded.toFixed(0)}ms</span>
          </div>
          <div className="flex justify-between">
            <span>FCP:</span>
            <span className="text-accent">{metrics.firstContentfulPaint.toFixed(0)}ms</span>
          </div>
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className="text-accent">{metrics.largestContentfulPaint.toFixed(0)}ms</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
