import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countriesToShow, setCountriesToShow }) => {
    if (countriesToShow.length > 9) {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        )

    } else if (countriesToShow.length === 1) {
        return (
        <CountryDetails country={countriesToShow[0]} />
        )

    } else {
        return (
            countriesToShow.map((country) => {
                return (
                <div key={country.name}>
                    <Country  country={country} />           
                    <button onClick={() => {setCountriesToShow([country])}}>
                    show
                    </button>                
                </div>
                )
            })
        )
    }
}

export default Countries