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
  email: string | null
  firstName: string | null
  lastName: string | null
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
  const [userId, setUserId] = useState<string | null>(
    sessionStorage.getItem('userId')
  )
  const [email, setEmail] = useState<string | null>(
    sessionStorage.getItem('email')
  )
  const [firstName, setFirstName] = useState<string | null>(
    sessionStorage.getItem('firstName')
  )
  const [lastName, setLastName] = useState<string | null>(
    sessionStorage.getItem('lastName')
  )

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
  }
  /*  console.log('userID:', userId) */

  //sign out
  const signOut = () => {}

  /*  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    const email = sessionStorage.getItem('email')
    const firstName = sessionStorage.getItem('firstName')
    const lastName = sessionStorage.getItem('lastName')

    if (userId && email && firstName && lastName) {
      setUserId(userId)
      setEmail(email)
      setFirstName(firstName)
      setLastName(lastName)
    }
  }, [])
 */ //andra sätt - gär en useEffect
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
