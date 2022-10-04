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

    const object: { userId: string } = await getResponse.json()

    sessionStorage.setItem('userId', object.userId)
    setUserId(object.userId)
    navigate(`/dashboard`)
    window.location.reload()
  }

  //sign out
  const signOut = () => {}

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
