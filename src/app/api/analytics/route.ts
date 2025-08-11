import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor, getAnalyticsStats, getRecentVisitors } from '@/lib/analytics';

export async function POST(req: NextRequest) {
  try {
    const { page, clientData } = await req.json();
    
    // Track this visitor with enhanced client data
    const visitor = trackVisitor(req, page || '/', clientData);
    
    return NextResponse.json({ 
      success: true, 
      visitorId: visitor.id,
      timestamp: visitor.timestamp,
      sessionId: visitor.sessionId,
      isFirstVisit: visitor.isFirstVisit,
      visitCount: visitor.visitCount
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    if (type === 'recent') {
      const limit = parseInt(searchParams.get('limit') || '10');
      const recentVisitors = getRecentVisitors(limit);
      return NextResponse.json(recentVisitors);
    }
    
    // Get analytics statistics
    const stats = getAnalyticsStats();
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
