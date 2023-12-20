import { useEffect, useState } from 'react'
import axios from 'axios'
const api_key = "27e114a7a67497580f43b7f06e6d43e3"

const baseURL='https://studies.cs.helsinki.fi/restcountries/api/name/'
const Search=(props)=>{
  return(
    <div>
        <label htmlFor='search'>find countries</label>
        <input value={props.value} type='text' id='search' onChange={props.onChange}/>
    </div>
  )
}

const View=({value})=>{
  const [Data,setData]=useState()
  const [Wheather, setWheather]=useState()

  useEffect(()=>{
    axios.get(`${baseURL}/${value.toLowerCase()}`).then((response)=>{
        setData(response.data)
        return response.data
        }).then((data)=>{
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=`+data.capitalInfo.latlng[0]+`&lon=`+data.capitalInfo.latlng[1]+`&appid=`+api_key+`&units=metric`)
          }).then((wdata)=>{setWheather(wdata.data)}          )

},[])

if(Data&&Wheather){
  return(
    <>
    <h1>{Data.name.common}</h1>
    <div>capital {Data.capital}</div>
    <div>area {Data.area}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(Data.languages).map(lang=><li key={lang}>{lang}</li>)}
    </ul>
    <img src={`${Data.flags.png}`} alt={Data.flags.alt} />
    <h2>Wheather in {Data.capital}</h2>
    <div>temperature {Wheather.main.temp} Celcius</div>
    <img src={`https://openweathermap.org/img/wn/`+Wheather.weather[0].icon+`@2x.png`} alt={Data.flags.alt} />
    <div>wind  {Wheather.wind.speed} m/s</div>

  </>
  )
}
}

const ListView=(props)=>{
  const [showing,setShow]=useState(0)
  const [details,setDetails]=useState(null)
  
  const handleClick=()=>{
    if(!showing){
    axios.get(`${baseURL}/${props.value.toLowerCase()}`).then((response)=>{
      setDetails(response.data)
      setShow(1)
    })}
    else setShow(0)
  }

  let count=null;
  return(<div>
    <li>
      <div>
        {props.value}
        <button onClick={handleClick}>
          {showing?"hide":"show"}
        </button>
      </div>

      <div>
          {showing?<View value={details.name.common}/>:" "}
      </div>
    </li>

    </div>
  )
}

const Display=({value})=>{
  if(!value)return(null)
  else if(value==10)return(<div>Too many matches, specify another filter</div>)
  else if(value instanceof Array){
       return(
          <ul>
            {value.map(name=><ListView key={name} value={name}/>)}
          </ul>
        )}
  else return(
  <View value={value}/>
  )
}

function App() {
  const [newSearch, setSearch]=useState('')
  const [countries, setCountries]=useState()
  const [toDisplay,setDisplay]=useState([])

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response)=>{
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
