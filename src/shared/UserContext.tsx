import React from 'react'
import { userType } from './Interfaces/userToken'

export const user = {
  user: {
    userId: sessionStorage.getItem('userId') || '',
    email: sessionStorage.getItem('email') || '',
    firstName: sessionStorage.getItem('firstName') || '',
    lastName: sessionStorage.getItem('lastName') || '',
  },
  loggedIn: 'false',
  setLoggedIn: () => {},
}

export const UserContext = React.createContext(user)
