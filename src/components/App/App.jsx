import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }
  function handleOpenAddGarmentModal(card) {
    setActiveModal("add-garment-modal");
  }
  function handleAddGarmentSubmit(e) {
    e.preventDefault();
    const name = e.target["add-garment-name-input"].value;
    const link = e.target["add-garment-image"].value;
    const weather = e.target.weather.value;

    const newItem = {
      _id: Date.now(),
      name,
      link,
      weather,
    };

    setClothingItems((items) => [newItem, ...items]);
    setActiveModal("");
  }
  function handleCloseItemModal(card) {
    setActiveModal("");
  }

  function handleCloseAddGarmentModal(card) {
    setActiveModal("");
  }

  function handleTempUnitChange() {
    if (currentTempUnit == "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          handleCloseAddGarmentModal={handleCloseAddGarmentModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleCloseItemModal={handleCloseItemModal}
              />
            }
          ></Route>
          <Route path="/profile" element={<div></div>}></Route>
        </Routes>
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          handleCloseItemModal={handleCloseItemModal}
        />
        <ModalWithForm
          isOpen={activeModal === "add-garment-modal"}
          title="New garment"
          buttonText="Add garment"
          name="add-garment-form"
          handleSubmit={handleAddGarmentSubmit}
          onClose={handleCloseAddGarmentModal}
        >
          <fieldset className="modal__fieldset">
            <label htmlFor="add-garment-name-input" className="modal__label">
              Name
              <input
                id="add-garment-name-input"
                name="add-garment-name-input"
                type="text"
                className="modal__input"
                required
              />
            </label>

            <label htmlFor="add-garment-image" className="modal__label">
              Image
              <input
                id="add-garment-image"
                name="add-garment-image"
                type="url"
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
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
