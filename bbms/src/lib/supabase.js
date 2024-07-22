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
const supabaseUrl = "https://mhafuomuijgzqijwoghr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWZ1b211aWpnenFpandvZ2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzMzEwMjMsImV4cCI6MjAzNTkwNzAyM30.aKee0-O5Fhb4Jsw408ELcqQRc9pORCAtn3zas2JDQdo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: LocalStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
