import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherConditionImages } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  const timeOfDay = weatherData.isDay ? "day" : "night";
  const condition = weatherData.weatherCondition; // e.g. "clouds", "clear", "rain"

  const conditionData =
    weatherConditionImages[timeOfDay][condition] ||
    weatherConditionImages[timeOfDay].default;

  const weatherImageSrc = conditionData.image;
  const weatherImageAlt = conditionData.name;

  return (
    <section className="weather-card">
      <img
        src={weatherImageSrc}
        alt={weatherImageAlt}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
