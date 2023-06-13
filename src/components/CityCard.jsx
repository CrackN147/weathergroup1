import moment from "moment";
import { config } from "../system/config";
export const CityCard = (props) => {
  const {
    weather,
    pressure,
    humidity,
    speed,
    temp,
    feels_like,
    dt,
    viewForecast
  } = props;
  let customFontSize = {
    fontSize: "14px"
  };
  return (
    <div className="card m-2 d-flex justify-content-center background-custom-type">
      <div className="card-body p-2">
        <div className="row border-bottom pointer m-2"
          onClick={viewForecast}
        >
          <div className="col-6 d-flex align-items-center">
            <h5 className="card-title text-nowrap">
              {weather[0].main}
            </h5>
          </div>
          <div className="col-6">
            <img src={
              `${config.apiIconUrl}${weather[0].icon}.png`
            } alt="" />
          </div>
        </div>
        <h6 className="card-text m-0 mb-2 text-nowrap">
        {moment.unix(dt).format("dddd, MM")}, ({weather[0].description})  
        </h6>
        <p className="card-text mb-1" style={customFontSize}>
          Preassure: {pressure} hPa
        </p>
        <p className="card-text mb-1" style={customFontSize}>
          Humidity: {humidity} %
        </p>
        <p className="card-text mb-2" style={customFontSize}>
          Wind: {speed} m/s
        </p>
        <p className="card-text mb-1 border-top" style={customFontSize}>
          Temperature:
        </p>
        <p className="card-text mb-1" style={customFontSize}>
          Min: {temp.min} °C
        </p>
        <p className="card-text mb-2" style={customFontSize}>
          Max: {temp.max} °C
        </p>
        <p className="card-text mb-1 border-top" style={customFontSize}>
          Feels like:
        </p>
        <p className="card-text mb-1" style={customFontSize}>
          Day: {feels_like.day} °C
        </p>
        <p className="card-text mb-3" style={customFontSize}>
          Night: {feels_like.night} °C
        </p>
      </div>
    </div>
  );
}