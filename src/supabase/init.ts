import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
);

export const authenticateWithGoogle = async () => {
  try {
    // Open a new window for Google OAuth
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options:{
        redirectTo: "https://resume-writer.netlify.app/edit-resume"
      }
    });
    console.log(error,"error")

    if (error) {
      console.error("Authentication error:", error.message);
      return null;
    }
  } catch (error: unknown) {
    // console.error("Unexpected error during authentication:", error?.message);
    return null;
  }
};
