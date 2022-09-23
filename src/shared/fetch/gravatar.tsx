import axios from "axios";

export function GetGravatarImage(hash: string) {
  axios.get(`https://www.gravatar.com/avatar/${hash}`)
        .then((response) => {
            const data = response.data;
            console.log(data)
            return response;
        })
        .catch((error) => {
            console.log("Error in GetPlans: ", error);
            throw error;
        })
      }