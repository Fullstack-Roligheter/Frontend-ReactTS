import { BrowserRouter, Route, Routes } from "react-router-dom";
import OmOss from "./features/omoss/omoss";
import LogIn from "./features/login/login";
import Faq from "./features/faq/faq";
import WelcomeFeature from "./features/welcome/welcome";
import Layout from "./shared/layout/layout";
import CreateSaving from "./Component/createSaving";
import CheckSavingPlans from "./Component/getSavingPlans";
import AppLayout from "./Component/AppLayout";
import EditSavingPlan from "./Component/EditSavingPlan";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<WelcomeFeature />} />
          <Route path="/omoss" element={<OmOss />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="saving" element={<AppLayout />}>
            <Route index element={<CreateSaving />} />
            <Route path="getplans" element={<CheckSavingPlans />} />
            <Route path="editplan/:id" element={<EditSavingPlan />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
