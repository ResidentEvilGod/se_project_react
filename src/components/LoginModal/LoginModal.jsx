import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  handleLoginSubmit,
  onSwitchToRegister,
  onSwitch,
  errorMessage,
  onClearError,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const authError = errorMessage || "";
  const hasAuthError = Boolean(authError);

  useEffect(() => {
    if (!isOpen) return;

    setValues({ email: "", password: "" });
    setEmailError("");
    setEmailTouched(false);

    if (typeof onClearError === "function") onClearError();
  }, [isOpen, setValues, onClearError]);

  const validateEmail = (input) => {
    if (input.validity.valueMissing) return "This field is required";
    if (input.validity.typeMismatch) return "This is not a valid email";
    return "";
  };

  const handleEmailChange = (e) => {
    handleChange(e);
    if (typeof onClearError === "function") onClearError();
    setEmailError(validateEmail(e.target));
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    if (typeof onClearError === "function") onClearError();
  };

  const handleEmailBlur = (e) => {
    setEmailTouched(true);
    setEmailError(validateEmail(e.target));
  };

  const isSubmitDisabled =
    !values.email ||
    !values.password ||
    Boolean(emailError);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof handleLoginSubmit === "function") {
      handleLoginSubmit(values);
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      switchText="Sign Up"
      onSwitch={onSwitchToRegister || onSwitch}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label
        htmlFor="login-email"
        className={`modal__label ${
          emailTouched && emailError ? "modal__label_error" : ""
        }`}
      >
        Email
        {emailTouched && emailError ? ` (${emailError})` : ""}
        <input
          id="login-email"
          type="email"
          name="email"
          placeholder="Email"
          className={`modal__input ${
            emailTouched && emailError ? "modal__input_error" : ""
          }`}
          value={values.email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
        />
      </label>

      <label
        htmlFor="login-password"
        className={`modal__label ${hasAuthError ? "modal__label_error" : ""}`}
      >
        {hasAuthError ? "Incorrect password" : "Password"}
        <input
          id="login-password"
          type="password"
          name="password"
          placeholder="Password"
          className={`modal__input ${hasAuthError ? "modal__input_error" : ""}`}
          value={values.password}
          onChange={handlePasswordChange}
          required
        />
      </label>

      {hasAuthError && <p className="modal__error">{authError}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;




