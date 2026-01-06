import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ clothingItems, handleOpenItemModal, onCardLike, weatherData }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">Today is {weatherData?.temp?.F}° F / You may want to wear:</p>

        <ul className="cards__list">
          {clothingItems.map((item) => (
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


