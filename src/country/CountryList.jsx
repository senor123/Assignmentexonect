import React, { useState } from 'react'
import { useContext } from 'react';
import { CountriesData } from '../context/CountriesDataContext';
import CountryItem from './CountryItem';
function CountryList() {
  const [countryName,setCountryName]=useState('');
  const [stateName,setInitialStates]=useState([])
  const {countries,addCountry,addStates}=useContext(CountriesData)
  const handleCountryName=(event)=>{
    setCountryName(event.target.value);
  }

  const handleStates=event=>{
    setInitialStates(prevState=>event.target.value.split(','));
  }
  const handleAddCountry=event=>{
    event.preventDefault()
    if(countryName!==''){
      addCountry(countryName)
      if(stateName.length>0){
        const tempStates=[...stateName]
        const resStates=tempStates.map(state=>({id:Math.random(),country:countryName,name:state}))
        addStates(resStates)
      }
    }
  }
  return (
    <div>
      <form className='formcountry' onSubmit={handleAddCountry}>
          <label htmlFor='country'>Please enter Country Name</label>
          <input type='text' id='country' value={countryName} onChange={handleCountryName} />
          <label htmlFor='states'>States Please separate them with ,</label>
          <input type='text' id='states' value={stateName} onChange={handleStates} />
          <button>Add</button>
      </form>
      <ul>
        {
          countries.map(country=><CountryItem country={country} />)
        }
      </ul>
    </div>
  )
}

export default CountryList