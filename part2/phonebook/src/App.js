import { useState, useEffect } from 'react'
import FilteredPersons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState({content:'', type:null})


  const handleNameChange= (event) => setNewName(event.target.value)
  const handleNumberChange= (event) => setNewNumber(event.target.value)
  const handleNameFilterChange= (event) => setNameFilter(event.target.value)

  const displayNotification= (msg, notifyType) => {
    setMessage({content:msg, type:notifyType})
    setTimeout(() => setMessage({content:'', type:null}), 5000)
  }

  const handleDeletation= (idToRemove) => {
    const personToRemove = persons.filter(person => person.id === idToRemove)[0]
    if (window.confirm(`Delete ${personToRemove.name}?`)){
      phonebookService
      .remove(idToRemove)
      .then(
        setPersons(persons.filter(person => person.id !== idToRemove)
        ))
      .catch(error => {
        const errorMsg = `Information about ${personToRemove.name} has already has been removed from server`
        displayNotification(errorMsg, 'error')
      })
    }
  }

  const handleSumbition= (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      number: newNumber
    }

    const personDuplication = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    if (newName==='' | newNumber===''){
      alert('Cannot add empty Name/Number')

    }else if(personDuplication.length!==0){
      if (window.confirm((`${newName} is already added to phonebook, replace?`))){
        const idToUpdate = personDuplication[0].id
        phonebookService
          .update(idToUpdate, newPerson)
          .then(response => setPersons(persons.map(person => person.id === idToUpdate? response:person)))
      }

    }else{               
      phonebookService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
      const notifyMsg = `Name '${newPerson.name}' and Number '${newPerson.number}' are just added`
      displayNotification(notifyMsg, 'inform')
      }
  }

  const effect = () => {
    phonebookService
      .getAll()
      .then(initData => {
        setPersons(initData)
      })
  }
  useEffect(effect, [])

  return (
    <div>
      <h2>Phonebook</h2>
        Filter numbers shown by name: <input value={nameFilter} onChange={handleNameFilterChange}/>
      <h2>Add a new number</h2>
      <form onSubmit={handleSumbition}>
        <Notification message={message.content} notifyType={message.type}/>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit"> Add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <FilteredPersons persons={persons} nameFilter={nameFilter} handleDeletation={handleDeletation}/>
    </div>
  )
}

export default App