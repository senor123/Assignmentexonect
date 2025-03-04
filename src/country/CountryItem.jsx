import React, { useContext, useState } from 'react'
import { CountriesData } from '../context/CountriesDataContext'
import StateItem from '../state/StateItem'


const CountryItem = ({country}) => {
  const {id,countryName}=country
  const [inputFocus,setFocus]=useState(false)
  const [inputValue,setInput]=useState(countryName)
  const [statesFocus,setStateFocus]=useState(false)
  const [newStateField,setFieldFocus]=useState(false)
  const [newStates,setNewStates]=useState('')

  const {states,updateCountryName,addStates,deleteCountry}=useContext(CountriesData)
  const editCountryName=()=>{
    setFocus(prevFocus=>!prevFocus)
  }
  const handleUpdate=event=>{
    setInput(event.target.value)
  }
  const updateCountry=()=>{
    if(!inputFocus){
      return
    }
    setFocus(prevFocus=>!prevFocus)
    updateCountryName(countryName,inputValue)
  }
  const showStates=()=>{
    setStateFocus(prevFocus=>!prevFocus)
  }
  const createField=()=>{
    setFieldFocus(prevState=>!prevState)
  }
  const handleStates=(event)=>{
    setNewStates(event.target.value)
  }
  const addNewState=()=>{
    if(newStates===''){
      return;
    }
    setFieldFocus(prevState=>!prevState)
    const currentTempStates=newStates.split(',')
    const resStates=currentTempStates.map(state=>({id:Math.random(),country:countryName,name:state}))
    addStates(resStates)
  }
  const handleDelete=()=>{
    deleteCountry(countryName)
  }
  return (
    <>
      <li key={id}>
          {!inputFocus && <button onClick={showStates} className='countryitem'>{countryName}</button>}
          {inputFocus && <input type='text' value={inputValue} onChange={handleUpdate} />}
          <button onClick={editCountryName}>Edit</button>
          <button onClick={updateCountry}>Update</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={createField}>Add New State</button>
      </li>
      {
        newStateField && (
          <div>
            <input type='text' value={newStates} onChange={handleStates} />
            <button onClick={addNewState}>Add</button>
          </div>
        )
      }
      {statesFocus && (
            <ul>
              {states.filter(stateItem=>stateItem!==undefined && stateItem.country===countryName).map(stateItem=><StateItem state={stateItem} />)}
            </ul>
        )
      }
    </>
  )
}

export default CountryItem