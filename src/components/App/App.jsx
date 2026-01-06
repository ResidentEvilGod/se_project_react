import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import { getWeatherData } from "../../utils/weatherApi";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 0, C: 0 },
    weatherCondition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState("");

  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");

  // Weather
  useEffect(() => {
    getWeatherData().then(setWeatherData).catch(console.error);
  }, []);

  // Items
  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  // Restore session
  useEffect(() => {
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setToken("");
        setCurrentUser({});
        setIsLoggedIn(false);
      });
  }, [token]);

  function handleTempUnitChange() {
    setCurrentTempUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  // Modals
  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("item-modal");
  }

  function handleOpenAddGarmentModal() {
    if (!isLoggedIn) {
      setActiveModal("login-modal");
      return;
    }
    setActiveModal("add-garment-modal");
  }

  function handleOpenEditProfileModal() {
    if (!isLoggedIn) {
      setActiveModal("login-modal");
      return;
    }
    setActiveModal("edit-profile-modal");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
  }

  function handleOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard({});
  }

  // API handlers
  function handleAddItemSubmit(values) {
    addItem(values, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(card) {
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== card._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  // ✅ Likes/Dislikes handler (App owns clothingItems state)
  function handleCardLike(item) {
    const jwt = localStorage.getItem("jwt") || token;

    if (!jwt) {
      setActiveModal("login-modal");
      return;
    }

    const currentUserId = currentUser?._id;
    const itemId = item?._id;
    const likes = Array.isArray(item?.likes) ? item.likes : [];

    const isLiked = likes.some((like) => {
      const likeId = typeof like === "string" ? like : like?._id;
      return Boolean(currentUserId) && likeId === currentUserId;
    });

    const request = !isLiked
      ? addCardLike(itemId, jwt)
      : removeCardLike(itemId, jwt);

    request
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((i) => (i._id === itemId ? updatedItem : i))
        );

        // Keeps ItemModal in sync if it is open on this same item
        setSelectedCard((prev) => (prev?._id === itemId ? updatedItem : prev));
      })
      .catch(console.error);
  }

  function handleEditProfileSubmit({ name, avatar }) {
    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch(console.error);
  }

  // Auth
  function handleRegisterSubmit({ name, avatar, email, password }) {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then(({ token: jwt }) => {
        localStorage.setItem("jwt", jwt);
        setToken(jwt);
        setIsLoggedIn(true);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
  }

  function handleLoginSubmit({ email, password }) {
    signin({ email, password })
      .then(({ token: jwt }) => {
        localStorage.setItem("jwt", jwt);
        setToken(jwt);
        setIsLoggedIn(true);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleTempUnitChange }}
      >
        <div className="page">
          <Header
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenRegisterModal={handleOpenRegisterModal}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  onCardLike={handleCardLike}
                  weatherData={weatherData}
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
                    handleOpenEditProfileModal={handleOpenEditProfileModal}
                    onCardLike={handleCardLike}
                    handleSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            handleCloseItemModal={handleCloseModal}
            handleDeleteItem={handleDeleteItem}
            isLoggedIn={isLoggedIn}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment-modal"}
            handleAddItemSubmit={handleAddItemSubmit}
            onClose={handleCloseModal}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile-modal"}
            onClose={handleCloseModal}
            handleEditProfileSubmit={handleEditProfileSubmit}
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
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
