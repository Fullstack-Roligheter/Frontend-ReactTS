import axios from "axios";

export function ListBudgetsPOST(data: any) {
    return axios.post(`https://localhost:7073/api/budget/listallbudgetforspecificuser`, data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in ListBudgetsPOST: ", error);
            throw error;
        })
}

export function ListBudgetsGET(id: any) {
    return axios.get(`https://localhost:7073/api/budget/listallbudgetforspecificuser?${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in ListBudgetsGET: ", error);
            throw error;
        })
}