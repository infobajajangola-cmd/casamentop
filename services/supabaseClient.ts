import { createClient } from '@supabase/supabase-js';

// Use environment variables for production
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://tjvndvkrjjdlcefrxzvd.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdm5kdmtyampkbGNlZnJ4enZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODA4NTAsImV4cCI6MjA3ODg1Njg1MH0.Mk3LzED8pHEmfIuRpATRvDbpF5q8GP5MS2aCkJcyOdg';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('⚠️ Supabase credentials missing! Please check your .env file.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);