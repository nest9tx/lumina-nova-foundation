// /types/supabase.ts

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          tier: string;
          message_limit: number;
          message_count: number;
          is_active?: boolean;
          is_upgraded?: boolean;
          stripe_id?: string;
          subscription_id?: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']>;
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      // You can add other tables here
    };
  };
}
