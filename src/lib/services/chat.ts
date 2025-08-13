import { supabase } from '../supabase';

export interface ChatMessage {
  id: string;
  user_ip: string;
  conversation_id: string;
  message_type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  messages: ChatMessage[];
  user_ip: string;
  created_at: string;
  updated_at: string;
}

// Generate a unique conversation ID
export function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Store a chat message
export async function storeChatMessage(
  user_ip: string,
  conversation_id: string,
  message_type: 'user' | 'assistant',
  content: string,
  metadata?: Record<string, unknown>
): Promise<ChatMessage | null> {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .insert([{
        user_ip,
        conversation_id,
        message_type,
        content,
        metadata: metadata || {},
      }])
      .select()
      .single();

    if (error) {
      console.error('Error storing chat message:', error);
      return null;
    }

    return {
      id: data.id,
      user_ip: data.user_ip,
      conversation_id: data.conversation_id,
      message_type: data.message_type,
      content: data.content,
      timestamp: data.timestamp,
      metadata: data.metadata,
    };
  } catch (error) {
    console.error('Error storing chat message:', error);
    return null;
  }
}

// Get chat history for a specific user IP
export async function getChatHistoryByIP(user_ip: string, limit: number = 50): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_ip', user_ip)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }

    return data.map(msg => ({
      id: msg.id,
      user_ip: msg.user_ip,
      conversation_id: msg.conversation_id,
      message_type: msg.message_type,
      content: msg.content,
      timestamp: msg.timestamp,
      metadata: msg.metadata,
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

// Get conversation by ID
export async function getConversationById(conversation_id: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('conversation_id', conversation_id)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching conversation:', error);
      return [];
    }

    return data.map(msg => ({
      id: msg.id,
      user_ip: msg.user_ip,
      conversation_id: msg.conversation_id,
      message_type: msg.message_type,
      content: msg.content,
      timestamp: msg.timestamp,
      metadata: msg.metadata,
    }));
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return [];
  }
}

// Get recent conversations for a user IP
export async function getRecentConversations(user_ip: string, limit: number = 10): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('conversation_id')
      .eq('user_ip', user_ip)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching recent conversations:', error);
      return [];
    }

    // Get unique conversation IDs
    const uniqueConversations = [...new Set(data.map(msg => msg.conversation_id))];
    return uniqueConversations.slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent conversations:', error);
    return [];
  }
}

// Delete chat history for a user IP (for privacy)
export async function deleteChatHistoryByIP(user_ip: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_ip', user_ip);

    if (error) {
      console.error('Error deleting chat history:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting chat history:', error);
    return false;
  }
}

// Delete a specific conversation
export async function deleteConversation(conversation_id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('conversation_id', conversation_id);

    if (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return false;
  }
}

// Get chat statistics for a user IP
export async function getChatStatsByIP(user_ip: string): Promise<{
  total_messages: number;
  total_conversations: number;
  last_activity: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('conversation_id, timestamp')
      .eq('user_ip', user_ip);

    if (error) {
      console.error('Error fetching chat stats:', error);
      return {
        total_messages: 0,
        total_conversations: 0,
        last_activity: null,
      };
    }

    const total_messages = data.length;
    const unique_conversations = new Set(data.map(msg => msg.conversation_id)).size;
    const last_activity = data.length > 0 
      ? new Date(Math.max(...data.map(msg => new Date(msg.timestamp).getTime()))).toISOString()
      : null;

    return {
      total_messages,
      total_conversations: unique_conversations,
      last_activity,
    };
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    return {
      total_messages: 0,
      total_conversations: 0,
      last_activity: null,
    };
  }
}
