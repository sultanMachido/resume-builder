import { ReactNode } from "react";
import Backdrop from "./backdrop";

type ModalProp = {
  show: boolean;
  children: ReactNode;
};

const Modal = ({ show, children }: ModalProp) => {
  if (!show) {
    return <></>;
  }
  return (
    <div className="flex justify-center items-center">
      <Backdrop show={show}>
        <div></div>
      </Backdrop>
      <div role="dialog" className="absolute  bg-white top-10 w-6/12 p-5 z-10">
        {children}
      </div>
    </div>
  );
};

export default Modal;
