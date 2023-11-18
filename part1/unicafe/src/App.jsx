import { useState } from 'react'

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}> {props.text}</button>
  )
}

const Statistics = ({ratings,isGiven}) =>{
  if(!isGiven) {
    return (<p>No feedback given</p>)
  }
  const all=ratings[0]+ratings[1]+ratings[2];
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value ={ratings[0]} />
      <StatisticLine text="neutral" value ={ratings[1]} />
      <StatisticLine text="bad" value ={ratings[2]} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={(ratings[0]-ratings[2])/all} />
      <StatisticLine text="positive" value ={(ratings[0]*100)/all} per={1}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text,value, per})=>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {(per)?("%"):("")}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [gave, setGiven] = useState(0)

  const onSmash = (setRating) =>{
    setRating(n=>n+1);
    setGiven(1);
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>onSmash(setGood)}text="good"/>
      <Button handleClick={()=>onSmash(setNeutral)}text="neutral"/>
      <Button handleClick={()=>onSmash(setBad)}text="bad"/>
      
      <h1>Statistics</h1>

      <Statistics ratings={[good,neutral,bad]} isGiven={gave}/>

    </div>
  )
}

export default App