import { useEffect, useState } from 'react'

const View=({value,api_key,getCountry,getWeather})=>{
    const [Data,setData]=useState()
    const [Weather, setWeather]=useState()
  
    useEffect(()=>{
      getCountry(value).then((response)=>{
          setData(response.data)
          return response.data
          }).then((data)=>{
              return getWeather(data.capitalInfo.latlng[0],data.capitalInfo.latlng[1])
            }).then((wdata)=>{setWeather(wdata.data)}          )
  
  },[])
  
  if(Data&&Weather){
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
      <h2>Weather in {Data.capital}</h2>
      <div>temperature {Weather.main.temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/`+Weather.weather[0].icon+`@2x.png`} alt={Data.flags.alt} />
      <div>wind  {Weather.wind.speed} m/s</div>
  
    </>
    )
  }
  }

  export default View