import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ucsflldmjypzyvlqzotm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjc2ZsbGRtanlwenl2bHF6b3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3NzA3OTMsImV4cCI6MjAxMDM0Njc5M30.FmfbYM5YFGRrj-NCHbs32yVwwm7TK7xFQ0CVyamxJHE",
);
