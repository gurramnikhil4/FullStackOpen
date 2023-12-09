import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const hook = () =>{
    let promise = axios.get('http://localhost:3001/persons');
    promise.then( (response) =>{
      setPersons(response.data)
    } )
  }
  useEffect(hook,[]);
  
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