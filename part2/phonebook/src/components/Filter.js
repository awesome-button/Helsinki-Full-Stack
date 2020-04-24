import React from 'react'

const Filter = (props) => {
    return (
        <div>
            filter names containing: &nbsp;
        <input
                onChange={props.handleSearchChange}
            />
        </div>
    )
}
export default Filter