import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, handleLoginSubmit, onSwitch, hasError }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [touched, setTouched] = useState({
    email: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    setValues({
      email: "",
      password: "",
    });

    setErrors({ email: "" });
    setTouched({ email: false });
  }, [isOpen, setValues]);

  const getErrorMessage = (input) => {
    if (input.validity.valueMissing) return "This field is required";
    if (input.name === "email" && input.validity.typeMismatch) return "This is not a valid email";
    return "Invalid value";
  };

  const validateField = (e) => {
    const { name } = e.target;
    let msg = "";

    if (!e.target.validity.valid) msg = getErrorMessage(e.target);

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChangeValidated = (e) => {
    handleChange(e);
    if (e.target.name === "email") validateField(e);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name === "email") validateField(e);
  };

  const showError = (field) => Boolean(touched[field] && errors[field]);

  const isSubmitDisabled = !values.email || !values.password || Object.values(errors).some(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLoginSubmit(values, () => {
      setValues({ email: "", password: "" });
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      footerLinkText="or Sign Up"
      footerLinkOnClick={onSwitch}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label
        htmlFor="login-email"
        className={`modal__label ${showError("email") ? "modal__label_error" : ""}`}
      >
        Email
        {showError("email") ? ` (${errors.email})` : ""}
        <input
          id="login-email"
          type="email"
          name="email"
          placeholder="Email"
          className={`modal__input ${showError("email") ? "modal__input_error" : ""}`}
          value={values.email}
          onChange={handleChangeValidated}
          onBlur={handleBlur}
          required
        />
      </label>

      <label
        htmlFor="login-password"
        className={`modal__label ${hasError ? "modal__label_error" : ""}`}
      >
        {hasError ? "Incorrect password" : "Password"}
        <input
          id="login-password"
          type="password"
          name="password"
          placeholder="Password"
          className={`modal__input ${hasError ? "modal__input_error" : ""}`}
          value={values.password}
          onChange={handleChangeValidated}
          required
        />
      </label>

      {hasError && <p className="modal__error">Email or password incorrect</p>}
    </ModalWithForm>
  );
}

export default LoginModal;



