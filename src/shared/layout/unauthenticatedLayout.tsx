import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'

const UnauthenticatedLayout = (props: any) => {
  return (
    <>
      <Box height='100vh'>
        <Header />
        <Box>{props.children}</Box>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
export default UnauthenticatedLayout
