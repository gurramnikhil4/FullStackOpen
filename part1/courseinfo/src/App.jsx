const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (

    <div>
      <Header name={course} />
      <Content parts={[parts[0].name,parts[1].name,parts[2].name]} exercises={[parts[0].exercises,parts[1].exercises,parts[2].exercises]} />
      
      <Total number={[parts[0].exercises,parts[1].exercises,parts[2].exercises]} />
    </div>
  )
}

const Header=({name})=>{
return(
  <h1>{name}</h1>
)
}

const Content=({parts,exercises})=>{
  return(
    <>
    <Part part={parts[0]} exercise={exercises[0]}/>
    <Part part={parts[1]} exercise={exercises[1]}/>
    <Part part={parts[2]} exercise={exercises[2]}/>
    </>
  )
}

const Total=({number})=>{
  let n=0;
  for(const arg of number){
    n+=arg;
  }
  return(
    <p>Number of exercises {n}</p>
  )
}


const Part=(props)=>{
  return(
    <p>{props.part} {props.exercise}</p>
  )
  }

export default App