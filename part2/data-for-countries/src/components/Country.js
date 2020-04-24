import React from 'react'

const Country = ({ country, setSearchChange }) => {
    return (
        <div className="country">
            
            <button onClick={() => { setSearchChange(country.name)}}>
                {country.name}
            </button>     
        </div>
        
    )
}

export default Country