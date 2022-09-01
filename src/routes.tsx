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

const AppRouter = () => {
  let UserIsLoggedIn = JSON.parse(sessionStorage.getItem('user') || '""')
  console.log('routing user is logged in', UserIsLoggedIn)

  return (
    <BrowserRouter>
      <UnauthenticatedLayout element={UserIsLoggedIn}>
        <Routes>
          <Route>
            <Route >
              <Route index element={<WelcomeFeature />} />
              <Route path='/omoss' element={<OmOss />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/faq' element={<Faq />} />
              <Route
                path='/'
                element={<AuthenticatedLayout user={UserIsLoggedIn} />}
              >
                <Route path='/:id' element={<DashboardFeature />} />
                <Route path='/saving' element={<SavingsLayout />}>
                  <Route index element={<CreateSaving />} />
                  <Route path='getplans' element={<CheckSavingPlans />} />
                  <Route path='editplan/:id' element={<EditSavingPlan />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </UnauthenticatedLayout>
    </BrowserRouter>
  )
}

export default AppRouter
