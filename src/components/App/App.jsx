import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const tempF = weatherData.temp.F;
  const weatherType = getWeatherType(tempF);
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 0, C: 0 },
    weatherCondition: "clear",
    isDay: true,
  });
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

  function handleAddItemSubmit(inputValues) {
    addItem(inputValues)
      .then((data) => {
        setClothingItems((clothingItems) => [data, ...clothingItems]);
        setActiveModal("");
      })
      .catch(console.error);
  }
  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((clothingItem) => clothingItem._id !== item._id)
        );
        setActiveModal("");
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
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
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
        </Routes>
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          handleCloseItemModal={handleCloseItemModal}
        />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          handleCloseItemModal={handleCloseItemModal}
          handleDeleteItem={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
