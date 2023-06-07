import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {getWeather} from './system/api';
import { Header } from './components';
export const App = () => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      let query = {
        q: 'Tbilisi',
        units: 'metric'
      }
      const response = await getWeather(
        queryString.stringify(query)
      );
      if (response) {
        console.log(response.data);
        setWeather(response.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="">
      <Header />
    </div>
  );
}
