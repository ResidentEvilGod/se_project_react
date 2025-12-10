import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, handleAddItemSubmit, onClose }) {
  const { values, handleChange } = useForm({
    name: "",
    weather: "hot",
    imageUrl: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit(values); // { name, weather, imageUrl }
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleSubmit={handleSubmit}
      onClose={onClose}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-garment-name-input" className="modal__label">
          Name
          <input
            id="add-garment-name-input"
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            className="modal__input"
            required
          />
        </label>
        <label htmlFor="add-garment-image" className="modal__label">
          Image URL
          <input
            id="add-garment-image"
            name="imageUrl"
            type="url"
            value={values.imageUrl}
            onChange={handleChange}
            className="modal__input"
            required
          />
        </label>
      </fieldset>
      <fieldset className="modal__fieldset">
        <legend>Select the weather type:</legend>
        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="hot">
            Weather: Hot
          </label>
        </div>
        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="warm">
            Weather: Warm
          </label>
        </div>
        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="cold">
            Weather: Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
