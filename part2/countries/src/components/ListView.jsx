import { useEffect, useState } from 'react'
import axios from 'axios'
const baseURL='https://studies.cs.helsinki.fi/restcountries/api/name/'

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
            {showing?<props.View value={details.name.common} api_key={props.api_key} getCountry={props.getCountry} getWeather={props.getWeather}/>:" "}
        </div>
      </li>
  
      </div>
    )
  }

  export default ListView