import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, handleRegisterSubmit }) {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegisterSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      buttonText="Sign up"
      name="register-form"
      handleSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="register-name" className="modal__label">
          Name
          <input
            id="register-name"
            name="name"
            type="text"
            className="modal__input"
            value={values.name}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            placeholder="Name"
            required
          />
        </label>

        <label htmlFor="register-avatar" className="modal__label">
          Avatar URL
          <input
            id="register-avatar"
            name="avatar"
            type="url"
            className="modal__input"
            value={values.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            required
          />
        </label>

        <label htmlFor="register-email" className="modal__label">
          Email
          <input
            id="register-email"
            name="email"
            type="email"
            className="modal__input"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>

        <label htmlFor="register-password" className="modal__label">
          Password
          <input
            id="register-password"
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

export default RegisterModal;
