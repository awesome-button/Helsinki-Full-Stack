import React from 'react'

const Filter = ({ handleSearchChange }) => {
    return (
        <div className="filter">
            find countries:&nbsp;
        <input
            onChange={(e) => {
                handleSearchChange(e)
            }}
            />
        </div>
    )
}

export default Filter