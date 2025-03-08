import CountryWeatherInfo from "./CountryWeatherInfo";
function CountryInfo({ countryInfo }) {
  console.log("Country info obj: ", countryInfo);
  if (countryInfo) {
    return (
      <>
        <h1>{countryInfo.name.common}</h1>

        <p>Capital: {countryInfo.capital}</p>
        <p>Area: {countryInfo.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(countryInfo.languages).map(([key, value]) => {
            return <li key={key}>{value}</li>;
          })}
        </ul>
        <img src={countryInfo.flags.png} alt="flag image" />
        <CountryWeatherInfo
          capitalCity={countryInfo.capital}
          country={countryInfo.name}
        />
      </>
    );
  }
}

export default CountryInfo;
