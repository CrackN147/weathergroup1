import axios from "axios";
import {config} from "./config";

export const getWeather = async (query) => {
  return await axios.get(
    `${config.apiUrl}?${query}&appid=${config.apiKey}`
  )
}
