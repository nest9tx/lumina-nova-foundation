export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string
          email: string | null
          name: string | null
          message: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          name?: string | null
          message?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          email?: string | null
          name?: string | null
          message?: string | null
          category?: string | null
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

