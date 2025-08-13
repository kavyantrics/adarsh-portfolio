'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Analytics tracking component
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'pageView',
            data: { path: pathname }
          }),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Track visitor info
    const trackVisitor = async () => {
      try {
        // Detect device type
        const userAgent = navigator.userAgent;
        let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
        
        if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
          device = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
        }

        // Try to get country (basic implementation)
        let country = 'Unknown';
        try {
          // You can integrate with a geolocation service here
          // For now, we'll use a simple approach
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (timezone.includes('America')) country = 'United States';
          else if (timezone.includes('Europe')) country = 'Europe';
          else if (timezone.includes('Asia')) country = 'Asia';
          else if (timezone.includes('Australia')) country = 'Australia';
        } catch {
          // Fallback to Unknown
        }

        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'visitor',
            data: { country, device }
          }),
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    // Track performance
    const trackPerformance = async () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'performance',
            data: { loadTime, hasError: false }
          }),
        });
      } catch (error) {
        console.error('Failed to track performance:', error);
      }
    };

    // Execute tracking
    trackPageView();
    trackVisitor();
    
    // Track performance after a short delay to ensure page is loaded
    const timer = setTimeout(trackPerformance, 1000);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
