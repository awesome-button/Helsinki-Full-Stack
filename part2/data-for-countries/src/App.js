import React, {useState, useEffect} from 'react';
import './index.css'
import Filter from './components/Filter'
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'
import Service from './services/data'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [searchChange, setSearchChange] = useState("")
  const [weather, setWeather] = useState({})
  
  let countriesToShow = showAll
    ? countries
    : countries.filter(c => c.name.toLowerCase().includes(searchChange.toLowerCase()))

  useEffect(() => {
    Service
      .getCountries()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      Service
        .getWeather(countriesToShow[0])
        .then(weather => {
          setWeather({temp: weather.main.temp, wind: weather.wind.speed, sky: weather.weather[0].main})
        })
      }
    }, [countriesToShow])
  
    const handleSearchChange = (event) => {
      setSearchChange(event.target.value)
      setShowAll(false)
    }

  const getCountries = () => {
    if (countriesToShow.length > 9) {
      return "Too many matches, specify another filter"
    } else if (countriesToShow.length === 1) {    
      return (
        <CountryDetails 
          country={countriesToShow[0]} 
          weather={weather}
          />
      )
    } else {
      return (
        countriesToShow.map((country) => {
          return (
            <div key={country.name}>
              <Country 
                country={country} 
                setSearchChange={setSearchChange}
              />
            </div>
          )
        })
      )
    }
  }
 
  return (
    <div className="page">
      <Filter
        handleSearchChange={handleSearchChange}
      />
      <div className="back">{getCountries()}</div>
    </div>
  )
}

export default App;
