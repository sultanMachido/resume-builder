import Templates from "@/components/Templates";
import { supabase } from "@/supabase/init";


const EditResume = () => {
  const Template = Templates["DefaultTemplate"];
  supabase.auth.onAuthStateChange(async(event,session)=>{
    if (event === "SIGNED_IN") {
      if(session?.access_token){
       localStorage.setItem("accessToken",session?.access_token)
      }
      
    }
 })
  
  return (
    <section className="w-full">
      <Template />
    </section>
  );
};

export default EditResume;
