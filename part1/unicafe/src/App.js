import { useState } from 'react'

const Button = ({name, onClick}) => {
  return <button onClick={onClick}> {name} </button>
} 

const StatisticLine = ({state, value}) => {
  return (
    <tr>
      <td>{state}</td>
      <td>{value}</td>
    </tr>)
}

const Statistics = ({stats}) => {
  if (stats.all > 0){
    return (
      <div>
        <table> 
          <thead> 
            <StatisticLine state="Good" value={stats.good} />
            <StatisticLine state="Neutral" value={stats.neutral} />
            <StatisticLine state="Bad" value={stats.bad} />
            <StatisticLine state="All" value={stats.all} />
            <StatisticLine state="Average" value={stats.average} />
            <StatisticLine state="Postive" value={stats.postive}/>
          </thead>
        </table>
      </div>
    )
  } else{
    return <h3> No feedback given yet </h3>
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  const nVotes=good+neutral+bad
  const statistics={
    "good": good,
    "neutral": neutral,
    "bad": bad,
    "all": nVotes,
    "average": nVotes/3,
    "postive": good/nVotes*100
  }

  return (
    <div>
      <h2> Give Feedback </h2> 

      <Button name='Good' onClick={handleGoodClick} />
      <Button name='Neutral' onClick={handleNeutralClick} />
      <Button name='Bad' onClick={handleBadClick} />

      <h2> Statistics: </h2>
      <Statistics stats={statistics}/>

    </div>
  )
}

export default App



