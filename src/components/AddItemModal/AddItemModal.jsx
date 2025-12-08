import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, handleAddItemSubmit }) {
  const { values, handleChange } = useForm({
    name: "",
    weather: "hot",
    image: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit({ ...values, imageUrl: values.link });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleSubmit={handleSubmit}
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
          Image
          <input
            id="add-garment-image"
            name="image"
            type="url"
            value={values.image}
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
