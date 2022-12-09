import { createClient } from '@supabase/supabase-js';

// https://vitejs.dev/guide/env-and-mode.html
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
