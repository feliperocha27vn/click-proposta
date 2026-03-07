INSERT INTO public.users (id, email, name, created_at, updated_at, plan, "planType", is_register_complete, credits)
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'name', 
  created_at, 
  updated_at, 
  'FREE', 
  'FREE', 
  false, 
  2
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;
