import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router'
import { baseURL } from '../config'

type IProps = PropsWithChildren<{}>

export interface IUser {
  password: string
  userName: string
}

type IUserContext = {
  userId: string | null
  setUserId: (userId: string) => void
  userLogIn: (userName: string, password: string) => void
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
  const userLogIn = async (userName: string, password: string) => {
    const getResponse = await fetch(`${baseURL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
    console.log(getResponse.status)
    if (getResponse.status !== 200) {
      alert('Access Denied')
      return
    }

    const object = await getResponse.json()
    await sessionStorage.setItem('userId', object.userID)
    setUserId(object.userID)
    /*  navigate(`/${object.userID}/dashboard`)
    window.location.reload() */
  }

  //sign out
  const signOut = () => {}

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userLogIn,
        signOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
