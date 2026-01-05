import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });

  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("item-modal");
  }

  function handleCloseItemModal() {
    setSelectedCard({});
    setActiveModal("");
  }

  function handleOpenAddGarmentModal() {
    if (!isLoggedIn) {
      setActiveModal("login-modal");
      return;
    }
    setActiveModal("add-garment-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
  }

  function handleOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleTempUnitChange() {
    setCurrentTempUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  function handleAddItemSubmit(inputValues) {
    addItem(inputValues, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        setActiveModal("");
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    if (!isLoggedIn) {
      setActiveModal("login-modal");
      return;
    }

    deleteItem(item._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((clothingItem) => clothingItem._id !== item._id)
        );
        setActiveModal("");
      })
      .catch(console.error);
  }

  function handleRegisterSubmit({ name, avatar, email, password }) {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then((res) => {
        if (!res?.token) {
          return Promise.reject(
            "Registration succeeded, but sign-in did not return a token."
          );
        }

        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        setActiveModal("");

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.error);
  }

  function handleLoginSubmit({ email, password }) {
    signin({ email, password })
      .then((res) => {
        if (!res?.token) {
          return Promise.reject(
            "Authorization failed: token was not returned by the server."
          );
        }

        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        setActiveModal("");

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.error);
  }

function handleSignOut() {
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  setToken("");
  setCurrentUser({ name: "", avatar: "" });
  setActiveModal("");
}


  useEffect(() => {
    getWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setToken(jwt);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setToken("");
        setCurrentUser({ name: "", avatar: "" });
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleTempUnitChange }}
      >
        <div className="page">
          <Header
            weatherData={weatherData}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            isLoggedIn={isLoggedIn}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenRegisterModal={handleOpenRegisterModal}
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
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Profile
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
        handleSignOut={handleSignOut}   // ✅ added
      />
    </ProtectedRoute>
  }
/>


            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                    handleOpenItemModal={handleOpenItemModal}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment-modal"}
            handleAddItemSubmit={handleAddItemSubmit}
            onClose={handleCloseModal}
          />

          <RegisterModal
            isOpen={activeModal === "register-modal"}
            onClose={handleCloseModal}
            handleRegisterSubmit={handleRegisterSubmit}
          />

          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={handleCloseModal}
            handleLoginSubmit={handleLoginSubmit}
          />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            handleCloseItemModal={handleCloseItemModal}
            handleDeleteItem={handleDeleteItem}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;


