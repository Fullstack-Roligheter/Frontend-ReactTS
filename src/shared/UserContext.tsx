import React from 'react'

let isLoggedIn = true
if (!sessionStorage.getItem('userId')) {
  isLoggedIn = false
}

export const user = {
  user: {
    userId: sessionStorage.getItem('userId') || '',
    email: sessionStorage.getItem('email') || '',
    firstName: sessionStorage.getItem('firstName') || '',
    lastName: sessionStorage.getItem('lastName') || '',
  },
  loggedIn: isLoggedIn,
  setLoggedIn: () => {},
}

export const UserContext = React.createContext(user)
