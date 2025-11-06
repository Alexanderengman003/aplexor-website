-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing public policies on contacts
DROP POLICY IF EXISTS "Allow public read access to contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public insert to contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public update to contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public delete to contacts" ON contacts;

-- Create admin-only policy for contacts
CREATE POLICY "Admin users can manage contacts"
ON contacts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Drop public read policies on analytics tables
DROP POLICY IF EXISTS "Allow public read access to aplexor_page_views" ON aplexor_page_views;
DROP POLICY IF EXISTS "Allow public read access to aplexor_sessions" ON aplexor_sessions;
DROP POLICY IF EXISTS "Allow public read access to aplexor_events" ON aplexor_events;

-- Create admin-only read policies for analytics
CREATE POLICY "Admins can view page views"
ON aplexor_page_views
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view sessions"
ON aplexor_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view events"
ON aplexor_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Keep INSERT policies for anonymous tracking (keep existing)
-- Update policy already exists for aplexor_sessions

-- Create accounts table to fix build errors
CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  industry text,
  website text,
  address text,
  city text,
  country text,
  phone text,
  email text,
  status text DEFAULT 'active',
  annual_revenue numeric,
  employee_count integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Create admin-only policy for accounts
CREATE POLICY "Admin users can manage accounts"
ON accounts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for accounts updated_at
CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();