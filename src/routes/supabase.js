import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xauuunxxsqdvafhuawwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdXV1bnh4c3FkdmFmaHVhd3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3Mzg0MTUsImV4cCI6MjAxNzMxNDQxNX0.o7OLdjgEgDagpvR9H_YcXp31OYGNASk3--s2EEF9JrA';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;