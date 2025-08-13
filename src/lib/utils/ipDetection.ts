/**
 * Utility functions for IP address detection and validation
 */

export interface IPDetectionResult {
  ip: string;
  source: string;
  isValid: boolean;
  isLocal: boolean;
}

/**
 * Detect user IP address from request headers
 * Handles various proxy and load balancer scenarios
 */
export function detectUserIP(headers: Headers): IPDetectionResult {
  // Try multiple IP sources in order of reliability
  const cfConnectingIP = headers.get('cf-connecting-ip'); // Cloudflare
  const realIP = headers.get('x-real-ip');
  const forwarded = headers.get('x-forwarded-for');
  const xClientIP = headers.get('x-client-ip');
  const xForwarded = headers.get('x-forwarded');
  
  let ip = 'unknown';
  let source = 'none';
  
  if (cfConnectingIP) {
    ip = cfConnectingIP;
    source = 'cf-connecting-ip';
  } else if (realIP) {
    ip = realIP;
    source = 'x-real-ip';
  } else if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    const ips = forwarded.split(',').map(ip => ip.trim());
    ip = ips[0];
    source = 'x-forwarded-for';
  } else if (xClientIP) {
    ip = xClientIP;
    source = 'x-client-ip';
  } else if (xForwarded) {
    ip = xForwarded;
    source = 'x-forwarded';
  }
  
  // Validate IP format
  const isValid = validateIPFormat(ip);
  const isLocal = isLocalIP(ip);
  
  // Generate unique identifier for invalid IPs (local development)
  if (!isValid && ip === 'unknown') {
    ip = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    source = 'generated';
  }
  
  return {
    ip,
    source,
    isValid,
    isLocal
  };
}

/**
 * Validate IP address format (IPv4 and IPv6)
 */
export function validateIPFormat(ip: string): boolean {
  // IPv4 pattern: xxx.xxx.xxx.xxx
  const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // IPv6 pattern (simplified)
  const ipv6Pattern = /^[0-9a-fA-F:]+$/;
  
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}

/**
 * Check if IP is local/private
 */
export function isLocalIP(ip: string): boolean {
  if (!validateIPFormat(ip)) return false;
  
  // Localhost
  if (ip === '127.0.0.1' || ip === '::1') return true;
  
  // Private IP ranges
  const privateRanges = [
    /^10\./,                    // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
    /^192\.168\./,              // 192.168.0.0/16
    /^169\.254\./,              // Link-local
    /^fc00::/,                  // Unique local IPv6
    /^fe80::/                   // Link-local IPv6
  ];
  
  return privateRanges.some(range => range.test(ip));
}

/**
 * Get IP detection debug info
 */
export function getIPDebugInfo(headers: Headers): Record<string, string | null> {
  return {
    'cf-connecting-ip': headers.get('cf-connecting-ip'),
    'x-real-ip': headers.get('x-real-ip'),
    'x-forwarded-for': headers.get('x-forwarded-for'),
    'x-client-ip': headers.get('x-client-ip'),
    'x-forwarded': headers.get('x-forwarded'),
    'user-agent': headers.get('user-agent'),
    'host': headers.get('host'),
    'origin': headers.get('origin'),
    'referer': headers.get('referer')
  };
}
