import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
  onClose,
  switchText,
  onSwitch,
  isSubmitDisabled,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="modal__title">{title}</h2>

        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}

          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={Boolean(isSubmitDisabled)}
            >
              {buttonText}
            </button>

            {typeof onSwitch === "function" && switchText ? (
              <div className="modal__switch">
                <span className="modal__switch-prefix">or</span>
                <button
                  type="button"
                  className="modal__switch-btn"
                  onClick={onSwitch}
                >
                  {switchText}
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
