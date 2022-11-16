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
import { useUserContext } from './context/UserContext'

const AppRouter = () => {
  const user = useUserContext()

  return (
    <Routes>
      {/* <Route element={<Layout user={UserIsLoggedIn} />}> */}
      <Route element={<Layout />}>
        <Route>
          <Route index element={<WelcomeFeature />} />
          <Route path='/aboutus' element={<OmOss />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/dashboard' element={<DashboardFeature />} />
          <Route path='/profile' element={<ProfileFeature />} />
          <Route path='/transactions' element={<ExpenseDashboard />} />
          <Route path='/saving' element={<SavingsLayout />}>
            <Route index element={<CheckSavingPlans />} />
            <Route path='create' element={<CreateSaving />} />
            <Route path='editplan/:id' element={<EditSavingPlan />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter
