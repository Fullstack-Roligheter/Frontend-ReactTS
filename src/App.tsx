import React from 'react'
import './App.css'
import AppRouter from './routes'

const App: React.FC = () => {
  const user = {
    user: {
      userId: sessionStorage.getItem('userId') || '',
      email: sessionStorage.getItem('email') || '',
      firstName: sessionStorage.getItem('firstName') || '',
      lastName: sessionStorage.getItem('lastName') || '',
      loggedIn: sessionStorage.getItem('loggedIn') || 'false',
    },
  }

  const UserContext = React.createContext(user.user)

  return <AppRouter />
}

export default App
