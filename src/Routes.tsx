import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WelcomeFeature from './features/welcome/welcome'

const ExpenseRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='' element={<WelcomeFeature />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default ExpenseRoutes()
