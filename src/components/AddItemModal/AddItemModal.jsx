import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, handleAddItemSubmit, onClose }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  // Disable button until required fields are filled
  const isSubmitDisabled = !values.name || !values.imageUrl;

  // Reset form every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "hot" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleSubmit={handleSubmit}
      onClose={onClose}
      isSubmitDisabled={isSubmitDisabled}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-garment-name-input" className="modal__label">
          Name
          <input
            id="add-garment-name-input"
            name="name"
            type="text"
            className="modal__input"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </label>

        <label htmlFor="add-garment-image" className="modal__label">
          Image
          <input
            id="add-garment-image"
            name="imageUrl"
            type="url"
            className="modal__input"
            value={values.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
        </label>
      </fieldset>

      <fieldset className="modal__fieldset modal__fieldset_type_radio">
        <legend className="modal__legend">Select the weather type:</legend>

        <div className="modal__radio-row">
          <input
            className="modal__radio-btn"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>

        <div className="modal__radio-row">
          <input
            className="modal__radio-btn"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>

        <div className="modal__radio-row">
          <input
            className="modal__radio-btn"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;


