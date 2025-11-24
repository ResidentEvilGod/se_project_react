import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}"
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject("Error from weather API: ${res.status}");
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parsedData = {};

  parsedData.city = data.name;
  parsedData.temp = Math.round(data.main.temp);
  return parsedData;
}
