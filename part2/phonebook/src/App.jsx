import { useState } from 'react'

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

      <label htmlFor="search">filter shown with </label>
      <input value={newSearch} type="text" id="search" name="toSearch" onChange={handleSearch}/>


      <h2>add a new number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input type="number" value={newNumber} onChange={(event)=>setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((person)=><li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
      ...
    </div>
  )
}

export default App