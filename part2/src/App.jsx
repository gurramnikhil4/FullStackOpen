const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course=({course})=>{
  return(
    <>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    </>
  )

}

const Header=({name})=>{
  return(
    <h1>{name}</h1>
  )
  }
  
  const Content=({parts})=>{
    return(
      <>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
      </>
    )
  }
  
  
  const Part=({part})=>{
    return(
      <p>{part.name} {part.exercises}</p>
    )
    }

export default App