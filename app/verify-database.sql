-- =====================================================
-- Database Verification Script
-- Run this in Supabase SQL Editor to check what exists
-- =====================================================

-- 1. List all tables in public schema
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Check profiles table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. Check echois_conversations table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'echois_conversations'
ORDER BY ordinal_position;

-- 4. Check echois_sessions table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'echois_sessions'
ORDER BY ordinal_position;

-- 5. Check all policies (Row Level Security)
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 6. Check all triggers
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 7. Quick data check - count records in each table
SELECT 
  'profiles' as table_name, 
  COUNT(*) as record_count 
FROM public.profiles
UNION ALL
SELECT 
  'echois_conversations', 
  COUNT(*) 
FROM public.echois_conversations
UNION ALL
SELECT 
  'echois_sessions', 
  COUNT(*) 
FROM public.echois_sessions
UNION ALL
SELECT 
  'resonance_notices', 
  COUNT(*) 
FROM public.resonance_notices
UNION ALL
SELECT 
  'contact_messages', 
  COUNT(*) 
FROM public.contact_messages;

-- 8. Check if required columns exist in profiles
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'message_count') 
    THEN '✅ message_count exists'
    ELSE '❌ message_count MISSING'
  END as message_count_check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'message_limit') 
    THEN '✅ message_limit exists'
    ELSE '❌ message_limit MISSING'
  END as message_limit_check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'tier') 
    THEN '✅ tier exists'
    ELSE '❌ tier MISSING'
  END as tier_check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_upgraded') 
    THEN '✅ is_upgraded exists'
    ELSE '❌ is_upgraded MISSING'
  END as is_upgraded_check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id') 
    THEN '✅ stripe_customer_id exists'
    ELSE '❌ stripe_customer_id MISSING'
  END as stripe_customer_check;
