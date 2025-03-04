import React, { useContext, useState } from 'react'
import { CountriesData } from '../context/CountriesDataContext'
import CityItem from '../city/CityItem'
const StateItem = ({state}) => {
  const {id,name}=state
  const [inputFocus,setFocus]=useState(false)
  const [inputValue,setInputValue]=useState(name)
  const [cityValue,setCity]=useState('')
  const [newcityStatus,setNewCity]=useState(false)
  const [showCities,setCitiesDisplay]=useState(false)

  const {updateStateName,addCity,cities,deleteState}=useContext(CountriesData)
  const editStateName=()=>{
    console.log("Hi")
    setFocus(prevState=>!prevState)
  }
  const handleUpdate=event=>{
    setInputValue(event.target.value)
  }
  const updateState=()=>{
    setFocus(prevState=>!prevState)
    updateStateName(name,inputValue)
  }
  const handleCity=event=>{
    setCity(event.target.value)
  }
  const showCityInput=()=>{
    setNewCity(prevCity=>!prevCity)
  }
  const addNewCity=()=>{
    console.log("Hi")
    if(cityValue===''){
      return;
    }
    const cities=cityValue.split(',')
    const tempCities=cities.map(city=>({id:Math.random(),name:city,state:name}))
    addCity(tempCities)
    showCityInput()
  }

  const setCityDisplay=()=>{
    setCitiesDisplay(prevState=>!prevState)
  }

  const handleDeleteState=()=>{
    deleteState(name)
  }
  return (
    <>
      <li key={id} className='stateitem'>
        <div>
          {!inputFocus && <button className='countryitem' onClick={setCityDisplay}>{name}</button>}
          {inputFocus && <input type='text' value={inputValue} onChange={handleUpdate} />}
          <button onClick={editStateName}>Edit</button>
          <button onClick={updateState}>Update</button>
          <button onClick={handleDeleteState}>Delete</button>
          <button onClick={showCityInput}>Add New City</button>
        </div>
          {newcityStatus && (
            <div>
              <input type='text' value={cityValue} onChange={handleCity} className='newcityinputblock' />
              <button onClick={addNewCity}>Add</button>
            </div>
          )}
      </li>
      <div>
        {
          showCities && cities.filter(city=>city.state===name).map(city=><CityItem cityValue={city} />)
        }
      </div>
    </>
  )
}

export default StateItem