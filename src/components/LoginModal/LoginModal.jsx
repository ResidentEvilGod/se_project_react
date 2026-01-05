import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, handleLoginSubmit }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log in"
      buttonText="Log in"
      name="login-form"
      handleSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="login-email" className="modal__label">
          Email
          <input
            id="login-email"
            name="email"
            type="email"
            className="modal__input"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>

        <label htmlFor="login-password" className="modal__label">
          Password
          <input
            id="login-password"
            name="password"
            type="password"
            className="modal__input"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;

