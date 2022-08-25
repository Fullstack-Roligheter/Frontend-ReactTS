import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OmOss from './features/omoss/omoss'
import LogIn from './features/login/login'
import Faq from './features/faq/faq'
import WelcomeFeature from './features/welcome/welcome'
import SavingsLayout from './features/savings/SavingsLayout'

import DashboardFeature from './features/dashboard/dashboard'
import CreateSaving from './features/savings/CreateSaving'
import EditSavingPlan from './features/savings/EditSavingPlan'
import CheckSavingPlans from './features/savings/GetSavingPlans'
import Layout from './shared/layout/layout'
import AuthenticatedLayout from './shared/layout/authenticatedLayout'
import UnauthenticatedLayout from './shared/layout/unauthenticatedLayout'
import { useState } from 'react'

const AppRouter = () => {
	const [authenticated, setAuthenticated] = useState(() => {
		const saved = localStorage.getItem('user')
		const initalValue = JSON.parse(saved)
		return initalValue || ''
	})

	let UserIsLoggedIn = localStorage.getItem('user')
	const UsedThing = JSON.parse(UserIsLoggedIn)
	console.log('routing user is logged in', UserIsLoggedIn)

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route>
						<Route element={<Layout />}>
							<Route index element={<WelcomeFeature />} />
							<Route path='/omoss' element={<OmOss />} />
							<Route path='/login' element={<LogIn />} />
							<Route path='/faq' element={<Faq />} />
							<Route
								path='/dashboard/'
								element={<AuthenticatedLayout user={UsedThing} />}
							>
								<Route path='/dashboard/:id' element={<DashboardFeature />} />
							</Route>
							<Route path='/saving' element={<SavingsLayout />}>
								<Route index element={<CreateSaving />} />
								<Route path='getplans' element={<CheckSavingPlans />} />
								<Route path='editplan/:id' element={<EditSavingPlan />} />
							</Route>
						</Route>
					</Route>
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default AppRouter
