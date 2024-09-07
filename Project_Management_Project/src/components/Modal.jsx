import { forwardRef, useImperativeHandle, useRef } from "react";

import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#:~:text=dialog%3A%20When%20the%20form%20is%20inside%20a%20%3Cdialog%3E%2C%20closes%20the%20dialog%20and%20causes%20a%20submit%20event%20to%20be%20fired%20on%20submission%2C%20without%20submitting%20data%20or%20clearing%20the%20form.  <<<<< More info on <form></form> and the stuff it takes */

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
