import { useEffect, useState } from 'react'
const api_key = "27e114a7a67497580f43b7f06e6d43e3"
import View from './components/View.jsx'
import Search from './components/Search.jsx'
import ListView from './components/ListView.jsx'
import countryService from './services/countries.jsx'


const Display=({value})=>{
  if(!value)return(null)
  else if(value==10)return(<div>Too many matches, specify another filter</div>)
  else if(value instanceof Array){
       return(
          <ul>
            {value.map(name=><ListView key={name} value={name} View={View} getCountry={countryService.getCountry} getWeather={countryService.getWeather}/>)}
          </ul>
        )}
  else return(
  <View value={value} getCountry={countryService.getCountry} getWeather={countryService.getWeather}/>
  )
}

function App() {
  const [newSearch, setSearch]=useState('')
  const [countries, setCountries]=useState()
  const [toDisplay,setDisplay]=useState([])

  useEffect(()=>{
    countryService.getAll().then((response)=>{
      setCountries( response.data.map(
        (country)=>country.name.common
      ))
    })
  },[])

  const handleSearch=(event)=>{
    const toSearch=event.target.value
    setSearch(toSearch)
    if(!toSearch){
      setDisplay('')
      return
    }
    const searchResult=countries.filter(country=>country.toLowerCase().includes(toSearch.toLowerCase()))

    if(searchResult.length>10){
      setDisplay(10)
    }
    else if(searchResult.length==1){
      setDisplay(searchResult[0]) 
    }

    else
    {
      setDisplay(searchResult)
    }

  }

  return (
    <div>
      <Search value={newSearch} onChange={handleSearch}/>
      <Display value={toDisplay}/>
    </div>
  )
}

export default App
