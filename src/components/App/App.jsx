import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }
  function handleOpenAddGarmentModal(card) {
    setActiveModal("add-garment-modal");
  }

  function handleCloseItemModal(card) {
    setActiveModal("");
  }

  function handleCloseAddGarmentModal(card) {
    setActiveModal("");
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="app">
      <Header
        weatherData={weatherData}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleCloseAddGarmentModal={handleCloseAddGarmentModal}
      />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleCloseItemModal={handleCloseItemModal}
      />
      <Footer />
      <ItemModal card={selectedCard} isOpen={activeModal === "item-modal"} />
      <ModalWithForm
        isOpen={activeModal === "add-garment-modal"}
        title={"New garment"}
        buttonText={"Add garment"}
        name={"add-garment-form"}
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="add-garment-name-input" className="modal__label">
            Name
            <input
              id="add-garment-name-input"
              type="text"
              className="modal__input"
            />
            <label htmlFor="add-garment-image" className="modal__label">
              Image
              <input type="url" className="modal__input" />
            </label>
          </label>
        </fieldset>
        <fieldset className="modal__fieldset">
          <legend>Select the weather type:</legend>

          <div>
            <input
              className="modal__radio-btnt"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
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
            />
            <label className="modal__label" htmlFor="cold">
              Weather: Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
