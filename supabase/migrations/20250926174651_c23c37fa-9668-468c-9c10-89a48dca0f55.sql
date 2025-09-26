-- Create contacts table
CREATE TABLE public.contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text,
  last_name text,
  email text,
  phone text,
  company text,
  position text,
  status text DEFAULT 'prospect' CHECK (status IN ('active', 'prospect', 'inactive')),
  tags text[] DEFAULT '{}',
  last_contact_date date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no user authentication required for now)
CREATE POLICY "Allow public read access to contacts" 
ON public.contacts 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to contacts" 
ON public.contacts 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete to contacts" 
ON public.contacts 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial sample data
INSERT INTO public.contacts (first_name, last_name, email, phone, company, position, status, tags, last_contact_date) VALUES
('Erik', 'Larsson', 'erik.larsson@techflow.se', '+46 8 123 4567', 'TechFlow AB', 'CTO', 'active', '{"Premium", "Tech Partner"}', '2024-01-15'),
('Maria', 'Andersson', 'maria.andersson@nordicdata.no', '+47 22 345 678', 'Nordic Data Solutions', 'Procurement Manager', 'active', '{"Enterprise", "Norway"}', '2024-01-12'),
('Hans', 'Nielsen', 'hans.nielsen@danishtech.dk', '+45 33 456 789', 'Danish Tech Group', 'Head of IT', 'prospect', '{"Prospect", "Denmark"}', '2024-01-10'),
('Anna', 'Virtanen', 'anna.virtanen@finnishsystems.fi', '+358 9 567 890', 'Finnish Systems Oy', 'Technical Director', 'active', '{"Partner", "Finland"}', '2024-01-08'),
('Olaf', 'Johannsson', 'olaf.johannsson@icetech.is', '+354 555 1234', 'IceTech Solutions', 'CEO', 'inactive', '{"Inactive", "Iceland"}', '2023-12-20');