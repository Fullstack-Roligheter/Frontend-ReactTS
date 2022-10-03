import AuthenticatedLayout from './authenticatedLayout'
import UnauthenticatedLayout from './unauthenticatedLayout'
import Box from '@mui/material/Box'

import Image from '../../img/newbackground.png'

import { userType } from '../../shared/Interfaces/userToken'
import Footer from './footer/footer'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import AuthenticatedHeader from './header/authenticatedHeader'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
}

const Layout = (props: any) => {
  return (
    <Box className='App layout'>
      <Header />
      <AuthenticatedLayout {...props}>
        <AuthenticatedHeader {...props} />
        <Sidebar />
        {props.children}
      </AuthenticatedLayout>
      <UnauthenticatedLayout>
        <Box
          style={{
            padding: '0px 100px',
            margin: '70px 0',
            background: 'red',
          }}
        >
          <div className='site-layout-content'>
            <h1>UNAUTHENTICATED</h1>
          </div>
        </Box>
      </UnauthenticatedLayout>
      <Footer />
    </Box>
  )
}

export default Layout
