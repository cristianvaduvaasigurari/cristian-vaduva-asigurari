-- Create leads table
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    service_type TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'new'::text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit a contact form)
CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT TO anon
    WITH CHECK (true);

-- Only authenticated users (admins) can view leads
CREATE POLICY "Allow authenticated users to view" ON public.leads
    FOR SELECT TO authenticated
    USING (true);

-- Only authenticated users can update/delete
CREATE POLICY "Allow authenticated users to update" ON public.leads
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete" ON public.leads
    FOR DELETE TO authenticated
    USING (true);
