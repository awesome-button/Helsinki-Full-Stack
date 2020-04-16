import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const getRandom = () => Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(getRandom())
  const [points, setPoints] = useState({})
  
  //sets the value of the variable 'selected' to a new random value once the button is clicked
  const setNext = () => setSelected(getRandom())

  //upvotes the anecdote which is currently selected by updating the state stored in the object 'points'
  const vote = () => {
    const newState = {...points}
    newState[selected] = points[selected]+1 || 1
    setPoints(newState)
  }

  const getBestAnecdote = () => {
    if (Object.keys(points).length === 0) {
      return "No votes have been registered yet"
    } else {
      for (let prop in points) {
        const maxPoints = Math.max.apply(null, Object.values(points))
        if (points[prop] === maxPoints) return anecdotes[prop]
      }
    }
  }
  
  return (
    <>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={vote}>vote</button>
      <button onClick={setNext}>next</button>
      <h1>Anecdote with best votes</h1>
      <p>{getBestAnecdote()}</p>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)