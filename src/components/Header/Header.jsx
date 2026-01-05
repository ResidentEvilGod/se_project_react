import logo from "../../assets/logo.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleOpenAddGarmentModal,
  weatherData,
  isLoggedIn,
  handleOpenLoginModal,
  handleOpenRegisterModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const avatarFallbackLetter = (userName.trim()[0] || "?").toUpperCase();

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <time className="header__dateTime" dateTime={now}>
          {dateStr}
        </time>
        <p className="header__place">, {weatherData.city}</p>
      </div>

      <div className="header__side">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleOpenAddGarmentModal}
              className="header__add-clothes-btn"
              type="button"
            >
              + Add clothes
            </button>

            <Link className="header__link" to="/profile">
              <p className="header__username">{userName}</p>

              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={`${userName}'s avatar`}
                  className="header__avatar"
                />
              ) : (
                <div
                  className="header__avatar-placeholder"
                  aria-label={`${userName}'s avatar placeholder`}
                >
                  {avatarFallbackLetter}
                </div>
              )}
            </Link>
          </>
        ) : (
          <div className="header__auth">
            <button
              type="button"
              className="header__auth-btn"
              onClick={handleOpenRegisterModal}
            >
              Sign up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={handleOpenLoginModal}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

