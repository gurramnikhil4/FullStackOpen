import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactServices from './services/contacts'

const App = () => {

  const [persons, setPersons] = useState([])
  // const [toDisplay, setDisplay]=useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(()=>{
    contactServices.getAll().then(response=>setPersons(response))
  },[]);
  
  const handleSearch = (event) =>{
    setPersons(persons.filter((person)=>{
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }));
    setNewSearch(event.target.value);
  }

const handleSubmit = (event)=>{
  event.preventDefault();
  let toFind=null;
  if(toFind=persons.find(person=>person.name==newName)){
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const newObject={...toFind, number:newNumber}
      contactServices.update(newObject.id,newObject).then(
       (response)=> {
        setPersons(persons.map((person)=>{
          return person.id==response.id?response:person
        }))
       })
      }
    }
  else{ 
    const newNameObject = {
    name:newName,
    number:newNumber,
    }
    contactServices.create(newNameObject).then((data)=>setPersons(persons.concat(data)))
  }
  setNewName('')
  setNewNumber('')
}

const handleDelete = (name,id)=>{
  if (window.confirm(`Delete ${name}?`)) {
    contactServices.remove(id).then(()=>{
      // contactServices.getAll().then(response=>setPersons(response))
      setPersons(persons.filter(person=>person.id!=id))
    })
}
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} onChange={handleSearch}/>

      <h2>add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App