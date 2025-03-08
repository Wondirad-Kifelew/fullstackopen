import { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/countryInfo";
// import countryServices from "./services/countries";
function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  //when we search for a specific country
  useEffect(() => {
    console.log(`getting info of ${country} `);
    if (country) {
      //get country info
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((response) => setCountryInfo(response.data));
    }
  }, [country]);
  console.log("country info: ", countryInfo);
  //when we first render the page and used to filter while searching
  useEffect(() => {
    console.log(`getting info of countries... `);

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(
          response.data.map((c, i) => ({
            name: c["name"]["common"],
            show: false,
            index: i,
          }))
        );
      });
  }, []);
  console.log("countries array: ", countries);
  const handleInput = (event) => {
    setCountryInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("something got submitted");
    setCountry(countryInput);
  };

  //live filter
  const handleShowBtn = (countryName) => {
    setCountry(countryName);
    console.log("show ", countryName, "clicked");
  };
  //
  // if(country){
  //   setCountryInfoShow(!countryInfoShow)
  // }
  //
  const filteredListLong = countryInput
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countryInput.toLowerCase())
      )
    : [];
  const filteredList = filteredListLong.length <= 10 ? filteredListLong : [];
  //
  return (
    <>
      <form onSubmit={handleSubmit}>
        Find countries: <input value={countryInput} onChange={handleInput} />
        <button type="submit">search</button>
      </form>
      <ul>
        {filteredList.map((country) => (
          <div key={country.index}>
            <li> {country.name}</li>
            <button onClick={() => handleShowBtn(country.name)}>show</button>
          </div>
        ))}
      </ul>
      <CountryInfo countryInfo={countryInfo} />
    </>
  );
}

export default App;
