import { Button } from "@/components/ui/button";
import Modal from "./ui/modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavItems = () => {
  return (
    <ul className="flex justify-center font-bold text-white">
      <li className="px-5">Home</li>
      <li className="px-5">About</li>
      <li className="px-5">Product</li>
    </ul>
  );
};

const MobileNavBar = () => {
//   const { showMobileNavItems, setShowMobileNavItems } = useState(false);
  return (
    <div className="flex lg:hidden mx-auto w-[90%] justify-between items-center">
      <div className="w-2/12">
        <p className="font-bold text-[20px] text-white">ResumeBuilder</p>
      </div>
      <div className="cursor-pointer p-[10px] rounded-sm border-2 border-white">
        <FontAwesomeIcon icon={faBars} color="white" />
      </div>
      {/* {showMobileNavItems && <div>
        <div className="w-8/12">
        <NavItems />
      </div>
        <Modal show={showAuthModal}>
        <p>Auth modal component goes here</p>
      </Modal>
      </div>} */}
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
        <Modal show={showAuthModal}>
          <p>Auth modal component goes here</p>
        </Modal>
      </div>
      <MobileNavBar />
    </nav>
  );
};

export default Navbar;
