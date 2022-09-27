import axios from 'axios'

export function GetIncome() {
  return axios
    .get('https://localhost:7073/api/income/getincome')
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in GetIncome: ', error)
      throw error
    })
}

export function AddIncome() {
  return axios
    .post('https://localhost:7073/api/income/addincome')
    .then((response) => {
      const data = response.data
      return data
    })
    .catch((error) => {
      console.log('Error in AddIncome: ', error)
      throw error
    })
}
