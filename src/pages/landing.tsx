import Navbar from "@/components/Navbar";
import jumbotronImage from "../assets/jumbotron-image.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";



const LandingPage = () => {

 
 

  return (
    <section>
      <Navbar />
      <div className="flex w-full justify-between overflow-y-hidden">
        <div className="w-[600px] pl-[85px] pt-[100px]">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.5 }}
            className="text-[30px] font-bold"
          >
            Build a resume that will get you that dream job
          </motion.h1>
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.8 }}
            className="text-[20px] pt-10"
          >
            This resume builder helps you to write a good resume by leveraging
            Artificial Intelligence
          </motion.p>
          <Button className="w-[200px] h-[50px] mt-[60px]">Get Started</Button>
        </div>
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.9 }}
            src={jumbotronImage}
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
