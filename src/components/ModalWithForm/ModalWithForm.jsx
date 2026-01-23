import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  onSubmit,
  title,
  buttonText,
  name,
  onClose,
  switchText,
  onSwitch,
  footerLinkText,
  footerLinkOnClick,
  isSubmitDisabled,
}) {
  const submitHandler = handleSubmit || onSubmit;
  const switchLabel = switchText || footerLinkText;
  const switchHandler = onSwitch || footerLinkOnClick;

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape" && typeof onClose === "function") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayMouseDown}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="modal__container_type_form">
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="modal__title">{title}</h2>

        <form onSubmit={submitHandler} name={name} className="modal__form">
          {children}

          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={Boolean(isSubmitDisabled)}
            >
              {buttonText}
            </button>

            {typeof switchHandler === "function" && switchLabel ? (
              <div className="modal__switch">
                <span className="modal__switch-prefix">or</span>
                <button
                  type="button"
                  className="modal__switch-btn"
                  onClick={switchHandler}
                >
                  {switchLabel}
                </button>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;


