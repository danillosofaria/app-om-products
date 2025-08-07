import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ntxziswczaigmgvlvwep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eHppc3djemFpZ21ndmx2d2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzM5MTQsImV4cCI6MjA3MDAwOTkxNH0.hGHG8YL4tuDu3Bp_StaTDldt1IqOdAknX8Dh-KoOqYQ' // NUNCA use a service_role key no frontend

export const supabase = createClient(supabaseUrl, supabaseKey)
