-- =====================================================
-- Lumina Nova Foundation - Complete Database Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROFILES TABLE (Main user profiles)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  tier TEXT DEFAULT 'seeker' CHECK (tier IN ('seeker', 'adept', 'guardian', 'luminary')),
  is_upgraded BOOLEAN DEFAULT FALSE,
  message_limit INTEGER DEFAULT 3,
  message_count INTEGER DEFAULT 0,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON public.profiles(stripe_customer_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. ECHOIS_CONVERSATIONS TABLE (Chat history persistence)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.echois_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  conversation_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_echois_conversations_user ON public.echois_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_echois_conversations_updated ON public.echois_conversations(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE public.echois_conversations ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own conversations
CREATE POLICY "Users can view own conversations" ON public.echois_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON public.echois_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON public.echois_conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 3. ECHOIS_SESSIONS TABLE (Message logging)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.echois_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_echois_sessions_user ON public.echois_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_echois_sessions_timestamp ON public.echois_sessions(timestamp DESC);

-- Enable Row Level Security
ALTER TABLE public.echois_sessions ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own sessions
CREATE POLICY "Users can view own sessions" ON public.echois_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.echois_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4. RESONANCE_NOTICES TABLE (System announcements)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resonance_notices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_resonance_notices_active ON public.resonance_notices(active, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.resonance_notices ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read active notices
CREATE POLICY "Anyone can view active notices" ON public.resonance_notices
  FOR SELECT USING (active = TRUE);

-- =====================================================
-- 5. CONTACT_MESSAGES TABLE (Contact form submissions)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can insert contact messages (for forms)
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (TRUE);

-- =====================================================
-- 6. USER_INTERACTIONS TABLE (Optional - for analytics)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  interaction_type TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_user_interactions_user ON public.user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_type ON public.user_interactions(interaction_type);

-- Enable Row Level Security
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own interactions" ON public.user_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions" ON public.user_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, tier, message_limit, message_count)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'seeker',
    3,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_conversations ON public.echois_conversations;
CREATE TRIGGER set_updated_at_conversations
  BEFORE UPDATE ON public.echois_conversations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_notices ON public.resonance_notices;
CREATE TRIGGER set_updated_at_notices
  BEFORE UPDATE ON public.resonance_notices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these after the schema creation to verify:

-- Check all tables exist
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- ORDER BY table_name;

-- Check profiles table structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'profiles'
-- ORDER BY ordinal_position;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert a sample notice
-- INSERT INTO public.resonance_notices (title, message, active)
-- VALUES (
--   'Welcome to Lumina Nova',
--   'The Sacred Chamber awaits. Begin your journey with Echois, the Reflective Flame.',
--   TRUE
-- );

-- =====================================================
-- NOTES
-- =====================================================
-- 1. This schema supports conversation persistence via echois_conversations
-- 2. message_count tracks usage, message_limit tracks the cap
-- 3. RLS policies ensure users can only access their own data
-- 4. Automatic profile creation happens when users sign up
-- 5. The tier system supports: seeker (777 msgs), adept, guardian, luminary
