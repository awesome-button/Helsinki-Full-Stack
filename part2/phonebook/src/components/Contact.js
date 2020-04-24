import React from 'react'

const Contact = ({ contact, removeContact }) => (
    <div>
        <p className="contact">{contact.name}<br/>{contact.number} &nbsp;</p>
        <button onClick={removeContact}>remove</button>
    </div>
)

export default Contact