import axios from "axios";
const baseURL='https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = "27e114a7a67497580f43b7f06e6d43e3"

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

