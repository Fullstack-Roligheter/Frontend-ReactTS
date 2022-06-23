import { Fragment } from "react";
import Box from '@mui/material/Box';
import { NavLink, Outlet } from  "react-router-dom"
import Button from "@mui/material/Button";

function BudgetLayout() {
    return (
        <Box sx={{width: '70%', margin: 'auto'}}>
            <Box sx={{height: 60, width: 532, paddingBottom: 4}}>
                <h1>Budgets</h1>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between' , width: '100%', height: 'fit-content'}}>
                <Outlet />
                <Box sx={{display: 'flex', flexDirection: 'column', padding: '15px', height: 'fit-content', border: 'solid 2px #1976d2', borderRadius: 5}}>
                    <NavLink to={'/budget'} style={{textDecoration: 'none'}}>
                        <Button variant='contained' sx={{width: 150}}>Dina budgets</Button>
                    </NavLink>
                    <NavLink to={'/budget/createbudget'} style={{textDecoration: 'none', marginTop: 10}}>
                        <Button variant='contained' sx={{width: 150}}>Skapa budget</Button>
                    </NavLink>
                </Box>
            </Box>
        </Box>
    )
}

export default BudgetLayout;