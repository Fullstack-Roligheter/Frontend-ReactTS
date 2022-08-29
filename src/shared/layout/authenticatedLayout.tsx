import { Navigate, Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'
import Sidebar from './sidebar/sidebar'

const AuthenticatedLayout = (props: any) => {
  // console.log('authenticated props:', props)

  let UserIsLoggedIn = localStorage.getItem('user')
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
        <Header />
        <Sidebar />
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </>
  )
}
export default AuthenticatedLayout
