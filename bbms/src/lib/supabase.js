import { createClient } from "@supabase/supabase-js";



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
const supabaseUrl = "https://jjnhevzcwuocsxlqbjoc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqbmhldnpjd3VvY3N4bHFiam9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwODcyMDEsImV4cCI6MjAzNTY2MzIwMX0.BAWrB9HacmcsmiTf2oygl2UG89JX3WmiUykZWN8VEvc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: LocalStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
