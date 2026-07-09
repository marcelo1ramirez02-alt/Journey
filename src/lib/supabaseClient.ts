import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') && 
  !supabaseAnonKey.includes('your-anon-key');

if (!isConfigured) {
  console.warn(
    'Supabase: URL or Anon Key is missing or using default placeholders. Onboarding submissions will only run locally.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export { isConfigured };
