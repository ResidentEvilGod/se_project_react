import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import cloudy from "../../assets/cloudy.svg";
import { weatherConditionImages } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  weatherConditionImages["day"]["clear"].image;
  return (
    <section className="weather-card">
      {currentTempUnit}
      <img
        src={
          weatherConditionImages["night"][weatherData.weatherCondition]?.image
        }
        alt="Cloudy weather"
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
