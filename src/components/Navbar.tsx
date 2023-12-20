import { Button } from "@/components/ui/button";
import Modal from "./ui/modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import googleIcon from "../assets/googleIcon.png";
import { authenticateWithGoogle } from "@/supabase/init";

const NavItems = () => {
  return (
    <ul className="block lg:flex justify-center font-bold text-white">
      <li className="p-[15px] px-0 lg:px-5 lg:p-0">Home</li>
      <li className="p-[15px] px-0 lg:px-5 lg:p-0">About</li>
      <li className="p-[15px] px-0 lg:px-5 lg:p-0">Product</li>
    </ul>
  );
};

const MobileNavBar = () => {
  const [showMobileNavItems, setShowMobileNavItems] = useState(false);

  const toggleMobileNavDisplay = () => {
    setShowMobileNavItems(!showMobileNavItems);
  };

  return (
    <div className="relative flex lg:hidden mx-auto w-[90%] justify-between items-center">
      <div className="w-2/12">
        <p className="font-bold text-[20px] text-white">ResumeBuilder</p>
      </div>
      <div
        className="cursor-pointer p-[10px] rounded-sm border-2 border-white"
        onClick={toggleMobileNavDisplay}
      >
        <FontAwesomeIcon icon={faBars} color="white" />
      </div>
      <AnimatePresence>
        {showMobileNavItems && (
          <motion.div
            className="bg-blue-400 top-[57px] right-[0px] w-[200px] p-[30px] absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className="w-8/12">
              <NavItems />
            </div>
            <hr />
            <div className="w-2/12 items-center">
              <span className="block my-[10px] min-w-[80px]">
                <p>Sign Up</p>
              </span>
              <Button className="w-[100px]">Login</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const displayModal = () => {
    setShowAuthModal(!showAuthModal);
  };
  return (
    <nav className="p-2 bg-blue-400">
      <div className="hidden lg:flex mx-auto w-[90%] justify-between items-center">
        <div className="w-2/12">
          <p className="font-bold text-[20px] text-white">ResumeBuilder</p>
        </div>
        <div className="w-8/12">
          <NavItems />
        </div>
        <div className="w-2/12 flex items-center">
          <span className="block min-w-[80px]">
            <p>Sign Up</p>
          </span>
          <Button className="w-[300px]" onClick={displayModal}>
            Login
          </Button>
        </div>
      </div>
      <MobileNavBar />
      <Modal show={showAuthModal}>
        <div className="flex justify-center">
          <Button onClick={authenticateWithGoogle}>
            <img src={googleIcon} className="w-[40px] h-[30px]" />
            <p>Sign in with Google</p>
          </Button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
