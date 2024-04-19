import { useEffect, useState } from "react";
import countriesServices from "./services/countries";
import Country from "./Country";
import CountryDetails from "./CountryDetails";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const api_key = import.meta.env.VITE_weatherKey;

  let mainPage;

  useEffect(() => {
    countriesServices.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );

  if (countries.length === 0) {
    mainPage = <div>fetching countries ... </div>;
  } else {
    if (countriesToShow.length > 10) {
      // mainPage = <div>Too many matches, try another filter</div>;
      mainPage = countriesToShow.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          api_key={api_key}
        />
      ));
    } else if (countriesToShow.length > 1) {
      mainPage = countriesToShow.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          api_key={api_key}
        />
      ));
    } else if (countriesToShow.length === 1) {
      mainPage = (
        <CountryDetails
          api_key={api_key}
          country={countries.find(
            (country) => country.name.common === countriesToShow[0].name.common
          )}
        />
      );
    } else if (countriesToShow.length === 0) {
      mainPage = <div>No countries found, try another filter</div>;
    }
  }

  return (
    <div>
      find countries:{" "}
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      {mainPage}
    </div>
  );
};

export default App;
