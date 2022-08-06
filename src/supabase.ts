import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = `${import.meta.env.VITE_APP_SUPABASE_URL}`;
const supabaseAnonKey: string = `${import.meta.env.VITE_APP_SUPABASE_KEY}`;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabase = createClient(
  "https://khlnrdbkoztunmjutfan.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobG5yZGJrb3p0dW5tanV0ZmFuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1OTQ4Mjk3NSwiZXhwIjoxOTc1MDU4OTc1fQ.smMtowTHTjYCgZ9Q2nj-rDAO3TYFyVVVLYeNvEO_4xg"
);
