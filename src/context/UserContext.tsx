import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import { baseURL } from '../config'
import jwtDecode from "jwt-decode";
import { userType } from '../shared/Interfaces/userToken';

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
        'Accept': 'application/json'
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
    localStorage.setItem("userProfile", object)
    console.log(object) // Vi har tagit emot ett JWT object med vår userinfo som payload

    const decodedObject = jwtDecode<userType>(object)
    console.log(decodedObject)
    const userId = decodedObject.userId
    console.log(userId)
    //TODO: Spara vår JWT token som vi tar emot, antingen i Localstorage eller i en cookie
    
    sessionStorage.setItem('userId', decodedObject.userId)
    sessionStorage.setItem('email', decodedObject.email)
    sessionStorage.setItem('firstName', decodedObject.firstName)
    sessionStorage.setItem('lastName', decodedObject.lastName)

    setUserId(decodedObject.userId)
    setEmail(decodedObject.email)
    setFirstName(decodedObject.firstName)
    setLastName(decodedObject.lastName)

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
