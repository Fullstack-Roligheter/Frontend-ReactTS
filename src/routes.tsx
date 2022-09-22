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
import RegisterUser from './features/register/register'
import ExpenseDashboard from './features/expense/ExpenseDashboard'

const AppRouter = () => {
  let UserIsLoggedIn = JSON.parse(sessionStorage.getItem('user') || '""')

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={UserIsLoggedIn} />}>
          <Route>
            <Route index element={<WelcomeFeature />} />
            <Route path='/omoss' element={<OmOss />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/:id'>
              <Route path='/:id/saving' element={<SavingsLayout />}>
                <Route index element={<CheckSavingPlans />} />
                <Route path='create' element={<CreateSaving />} />
                <Route path='editplan/:id' element={<EditSavingPlan />} />
              </Route>
              <Route path='/:id/dashboard' element={<DashboardFeature />} />
              <Route path='/:id/transactions' element={<ExpenseDashboard/ >} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
