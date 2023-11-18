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
  const [all, setAll]=useState(0)

  const onSmash = (setRating) =>{
    setAll(n=>n+1);
    setRating(n=>n+1);
  }

const average = all?((good-bad)/all):0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>onSmash(setGood)}text="good"/>
      <Button handleClick={()=>onSmash(setNeutral)}text="neutral"/>
      <Button handleClick={()=>onSmash(setBad)}text="bad"/>

      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>


    </div>
  )
}

export default App