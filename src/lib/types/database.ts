// Database schema types for Supabase
export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          id: string
          page_views: Record<string, number>
          visitors: {
            total: number
            unique: number
            returning: number
            countries: Record<string, number>
            devices: {
              desktop: number
              mobile: number
              tablet: number
            }
          }
          blog_stats: {
            total_posts: number
            total_views: number
            popular_posts: Record<string, number>
          }
          performance: {
            average_load_time: number
            total_requests: number
            errors: number
          }
          last_updated: string
          last_reset: string
          created_at: string
        }
        Insert: {
          id?: string
          page_views?: Record<string, number>
          visitors?: {
            total?: number
            unique?: number
            returning?: number
            countries?: Record<string, number>
            devices?: {
              desktop?: number
              mobile?: number
              tablet?: number
            }
          }
          blog_stats?: {
            total_posts?: number
            total_views?: number
            popular_posts?: Record<string, number>
          }
          performance?: {
            average_load_time?: number
            total_requests?: number
            errors?: number
          }
          last_updated?: string
          last_reset?: string
          created_at?: string
        }
        Update: {
          id?: string
          page_views?: Record<string, number>
          visitors?: {
            total?: number
            unique?: number
            returning?: number
            countries?: Record<string, number>
            devices?: {
              desktop?: number
              mobile?: number
              tablet?: number
            }
          }
          blog_stats?: {
            total_posts?: number
            total_views?: number
            popular_posts?: Record<string, number>
          }
          performance?: {
            average_load_time?: number
            total_requests?: number
            errors?: number
          }
          last_updated?: string
          last_reset?: string
          created_at?: string
        }
      }
      page_views: {
        Row: {
          id: string
          path: string
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          path: string
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          path?: string
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      visitors: {
        Row: {
          id: string
          country: string
          device: 'desktop' | 'mobile' | 'tablet'
          created_at: string
        }
        Insert: {
          id?: string
          country: string
          device: 'desktop' | 'mobile' | 'tablet'
          created_at?: string
        }
        Update: {
          id?: string
          country?: string
          device?: 'desktop' | 'mobile' | 'tablet'
          created_at?: string
        }
      }
      chat_history: {
        Row: {
          id: string
          user_ip: string
          conversation_id: string
          message_type: 'user' | 'assistant'
          content: string
          timestamp: string
          metadata: Record<string, unknown>
        }
        Insert: {
          id?: string
          user_ip: string
          conversation_id: string
          message_type: 'user' | 'assistant'
          content: string
          timestamp?: string
          metadata?: Record<string, unknown>
        }
        Update: {
          id?: string
          user_ip?: string
          conversation_id?: string
          message_type?: 'user' | 'assistant'
          content?: string
          timestamp?: string
          metadata?: Record<string, unknown>
        }
      }
    }
  }
}

// Helper types for easier usage
export type AnalyticsRow = Database['public']['Tables']['analytics']['Row']
export type PageViewRow = Database['public']['Tables']['page_views']['Row']
export type VisitorRow = Database['public']['Tables']['visitors']['Row']
export type ChatHistoryRow = Database['public']['Tables']['chat_history']['Row']
