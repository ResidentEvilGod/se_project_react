import { useContext } from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function normalizeCondition(condition) {
  if (!condition) return "clear";
  const c = condition.toLowerCase();

  if (c.includes("cloud")) return "clouds";
  if (c.includes("rain")) return "rain";
  if (c.includes("thunder")) return "thunderstorm";
  if (c.includes("snow")) return "snow";
  if (c.includes("drizzle")) return "rain";
  if (c.includes("mist") || c.includes("fog")) return "clouds";

  return "clear";
}

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  const timeOfDayIsDay = weatherData.isDay;
  const condition = normalizeCondition(weatherData.weatherCondition);

  let weatherOption = weatherOptions.find(
    (option) => option.day === timeOfDayIsDay && option.type === condition
  );

  if (!weatherOption) {
    weatherOption = weatherOptions.find(
      (option) => option.day === timeOfDayIsDay && option.type === "clear"
    );
  }

  const temperature = weatherData.temp[currentTempUnit];

  return (
    <section
      className="weather-card"
      style={{ backgroundImage: `url(${weatherOption.url})` }}
    >
      <p className="weather-card__temp">
        {temperature}&deg;{currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
