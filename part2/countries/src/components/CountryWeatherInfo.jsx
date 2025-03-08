import { useEffect, useState } from "react";
import axios from "axios";
function CountryWeatherInfo({ capitalCity, country }) {
  console.log("capital city:", capitalCity);
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weatherInfo, setWeatherInfo] = useState(null);
  useEffect(() => {
    //get weather data
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${api_key}&units=metric`
      )
      .then((response) => setWeatherInfo(response.data));
  }, [country]);

  if (weatherInfo) {
    console.log("icon weather", weatherInfo.weather.icon);
    return (
      <div>
        <h2>Weather in {capitalCity}</h2>
        <p>Temperature {weatherInfo.main.temp}° Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt="weather-image"
        />
        <p>{weatherInfo.weather[0].description}</p>
        <p>Wind {weatherInfo.wind.speed} m/s</p>
      </div>
    );
  }
}

export default CountryWeatherInfo;
