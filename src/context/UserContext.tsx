import { log } from 'console'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import { baseURL } from '../config'

type IProps = PropsWithChildren<{}>

export type IUser = {
  password: string
  userEmail: string
}

type IUserContext = {
  userId: string | null
  email: string
  firstName: string
  lastName: string
  setUserId: (userId: string) => void
  signIn: (userEmail: string, password: string) => void
  signOut: () => void
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext)

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserContextProvider: React.FC<IProps> = (props) => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>('')
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const [user, setUser] = useState({
    userId: '',
  })

  //login code
  const signIn = async (userEmail: string, password: string) => {
    const getResponse = await fetch(`${baseURL}/user/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: password,
      }),
    })
    console.log(getResponse.status)
    if (getResponse.status !== 200) {
      alert('Access Denied')
      return
    }

    const object = await getResponse.json()

    sessionStorage.setItem('userId', object.userId)
    sessionStorage.setItem('email', object.email)
    sessionStorage.setItem('firstName', object.firstName)
    sessionStorage.setItem('lastName', object.lastName)

    setUserId(object.userId)
    setEmail(object.email)
    setFirstName(object.firstName)
    setLastName(object.lastName)

    navigate(`/dashboard`)
    /*  window.location.reload() */
  }
  console.log('saru:::', userId)

  //sign out
  const signOut = () => {}

  return (
    <UserContext.Provider
      value={{
        userId,
        email,
        firstName,
        lastName,
        setUserId,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
