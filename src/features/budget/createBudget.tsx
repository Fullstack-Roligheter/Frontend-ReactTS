import { Button, FormControl, Input, InputLabel } from "@mui/material";
import axios from "axios";
import React, { Fragment, useState } from "react";

const temporaryUserId = 1; // ---- Skall ändras till userId sparat i session storage


type Budget = {
    budgetName: string;
    amount: number | null;
    startDate: string;
    endDate: string;
}

const defaultBudget: Budget = {
    budgetName: "",
    amount: 0,
    startDate: "",
    endDate: "",
}

const CreateBudget = () => {

    const [budget, setBudget] = useState(defaultBudget);

    const onBudgetChange = <P extends keyof Budget>(prop: P, value: Budget[P]) => {
        setBudget({...budget, [prop]: value});
    }
    
    const AddBudget = () => {
        axios({
            method: "post",
            url: "https://localhost:7073/AddBudget",
            data: {
                userId: temporaryUserId,
                budgetName: budget.budgetName,
                budgetStartDate: new Date(budget.startDate),
                budgetEndDate: new Date(budget.endDate),
                budgetAmount: budget.amount
            }
        })
    }
    

    return (
        <Fragment>
            <form onSubmit={AddBudget}>
                <InputLabel htmlFor="budgetName">Budget name</InputLabel>
                <Input onChange={(e) => onBudgetChange("budgetName", e.target.value)} value={budget.budgetName} type="text"/>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <Input onChange={(e) => onBudgetChange("amount", parseInt(e.target.value))} value={budget.amount || ""} type="decimal" />
                <InputLabel htmlFor="startDate">Start date</InputLabel>
                <Input onChange={(e) => onBudgetChange("startDate", e.target.value)} value = {budget.startDate} type="date"/>
                <InputLabel htmlFor="endDate">End date</InputLabel>
                <Input onChange={(e) => onBudgetChange("endDate", e.target.value)} value = {budget.endDate} type="date"/><br/>
                <Button type="submit" variant="text">Add budget</Button>
            </form>
        </Fragment>
    )
}

export default CreateBudget;