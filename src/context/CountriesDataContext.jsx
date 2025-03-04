import { createContext } from "react";

export const CountriesData=createContext({
    countries:[],
    states:[],
    cities:[],
    addCountry:()=>{},
    addStates:()=>{},
    addCity:()=>{},
    updateCountryName:()=>{},
    updateStateName:()=>{},
    updateCityName:()=>{},
    deleteCountry:()=>{},
    deleteState:()=>{},
    deleteCity:()=>{}
})

export default function CountriesDataContext({children,value}){
    return(
        <CountriesData.Provider value={value}>
            {children}
        </CountriesData.Provider>
    )
}