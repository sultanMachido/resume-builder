import Templates from "@/components/Templates";
import { supabase } from "@/supabase/init";
import { useNavigate } from "react-router-dom";


const EditResume = () => {
  const Template = Templates["DefaultTemplate"];
  const navigate = useNavigate()
  supabase.auth.onAuthStateChange(async(event,session)=>{
    if (event === "SIGNED_IN") {
      if(session?.access_token){
        console.log(session)
       localStorage.setItem("accessToken",session?.access_token)
       localStorage.setItem("fullName",session?.access_token)
       session?.user?.identities?.[0]?.identity_data
      
      }
      navigate("/edit-resume")
      
    }
 })
  
  return (
    <section className="w-full">
      <Template />
    </section>
  );
};

export default EditResume;
