import { useContext, useMemo } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function getWeatherTypeByTempF(tempF) {
  if (typeof tempF !== "number") return "cold";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}

function Main({ clothingItems, handleOpenItemModal, onCardLike, weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  const tempF = weatherData?.temp?.F;
  const tempToShow = weatherData?.temp?.[currentTempUnit] ?? 0;
  const weatherType = getWeatherTypeByTempF(tempF);

  const filteredItems = useMemo(() => {
    const typeLower = weatherType.toLowerCase();
    return (Array.isArray(clothingItems) ? clothingItems : []).filter((item) => {
      const itemType = String(item?.weather || "").toLowerCase();
      return itemType === typeLower;
    });
  }, [clothingItems, weatherType]);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {tempToShow}&deg;{currentTempUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;



