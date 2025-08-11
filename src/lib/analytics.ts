import { NextRequest } from 'next/server';

export interface UserDetails {
  // Basic visitor info
  id: string;
  timestamp: Date;
  ip: string;
  userAgent: string;
  page: string;
  referrer?: string;
  
  // Device & Browser details
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  screenResolution: string;
  viewportSize: string;
  colorDepth: number;
  language: string;
  timezone: string;
  
  // Network & Performance
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  
  // Location (if available)
  country?: string;
  city?: string;
  region?: string;
  
  // Session info
  sessionId: string;
  isFirstVisit: boolean;
  visitCount: number;
  
  // Additional context
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface AnalyticsStats {
  totalVisitors: number;
  pageViews: number;
  uniqueVisitors: number;
  lastVisit: string;
  todayVisitors: number;
  thisWeekVisitors: number;
  thisMonthVisitors: number;
  
  // Enhanced stats
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

// In-memory storage (replace with database in production)
let visitorData: UserDetails[] = [];
const uniqueIPs = new Set<string>();
const uniqueSessions = new Set<string>();

export const trackVisitor = (req: NextRequest, page: string = '/', clientData?: Partial<UserDetails>) => {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const referrer = req.headers.get('referer') || undefined;
  const acceptLanguage = req.headers.get('accept-language') || 'en-US';
  
  // Parse user agent for device/browser info
  const ua = userAgent.toLowerCase();
  const deviceType = getDeviceType(ua);
  const browser = getBrowser(ua);
  const browserVersion = getBrowserVersion(ua);
  const os = getOS(ua);
  const osVersion = getOSVersion(ua);
  
  // Generate session ID
  const sessionId = generateSessionId(ip, userAgent);
  const isFirstVisit = !uniqueSessions.has(sessionId);
  
  // Count visits for this session
  const visitCount = visitorData.filter(v => v.sessionId === sessionId).length + 1;
  
  // Parse UTM parameters from referrer
  const utmParams = parseUTMParams(referrer);
  
  const visitor: UserDetails = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    ip,
    userAgent,
    page,
    referrer,
    
    // Device & Browser
    deviceType,
    browser,
    browserVersion,
    os,
    osVersion,
    screenResolution: clientData?.screenResolution || 'unknown',
    viewportSize: clientData?.viewportSize || 'unknown',
    colorDepth: clientData?.colorDepth || 24,
    language: acceptLanguage.split(',')[0],
    timezone: clientData?.timezone || 'unknown',
    
    // Network info
    connectionType: clientData?.connectionType,
    effectiveType: clientData?.effectiveType,
    downlink: clientData?.downlink,
    rtt: clientData?.rtt,
    
    // Location
    country: clientData?.country,
    city: clientData?.city,
    region: clientData?.region,
    
    // Session
    sessionId,
    isFirstVisit,
    visitCount,
    
    // UTM parameters
    ...utmParams,
  };

  // Add to storage
  visitorData.push(visitor);
  uniqueIPs.add(ip);
  uniqueSessions.add(sessionId);

  // Clean old data (keep last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  visitorData = visitorData.filter(v => v.timestamp > thirtyDaysAgo);

  // Log detailed visitor info
  console.log('🚀 New Visitor:', {
    id: visitor.id,
    ip: visitor.ip,
    device: `${visitor.deviceType} - ${visitor.os} ${visitor.osVersion}`,
    browser: `${visitor.browser} ${visitor.browserVersion}`,
    page: visitor.page,
    referrer: visitor.referrer || 'Direct',
    location: visitor.country ? `${visitor.city}, ${visitor.country}` : 'Unknown',
    session: `${visitor.sessionId.slice(0, 8)}... (Visit #${visitor.visitCount})`,
    timestamp: visitor.timestamp.toISOString(),
  });

  return visitor;
};

export const getAnalyticsStats = (): AnalyticsStats => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

  const todayVisitors = visitorData.filter(v => v.timestamp >= today).length;
  const thisWeekVisitors = visitorData.filter(v => v.timestamp >= weekAgo).length;
  const thisMonthVisitors = visitorData.filter(v => v.timestamp >= monthAgo).length;

  // Device breakdown
  const deviceBreakdown = {
    desktop: visitorData.filter(v => v.deviceType === 'desktop').length,
    mobile: visitorData.filter(v => v.deviceType === 'mobile').length,
    tablet: visitorData.filter(v => v.deviceType === 'tablet').length,
  };

  // Browser breakdown
  const browserBreakdown = visitorData.reduce((acc, v) => {
    acc[v.browser] = (acc[v.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // OS breakdown
  const osBreakdown = visitorData.reduce((acc, v) => {
    acc[v.os] = (acc[v.os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Country breakdown
  const countryBreakdown = visitorData
    .filter(v => v.country)
    .reduce((acc, v) => {
      acc[v.country!] = (acc[v.country!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Referrer breakdown
  const referrerBreakdown = visitorData
    .filter(v => v.referrer)
    .reduce((acc, v) => {
      const host = new URL(v.referrer!).hostname;
      acc[host] = (acc[host] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return {
    totalVisitors: visitorData.length,
    pageViews: visitorData.length,
    uniqueVisitors: uniqueIPs.size,
    lastVisit: visitorData.length > 0 ? visitorData[visitorData.length - 1].timestamp.toISOString() : now.toISOString(),
    todayVisitors,
    thisWeekVisitors,
    thisMonthVisitors,
    
    // Enhanced breakdowns
    deviceBreakdown,
    browserBreakdown,
    osBreakdown,
    countryBreakdown,
    referrerBreakdown,
  };
};

export const getPageAnalytics = (page: string) => {
  return visitorData.filter(v => v.page === page).length;
};

export const getReferrerAnalytics = () => {
  const referrers = visitorData
    .filter(v => v.referrer)
    .map(v => new URL(v.referrer!).hostname);
  
  const referrerCounts = referrers.reduce((acc, host) => {
    acc[host] = (acc[host] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(referrerCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
};

export const getRecentVisitors = (limit: number = 10) => {
  return visitorData
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
};

// Helper functions
const getDeviceType = (userAgent: string): 'desktop' | 'mobile' | 'tablet' => {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
};

const getBrowser = (userAgent: string): string => {
  if (userAgent.includes('chrome')) return 'Chrome';
  if (userAgent.includes('firefox')) return 'Firefox';
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
  if (userAgent.includes('edge')) return 'Edge';
  if (userAgent.includes('opera')) return 'Opera';
  return 'Unknown';
};

const getBrowserVersion = (userAgent: string): string => {
  const match = userAgent.match(/(chrome|firefox|safari|edge|opera)\/?\s*(\d+)/i);
  return match ? match[2] : 'Unknown';
};

const getOS = (userAgent: string): string => {
  if (userAgent.includes('windows')) return 'Windows';
  if (userAgent.includes('mac')) return 'macOS';
  if (userAgent.includes('linux')) return 'Linux';
  if (userAgent.includes('android')) return 'Android';
  if (userAgent.includes('ios')) return 'iOS';
  return 'Unknown';
};

const getOSVersion = (userAgent: string): string => {
  const match = userAgent.match(/(windows nt|mac os x|android|ios)\s*([\d._]+)/i);
  return match ? match[2] : 'Unknown';
};

const generateSessionId = (ip: string, userAgent: string): string => {
  const hash = btoa(`${ip}-${userAgent}`).replace(/[^a-zA-Z0-9]/g, '');
  return hash.slice(0, 16);
};

const parseUTMParams = (referrer?: string): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} => {
  if (!referrer) return {};
  
  try {
    const url = new URL(referrer);
    return {
      utmSource: url.searchParams.get('utm_source') || undefined,
      utmMedium: url.searchParams.get('utm_medium') || undefined,
      utmCampaign: url.searchParams.get('utm_campaign') || undefined,
      utmTerm: url.searchParams.get('utm_term') || undefined,
      utmContent: url.searchParams.get('utm_content') || undefined,
    };
  } catch {
    return {};
  }
};
