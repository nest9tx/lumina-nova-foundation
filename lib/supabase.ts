import { createClient } from '../app/lib/supabase/server';

export async function getUserProfile() {
  const supabase = await createClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('❌ Error fetching profile:', error.message);
    return null;
  }

  return profile;
}