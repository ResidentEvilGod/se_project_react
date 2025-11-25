import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const getWeatherType = (tempF) => {
  if (tempF >= 86) {
    return "hot";
  } else if (tempF >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const tempF = weatherData.temp.F;
  const weatherType = getWeatherType(tempF);
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temp[currentTempUnit]} {currentTempUnit} / You may
        want to wear:
      </p>
      <ul className="main__card-list">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
