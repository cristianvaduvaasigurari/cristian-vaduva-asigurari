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

-- 1. Public insert: allow anyone (anon and authenticated) to submit a lead without read access
CREATE POLICY "leads_insert_public" ON public.leads
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- 2. Restrict SELECT, UPDATE, DELETE strictly to authenticated administrators
CREATE POLICY "leads_select_admin" ON public.leads
    FOR SELECT TO authenticated
    USING (
        lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')) = 'admin'
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = 'true'::jsonb
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = '1'::jsonb
        OR lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'is_admin', '')) IN ('true', 't', '1')
    );

CREATE POLICY "leads_update_admin" ON public.leads
    FOR UPDATE TO authenticated
    USING (
        lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')) = 'admin'
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = 'true'::jsonb
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = '1'::jsonb
        OR lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'is_admin', '')) IN ('true', 't', '1')
    )
    WITH CHECK (
        lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')) = 'admin'
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = 'true'::jsonb
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = '1'::jsonb
        OR lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'is_admin', '')) IN ('true', 't', '1')
    );

CREATE POLICY "leads_delete_admin" ON public.leads
    FOR DELETE TO authenticated
    USING (
        lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')) = 'admin'
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = 'true'::jsonb
        OR (auth.jwt() -> 'app_metadata' -> 'is_admin') = '1'::jsonb
        OR lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'is_admin', '')) IN ('true', 't', '1')
    );

-- Defense in depth: Restrict table privileges
REVOKE ALL ON public.leads FROM PUBLIC;
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon;
GRANT INSERT ON public.leads TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.leads TO authenticated;
