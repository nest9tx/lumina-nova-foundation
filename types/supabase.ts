export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      user_interactions: {
        Row: {
          id: number;
          user_uuid: string;
          message_count: number;
          updated_at: string;
        };
        Insert: {
          user_uuid: string;
          message_count?: number;
        };
        Update: {
          user_uuid?: string;
          message_count?: number;
        };
      };
    };
    Functions: {
      increment_message_count: {
        Args: { user_uuid: string };
        Returns: void;
      };
    };
  };
}


