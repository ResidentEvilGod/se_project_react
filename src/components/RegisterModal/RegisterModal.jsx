import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  handleRegisterSubmit,
  onSwitchToLogin,
  onSwitch,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    name: false,
    avatar: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    setValues({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

    setErrors({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

    setTouched({
      email: false,
      password: false,
      name: false,
      avatar: false,
    });
  }, [isOpen, setValues]);

  const getErrorMessage = (input) => {
    const { name, validity, minLength } = input;

    if (validity.valueMissing) return "This field is required";
    if (name === "email" && validity.typeMismatch) return "This is not a valid email";
    if (name === "avatar" && validity.typeMismatch) return "This is not a valid URL";
    if (validity.tooShort) return `Must be at least ${minLength} characters`;

    return "";
  };

  const validateField = (e) => {
    const { name } = e.target;
    const msg = e.target.validity.valid ? "" : getErrorMessage(e.target);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChangeValidated = (e) => {
    handleChange(e);
    validateField(e);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(e);
  };

  const showError = (field) => Boolean(touched[field] && errors[field]);

  const isSubmitDisabled =
    !values.email ||
    !values.password ||
    !values.name ||
    !values.avatar ||
    Object.values(errors).some(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof handleRegisterSubmit === "function") {
      handleRegisterSubmit(values);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      switchText="Log In"
      onSwitch={onSwitchToLogin || onSwitch}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label
        htmlFor="register-email"
        className={`modal__label ${showError("email") ? "modal__label_error" : ""}`}
      >
        Email*
        {showError("email") ? ` (${errors.email})` : ""}
        <input
          id="register-email"
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
        htmlFor="register-password"
        className={`modal__label ${showError("password") ? "modal__label_error" : ""}`}
      >
        Password*
        {showError("password") ? ` (${errors.password})` : ""}
        <input
          id="register-password"
          type="password"
          name="password"
          placeholder="Password"
          className={`modal__input ${showError("password") ? "modal__input_error" : ""}`}
          value={values.password}
          onChange={handleChangeValidated}
          onBlur={handleBlur}
          minLength={6}
          required
        />
      </label>

      <label
        htmlFor="register-name"
        className={`modal__label ${showError("name") ? "modal__label_error" : ""}`}
      >
        Name*
        {showError("name") ? ` (${errors.name})` : ""}
        <input
          id="register-name"
          type="text"
          name="name"
          placeholder="Name"
          className={`modal__input ${showError("name") ? "modal__input_error" : ""}`}
          value={values.name}
          onChange={handleChangeValidated}
          onBlur={handleBlur}
          minLength={2}
          required
        />
      </label>

      <label
        htmlFor="register-avatar"
        className={`modal__label ${showError("avatar") ? "modal__label_error" : ""}`}
      >
        Avatar URL*
        {showError("avatar") ? ` (${errors.avatar})` : ""}
        <input
          id="register-avatar"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          className={`modal__input ${showError("avatar") ? "modal__input_error" : ""}`}
          value={values.avatar}
          onChange={handleChangeValidated}
          onBlur={handleBlur}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;



