import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomePage from "./features/WelcomePage/WelcomePage";


const ExpenseRoutes = () => {

    return
        <BrowserRouter>
            <Routes>
                <Route path="" element={<WelcomePage/>} >
                </Route>
            </Routes>
        </BrowserRouter>
            
};

export default ExpenseRoutes()