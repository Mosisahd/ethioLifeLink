const SUPABASE_URL = "https://rzavwvnfqlpqofekxiri.supabase.co";
const SUPABASE_KEY = "sb_publishable_bPrfAT4mywLKAbfkzngJ5Q_I5vFQ9ik";

if (!window.supabase || !window.supabase.createClient) {
  console.error("Supabase library did not load. Check the Supabase CDN script before supabase.js.");
} else {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage
    }
  });
  console.log("✅ Supabase client created with automatic session refresh.");
}
