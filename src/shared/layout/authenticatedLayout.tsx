import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import { useEffect, useState } from 'react'
import AuthenticatedHeader from './header/authenticatedHeader'
import Grid from '@mui/material/Grid'
import { useUserContext } from '../../context/UserContext'

const AuthenticatedLayout = () => {
  const user = useUserContext()

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
    show: smallWindow,
    toggleSidebar: toggleSidebar,
  }

  let newUserSidebar = {
    show: smallWindow,
    variant: drawervariant,
  }

  return (
    <>
      <Box minHeight='100vh' maxHeight='fitContent'>
        <AuthenticatedHeader {...newUserHeader} />
        <Sidebar {...newUserSidebar} />
        <Grid container={true} justifyContent='center' spacing={0} my={8}>
          <Outlet />
        </Grid>
      </Box>
      <Footer />
    </>
  )
}
export default AuthenticatedLayout
