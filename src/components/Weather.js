import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
  const Search = useRef()
  const [weatherData, setWeatherData] = useState(false)

  const icons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`

      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      const icon = icons[data.weather[0].icon] || clear_icon
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon
      })
    } catch (error) {
      alert("City not found")
    }
  }

  useEffect(() => {
    search("Indonesia");
  }, [])


  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref= {Search}type='text' placeholder='Search...'/>
        <img src={search_icon} alt='' onClick={() =>search(Search.current.value)}/>
      </div>
    <img src={weatherData.icon} alt='' className='weather-icon'/>
    <p className='temp'>{weatherData.temp}°C</p>
    <p className='location'>{weatherData.location}</p>
    <div className='weather-info'>
      <div className='col'>
        <img src={humidity_icon} alt='' />
        <div>
          <p>{weatherData.humidity} %</p>
          <span>humidity</span>
        </div>
      </div>
      <div className='col'>
        <img src={wind_icon} alt='' />
        <div>
          <p>{weatherData.wind} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Weather