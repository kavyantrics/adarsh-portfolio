import { NextRequest, NextResponse } from 'next/server';
import { getChatHistoryByIP, getRecentConversations, getChatStatsByIP } from '@/lib/services';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_ip = searchParams.get('user_ip');
    const limit = parseInt(searchParams.get('limit') || '50');
    const type = searchParams.get('type') || 'messages'; // 'messages', 'conversations', 'stats'

    if (!user_ip) {
      return NextResponse.json(
        { error: 'user_ip parameter is required' },
        { status: 400 }
      );
    }

    let data;
    
    switch (type) {
      case 'conversations':
        data = await getRecentConversations(user_ip, limit);
        break;
      case 'stats':
        data = await getChatStatsByIP(user_ip);
        break;
      case 'messages':
      default:
        data = await getChatHistoryByIP(user_ip, limit);
        break;
    }

    return NextResponse.json({ 
      data,
      user_ip,
      type,
      limit 
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}
