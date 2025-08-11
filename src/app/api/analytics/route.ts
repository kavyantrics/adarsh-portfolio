import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor, getAnalyticsStats, getRecentVisitors } from '@/lib/analytics';

// Ensure this route is dynamic and not prerendered
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { page, clientData } = await req.json();
    
    if (!page) {
      return NextResponse.json({ error: 'Page parameter is required' }, { status: 400 });
    }

    const visitor = await trackVisitor(req, page, clientData);
    
    return NextResponse.json({
      success: true,
      visitor: {
        id: visitor.id,
        sessionId: visitor.sessionId,
        isFirstVisit: visitor.isFirstVisit,
        visitCount: visitor.visitCount
      }
    });
  } catch (error) {
    console.error('Analytics POST error:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    if (type === 'recent') {
      const limit = parseInt(searchParams.get('limit') || '20');
      const recentVisitors = await getRecentVisitors(limit);
      return NextResponse.json(recentVisitors);
    }
    
    const stats = await getAnalyticsStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
