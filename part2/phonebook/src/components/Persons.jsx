const Persons = ({persons,handleDelete})=>{
    return (
        <ul>
        {persons.map((person)=><Person key={person.name} person={person} deleteContact={handleDelete}></Person>)}
      </ul>
    )
    }
const Person = (props)=>{
  return(
    <li>
      {props.person.name} {props.person.number} {props.person.id}
      <button onClick={()=>props.deleteContact(props.person.name, props.person.id)}>delete</button>
    </li>
  )

}
    
    
export default Persons