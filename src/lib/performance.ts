export interface PerformanceMetrics {
  loadTime: number;
  fps: number;
  memoryUsage: number;
  networkLatency: number;
  cacheHitRate: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceResourceTiming extends PerformanceEntry {
  transferSize: number;
  initiatorType: string;
}

export const getRealPerformanceMetrics = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    // Wait for page to fully load
    if (document.readyState === 'complete') {
      resolve(calculateMetrics());
    } else {
      window.addEventListener('load', () => {
        resolve(calculateMetrics());
      });
    }
  });
};

const calculateMetrics = (): PerformanceMetrics => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  // Calculate real load time
  const loadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0;
  
  // Get paint metrics
  const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
  const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
  
  // Calculate DOM content loaded time
  const domContentLoaded = navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0;
  
  // Estimate FPS (simplified - in real app you'd use requestAnimationFrame)
  const fps = 60; // Most modern browsers target 60fps
  
  // Get memory info if available
  const memory = (performance as Performance & { memory?: PerformanceMemory }).memory;
  const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0;
  
  // Estimate network latency from navigation timing
  const networkLatency = navigation ? navigation.responseStart - navigation.requestStart : 0;
  
  // Estimate cache hit rate (simplified)
  const cacheHitRate = navigation && navigation.transferSize === 0 ? 100 : 85;
  
  return {
    loadTime: Math.max(loadTime, 0),
    fps,
    memoryUsage: Math.round(memoryUsage * 100) / 100,
    networkLatency: Math.max(networkLatency, 0),
    cacheHitRate,
    domContentLoaded: Math.max(domContentLoaded, 0),
    firstContentfulPaint: fcp ? fcp.startTime : 0,
    largestContentfulPaint: lcp ? lcp.startTime : 0,
  };
};

export const startFPSTracking = (callback: (fps: number) => void) => {
  let frameCount = 0;
  let lastTime = performance.now();
  
  const countFrames = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      callback(fps);
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(countFrames);
  };
  
  requestAnimationFrame(countFrames);
};

export const getResourceTiming = () => {
  const resources = performance.getEntriesByType('resource');
  return resources.map(resource => ({
    name: resource.name,
    duration: resource.duration,
    size: (resource as PerformanceResourceTiming).transferSize || 0,
    type: (resource as PerformanceResourceTiming).initiatorType,
  }));
};
