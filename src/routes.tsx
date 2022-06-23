import { BrowserRouter, Route, Routes } from "react-router-dom";
import OmOss from "./features/omoss/omoss";
import LogIn from "./features/login/login";
import Faq from "./features/faq/faq";
import WelcomeFeature from "./features/welcome/welcome";
import Layout from "./shared/layout/layout";
import SavingsLayout from "./features/savings/SavingsLayout";
import CreateSaving from "./features/savings/CreateSaving";
import EditSavingPlan from "./features/savings/EditSavingPlan";
import CheckSavingPlans from "./features/savings/GetSavingPlans";
import Budget from "./features/budget/budget";
import BudgetLayout from "./features/budget/budgetLayout";
import CreateBudget from "./features/budget/createBudget";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WelcomeFeature />} />
          <Route path="/omoss" element={<OmOss />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="saving" element={<SavingsLayout />}>
            <Route index element={<CreateSaving />} />
            <Route path="getplans" element={<CheckSavingPlans />} />
            <Route path="editplan/:id" element={<EditSavingPlan />} />
          </Route>
          <Route path="/budget" element={<BudgetLayout />}>
            <Route index element={<Budget />} />
            <Route path="createbudget" element={<CreateBudget />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
