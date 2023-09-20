export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      Chunks: {
        Row: {
          chunk_id: string;
          content: string;
          embedding: string | null;
          page_id: string;
          section_title: string;
          tokens: number | null;
        };
        Insert: {
          chunk_id?: string;
          content: string;
          embedding?: string | null;
          page_id: string;
          section_title: string;
          tokens?: number | null;
        };
        Update: {
          chunk_id?: string;
          content?: string;
          embedding?: string | null;
          page_id?: string;
          section_title?: string;
          tokens?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Chunks_page_id_fkey';
            columns: ['page_id'];
            referencedRelation: 'Pages';
            referencedColumns: ['page_id'];
          }
        ];
      };
      Conversations: {
        Row: {
          conversation_id: string;
          created_at: string;
          focus: string;
          user_id: string | null;
          conversation_title: string | null;
        };
        Insert: {
          conversation_id?: string;
          created_at: string;
          focus: string;
          user_id?: string | null;
        };
        Update: {
          conversation_id?: string;
          created_at?: string;
          focus?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Conversations_focus_fkey';
            columns: ['focus'];
            referencedRelation: 'Documentation';
            referencedColumns: ['documentation_id'];
          },
          {
            foreignKeyName: 'Conversations_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      Documentation: {
        Row: {
          documentation_id: string;
          last_embedded: string;
          name: string;
          tokens: number | null;
        };
        Insert: {
          documentation_id?: string;
          last_embedded: string;
          name: string;
          tokens?: number | null;
        };
        Update: {
          documentation_id?: string;
          last_embedded?: string;
          name?: string;
          tokens?: number | null;
        };
        Relationships: [];
      };
      Messages: {
        Row: {
          content: string;
          conversation_id: string | null;
          created_at: string;
          message_id: string;
          role: string;
        };
        Insert: {
          content: string;
          conversation_id?: string | null;
          created_at: string;
          message_id?: string;
          role: string;
        };
        Update: {
          content?: string;
          conversation_id?: string | null;
          created_at?: string;
          message_id?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Messages_conversation_id_fkey';
            columns: ['conversation_id'];
            referencedRelation: 'Conversations';
            referencedColumns: ['conversation_id'];
          }
        ];
      };
      Pages: {
        Row: {
          content: string;
          documentation_id: string | null;
          last_embedded: string | null;
          name: string;
          page_id: string;
          source_url: string;
          title: string;
          tokens: number | null;
        };
        Insert: {
          content: string;
          documentation_id?: string | null;
          last_embedded?: string | null;
          name: string;
          page_id?: string;
          source_url: string;
          title: string;
          tokens?: number | null;
        };
        Update: {
          content?: string;
          documentation_id?: string | null;
          last_embedded?: string | null;
          name?: string;
          page_id?: string;
          source_url?: string;
          title?: string;
          tokens?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Pages_documentation_id_fkey';
            columns: ['documentation_id'];
            referencedRelation: 'Documentation';
            referencedColumns: ['documentation_id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      docsearch2: {
        Args: {
          query_embedding: string;
          matchcount: number;
          similaritythreshold: number;
        };
        Returns: {
          chunk_id: string;
          section_title: string;
          content: string;
          similarity: number;
        }[];
      };
      ivfflathandler: {
        Args: {
          '': unknown;
        };
        Returns: unknown;
      };
      vector_avg: {
        Args: {
          '': number[];
        };
        Returns: string;
      };
      vector_dims: {
        Args: {
          '': string;
        };
        Returns: number;
      };
      vector_norm: {
        Args: {
          '': string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          '': string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          '': string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          '': unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      content_result: {
        content_text: string;
      };
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'objects_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
