-- Lumina Nova Database Schema Setup
-- Run this in your new Supabase project's SQL Editor

-- 1. Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE,
  tier text DEFAULT 'free',
  message_limit integer DEFAULT 3,
  max_messages integer DEFAULT 3,
  is_active boolean DEFAULT false,
  is_upgraded boolean DEFAULT false,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create echois_conversations table
CREATE TABLE echois_conversations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_history jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create contact_messages table
CREATE TABLE contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  category text,
  message text NOT NULL,
  anonymous boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_echois_conversations_user_id ON echois_conversations(user_id);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- 5. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE echois_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Echois conversations policies  
CREATE POLICY "Users can access their own conversations" ON echois_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Contact messages policy (admin only for SELECT, public for INSERT)
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 7. Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, tier, message_limit, max_messages, is_active, is_upgraded)
  VALUES (
    new.id,
    new.email,
    'free',
    3,
    3,
    false,
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Create function to handle profile updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles 
  SET updated_at = now()
  WHERE id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create trigger for user updates
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- 11. Create function for echois conversations table creation (for your API)
CREATE OR REPLACE FUNCTION create_echois_conversations_table()
RETURNS text AS $$
BEGIN
  -- Check if table already exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'echois_conversations') THEN
    RETURN 'echois_conversations table already exists';
  ELSE
    RETURN 'echois_conversations table should be created via migration - this function is deprecated';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;