import fs from 'fs';
import path from 'path';

// Analytics data structure
export interface AnalyticsData {
  pageViews: {
    [path: string]: number;
  };
  visitors: {
    total: number;
    unique: number;
    returning: number;
    countries: {
      [country: string]: number;
    };
    devices: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
  };
  blogStats: {
    totalPosts: number;
    totalViews: number;
    popularPosts: {
      [slug: string]: number;
    };
  };
  performance: {
    averageLoadTime: number;
    totalRequests: number;
    errors: number;
  };
  lastUpdated: string;
  lastReset: string;
}

// Default analytics data
const defaultAnalytics: AnalyticsData = {
  pageViews: {
    '/': 0,
    '/blog': 0,
    '/projects': 0,
  },
  visitors: {
    total: 0,
    unique: 0,
    returning: 0,
    countries: {
      'Unknown': 0,
    },
    devices: {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    },
  },
  blogStats: {
    totalPosts: 0,
    totalViews: 0,
    popularPosts: {},
  },
  performance: {
    averageLoadTime: 0,
    totalRequests: 0,
    errors: 0,
  },
  lastUpdated: new Date().toISOString(),
  lastReset: new Date().toISOString(),
};

// File paths
const ANALYTICS_DIR = path.join(process.cwd(), 'data', 'analytics');
const ANALYTICS_FILE = path.join(ANALYTICS_DIR, 'analytics.json');
const BACKUP_DIR = path.join(ANALYTICS_DIR, 'backups');

// Ensure directories exist
function ensureDirectories() {
  if (!fs.existsSync(ANALYTICS_DIR)) {
    fs.mkdirSync(ANALYTICS_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

// Load analytics data
export function loadAnalytics(): AnalyticsData {
  try {
    ensureDirectories();
    
    if (!fs.existsSync(ANALYTICS_FILE)) {
      // Create default analytics file
      saveAnalytics(defaultAnalytics);
      return defaultAnalytics;
    }
    
    const data = fs.readFileSync(ANALYTICS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading analytics:', error);
    return defaultAnalytics;
  }
}

// Save analytics data
export function saveAnalytics(data: AnalyticsData): void {
  try {
    ensureDirectories();
    
    // Create backup before saving
    if (fs.existsSync(ANALYTICS_FILE)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(BACKUP_DIR, `analytics-${timestamp}.json`);
      fs.copyFileSync(ANALYTICS_FILE, backupFile);
      
      // Keep only last 10 backups
      const backups = fs.readdirSync(BACKUP_DIR)
        .filter(file => file.startsWith('analytics-'))
        .sort()
        .reverse()
        .slice(10);
      
      backups.forEach(backup => {
        fs.unlinkSync(path.join(BACKUP_DIR, backup));
      });
    }
    
    // Update timestamp and save
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving analytics:', error);
  }
}

// Track page view
export function trackPageView(path: string): void {
  const analytics = loadAnalytics();
  
  if (!analytics.pageViews[path]) {
    analytics.pageViews[path] = 0;
  }
  analytics.pageViews[path]++;
  
  analytics.visitors.total++;
  
  saveAnalytics(analytics);
}

// Track visitor
export function trackVisitor(country?: string, device?: 'desktop' | 'mobile' | 'tablet'): void {
  const analytics = loadAnalytics();
  
  // Track country
  if (country) {
    if (!analytics.visitors.countries[country]) {
      analytics.visitors.countries[country] = 0;
    }
    analytics.visitors.countries[country]++;
  } else {
    analytics.visitors.countries['Unknown']++;
  }
  
  // Track device
  if (device && analytics.visitors.devices[device] !== undefined) {
    analytics.visitors.devices[device]++;
  }
  
  analytics.visitors.unique++;
  
  saveAnalytics(analytics);
}

// Track blog post view
export function trackBlogView(slug: string): void {
  const analytics = loadAnalytics();
  
  if (!analytics.blogStats.popularPosts[slug]) {
    analytics.blogStats.popularPosts[slug] = 0;
  }
  analytics.blogStats.popularPosts[slug]++;
  analytics.blogStats.totalViews++;
  
  saveAnalytics(analytics);
}

// Track performance metrics
export function trackPerformance(loadTime: number, hasError: boolean = false): void {
  const analytics = loadAnalytics();
  
  // Update average load time
  const currentAvg = analytics.performance.averageLoadTime;
  const totalRequests = analytics.performance.totalRequests;
  analytics.performance.averageLoadTime = 
    (currentAvg * totalRequests + loadTime) / (totalRequests + 1);
  
  analytics.performance.totalRequests++;
  
  if (hasError) {
    analytics.performance.errors++;
  }
  
  saveAnalytics(analytics);
}

// Get analytics summary
export function getAnalyticsSummary(): {
  totalPageViews: number;
  totalVisitors: number;
  topPages: Array<{ path: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  deviceStats: { desktop: number; mobile: number; tablet: number };
  performance: { avgLoadTime: number; totalRequests: number; errors: number };
} {
  const analytics = loadAnalytics();
  
  const totalPageViews = Object.values(analytics.pageViews).reduce((sum, views) => sum + views, 0);
  
  const topPages = Object.entries(analytics.pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([path, views]) => ({ path, views }));
  
  const topCountries = Object.entries(analytics.visitors.countries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([country, visitors]) => ({ country, visitors }));
  
  return {
    totalPageViews,
    totalVisitors: analytics.visitors.total,
    topPages,
    topCountries,
    deviceStats: analytics.visitors.devices,
    performance: {
      avgLoadTime: Math.round(analytics.performance.averageLoadTime),
      totalRequests: analytics.performance.totalRequests,
      errors: analytics.performance.errors,
    },
  };
}

// Reset analytics (for testing or monthly reset)
export function resetAnalytics(): void {
  const analytics = loadAnalytics();
  analytics.lastReset = new Date().toISOString();
  
  // Reset counters but keep structure
  analytics.pageViews = Object.fromEntries(
    Object.keys(analytics.pageViews).map(key => [key, 0])
  );
  analytics.visitors.total = 0;
  analytics.visitors.unique = 0;
  analytics.visitors.returning = 0;
  analytics.visitors.countries = { 'Unknown': 0 };
  analytics.visitors.devices = { desktop: 0, mobile: 0, tablet: 0 };
  analytics.blogStats.totalViews = 0;
  analytics.blogStats.popularPosts = {};
  analytics.performance.totalRequests = 0;
  analytics.performance.errors = 0;
  
  saveAnalytics(analytics);
}

// Get analytics for specific time period (basic implementation)
export function getAnalyticsForPeriod(): AnalyticsData {
  // For now, return all data
  // In the future, you could implement date-based filtering
  return loadAnalytics();
}
