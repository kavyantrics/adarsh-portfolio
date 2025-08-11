export interface ClientData {
  // Screen and viewport
  screenResolution: string;
  viewportSize: string;
  colorDepth: number;
  
  // Timezone and language
  timezone: string;
  language: string;
  
  // Network information
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  
  // Location (if available)
  country?: string;
  city?: string;
  region?: string;
  
  // Additional browser capabilities
  cookiesEnabled: boolean;
  localStorageAvailable: boolean;
  sessionStorageAvailable: boolean;
  indexedDBAvailable: boolean;
  serviceWorkerAvailable: boolean;
  pushManagerAvailable: boolean;
  
  // Performance capabilities
  webGLSupported: boolean;
  webPSupported: boolean;
  avifSupported: boolean;
  webmSupported: boolean;
  
  // Device capabilities
  touchSupport: boolean;
  maxTouchPoints: number;
  hardwareConcurrency: number;
  deviceMemory?: number;
  
  // Browser features
  geolocationAvailable: boolean;
  notificationsAvailable: boolean;
  cameraAvailable: boolean;
  microphoneAvailable: boolean;
}

export const collectClientData = async (): Promise<ClientData> => {
  const data: ClientData = {
    // Screen and viewport
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    colorDepth: screen.colorDepth,
    
    // Timezone and language
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    
    // Network information
    connectionType: (navigator as any).connection?.type,
    effectiveType: (navigator as any).connection?.effectiveType,
    downlink: (navigator as any).connection?.downlink,
    rtt: (navigator as any).connection?.rtt,
    
    // Browser capabilities
    cookiesEnabled: navigator.cookieEnabled,
    localStorageAvailable: typeof Storage !== 'undefined',
    sessionStorageAvailable: typeof sessionStorage !== 'undefined',
    indexedDBAvailable: typeof indexedDB !== 'undefined',
    serviceWorkerAvailable: 'serviceWorker' in navigator,
    pushManagerAvailable: 'PushManager' in window,
    
    // Performance capabilities
    webGLSupported: !!window.WebGLRenderingContext,
    webPSupported: checkWebPSupport(),
    avifSupported: checkAvifSupport(),
    webmSupported: checkWebmSupport(),
    
    // Device capabilities
    touchSupport: 'ontouchstart' in window,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory,
    
    // Browser features
    geolocationAvailable: 'geolocation' in navigator,
    notificationsAvailable: 'Notification' in window,
    cameraAvailable: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    microphoneAvailable: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
  };

  // Try to get location if available
  try {
    if (data.geolocationAvailable) {
      const position = await getCurrentPosition();
      if (position) {
        // Note: In production, you'd want to use a geocoding service
        // to convert coordinates to city/country names
        data.country = 'Unknown'; // Would be set by geocoding service
        data.city = 'Unknown';    // Would be set by geocoding service
        data.region = 'Unknown';  // Would be set by geocoding service
      }
    }
  } catch (error) {
    console.log('Geolocation not available or denied');
  }

  return data;
};

// Helper functions
const checkWebPSupport = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  
  try {
    const dataURL = canvas.toDataURL('image/webp');
    return dataURL.indexOf('data:image/webp') === 0;
  } catch {
    return false;
  }
};

const checkAvifSupport = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  
  try {
    const dataURL = canvas.toDataURL('image/avif');
    return dataURL.indexOf('data:image/avif') === 0;
  } catch {
    return false;
  }
};

const checkWebmSupport = (): boolean => {
  const video = document.createElement('video');
  return video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
};

const getCurrentPosition = (): Promise<GeolocationPosition | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      () => resolve(null),
      { timeout: 5000, enableHighAccuracy: false }
    );
  });
};

// Enhanced tracking with client data
export const trackPageView = async (page: string) => {
  try {
    const clientData = await collectClientData();
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, clientData }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('📊 Page view tracked:', {
        page,
        visitorId: result.visitorId,
        sessionId: result.sessionId,
        isFirstVisit: result.isFirstVisit,
        visitCount: result.visitCount,
      });
      return result;
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Track user interactions
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  try {
    // In a real implementation, you'd send this to your analytics service
    console.log('🎯 Event tracked:', { eventName, eventData, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Track performance metrics
export const trackPerformance = (metrics: Record<string, number>) => {
  try {
    console.log('⚡ Performance tracked:', { metrics, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Failed to track performance:', error);
  }
};
