import { NextRequest, NextResponse } from 'next/server';
import { trackPageView, trackVisitor, trackPerformance } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'pageView':
        if (data.path) {
          trackPageView(data.path);
        }
        break;
        
      case 'visitor':
        trackVisitor(data.country, data.device);
        break;
        
      case 'performance':
        if (data.loadTime !== undefined) {
          trackPerformance(data.loadTime, data.hasError || false);
        }
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid analytics type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Analytics tracking endpoint' });
}
