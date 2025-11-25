const coordinates = { lat: "32.486195", lon: "-92.173107" };
const apiKey = "230a179187730aa31b3c1a708e24fd13";

export const weatherConditionImages = {
  day: {
    clear: {
      name: "clear",
      image: new URL("../assets/day/clear.svg", import.meta.url).href,
    },
    clouds: {
      name: "cloudy",
      image: new URL("../assets/day/cloudy.svg", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/day/fog.svg", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/day/rain.svg", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/day/snow.svg", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/day/storm.svg", import.meta.url).href,
    },
  },
  night: {
    clear: {
      name: "clear",
      image: new URL("../assets/night/clear.svg", import.meta.url).href,
    },
    clouds: {
      name: "cloudy",
      image: new URL("../assets/night/cloudy.svg", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/night/fog.svg", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/night/rain.svg", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/night/snow.svg", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/night/storm.svg", import.meta.url).href,
    },
  },
};
export { coordinates, apiKey };
