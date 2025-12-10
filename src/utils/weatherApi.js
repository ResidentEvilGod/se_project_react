import { apiKey, coordinates } from "./constants";

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  return fetch(url).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

function parseWeatherData(data) {
  const icon = data.weather[0].icon;
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((tempF - 32) * 5) / 9);

  return {
    city: data.name,
    temp: {
      F: tempF,
      C: tempC,
    },
    weatherCondition: data.weather[0].main.toLowerCase(),
    isDay: icon.includes("d"),
  };
}

export function getWeatherData() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      fetchWeatherByCoords(coordinates.lat, coordinates.lon)
        .then((data) => resolve(parseWeatherData(data)))
        .catch(reject);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude)
          .then((data) => resolve(parseWeatherData(data)))
          .catch(reject);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        fetchWeatherByCoords(coordinates.lat, coordinates.lon)
          .then((data) => resolve(parseWeatherData(data)))
          .catch(reject);
      }
    );
  });
}
