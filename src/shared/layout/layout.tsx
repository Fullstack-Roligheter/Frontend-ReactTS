import AuthenticatedLayout from './authenticatedLayout'
import UnauthenticatedLayout from './unauthenticatedLayout'
import Box from '@mui/material/Box'

import Image from '../../img/newbackground.png'

import { userType } from '../../shared/Interfaces/userToken'
import Footer from './footer/footer'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import AuthenticatedHeader from './header/authenticatedHeader'
import { Outlet } from 'react-router-dom'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
}

// let user: userType = {
//   userId: sessionStorage.getItem('userId') || '',
//   email: sessionStorage.getItem('email') || '',
//   firstName: sessionStorage.getItem('firstName') || '',
//   lastName: sessionStorage.getItem('lastName') || '',
//   loggedIn: sessionStorage.getItem('loggedIn') || 'false',
// }

const Layout = (props: any) => {
  return (
    <Box className='App layout'>
      <Header />
      <AuthenticatedLayout>
        <Sidebar />
        {props.children}
        <Outlet />
      </AuthenticatedLayout>
      <UnauthenticatedLayout>
        {props.children}
        <Outlet />
      </UnauthenticatedLayout>
      <Footer />
    </Box>
  )
}

export default Layout
