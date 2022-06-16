import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OmOss from './features/omoss/omoss'
import LogIn from './features/login/login'
import Faq from './features/faq/faq'
import WelcomePage from './features/WelcomePage/WelcomePage'
import Layout from './shared/layout/layout'

const ExpenseRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='' element={<Layout />}>
					<Route path='/' element={<WelcomePage />} />
					<Route path='/omoss' element={<OmOss />} />
					<Route path='/login' element={<LogIn />} />
					<Route path='/faq' element={<Faq />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default ExpenseRoutes()
