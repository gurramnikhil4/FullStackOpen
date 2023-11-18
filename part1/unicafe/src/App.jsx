import { useState } from 'react'

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}> {props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>setGood(n=>n+1)}text="good"/>
      <Button handleClick={()=>setNeutral(n=>n+1)}text="neutral"/>
      <Button handleClick={()=>setBad(n=>n+1)}text="bad"/>

      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

    </div>
  )
}

export default App