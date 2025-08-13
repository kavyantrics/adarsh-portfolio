import { supabase } from '../supabase'


// Analytics data structure matching your existing interface
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

// Initialize analytics in Supabase
export async function initializeAnalytics(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .limit(1);

    if (error) throw error;

    if (!data || data.length === 0) {
      // Create initial analytics record
      const { error: insertError } = await supabase
        .from('analytics')
        .insert([{
          page_views: defaultAnalytics.pageViews,
          visitors: defaultAnalytics.visitors,
          blog_stats: defaultAnalytics.blogStats,
          performance: defaultAnalytics.performance,
          last_updated: defaultAnalytics.lastUpdated,
          last_reset: defaultAnalytics.lastReset,
        }]);

      if (insertError) throw insertError;
      console.log('Analytics initialized in Supabase');
    }
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
}

// Load analytics data from Supabase
export async function loadAnalytics(): Promise<AnalyticsData> {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;

    if (!data) {
      await initializeAnalytics();
      return defaultAnalytics;
    }

    // Convert Supabase format to your existing interface
    return {
      pageViews: data.page_views || defaultAnalytics.pageViews,
      visitors: data.visitors || defaultAnalytics.visitors,
      blogStats: data.blog_stats || defaultAnalytics.blogStats,
      performance: data.performance || defaultAnalytics.performance,
      lastUpdated: data.last_updated || defaultAnalytics.lastUpdated,
      lastReset: data.last_reset || defaultAnalytics.lastReset,
    };
  } catch (error) {
    console.error('Error loading analytics:', error);
    return defaultAnalytics;
  }
}

// Save analytics data to Supabase
export async function saveAnalytics(data: AnalyticsData): Promise<void> {
  try {
    const { error } = await supabase
      .from('analytics')
      .upsert([{
        id: '1', // Single analytics record
        page_views: data.pageViews,
        visitors: data.visitors,
        blog_stats: data.blogStats,
        performance: data.performance,
        last_updated: new Date().toISOString(),
        last_reset: data.lastReset,
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error saving analytics:', error);
  }
}

// Track page view
export async function trackPageView(path: string): Promise<void> {
  try {
    const analytics = await loadAnalytics();
    
    if (!analytics.pageViews[path]) {
      analytics.pageViews[path] = 0;
    }
    analytics.pageViews[path]++;
    
    analytics.visitors.total++;
    
    await saveAnalytics(analytics);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Track visitor
export async function trackVisitor(country?: string, device?: 'desktop' | 'mobile' | 'tablet'): Promise<void> {
  try {
    const analytics = await loadAnalytics();
    
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
    
    await saveAnalytics(analytics);
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

// Track blog post view
export async function trackBlogView(slug: string): Promise<void> {
  try {
    const analytics = await loadAnalytics();
    
    if (!analytics.blogStats.popularPosts[slug]) {
      analytics.blogStats.popularPosts[slug] = 0;
    }
    analytics.blogStats.popularPosts[slug]++;
    analytics.blogStats.totalViews++;
    
    await saveAnalytics(analytics);
  } catch (error) {
    console.error('Error tracking blog view:', error);
  }
}

// Track performance metrics
export async function trackPerformance(loadTime: number, hasError: boolean = false): Promise<void> {
  try {
    const analytics = await loadAnalytics();
    
    // Update average load time
    const currentAvg = analytics.performance.averageLoadTime;
    const totalRequests = analytics.performance.totalRequests;
    analytics.performance.averageLoadTime = 
      (currentAvg * totalRequests + loadTime) / (totalRequests + 1);
    
    analytics.performance.totalRequests++;
    
    if (hasError) {
      analytics.performance.errors++;
    }
    
    await saveAnalytics(analytics);
  } catch (error) {
    console.error('Error tracking performance:', error);
  }
}

// Get analytics summary
export async function getAnalyticsSummary(): Promise<{
  totalPageViews: number;
  totalVisitors: number;
  topPages: Array<{ path: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  deviceStats: { desktop: number; mobile: number; tablet: number };
  performance: { avgLoadTime: number; totalRequests: number; errors: number };
}> {
  try {
    const analytics = await loadAnalytics();
    
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
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return {
      totalPageViews: 0,
      totalVisitors: 0,
      topPages: [],
      topCountries: [],
      deviceStats: { desktop: 0, mobile: 0, tablet: 0 },
      performance: { avgLoadTime: 0, totalRequests: 0, errors: 0 },
    };
  }
}

// Get analytics for specific time period
export async function getAnalyticsForPeriod(days: number = 30): Promise<AnalyticsData> {
  try {
    // For now, return all data
    // In the future, you could implement date-based filtering
    // based on the created_at timestamp in Supabase
    console.log(`Getting analytics for the last ${days} days (currently returns all data)`);
    const analytics = await loadAnalytics();
    return analytics;
  } catch (error) {
    console.error('Error getting analytics for period:', error);
    return defaultAnalytics;
  }
}

// Reset analytics
export async function resetAnalytics(): Promise<void> {
  try {
    const analytics = await loadAnalytics();
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
    
    await saveAnalytics(analytics);
  } catch (error) {
    console.error('Error resetting analytics:', error);
  }
}
