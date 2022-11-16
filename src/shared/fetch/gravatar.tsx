import axios from "axios"

export function GetGravatarProfile(hash: string) {
    return axios.get(`https://localhost:7073/api/Gravatar/GetGravatarProfile?hash=${hash}`)
            .then((response) => {
                if (response.data === "User not found"){
                  return response.data
                }
                else {
                  const data = (response.data)
                  return data;
                }
                })
            .catch((error) => {
                console.log('Error in userProfile: ', error)
                throw error
    })
  }