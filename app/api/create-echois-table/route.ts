// API endpoint to create the echois_conversations table
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore
            }
          },
        },
      }
    );

    // Check if table already exists
    const { data: existingTable, error: tableError } = await supabase
      .from('echois_conversations')
      .select('id')
      .limit(1);

    if (tableError) {
      // Table doesn't exist, return the SQL to create it
      throw new Error(`Table does not exist: ${tableError.message}`);
    }

    if (existingTable !== null) {
      return NextResponse.json({ 
        success: true, 
        message: 'echois_conversations table already exists',
        rowCount: existingTable.length
      });
    }

    // If we get here and there was no error, table exists but is empty
    return NextResponse.json({ 
      success: true, 
      message: 'Table exists but is empty' 
    });

  } catch (error: unknown) {
    // If error mentions table doesn't exist, we need to create it via Supabase Dashboard
    if (error instanceof Error && error.message.includes('does not exist')) {
      return NextResponse.json({ 
        error: 'Table does not exist',
        instruction: 'Please create the echois_conversations table in Supabase Dashboard with columns: id (uuid, primary), user_id (uuid), conversation_history (jsonb), created_at (timestamp), updated_at (timestamp)',
        sql: `
CREATE TABLE echois_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_echois_conversations_user_id ON echois_conversations(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE echois_conversations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to access only their own conversations
CREATE POLICY "Users can access their own conversations" ON echois_conversations
  FOR ALL USING (auth.uid() = user_id);
        `
      }, { status: 400 });
    }

    console.error('Database check error:', error);
    return NextResponse.json({ error: 'Failed to check table' }, { status: 500 });
  }
}