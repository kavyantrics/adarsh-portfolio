'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Eye, 
  Globe, 
  Monitor, 
  Clock, 
  AlertCircle,
  RefreshCw,
  User,
  EyeOff
} from 'lucide-react';

interface AnalyticsData {
  totalPageViews: number;
  totalVisitors: number;
  topPages: Array<{ path: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  deviceStats: { desktop: number; mobile: number; tablet: number };
  performance: { avgLoadTime: number; totalRequests: number; errors: number };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'devices' | 'traffic'>('recent');

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/analytics/data?period=summary');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalytics(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Refresh analytics every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading && !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-accent">
          <RefreshCw className="animate-spin" size={24} />
          <span>Loading analytics...</span>
        </div>
      </div>
      );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle size={24} />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-400">No analytics data available</span>
      </div>
    );
  }

  return (
    <section id="analytics" className="py-16 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 text-gray-100">
            <span className="text-accent">Analytics</span> Dashboard
          </h2>



          {/* Live Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#27272a] rounded-xl border border-accent/20 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                <Globe size={20} className="text-accent" />
                Live Statistics
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAnalytics}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg font-medium transition-colors duration-200 border border-accent/30 hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`${isLoading ? 'animate-spin' : ''}`} size={16} />
                  Refresh
                </button>
                {lastUpdated && (
                  <div className="text-xs text-gray-400">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {analytics.totalPageViews.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">All time</div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {analytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">All time</div>
                <div className="text-xs text-gray-500">Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {analytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">All time</div>
                <div className="text-xs text-gray-500">Distinct users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {analytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Today</div>
                <div className="text-xs text-gray-500">New visitors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {analytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">This Week</div>
                <div className="text-xs text-gray-500">7 days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {analytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">This Month</div>
                <div className="text-xs text-gray-500">30 days</div>
              </div>
            </div>

            <div className="mt-6 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
              <Globe size={16} />
              Last visitor: Just now
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'recent'
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'bg-[#27272a] text-gray-400 hover:text-gray-300 border border-gray-700'
              }`}
            >
              <User size={16} />
              Recent Visitors
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'devices'
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'bg-[#27272a] text-gray-400 hover:text-gray-300 border border-gray-700'
              }`}
            >
              <Monitor size={16} />
              Devices & Browsers
            </button>
            <button
              onClick={() => setActiveTab('traffic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'traffic'
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'bg-[#27272a] text-gray-400 hover:text-gray-300 border border-gray-700'
              }`}
            >
              <Globe size={16} />
              Traffic Sources
            </button>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#27272a] rounded-xl border border-accent/20 p-6 mb-8"
          >
            {activeTab === 'recent' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-accent" />
                  Recent Visitors
                </h3>
                <div className="text-center text-gray-400 py-8">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No recent visitors data available</p>
                  <p className="text-sm text-gray-500 mt-2">Visitor tracking will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Monitor size={20} className="text-accent" />
                  Devices & Browsers
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#1f1f23] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor size={20} className="text-accent" />
                      <span className="text-gray-300">Desktop</span>
                    </div>
                    <span className="text-accent font-semibold">
                      {analytics.deviceStats.desktop.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1f1f23] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor size={20} className="text-accent" />
                      <span className="text-gray-300">Mobile</span>
                    </div>
                    <span className="text-accent font-semibold">
                      {analytics.deviceStats.mobile.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1f1f23] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor size={20} className="text-accent" />
                      <span className="text-gray-300">Tablet</span>
                    </div>
                    <span className="text-accent font-semibold">
                      {analytics.deviceStats.tablet.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'traffic' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-accent" />
                  Traffic Sources
                </h3>
                <div className="space-y-4">
                  {analytics.topCountries.map((country) => (
                    <div key={country.country} className="flex items-center justify-between p-3 bg-[#1f1f23] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe size={20} className="text-accent" />
                        <span className="text-gray-300">{country.country}</span>
                      </div>
                      <span className="text-accent font-semibold">
                        {country.visitors.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#27272a] rounded-xl border border-accent/20 p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent mb-2">
                {analytics.totalVisitors.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm mb-1">All time</div>
                              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <User size={14} />
                  Total Visitors
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#27272a] rounded-xl border border-accent/20 p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent mb-2">
                {analytics.totalPageViews.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm mb-1">Total impressions</div>
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Eye size={14} />
                Page Views
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#27272a] rounded-xl border border-accent/20 p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent mb-2">
                {analytics.totalVisitors.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm mb-1">Distinct users</div>
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <EyeOff size={14} />
                Unique Visitors
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#27272a] rounded-xl border border-accent/20 p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent mb-2">
                {analytics.totalVisitors.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm mb-1">New visitors today</div>
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Clock size={14} />
                Today
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
