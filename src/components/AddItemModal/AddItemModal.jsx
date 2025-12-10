import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, handleAddItemSubmit, onClose }) {
  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

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

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

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
            Hot
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
            Warm
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
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
