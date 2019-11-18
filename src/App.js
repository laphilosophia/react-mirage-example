import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    let cleanup = false

    async function fetcher() {
      const request = await fetch('/api/users')
      const response = await request.json()

      const { users } = response

      if (!cleanup) setUsers(users)
    }

    fetcher()

    return () => {
      cleanup = true
    }
  }, [])

  return (
    <div className='App'>
      {users ? users.map(user => {
        return <div className="App-Item" key={user.id}>
          <h3>{user.name}</h3>
          <h5>{user.email}</h5>
          <p>@{user.username} - {user.website}</p>
        </div>
      }) : <p>Error! Something happened...</p>}
    </div>
  )
}

export default App
