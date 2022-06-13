import axios from "axios";

export function GetCategories(id: any) {
    return axios.get(`https://localhost:7073/api/category/getcategories${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in GetCategories: ", error);
            throw error;
        })
}

export function GetCategoryBudget(name: any, id: any) {
    return axios.get(`https://localhost:7073/api/category/categorybudget${name}&${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in GetCategoryBudget: ", error);
            throw error;
        })
}

export function AddNewCategory(data: any) {
    return axios.post(`https://localhost:7073/api/category/addnewcategory`, data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in AddNewCategory: ", error);
            throw error;
        })
}