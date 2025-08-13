'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Globe, Monitor, Smartphone, Tablet, 
  TrendingUp, Calendar, Clock, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import { trackPageView } from '@/lib/clientAnalytics';

interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  uniqueVisitors: number;
  lastVisit: string;
  todayVisitors: number;
  thisWeekVisitors: number;
  thisMonthVisitors: number;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browserBreakdown: Record<string, number>;
  osBreakdown: Record<string, number>;
  countryBreakdown: Record<string, number>;
  referrerBreakdown: Record<string, number>;
}

interface RecentVisitor {
  id: string;
  timestamp: string;
  ip: string;
  deviceType: string;
  browser: string;
  os: string;
  page: string;
  referrer?: string;
  country?: string;
  city?: string;
  isFirstVisit: boolean;
  visitCount: number;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [recentVisitors, setRecentVisitors] = useState<RecentVisitor[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'devices' | 'traffic'>('overview');
  const [isLoading, setIsLoading] = useState(false);



  const fetchAnalytics = useCallback(async (retryCount = 0) => {
    try {
      const url = `${window.location.origin}/api/analytics`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        redirect: 'manual',
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        console.error('🔍 Analytics: Response not ok:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('🔍 Analytics: Fetch error:', error);
      
      // Retry logic for transient errors
      if (retryCount < 2 && error instanceof Error && error.message.includes('Failed to fetch')) {
        setTimeout(() => fetchAnalytics(retryCount + 1), 5000);
        return;
      }
    }
  }, []);

  const fetchRecentVisitors = useCallback(async (retryCount = 0) => {
    try {
      const url = `${window.location.origin}/api/analytics?type=recent&limit=20`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        redirect: 'manual',
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecentVisitors(data);
      } else {
        console.error('🔍 Recent Visitors: Response not ok:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('🔍 Recent Visitors: Fetch error:', error);
      
      // Retry logic for transient errors
      if (retryCount < 2 && error instanceof Error && error.message.includes('Failed to fetch')) {
        setTimeout(() => fetchRecentVisitors(retryCount + 1), 5000);
        return;
      }
    }
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await Promise.all([fetchAnalytics(), fetchRecentVisitors()]);
    setIsLoading(false);
  };

  useEffect(() => {
    // Track this page view
    trackPageView('/analytics');
    
    fetchAnalytics();
    fetchRecentVisitors();
    setIsVisible(true);

    // Smart polling with error handling
    const interval = setInterval(() => {
      // Only poll if there are no current errors
      if (!isLoading) {
        fetchAnalytics();
        fetchRecentVisitors();
      } else {
        // Silently skip refresh - previous request still in progress
      }
    }, 60000); // 60 seconds instead of 30 seconds

    return () => clearInterval(interval);
  }, [isLoading, fetchAnalytics, fetchRecentVisitors]);

  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case 'chrome': return <Globe size={16} />;
      case 'firefox': return <Globe size={16} />;
      case 'safari': return <Globe size={16} />;
      case 'edge': return <Globe size={16} />;
      default: return <Globe size={16} />;
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop': return <Monitor size={16} />;
      case 'mobile': return <Smartphone size={16} />;
      case 'tablet': return <Tablet size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#18181b] font-mono">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-accent">
            Analytics Dashboard
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive insights into your portfolio visitors and their behavior
          </p>
        </motion.div>

        {/* Live Stats Section - Replaces the popup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 bg-[#27272a]/90 backdrop-blur-md border border-accent/30 rounded-xl p-6 shadow-neon-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe size={24} className="text-accent" />
              <h3 className="text-xl font-semibold text-accent">Live Statistics</h3>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-50"
              title="Refresh stats"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Total Visitors */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users size={20} className="text-accent" />
                <span className="text-sm text-gray-400">Total</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">{formatNumber(analytics.totalVisitors)}</div>
              <div className="text-xs text-gray-500">All time</div>
            </motion.div>

            {/* Page Views */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye size={20} className="text-accent" />
                <span className="text-sm text-gray-400">Views</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">{formatNumber(analytics.pageViews)}</div>
              <div className="text-xs text-gray-500">Impressions</div>
            </motion.div>

            {/* Unique Visitors */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <EyeOff size={20} className="text-accent" />
                <span className="text-sm text-gray-400">Unique</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">{formatNumber(analytics.uniqueVisitors)}</div>
              <div className="text-xs text-gray-500">Distinct users</div>
            </motion.div>

            {/* Today's Visitors */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={20} className="text-accent" />
                <span className="text-sm text-gray-400">Today</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">{analytics.todayVisitors}</div>
              <div className="text-xs text-gray-500">New visitors</div>
            </motion.div>

            {/* This Week */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp size={20} className="text-accent" />
                <span className="text-sm text-gray-400">This Week</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">{analytics.thisWeekVisitors}</div>
              <div className="text-xs text-gray-500">7 days</div>
            </motion.div>

            {/* This Month */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar size={20} className="text-accent" />
                <span className="text-sm text-gray-400">This Month</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">{analytics.thisMonthVisitors}</div>
              <div className="text-xs text-gray-500">30 days</div>
            </motion.div>
          </div>

          {/* Last Visit Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 pt-4 border-t border-accent/20 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Globe size={16} className="text-green-400" />
              <span>Last visitor: {getTimeAgo(analytics.lastVisit)}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'overview', label: 'Overview', icon: <TrendingUp size={20} /> },
            { id: 'visitors', label: 'Recent Visitors', icon: <Users size={20} /> },
            { id: 'devices', label: 'Devices & Browsers', icon: <Monitor size={20} /> },
            { id: 'traffic', label: 'Traffic Sources', icon: <Globe size={20} /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as 'overview' | 'visitors' | 'devices' | 'traffic')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-accent text-[#18181b] shadow-neon-md'
                  : 'bg-[#27272a] text-gray-300 hover:bg-[#3a3a3c] border border-accent/30'
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Users size={24} className="text-accent" />
                    <h3 className="text-lg font-semibold text-gray-100">Total Visitors</h3>
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{formatNumber(analytics.totalVisitors)}</div>
                  <div className="text-sm text-gray-400">All time</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Eye size={24} className="text-accent" />
                    <h3 className="text-lg font-semibold text-gray-100">Page Views</h3>
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{formatNumber(analytics.pageViews)}</div>
                  <div className="text-sm text-gray-400">Total impressions</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <EyeOff size={24} className="text-accent" />
                    <h3 className="text-lg font-semibold text-gray-100">Unique Visitors</h3>
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{formatNumber(analytics.uniqueVisitors)}</div>
                  <div className="text-sm text-gray-400">Distinct users</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={24} className="text-accent" />
                    <h3 className="text-lg font-semibold text-gray-100">Today</h3>
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{analytics.todayVisitors}</div>
                  <div className="text-sm text-gray-400">New visitors today</div>
                </motion.div>
              </div>
            )}

            {activeTab === 'visitors' && (
              <div className="bg-[#27272a] rounded-lg border border-accent/30 shadow-neon-sm overflow-hidden">
                <div className="p-6 border-b border-accent/20">
                  <h3 className="text-xl font-semibold text-accent">Recent Visitors</h3>
                  <p className="text-gray-400 text-sm">Latest 20 visitors to your portfolio</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1e1e21]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Visitor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Browser</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Visits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-accent/20">
                      {recentVisitors.map((visitor, index) => (
                        <motion.tr
                          key={visitor.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-[#1e1e21] transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span className="text-sm text-gray-300 font-mono">
                                {visitor.ip.slice(0, 8)}...
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(visitor.deviceType)}
                              <span className="text-sm text-gray-300 capitalize">{visitor.deviceType}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getBrowserIcon(visitor.browser)}
                              <span className="text-sm text-gray-300">{visitor.browser}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-300">{visitor.page}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-400">{getTimeAgo(visitor.timestamp)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              visitor.isFirstVisit ? 'text-green-400' : 'text-blue-400'
                            }`}>
                              {visitor.visitCount}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Device Breakdown */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <h3 className="text-xl font-semibold text-accent mb-6">Device Types</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.deviceBreakdown).map(([device, count]) => (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getDeviceIcon(device)}
                          <span className="text-gray-300 capitalize">{device}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-accent h-2 rounded-full"
                              style={{ width: `${(count / analytics.totalVisitors) * 100}%` }}
                            />
                          </div>
                          <span className="text-accent font-mono w-12 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Browser Breakdown */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <h3 className="text-xl font-semibold text-accent mb-6">Browsers</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.browserBreakdown)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([browser, count]) => (
                        <div key={browser} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getBrowserIcon(browser)}
                            <span className="text-gray-300">{browser}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-accent h-2 rounded-full"
                                style={{ width: `${(count / analytics.totalVisitors) * 100}%` }}
                              />
                            </div>
                            <span className="text-accent font-mono w-12 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'traffic' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Referrer Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <h3 className="text-xl font-semibold text-accent mb-6">Traffic Sources</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.referrerBreakdown)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 8)
                      .map(([referrer, count]) => (
                        <div key={referrer} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Globe size={16} className="text-accent" />
                            <span className="text-gray-300 text-sm truncate max-w-32">{referrer}</span>
                          </div>
                          <span className="text-accent font-mono text-sm">{count}</span>
                        </div>
                      ))}
                    {Object.keys(analytics.referrerBreakdown).length === 0 && (
                      <div className="text-gray-400 text-center py-4">No referrer data available</div>
                    )}
                  </div>
                </motion.div>

                {/* OS Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#27272a] p-6 rounded-lg border border-accent/30 shadow-neon-sm"
                >
                  <h3 className="text-xl font-semibold text-accent mb-6">Operating Systems</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.osBreakdown)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 8)
                      .map(([os, count]) => (
                        <div key={os} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Globe size={16} className="text-accent" />
                            <span className="text-gray-300">{os}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-accent h-2 rounded-full"
                                style={{ width: `${(count / analytics.totalVisitors) * 100}%` }}
                              />
                            </div>
                            <span className="text-accent font-mono text-sm w-12 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
