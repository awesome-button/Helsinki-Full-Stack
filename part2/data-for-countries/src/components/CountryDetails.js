import React from 'react'
const CountryDetails = ({country, weather}) => {
    const renderSky = () => {
        if (weather.sky !== undefined) {
            const sky = weather.sky.toLowerCase()
            if (sky.includes('rain')) {
                return (
                    <p className="sign">{"\u2602"}</p>
             )
            } else if (sky.includes('clear')) {
                return (
                    <p className="sign">{"\u2600"}</p>
                )
            } else if (sky.includes('cloud')) {
                return (
                    <p className="sign">{"\u2601"}</p>
                )
            } else {
                return (
                <p>{weather.sky}</p>
            )}
        }
    }

    return (
        <div className="all">
            <div className="box">

                <div className="info">
                    <h1>{country.name}</h1>
                    <p>Capital: <strong>{country.capital}</strong></p>
                    <p>Population: <strong>{country.population}</strong></p>
                    <h2>Languages</h2>
                    <ul>
                        {country.languages.map(language => {
                            return (<li key={language.name}>{language.name}</li>)
                        })}
                    </ul>
                </div>

                <div className="flag">
                    <img src={country.flag} alt="" style={{ width: 200 }}></img>
                </div>

                <div className="weather">
                    <h2>Weather in {country.capital}</h2>
                    <div className="params">
                        <p className="temp">{parseInt(weather.temp)}{'\u00b0'}</p>
                        <p className="wind">Wind: {weather.wind} m/s</p>
                        <div className="sky">{renderSky()}</div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default CountryDetails

