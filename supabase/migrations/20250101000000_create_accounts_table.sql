-- Create accounts table
CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL UNIQUE,
  industry text,
  website text,
  address text,
  city text,
  country text,
  phone text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'prospect')),
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add account_id to contacts table to link contacts to accounts
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS account_id uuid REFERENCES public.accounts(id) ON DELETE SET NULL;

-- Enable Row Level Security on accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access to accounts" 
ON public.accounts 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to accounts" 
ON public.accounts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to accounts" 
ON public.accounts 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete to accounts" 
ON public.accounts 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates on accounts
CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing data: Create accounts from unique company names in contacts
INSERT INTO public.accounts (company_name, status, created_at, updated_at)
SELECT DISTINCT 
  company as company_name,
  'active' as status,
  MIN(created_at) as created_at,
  MAX(updated_at) as updated_at
FROM public.contacts
WHERE company IS NOT NULL AND company != ''
GROUP BY company
ON CONFLICT (company_name) DO NOTHING;

-- Link existing contacts to their accounts
UPDATE public.contacts c
SET account_id = a.id
FROM public.accounts a
WHERE c.company = a.company_name
  AND c.company IS NOT NULL
  AND c.company != '';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_account_id ON public.contacts(account_id);
CREATE INDEX IF NOT EXISTS idx_accounts_company_name ON public.accounts(company_name);

