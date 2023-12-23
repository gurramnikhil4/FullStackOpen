import axios from "axios";
const baseURL='https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll =()=>{
   return axios.get(baseURL+'all')
}

const getCountry =(countryName)=>{
    return axios.get(`${baseURL}/name/${countryName.toLowerCase()}`)
}

const getWeather =(lat,long)=>{
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=`+lat+`&lon=`+long+`&appid=`+api_key+`&units=metric`)
}

export default{getAll, getCountry,getWeather}

