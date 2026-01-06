import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, handleEditProfileSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    setValues({
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    });
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    handleEditProfileSubmit({
      name: values.name,
      avatar: values.avatar,
    });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit profile"
      buttonText="Save"
      name="edit-profile-form"
      handleSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="edit-profile-name" className="modal__label">
          Name
          <input
            id="edit-profile-name"
            name="name"
            type="text"
            className="modal__input"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            minLength="2"
            maxLength="30"
            required
          />
        </label>

        <label htmlFor="edit-profile-avatar" className="modal__label">
          Avatar URL
          <input
            id="edit-profile-avatar"
            name="avatar"
            type="url"
            className="modal__input"
            value={values.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default EditProfileModal;
