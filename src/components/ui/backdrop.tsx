import { ReactNode } from "react";
import { createPortal } from "react-dom";

type BackdropProp = {
    children: ReactNode;
    show: boolean
}

const Backdrop = ({ children,show }: BackdropProp) => {
  if (!show) {
    return <></>
  }  
  return createPortal(<div className="fixed top-0 w-screen h-screen bg-black opacity-[0.2]">{children}</div>, document.body);
};

export default Backdrop;
