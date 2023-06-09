import moment from "moment";
import { config } from "../system/config";
export const MainCard = (props) => {
  const {
    name,
    weather,
    main,
    wind,
    dt
  } = props;
  
  return (
    <div className="col-12 card p-3 mb-4 background-custom-type">
      <div className="row">
        <div className="col-4 col-md-6">
          <div className="row">
            <div className="col-6">
              <h3>{name} {weather[0].main}</h3>
              <p className="m-0">
                {moment.unix(dt).format('dddd MM YYYY')}
              </p>
            </div>
            <div className="col-6">
              <p className="m-0">{weather[0].description}</p>
              <img src={
                `${config.apiIconUrl}${weather[0].icon}.png`
              } alt="" />
            </div>
          </div>
        </div>
        <div className="col-8 col-md-6">
          <div className="row">
            <div className="col-6">
              <h5>Temperature</h5>
              <p className="m-0">Avarage: {main.temp} °C</p>
              <p className="m-0">Max: {main.temp_max}</p>
              <p className="m-0">Min: {main.temp_min}</p>
              <p className="m-0">Feels like: {main.feels_like}</p>
            </div>
            <div className="col-6">
              <h5>Humidity</h5>
              <p className="m-0">{main.humidity} %</p>
              <h5>Wind</h5>
              <p className="m-0">{wind.speed} m/s</p>
              <h5>Pressure</h5>
              <p className="m-0">{main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}