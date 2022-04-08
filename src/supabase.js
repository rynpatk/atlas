import { createClient } from '@supabase/supabase-js';

import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from './constants';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY,
);

export default supabase;
