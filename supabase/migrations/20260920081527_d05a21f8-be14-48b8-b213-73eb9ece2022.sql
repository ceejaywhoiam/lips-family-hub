DROP POLICY "Anyone can submit an application" ON public.applications;
CREATE POLICY "Anyone can submit an application" ON public.applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new'::application_status);