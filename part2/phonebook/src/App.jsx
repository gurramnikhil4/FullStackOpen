import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const handleSearch = (event) =>{
    setPersons(persons.filter((person)=>{
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }));
    setNewSearch(event.target.value);
  }

const handleSubmit = (event)=>{
  event.preventDefault();
  if(persons.some(person=>person.name==newName)){
    alert(`${newName} is already added to phonebook`)
  }
  else{ 
    const newNameObject = {
    name:newName,
    number:newNumber,
    }
  setPersons(persons.concat(newNameObject))
  }
  setNewName('')
  setNewNumber('')
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} onChange={handleSearch}/>

      <h2>add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons}/>
      
    </div>
  )
}

export default App