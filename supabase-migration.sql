-- Supabase Migration Script for Portfolio Analytics
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_views JSONB DEFAULT '{}'::jsonb,
    visitors JSONB DEFAULT '{}'::jsonb,
    blog_stats JSONB DEFAULT '{}'::jsonb,
    performance JSONB DEFAULT '{}'::jsonb,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_views table for individual page tracking
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    path TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visitors table for detailed visitor tracking
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    country TEXT DEFAULT 'Unknown',
    device TEXT CHECK (device IN ('desktop', 'mobile', 'tablet')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);
CREATE INDEX IF NOT EXISTS idx_visitors_country ON public.visitors(country);
CREATE INDEX IF NOT EXISTS idx_visitors_device ON public.visitors(device);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON public.visitors(created_at);

-- Insert default analytics record
INSERT INTO public.analytics (
    page_views,
    visitors,
    blog_stats,
    performance,
    last_updated,
    last_reset
) VALUES (
    '{"\/": 0, "\/blog": 0, "\/projects": 0}'::jsonb,
    '{"total": 0, "unique": 0, "returning": 0, "countries": {"Unknown": 0}, "devices": {"desktop": 0, "mobile": 0, "tablet": 0}}'::jsonb,
    '{"total_posts": 0, "total_views": 0, "popular_posts": {}}'::jsonb,
    '{"average_load_time": 0, "total_requests": 0, "errors": 0}'::jsonb,
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for analytics display)
CREATE POLICY "Allow public read access to analytics" ON public.analytics
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to page views" ON public.page_views
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to visitors" ON public.visitors
    FOR SELECT USING (true);

-- Create policies for authenticated insert/update (for tracking)
CREATE POLICY "Allow authenticated insert to analytics" ON public.analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update to analytics" ON public.analytics
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated insert to page views" ON public.page_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update to page views" ON public.page_views
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated insert to visitors" ON public.visitors
    FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for page_views table
CREATE TRIGGER update_page_views_updated_at 
    BEFORE UPDATE ON public.page_views 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.analytics TO anon, authenticated;
GRANT ALL ON public.page_views TO anon, authenticated;
GRANT ALL ON public.visitors TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
