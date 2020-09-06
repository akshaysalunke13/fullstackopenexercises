import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h2>{props.course.name}</h2>
        </div>
    )
}

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(x =>
                <Part part={x.name} exercises={x.exercises} key={x.id} />
            )}
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <strong>Number of exercises {props.course.parts.reduce((total, x) => total + x.exercises, 0)}</strong>
        </div>
    )
}



export default Course