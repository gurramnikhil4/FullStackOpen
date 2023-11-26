const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <>
    <h1>Web development curriculum</h1>
    {
    courses.map((course) =><Course key={course.id} course={course}></Course> )
    }
    </>
  )
}

const Course=({course})=>{
  return(
    <>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
    </>
  )

}

const Header=({name})=>{
  return(
    <h2>{name}</h2>
  )
  }
  
const Content=({parts})=>{
  console.log(parts);
  return(
    <>
    {parts.map(item => 
        <Part key={item.id} part={item} />
      )}
    </>
  )
}
  
  
const Part=({part})=>{
  console.log(part);
  return(
    <p >{part.name} {part.exercises}</p>
  )
  }

const Total=({parts})=>{
  return(
    <b>total of {parts.reduce( (sum,part) => sum+part.exercises , 0)} exercises</b>
  )
  }


export default App