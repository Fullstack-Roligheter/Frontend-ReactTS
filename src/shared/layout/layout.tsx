import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'

const Layout = () => {
	return (
		<>
		<Box sx={{ minHeight: 'calc(100vh - 70px)' }}>
			<Header />
			<Outlet />
		</Box>
			<Footer />
		</>
	)
}
export default Layout
