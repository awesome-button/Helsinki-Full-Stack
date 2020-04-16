import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good+1)
  const incrementNeutral = () => setNeutral(neutral+1)
  const incrementBad = () => setBad(bad+1)
      
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good"/>
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  return (all === 0) ? <p>No feedback given</p> :
      <table>
        <tbody>
          <Statistic num={good} text="good" />
          <Statistic num={neutral} text="neutral" />
          <Statistic num={bad} text="bad" />
          <Statistic num={all} text="all" />
          <Statistic num={(good - bad) / all} text="average" />
          <Statistic num={good * 100 / all + "%"} text="positive" />
        </tbody>
      </table>
}
const Statistic = ({ num, text }) => (
  <tr>
    <td>{text}</td>
    <td>{num}</td>
  </tr>
)
ReactDOM.render(<App />,
  document.getElementById('root')
)
