import { createClient } from "@supabase/supabase-js";


// Define the adapter for secure storage
const LocalStorageAdapter = {
  getItem: async (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item with key ${key}:`, error);
      throw error;
    }
  },
  setItem: async (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item with key ${key}:`, error);
      throw error;
    }
  },
  removeItem: async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key ${key}:`, error);
      throw error;
    }
  },
};

// Replace these with your actual Supabase URL and Anon Key
const supabaseUrl = "https://vuzriquwjrbsuvtgwedc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1enJpcXV3anJic3V2dGd3ZWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NTU0MjksImV4cCI6MjA0MjAzMTQyOX0.hD5B3yWYwgPmbHGdgh99dGZlk56FXKsLaxDpkfAs0Vg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: LocalStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
