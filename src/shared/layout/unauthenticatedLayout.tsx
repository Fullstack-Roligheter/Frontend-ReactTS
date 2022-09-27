import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'

const UnauthenticatedLayout = (props: any) => {
  return (
    <>
      <Box
        height="100vh" 
      >
        <Header />
        <Box>{props.children}</Box>
        <Outlet />        
      </Box>
      <Footer />
    </>
  )
}
export default UnauthenticatedLayout
