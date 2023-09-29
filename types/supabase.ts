export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Chunks: {
        Row: {
          chunk_id: string
          content: string
          embedding: string | null
          page_id: string
          section_title: string
          tokens: number | null
        }
        Insert: {
          chunk_id?: string
          content: string
          embedding?: string | null
          page_id: string
          section_title: string
          tokens?: number | null
        }
        Update: {
          chunk_id?: string
          content?: string
          embedding?: string | null
          page_id?: string
          section_title?: string
          tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Chunks_page_id_fkey"
            columns: ["page_id"]
            referencedRelation: "Pages"
            referencedColumns: ["page_id"]
          }
        ]
      }
      Conversations: {
        Row: {
          conversation_id: string
          conversation_title: string
          created_at: string
          focus: string
          user_id: string | null
        }
        Insert: {
          conversation_id?: string
          conversation_title?: string
          created_at: string
          focus: string
          user_id?: string | null
        }
        Update: {
          conversation_id?: string
          conversation_title?: string
          created_at?: string
          focus?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Conversations_focus_fkey"
            columns: ["focus"]
            referencedRelation: "Documentation"
            referencedColumns: ["documentation_id"]
          },
          {
            foreignKeyName: "Conversations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Documentation: {
        Row: {
          documentation_id: string
          last_embedded: string
          name: string
          tokens: number | null
        }
        Insert: {
          documentation_id?: string
          last_embedded: string
          name: string
          tokens?: number | null
        }
        Update: {
          documentation_id?: string
          last_embedded?: string
          name?: string
          tokens?: number | null
        }
        Relationships: []
      }
      Messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          message_id: string
          role: Database["public"]["Enums"]["message_role"]
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at: string
          message_id: string
          role: Database["public"]["Enums"]["message_role"]
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          message_id?: string
          role?: Database["public"]["Enums"]["message_role"]
        }
        Relationships: [
          {
            foreignKeyName: "Messages_conversation_id_fkey"
            columns: ["conversation_id"]
            referencedRelation: "Conversations"
            referencedColumns: ["conversation_id"]
          }
        ]
      }
      Pages: {
        Row: {
          content: string
          documentation_id: string | null
          last_embedded: string | null
          name: string
          page_id: string
          source_url: string
          title: string
          tokens: number | null
        }
        Insert: {
          content: string
          documentation_id?: string | null
          last_embedded?: string | null
          name: string
          page_id?: string
          source_url: string
          title: string
          tokens?: number | null
        }
        Update: {
          content?: string
          documentation_id?: string | null
          last_embedded?: string | null
          name?: string
          page_id?: string
          source_url?: string
          title?: string
          tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Pages_documentation_id_fkey"
            columns: ["documentation_id"]
            referencedRelation: "Documentation"
            referencedColumns: ["documentation_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      DocSearch: {
        Args: {
          query_embedding: string
          matchcount: number
          similaritythreshold: number
        }
        Returns: {
          chunk_id: string
          section_title: string
          content: string
          similarity: number
        }[]
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      message_role: "function" | "system" | "user" | "assistant"
    }
    CompositeTypes: {
      content_result: {
        content_text: string
      }
    }
  }
}

