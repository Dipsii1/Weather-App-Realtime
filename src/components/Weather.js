import React, { useEffect, useRef, useState } from 'react'
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

    if(!city) {
      alert('Please enter or a country or city')
      return
    }

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
      console.log(error)
    }
  }

  useEffect(() => {
    search('Indonesia')
  }, [])

  
  return (
    <div className='p-10 place-self-center rounded-2xl flex flex-col items-center bg-gradient-to-r from-indigo-100 to-indigo-400'>
      <div className='flex items-center gap-5'>
        <input ref= {Search}type='text' placeholder='Search...' className='w-64 h-12 border-none outline-none rounded-3xl pl-6'/>
        <img src={search_icon} alt='' onClick={() =>search(Search.current.value)} className='p-4 rounded-full bg-white cursor-pointer'/>
      </div>
    <img src={weatherData.icon} alt='' className='w-36 m-8'/>
    <p className='text-7xl text-white'>{weatherData.temp}°C</p>
    <p className='text-3xl text-white'>{weatherData.location}</p>
    <div className='flex w-full mt-10 justify-between'>
      <div className='flex items-start gap-3 text-base'>
        <img className='w-7 mt-1' src={humidity_icon} alt='' />
        <div>
          <p className='text-white'>{weatherData.humidity} %</p>
          <span className='block text-base text-white'>humidity</span>
        </div>
      </div>
      <div className='flex items-start gap-3 text-base'>
        <img className='w-7 mt-1' src={wind_icon} alt='' />
        <div>
          <p className='text-white'>{weatherData.wind} Km/h</p>
          <span className='block text-base text-white'>Wind Speed</span>
        </div>
      </div>
    </div>
    </div>

    
  )
}

export default Weather