import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function Header({ handleOpenAddGarmentModal, weatherData }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__side">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <time className="header__dateTime" dateTime={now}>
          {dateStr}
        </time>
        <p className="header__place">, {weatherData.city}</p>
      </div>
      <div className="header__side">
        <ToggleSwitch />
        <button
          onClick={handleOpenAddGarmentModal}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne's Avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
