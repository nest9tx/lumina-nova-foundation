-- =====================================================
-- Add missing message_count column to profiles table
-- =====================================================

-- Add the message_count column if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS message_count INTEGER DEFAULT 0;

-- Set existing users to 0 if the column was just added
UPDATE public.profiles 
SET message_count = 0 
WHERE message_count IS NULL;

-- Verify the column was added
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND column_name = 'message_count';

-- Quick verification - show all message-related columns
SELECT 
  id,
  email,
  tier,
  message_count,
  message_limit,
  is_upgraded
FROM public.profiles
LIMIT 5;
