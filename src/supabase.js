import { createClient } from '@supabase/supabase-js';

const { REACT_APP_SUPA_API_URL, REACT_APP_SUPA_API_KEY } = process.env;

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  REACT_APP_SUPA_API_URL,
  REACT_APP_SUPA_API_KEY,
);

export default supabase;
