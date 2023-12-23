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
  
export default Course  