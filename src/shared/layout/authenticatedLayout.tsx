import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import { useEffect, useState } from 'react'
import AuthenticatedHeader from './header/authenticatedHeader'
import { userType } from '../Interfaces/userToken'

const AuthenticatedLayout = (user: userType) => {

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
