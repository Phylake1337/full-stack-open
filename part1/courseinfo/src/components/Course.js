const Header = ({text}) => <h1>{text}</h1>

const Part = ({part}) => <p> {part.name} {part.exercises} </p>  

const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part}/>)

const Total = ({parts}) => {
  const sumReducer = (accumulator, currentValue) => accumulator + currentValue.exercises
  const total = parts.reduce(sumReducer, 0);
  return <p> Total of {total} exercises </p>
}

const Course = ({course}) => {
  return (
  <div>
    <Header text={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
  )
}

export default Course