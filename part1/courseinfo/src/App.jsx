const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (

    <div>
      <Header name={course} />
      <Content parts={[part1,part2,part3]} exercises={[exercises1,exercises2,exercises3]} />
      
      <Total number={[exercises1,exercises2,exercises3]} />
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