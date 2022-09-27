import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import { useEffect, useState } from 'react'
import AuthenticatedHeader from './header/authenticatedHeader'
import { userType } from '../Interfaces/userToken'

const AuthenticatedLayout = (user: userType) => {
  // let UserIsLoggedIn = sessionStorage.getItem('userId')

  const [smallWindow, setSmallWindowOpen] = useState(true)

  const [drawervariant, SetDrawerVariant] = useState('persistant')
  var w = document.documentElement.clientWidth || window.innerWidth;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setSmallWindowOpen(false)
        SetDrawerVariant('temporary')
      } else {
        setSmallWindowOpen(true)
        SetDrawerVariant('permanent')
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // if (UserIsLoggedIn === null) {
  //   return <Navigate to='/login' replace />
  // }

  if (user.userId === null) {
    return <Navigate to='/login' replace />
  }

  const toggleSidebar = () => {
    setSmallWindowOpen(!smallWindow)
  }

  let newUserHeader = {
    user,
    show: smallWindow,
    toggleSidebar: toggleSidebar
  }

  let newUserSidebar = {
    user,
    show: smallWindow,
    variant: drawervariant,
    
  }

  return (
    <>
      <Box
        sx={{
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          marginTop: '50px',
        }}
      >
        <AuthenticatedHeader {...newUserHeader} />
        <Sidebar {...newUserSidebar}/>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
export default AuthenticatedLayout
