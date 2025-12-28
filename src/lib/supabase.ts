import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export interface Project {
  id: string;
  title: string;
  description: string;
  problem_statement: string;
  solution: string;
  client_type?: string;
  technologies: string[];
  image_url?: string;
  demo_url?: string;
  display_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company_name?: string;
  feedback: string;
  rating: number;
  display_order: number;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
