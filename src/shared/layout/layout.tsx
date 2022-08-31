import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'

const Layout = (props: any) => {
  return (
    <main>
      <Box sx={{ minHeight: 'calc(100vh - 70px)', marginTop: '70px' }}>
        <Header />
        <div className='content-container'>{props.children}</div>
        <Outlet />
      </Box>
      <Footer />
    </main>
  )
}
export default Layout
