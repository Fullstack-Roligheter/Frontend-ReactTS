import axios from "axios";

export function AddExpense(data: any) {
    return axios.post('https://localhost:7073/api/expense/addexpense', data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in AddExpense: ", error);
            throw error;
        })
}

export function GetExpenseForSpecificBudget(data: any) {
    return axios.post('https://localhost:7073/api/expense/GetExpenseForSpecificBudget', data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in GetExpenseForSpecificBudget: ", error);
            throw error;
        })
}

export function GetExpenseForSpecificBudgetSortedIntoCategories(data: any) {
    return axios.post('https://localhost:7073/api/expense/GetExpenseForSpecificBudgetSortedIntoCategories', data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in GetExpenseForSpecificBudgetSortedIntoCategories: ", error);
            throw error;
        })
}

export function ExpenseFilter() {
    return axios.get('https://localhost:7073/api/expense/expensefilter')
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in ExpenseFilter: ", error);
            throw error;
        })
}