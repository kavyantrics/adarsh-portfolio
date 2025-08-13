import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary, getAnalyticsForPeriod } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period');
    
    let analyticsData;
    
    if (period === 'summary') {
      analyticsData = getAnalyticsSummary();
    } else {
      const days = period ? parseInt(period) : 30;
      analyticsData = getAnalyticsForPeriod(days);
    }
    
    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
