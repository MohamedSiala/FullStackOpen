import { useState } from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ country, api_key }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShow = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      {" "}
      <div>
        {country.name.common}{" "}
        <button onClick={toggleShow}>{showDetails ? "hide" : "show"}</button>
      </div>
      {showDetails ? (
        <CountryDetails country={country} api_key={api_key} />
      ) : (
        ""
      )}
    </>
  );
};

export default Country;
