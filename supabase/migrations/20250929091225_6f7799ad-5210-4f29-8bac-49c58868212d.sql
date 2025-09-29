-- Create Aplexor-specific analytics tables

-- Aplexor page views table
CREATE TABLE public.aplexor_page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  country TEXT DEFAULT 'Unknown',
  city TEXT DEFAULT 'Unknown',
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Aplexor sessions table  
CREATE TABLE public.aplexor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE,
  first_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_views_count INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  bounce BOOLEAN DEFAULT false,
  country TEXT DEFAULT 'Unknown',
  device_type TEXT,
  browser TEXT,
  referrer TEXT
);

-- Aplexor events table
CREATE TABLE public.aplexor_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  page_path TEXT,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.aplexor_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aplexor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aplexor_events ENABLE ROW LEVEL SECURITY;

-- Create public access policies for Aplexor analytics
CREATE POLICY "Allow public read access to aplexor_page_views" 
ON public.aplexor_page_views 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to aplexor_page_views" 
ON public.aplexor_page_views 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read access to aplexor_sessions" 
ON public.aplexor_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to aplexor_sessions" 
ON public.aplexor_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to aplexor_sessions" 
ON public.aplexor_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read access to aplexor_events" 
ON public.aplexor_events 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to aplexor_events" 
ON public.aplexor_events 
FOR INSERT 
WITH CHECK (true);

-- Create function to update session activity for Aplexor
CREATE OR REPLACE FUNCTION public.update_aplexor_session_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Update session last activity and page views count
  UPDATE public.aplexor_sessions 
  SET 
    last_activity_at = NEW.created_at,
    page_views_count = page_views_count + 1
  WHERE session_id = NEW.session_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger to update session activity
CREATE TRIGGER update_aplexor_session_activity_trigger
  AFTER INSERT ON public.aplexor_page_views
  FOR EACH ROW
  EXECUTE FUNCTION public.update_aplexor_session_activity();

-- Create indexes for better performance
CREATE INDEX idx_aplexor_page_views_session_id ON public.aplexor_page_views(session_id);
CREATE INDEX idx_aplexor_page_views_created_at ON public.aplexor_page_views(created_at);
CREATE INDEX idx_aplexor_page_views_page_path ON public.aplexor_page_views(page_path);
CREATE INDEX idx_aplexor_sessions_session_id ON public.aplexor_sessions(session_id);
CREATE INDEX idx_aplexor_sessions_created_at ON public.aplexor_sessions(first_visit_at);
CREATE INDEX idx_aplexor_events_session_id ON public.aplexor_events(session_id);
CREATE INDEX idx_aplexor_events_created_at ON public.aplexor_events(created_at);