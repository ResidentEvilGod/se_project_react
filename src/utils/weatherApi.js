import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}"
  ).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject("Error from weather API: ${res.status}");
  });
}
