import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import AuthenticatedHeader from './header/authenticatedHeader'


const AuthenticatedLayout = (props: any) => {
  // console.log('authenticated props:', props)

  let UserIsLoggedIn = sessionStorage.getItem('user')
  // console.log('authenticatedLayout: ', UserIsLoggedIn)

  if (UserIsLoggedIn === null) {
    return <Navigate to='/login' replace />
  }

  return (
    <>
      <Box
        sx={{
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          marginTop: '70px',
        }}
      >
        <AuthenticatedHeader />
        <Sidebar />
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </>
  )
}
export default AuthenticatedLayout
