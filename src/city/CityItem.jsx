import React, { useContext, useState } from "react";
import { CountriesData } from "../context/CountriesDataContext";

const CityItem = ({ cityValue }) => {
  const [inputFocus,setFocus]=useState(false)
  const [inputValue,setInput]=useState(cityValue.name)
  const {updateCityName,deleteCity}=useContext(CountriesData)
  const {id,name}=cityValue
  const editCityName=()=>{
    setFocus(prevFocus=>!prevFocus)
  }
  const handleUpdate=event=>{
    setInput(event.target.value)
  }
  const updateCity=()=>{
    updateCityName(id,inputValue)
    setFocus(prevFocus=>!prevFocus)
  }
  const handleDelete=()=>{
    deleteCity(cityValue.name)
  }
  return(
    <div>
        {!inputFocus && <p className='countryitem'>{name}</p>}
        {inputFocus && <input type='text' value={inputValue} onChange={handleUpdate} />}
        <button onClick={editCityName}>Edit</button>
        <button onClick={updateCity}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
  );
};

export default CityItem;
