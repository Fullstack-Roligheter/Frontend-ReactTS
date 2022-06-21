import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateSaving from "./Component/createSaving";
import CheckSavingPlans from "./Component/getSavingPlans";
import AppLayout from "./Component/AppLayout";
import EditSavingPlan from "./Component/EditSavingPlan";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="saving">
            <Route index element={<CreateSaving />} />
            <Route path="getplans" element={<CheckSavingPlans />} />
            <Route path="editplan/:id" element={<EditSavingPlan />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
