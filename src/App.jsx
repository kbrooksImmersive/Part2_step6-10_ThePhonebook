import { useState } from 'react'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    console.log('handleNameSubmit: check if new name is already in phonebook', newName)

    const personKeys = persons.map(person => person.name+person.number)
    const matchKey = newName + newPhone

    console.log(matchKey, personKeys)

    if(personKeys.includes(matchKey)){
      console.log('name already in phonebook')
      alert(`${newName} is already added to phonebook`)
    }
    else{
      console.log('person to be added to phonebook')
      const personList = persons.concat(
        {
          name: newName,
          number: newPhone,
          id: persons.length+1
        }
      ) 
      setPersons(personList)
      console.log('new list of people:', personList)
    }
  }

  const peopleToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleEvent={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handlePersonSubmit={handlePersonSubmit} nameVal={newName} handleNameChange={handleNameChange} phoneVal={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <DisplayPeople peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App