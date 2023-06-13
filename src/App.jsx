import { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';
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
    if (!item || activeWeather === null) return;
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

  const onSlideChange = (event) => {
    let index = event.realIndex;
    viewForecast(forecast.list[index]);
  }

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

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
        <Swiper
          slidesPerView={3}
          loop={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="pb-3"
          onSlideChange={onSlideChange}
        >
          {forecast ?
            forecast.list.map((item, index) => (
              <SwiperSlide key={index}>
                <CityCard
                  {...item}
                  viewForecast={
                    () => viewForecast(item)
                  }
                />
              </SwiperSlide>
            ))
            : null
          }
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
