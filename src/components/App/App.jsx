import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(""); // "", "item-modal", "add-garment-modal"
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 0, C: 0 },
    weatherCondition: "clear",
    isDay: true,
  });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("item-modal");
  }

  function handleCloseItemModal() {
    setSelectedCard({});
    setActiveModal("");
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleCloseAddGarmentModal() {
    setActiveModal("");
  }
  function handleTempUnitChange() {
    if (currentTempUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }
  function handleAddItemSubmit(inputValues) {
    addItem(inputValues)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
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
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          />
        </Routes>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment-modal"}
          handleAddItemSubmit={handleAddItemSubmit}
          onClose={handleCloseAddGarmentModal}
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
