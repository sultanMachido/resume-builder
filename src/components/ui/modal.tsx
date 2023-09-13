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
    <div>
    <Backdrop show={show}>
      <div role="dialog">{children}</div>
    </Backdrop>
    <div className="absolute bg-white top-0 w-4/12 z-10"></div>
    </div>
  );
};

export default Modal;
