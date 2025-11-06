import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const migrationSQL = `-- Create accounts table
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
CREATE INDEX IF NOT EXISTS idx_accounts_company_name ON public.accounts(company_name);`;

export default function AdminMigration() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(migrationSQL);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Migration SQL has been copied to clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Database Migration: Create Accounts Table</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Click the "Copy SQL" button below</li>
              <li>Go to <a href="https://supabase.com/dashboard/project/oyzfmzaarffmsqxdszmj/editor" target="_blank" rel="noopener noreferrer" className="underline font-medium">Supabase SQL Editor</a></li>
              <li>Click "New query"</li>
              <li>Paste the SQL (Cmd/Ctrl + V)</li>
              <li>Click "Run" or press Cmd/Ctrl + Enter</li>
              <li>Wait for the success message</li>
              <li>Refresh this page or go back to Accounts</li>
            </ol>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Migration SQL:</label>
              <Button onClick={handleCopy} size="sm" variant="outline">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy SQL
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={migrationSQL}
              readOnly
              className="font-mono text-sm h-96"
              onClick={(e) => e.currentTarget.select()}
            />
          </div>

          <div className="flex gap-2">
            <Button asChild>
              <a href="https://supabase.com/dashboard/project/oyzfmzaarffmsqxdszmj/editor" target="_blank" rel="noopener noreferrer">
                Open Supabase SQL Editor
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

