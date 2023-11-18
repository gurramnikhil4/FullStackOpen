import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(8).fill(0));
  const [maxV, setMax] = useState(0);

  const setV = () => {
    const copy=[...votes];
    copy[selected]+=1;
    setVote(copy);
    if(votes[maxV]<(votes[selected]+1))setMax(selected);
  }

  return (
    <>
    <h1>Anectode of the day</h1>
    <div>
      {anecdotes[selected]}
    </div>
    <button onClick={setV}>vote</button>
    <button onClick={()=>{setSelected(Math.floor(Math.random()*8))}}>next anecdote</button>

    <h1>Anectode with the most votes</h1>
    <div>
      {anecdotes[maxV]} with {votes[maxV]} votes
    </div>
    </>
  )
}

export default App