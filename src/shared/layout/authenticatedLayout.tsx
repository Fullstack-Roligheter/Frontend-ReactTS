import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'
import AuthenticatedHeader from './header/authenticatedHeader'

const AuthenticatedLayout = (props: any) => {
  let UserIsLoggedIn = sessionStorage.getItem('user')

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
        <Sidebar user={props.user} />
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
export default AuthenticatedLayout
