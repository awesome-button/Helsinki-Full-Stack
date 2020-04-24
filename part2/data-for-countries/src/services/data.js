import axios from 'axios'

const getCountries = () => {
    return axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => response.data)
}

const getWeather = (country) => {
    const api = process.env.REACT_APP_API_KEY
    return axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${api}`)
        .then(response => response.data)
}

export default {getCountries, getWeather}