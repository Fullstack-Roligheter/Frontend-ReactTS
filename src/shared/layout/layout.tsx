import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import Header from './header/header'
import { Box } from '@mui/material'

const Layout = () => {
	return (
		<>
		<Box sx={{ minHeight: '100vh' }}>
			<Header />
			<Outlet />
		</Box>
			<Footer />
		</>
	)
}
export default Layout
