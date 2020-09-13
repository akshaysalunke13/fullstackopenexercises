import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import { Filter, PersonForm, Numbers } from './Phonebook'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState('error')

    useEffect(() => {
        personService
            .getAll()
            .then(response => setPersons(response.data))
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                updatePerson(persons[i])
                return
            }
        }

        const newPerson = { name: newName, number: newNumber }
        personService
            .createPerson(newPerson)
            .then(response => {
                setPersons(persons.concat(response.data))
                updateNotification(`${newName} was added to the phonebook.`, 'success')
                setNewName('')
                setNewNumber('')
            })
            .catch(error => updateNotification(error.response.data.error, 'error'))
    }

    const delPerson = (id) => {
        if (window.confirm('Do you really want to delete this contact?')) {
            console.log(`person ${id} deleted.`)
            personService
                .deletePerson(id)
                .then(response => {
                    setPersons(persons.filter(p => p.id !== id))
                    updateNotification(`Person ${id} was deleted successfully.`, 'success')
                })
                .catch(error => updateNotification(error.response.data.error, 'error'))
        }
    }

    const updatePerson = (currPerson) => {
        if (window.confirm(`Name ${newName} already exists in directory. Do you want to update their number instead?`)) {
            const newPerson = { ...currPerson, number: newNumber }
            console.log('Person updated', newPerson)
            personService
                .updatePerson(newPerson.id, newPerson)
                .then(response => {
                    setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
                    updateNotification(`Information for ${currPerson.name} was updated.`, 'success')
                })
                .catch(error => {
                    updateNotification(`Person ${currPerson.name} was already removed from the server.`, 'error')
                    setPersons(persons.filter(p => p.id !== currPerson.id))
                })
        }
    }

    const updateNotification = (message, type) => {
        console.log('message:', message, 'type:', type)
        setNotification(message)
        setNotificationType(type)
        setTimeout(() => setNotification(null), 5000)
    }

    const handleNewName = (event) => setNewName(event.target.value)

    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const handleSearch = (event) => setSearch(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} type={notificationType} />
            <Filter search={search} handleSearch={handleSearch} />
            <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
            <Numbers persons={persons} search={search} delPerson={delPerson} />
        </div>
    )
}

export default App