import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country, api_key }) => {
  const [weatherData, setWeatherData] = useState({});
  const capital = country.capital ? country.capital[0] : null;
  const languages = country.languages
    ? Object.values(country.languages)
    : ["No languages found"];
  const weatherURL = country.capital
    ? `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`
    : "No data";

  useEffect(() => {
    weatherURL !== "No data"
      ? axios
          .get(weatherURL)
          .then((response) => {
            const newWeatherData = {
              temperature: response.data.main.temp,
              wind: response.data.wind.speed,
              icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            };
            setWeatherData(newWeatherData);
          })
          .catch(() => setWeatherData({}))
      : null;
  }, [weatherURL]);

  const flagStyle = {
    maxHeight: 200,
  };
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        Capital:{" "}
        {country.capital
          ? country.capital.length !== 1
            ? country.capital.map((capital) => (
                <div key={capital}>-{capital}</div>
              ))
            : country.capital[0]
          : "Not found"}
      </div>

      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}> {language}</li>
        ))}
      </ul>
      <img style={flagStyle} src={country.flags.svg} alt="image" />
      {capital ? (
        <div>
          <h1>Weather in {capital}</h1>
          {Object.keys(weatherData).length !== 0 ? (
            <>
              <p>temperature {weatherData.temperature} Celcius</p>
              <img src={weatherData.icon} alt="weather icon" />
              <p>wind {weatherData.wind} m/s</p>
            </>
          ) : (
            <h3>No weather data found</h3>
          )}
        </div>
      ) : (
        <p>No capital city found</p>
      )}
    </>
  );
};

export default CountryDetails;
