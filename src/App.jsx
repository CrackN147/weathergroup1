import { useState, useEffect } from 'react';
import queryString from 'query-string';
import {
  getForecast,
  getCurrentWeather
} from './system/api';
import { CityCard, Header, MainCard } from './components';
export const App = () => {
  const [forecast, setForecast] = useState(null);
  const [current, setCurrent] = useState(null);
  const [activeWeather, setActiveWeather] = useState(null);
  const [city, setCity] = useState('Tbilisi');

  const changeCity = (cityName) => {
    setCity(cityName);
  }

  const viewForecast = (item) => {
    let clone = { ...activeWeather };
    clone.weather = item.weather;
    clone.main = {
      feels_like: item.feels_like.day,
      humidity: item.humidity,
      pressure: item.pressure,
      temp: item.temp.day,
      temp_max: item.temp.max,
      temp_min: item.temp.min
    };
    clone.wind.speed = item.speed;
    clone.dt = item.dt;
    setActiveWeather(clone);
  }

  useEffect(() => {
    const fetchData = async () => {
      let query = {
        q: city,
        units: 'metric'
      }
      const forecastData = await getForecast(
        queryString.stringify(query)
      );
      if (forecastData) {
        setForecast(forecastData.data);
      }
      const currentWeatherData = await getCurrentWeather(
        queryString.stringify(query)
      );
      if (currentWeatherData) {
        setCurrent(currentWeatherData.data);
        setActiveWeather(currentWeatherData.data);
      }
    }
    fetchData();
  }, [city]);

  return (
    <div className={`App ${activeWeather ? activeWeather.weather[0].main.toLowerCase() : ''
      }`}>
      <Header
        changeCity={changeCity}
      />
      <div className="container">
        {activeWeather ?
          <MainCard
            {...activeWeather}
          />
          : null
        }
        <div className="row d-flex justify-content-center">
          {forecast ?
            forecast.list.map((item, index) => (
              <CityCard
                key={index}
                {...item}
                viewForecast={
                  () => viewForecast(item)
                }
              />
            ))
            : null
          }
        </div>
      </div>
    </div>
  );
}
