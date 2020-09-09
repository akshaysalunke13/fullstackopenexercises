import React from 'react'

const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
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

const Numbers = ({ persons, search, delPerson}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(x => {
                if (x.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                    return <NumberRow person={x} key={x.id} delPerson={delPerson}/>
                }
            })}
        </div>
    )
}

const NumberRow = ({person, delPerson}) => <div>{person.name} {person.number}<button onClick={() => delPerson(person.id)}>delete</button></div>

export { Filter, PersonForm, Numbers }