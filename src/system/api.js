import axios from "axios";
import {config} from "./config";

export const getForecast = async (query) => {
  return await axios.get(
    `${config.apiUrl}?${query}&appid=${config.apiKey}`
  )
}

export const getCurrentWeather = async (query) => {
  return await axios.get(
    `${config.apiCurrentUrl}?${query}&appid=${config.apiKey}`
  )
}
