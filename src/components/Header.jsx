import {useState, useEffect} from 'react';
import { SearchList, SearchBox} from './'
import { data } from '../system/data'
export const Header = (props) => {
  const {
    changeCity
  } = props;
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const changeSearch = (e) => {
    let value = e.target.value;
    setSearch((value));
  }
  useEffect(() => {
    const filterData = () => {
      if (search.length > 0) {
        let results = data.filter((item) => {
          return item.toLowerCase().includes(search.toLowerCase());
        });
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }
    const timer = setTimeout(() => {
      filterData();
    }, 200);
    return () => clearTimeout(timer);
  }, [search]);
  return (
    <header className='row position-relative'>
      <SearchBox
        search={search}
        changeSearch={changeSearch}
      />
      {searchResults.length > 0 ?
        <SearchList
          searchResults={searchResults}
          changeCity={
            (cityName) => {
              changeCity(cityName);
              setSearch('');
            }
          }
        />
        : null
      }
    </header>
  );
}