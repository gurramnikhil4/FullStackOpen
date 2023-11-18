import { useState } from 'react'

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}> {props.text}</button>
  )
}

const Statistics = ({ratings,isGiven}) =>{
  const all=ratings[0]+ratings[1]+ratings[2];
  return(
    <>
      <h1>Statistics</h1>
      <p>good {ratings[0]}</p>
      <p>neutral {ratings[1]}</p>
      <p>bad {ratings[2]}</p>
      <p>all {all}</p>
      <p>average {all?((ratings[0]-ratings[2])/all):0}</p>
      <p>positve {all?((ratings[0]*100)/all):0}</p>
    </>
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

     <Statistics ratings={[good,neutral,bad]}/>

    </div>
  )
}

export default App