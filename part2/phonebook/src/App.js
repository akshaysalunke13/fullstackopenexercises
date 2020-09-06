import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(x => x.name === newName)) {
            window.alert(`${newName} is already added to the phonebook.`)
            return
        }

        const person = { name: newName, number: newNumber }
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
    }

    const handleNewName = (event) => setNewName(event.target.value)

    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const handleSearch = (event) => setSearch(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearch={handleSearch} />
            <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
            <Numbers persons={persons} search={search} />
        </div>
    )
}

const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
    return (
        <div>
            <h3>Add New</h3>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewName} /><br />
                    phone: <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            <h3>Search</h3>
            <input value={search} onChange={handleSearch} />
        </div>
    )
}

const Numbers = ({ persons, search }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(x => {
                if (x.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                    return <NumberRow person={x}/>
                }
            })}
        </div>
    )
}

const NumberRow = ({person}) => <div key={person.name}>{person.name} {person.number}</div>

export default App