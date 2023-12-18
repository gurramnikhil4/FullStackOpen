import { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL='https://studies.cs.helsinki.fi/restcountries/api/name/'
const Search=(props)=>{
  return(
    <div>
        <label htmlFor='search'>find countries</label>
        <input value={props.value} type='text' id='search' onChange={props.onChange}/>
    </div>
  )
}

const Display=({value})=>{
  if(!value)return(null)
  else if(typeof value === 'string')return(<div>{value}</div>)
  else if(value instanceof Array){
        if(value.length>1)return(
          <ul>
            {
            value.map(name=>{
              return <li key={name}>{name}</li>
            })
            }
          </ul>
        )
          }
  else return(
  <>
    <h1>{value.name.common}</h1>
    <div>capital {value.capital}</div>
    <div>area {value.area}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(value.languages).map(key=><li key={key}>{key}</li>)}
    </ul>
    <img src={`${value.flags.png}`} alt={value.flags.alt} />
  </>
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
      setDisplay('Too many matches, specify another filter')
    }
    else if(searchResult.length==1){
      axios.get(`${baseURL}/${searchResult[0].toLowerCase()}`).then(
        (response)=>{
          setDisplay(response.data)
    })}
    else
    {setDisplay(searchResult)}

  }

  return (
    <div>
      <Search value={newSearch} onChange={handleSearch}/>
      <Display value={toDisplay}/>
    </div>
  )
}

export default App
