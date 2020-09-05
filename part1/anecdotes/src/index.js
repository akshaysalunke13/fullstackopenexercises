import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    let arr = new Array(props.anecdotes.length).fill(0)
    const [votes, setVotes] = useState(arr)

    const clickHandler = () => {
        let rand = Math.floor(Math.random() * props.anecdotes.length)
        setSelected(rand)
    }

    const voteHandler = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    const findMax = () => {
        const max = Math.max(...votes)
        const index = votes.indexOf(max)
        return index
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}<br />
            has {votes[selected]} votes<br />
            <Button onclick={clickHandler} text='next anecdote' />
            <Button onclick={voteHandler} text='vote' />

            <h2>Anecdote with most votes</h2>
            {props.anecdotes[findMax()]}<br/>
            has {votes[findMax()]} votes<br/>
        </div>
    )
}

const Button = ({ onclick, text }) => <button onClick={onclick}>{text}</button>

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