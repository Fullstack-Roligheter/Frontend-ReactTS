import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import { useEffect, useState } from 'react'
import AuthenticatedHeader from './header/authenticatedHeader'
import { userType } from '../Interfaces/userToken'
import Grid from '@mui/material/Grid'
import { user } from '../UserContext'

const AuthenticatedLayout = (props: any) => {
  const [smallWindow, setSmallWindowOpen] = useState(true)

  const [drawervariant, SetDrawerVariant] = useState('permanent')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setSmallWindowOpen(false)
        SetDrawerVariant('temporary')
      } else {
        SetDrawerVariant('permanent')
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // if (user.userId === null) {
  //   return <Navigate to='/login' replace />
  // }
  // const [loggedIn, setLoggedIn] = useState(false)
  // useEffect(() => {
  //   if (user.userId === null) {
  //     console.log('not logged in')
  //     setLoggedIn(false)
  //   } else {
  //     setLoggedIn(true)
  //     console.log('logged in')
  //   }
  // }, [])

  const toggleSidebar = () => {
    setSmallWindowOpen(!smallWindow)
  }

  // let newUserHeader = {
  //   user,
  //   show: smallWindow,
  //   toggleSidebar: toggleSidebar,
  // }

  // let newUserSidebar = {
  //   user,
  //   show: smallWindow,
  //   variant: drawervariant,
  // }
  if (user.user.email)
    return (
      <>
        <Outlet />
        {props.children}
      </>
    )
  return <></>
}
export default AuthenticatedLayout
