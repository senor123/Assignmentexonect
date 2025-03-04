import { useState } from "react";
import "./App.css";
import CountriesDataContext from "./context/CountriesDataContext";
import CountryList from "./country/CountryList";
function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  console.log(states)
  console.log(cities)
  const addCountry = (name) => {
    const isCountryPresent=countries.find(country=>country.countryName===name)
    if(isCountryPresent){
      return;
    }
    setCountries((prevCountries) => [
      ...prevCountries,
      { id: Math.random(), countryName: name },
    ]);
  };

  const addStates = (statesList) => {
    const intermediateStates=[...states,...statesList]
    const resStateNames=[]

    const resStates=intermediateStates.filter(stateData=>{
      if(!resStateNames.includes(stateData.name)){
        resStateNames.push(stateData.name)
        return {...stateData}
      }
    })
    setStates(resStates);
  };


  const addCity = (citiesList) => {
    setCities((prevCities) => [...prevCities, ...citiesList]);
  };
  const updateCountryName = (prevName, name) => {
    const confirmationBox = window.confirm(
      "Are you sure you want to update the country name?"
    );
    if (!confirmationBox) {
      return;
    }
    const tempCountries = [...countries];
    const resCountries = tempCountries.map((countryItem) => {
      if (countryItem.countryName === prevName) {
        return { id: countryItem.id, countryName: name };
      }
      return countryItem;
    });
    setCountries(resCountries);
    updateStateCountry(prevName,name)
  };

  const updateStateName = (prevName, name) => {
    const confirmationBox = window.confirm(
      "Are you sure you want to update the state name?"
    );
    if (!confirmationBox) {
      return;
    }
    const tempStates = [...states];
    console.log(tempStates);
    const resStates = tempStates.map((countryItem) => {
      if (countryItem.name === prevName) {
        return { ...countryItem, name };
      }
      return countryItem;
    });
    setStates(resStates);
    updateStateCity(prevName,name)
  };

  const updateCityName = (prevId, name) => {
    const confirmationBox = window.confirm(
      "Are you sure you want to update the city name?"
    );
    if (!confirmationBox) {
      return;
    }
    const tempStates = [...cities];
    console.log(tempStates);
    const resStates = tempStates.map((cityItem) => {
      if (cityItem.id === prevId) {
        return { ...cityItem, name };
      }
      return cityItem;
    });
    setCities(resStates);
  };

  const updateStateCountry=(prevCountry,newCountryName)=>{
    const tempStates=[...states];
    const resStates=tempStates.map(state=>{
      if(state.country===prevCountry){
        return {...state,country:newCountryName}
      }
      return state;
    })
    setStates(resStates)
  }
  const updateStateCity=(prevState,newStateName)=>{
    const tempCities=[...cities];
    const resStates=tempCities.map(city=>{
      if(city.state===prevState){
        return {...city,state:newStateName}
      }
      return city;
    })
    setCities(resStates)
  }
  const deleteCountry=(countryName)=>{
    const confirmation=window.confirm("Do you wish to delete the country")
    if(!confirmation){
      return
    }
    const tempCountry=[...countries]
    const resCountries=tempCountry.filter(country=>country.countryName!==countryName)
    setCountries(resCountries)
    deleteStateByCountry(countryName)
  }
  const deleteStateByCountry=(countryName)=>{
    const tempStates=[...states]
    const statesList=tempStates.map(state=>state.country===countryName && state)
    const resStates=tempStates.filter(state=>state.country!==countryName)
    setStates(resStates)
    deleteCityByState(statesList)
  }
  const deleteCityByState=(states)=>{
    const tempCities=[...cities]
    const resCities=tempCities.filter(city=>!states.includes(city.state))
    setCities(resCities)
  }
  const deleteState=(stateName)=>{
    const confirmation=window.confirm("Do you wish to delete the state")
    if(!confirmation){
      return
    }
    const tempStates=[...states]
    const resStates=tempStates.filter(stateData=>stateData.name!==stateName)
    setStates([...resStates])
    deleteCityByState([stateName])
  }
  const deleteCity=(cityName)=>{
    const confirmation=window.confirm("Do you wish to delete the city")
    if(!confirmation){
      return
    }
    const tempCities=[...cities]
    const resCities=tempCities.filter(stateData=>stateData.name!==cityName)
    setCities([...resCities])
  }
  return (
    <CountriesDataContext
      value={{
        countries,
        states,
        cities,
        addCountry,
        addStates,
        updateCountryName,
        updateStateName,
        updateCityName,
        addCity,
        deleteCountry,
        deleteState,
        deleteCity
      }}
    >
      <CountryList countries={countries} />
    </CountriesDataContext>
  );
}

export default App;
