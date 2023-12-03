import {
  DialogHTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
  MouseEvent,
  useState,
} from "react";
import { createPortal } from "react-dom";

import classes from "../../../styles/component/ui/Modals/Modal.module.css";

type ModalProps = DialogHTMLAttributes<HTMLDialogElement> & {
  isOpened: boolean;
  position?: "top" | "right" | "bottom" | "left" | "center";
  children: ReactNode;
  onClose: () => void;
};

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

const Modal = ({
  isOpened,
  onClose,
  position = "center",
  className,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
    if (isOpened) {
      modalRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      modalRef.current?.setAttribute("closing", "");
      modalRef.current?.addEventListener(
        "animationend",
        () => {
          modalRef.current?.removeAttribute("closing");
          modalRef.current?.close();
          document.body.style.overflow = "";
        },
        { once: true }
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  if (!hasRendered) {
    return null;
  }
  return createPortal(
    <dialog
      ref={modalRef}
      onCancel={onClose}
      onClick={(e) =>
        modalRef.current &&
        !isClickInsideRectangle(e, modalRef.current) &&
        onClose()
      }
      id="modal"
      className={`${classes["modal"]} ${position ? classes[position] : ""} ${
        className ? className : ""
      }`}
    >
      {children}
    </dialog>,
    document.getElementById("portal")!
  );
};

export default Modal;
