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
import ProfileFeature from './features/userprofile/userprofile'
import Layout from './shared/layout/layout'
import RegisterUser from './features/register/register'
import ExpenseDashboard from './features/expense/ExpenseDashboard'
import { userToken, userType } from './shared/Interfaces/userToken'

const AppRouter = () => {
  let user: userType = {
    userId: sessionStorage.getItem('userId') || '',
    email: sessionStorage.getItem('email') || '',
    firstName: sessionStorage.getItem('firstName') || '',
    lastName: sessionStorage.getItem('lastName') || '',
  }

  return (
    <BrowserRouter>

      <Routes>
        {/* <Route element={<Layout user={UserIsLoggedIn} />}> */}
        <Route element={<Layout {...user} />}>
          <Route>
            <Route index element={<WelcomeFeature />} />
            <Route path='/omoss' element={<OmOss />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/dashboard' element={<DashboardFeature {...user} />} />
            <Route path='/profile' element={<ProfileFeature {...user}/>} />
            <Route path='/transactions' element={<ExpenseDashboard {...user} />} />
            <Route path='/saving' element={<SavingsLayout />}>
              <Route index element={<CheckSavingPlans {...user} />} />
              <Route path='create' element={<CreateSaving {...user} />} />
              <Route path='editplan' element={<EditSavingPlan />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
