import axios from 'axios'

export function UserLogin(data: any) {
    return axios.post('https://localhost:7073/api/user/login', data)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.log("Error in UserLogin: ", error);
            throw error
        })
}

export function UserRegister(data: any) {
	return axios
		.post('https://localhost:7073/api/user/register', data)
		.then((response) => {
			const data = response.data
			return data
		})
		.catch((error) => {
			console.log('Error in UserRegister: ', error)
		})
}
