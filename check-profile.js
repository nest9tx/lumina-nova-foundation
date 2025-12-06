// Quick script to check profile data
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfile() {
  const { data, error } = await supabase
    .from('profiles')
    .select('email, tier, message_limit, message_count, is_upgraded')
    .eq('email', 'nest9@yahoo.com')
    .single();

  if (error) {
    console.log('❌ Error:', error.message);
    return;
  }

  console.log('📊 Profile for nest9@yahoo.com:');
  console.log('   Email:', data.email);
  console.log('   Tier:', data.tier);
  console.log('   Message Limit:', data.message_limit);
  console.log('   Message Count:', data.message_count);
  console.log('   Is Upgraded:', data.is_upgraded);
  console.log('\n✅ Expected for Seeker: tier="seeker", message_limit=777');
}

checkProfile();
