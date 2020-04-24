import React, {useState, useEffect} from 'react'
import './index.css'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Contact from './components/Contact'
import contactService from './services/contacts'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
    
    const [contacts, setContacts] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [messageOnCreation, setMessageOnCreation] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(() => {
        contactService
            .getAll()
            .then(contacts => setContacts(contacts))
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
        setShowAll(false)
    }

    const addContact = (event) => {
        event.preventDefault()
        if (contacts.map(contact => contact.name).includes(newName)) {
            updateNumber()
        } else {
            const newContact = { name: newName, number: newNumber }
            contactService
                .create(newContact)
                .then(newContact => {
                    setContacts(contacts.concat(newContact))
                    setNewName("")
                    setNewNumber("")
                    setMessageOnCreation(`Added ${newContact.name}`)
                    setTimeout(() => {
                        setMessageOnCreation(null)
                    }, 3000)
                })
        }
    }

    const updateNumber = () => {
        if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
            const contact = contacts.filter(p => p.name === newName)[0]
            const changedContact = {...contact, number: newNumber}
            contactService
                    .update(changedContact)
                    .then(updatedContact => {
                        setContacts(contacts.map(p => p === contact ? updatedContact : p))
                    })
                    .catch(error => {
                        setErrorMessage(`${newName} was removed from the phonebook`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
        }     
    }

    const removeContact = (contact) => {
        if (window.confirm(`Are you sure you want to delete ${contact.name}'s number?`)) {
            contactService.remove(contact.id)     
            setContacts(contacts.filter(p => p.id !== contact.id))
        }
    }

    const contactsToShow = showAll
        ? contacts
        : contacts.filter(contact => contact.name.toLowerCase().includes(newSearch.toLowerCase()))

    return (
        <>
            <h2>Phonebook</h2>
            <Error message={errorMessage} />
            <Notification message={messageOnCreation} />
            <Filter 
            handleSearchChange={handleSearchChange} />
            <h2>add a new</h2>
            <ContactForm 
            addContact={addContact} newName={newName}
            handleNameChange={handleNameChange} newNumber={newNumber}
            handleNumberChange={handleNumberChange} />
            <div>
                {contactsToShow.map(contact =>
                    <Contact 
                        key={contact.id} 
                        contact={contact}
                        removeContact={() => removeContact(contact)}
                    />)}
            </div>
    </>
    )
}

export default App