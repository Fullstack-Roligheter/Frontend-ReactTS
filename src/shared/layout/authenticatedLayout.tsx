import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import { useEffect, useState } from 'react'
import AuthenticatedHeader from './header/authenticatedHeader'

const AuthenticatedLayout = (props: any) => {
  let UserIsLoggedIn = sessionStorage.getItem('user')

  const [smallWindow, setSmallWindowOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth < 767) {
        setSmallWindowOpen(false)
      }
      else {
        setSmallWindowOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (UserIsLoggedIn === null) {
    return <Navigate to='/login' replace />
  }
  const toggleSidebar = () => {
      setSmallWindowOpen(!smallWindow)
  }

  return (
    <>
      <Box
        sx={{
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          marginTop: '50px'
        }}
      >
        <AuthenticatedHeader toggleSidebar={toggleSidebar}/>
        <Sidebar user={props.user} show={smallWindow} />
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
export default AuthenticatedLayout
