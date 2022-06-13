import axios from "axios";

export function GetPlans(id: any) {
    return axios.get(`https://localhost:7073/api/saving/getplans?${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in GetPlans: ", error);
            throw error;
        })
}

export function AddPlan(data: any) {
    return axios.post('https://localhost:7073/api/saving/addplan', data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in AddPlan: ", error);
            throw error;
        })
}