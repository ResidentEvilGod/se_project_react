import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import cloudy from "../../assets/cloudy.svg";
import { weatherConditionImages } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherImageSrc = weatherData.isDay ? cloudyDay : cloudyNight;
  const weatherImageAlt = weatherData.isDay
    ? "Cloudy daytime"
    : "Cloudy nighttime";
  return (
    <section className="weather-card">
      {currentTempUnit}
      <img
        src={weatherImageSrc}
        alt={weatherImageAlt}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {weatherData.temp[contextValue.currentTempUnit]}&deg;{" "}
        {contextValue.currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
